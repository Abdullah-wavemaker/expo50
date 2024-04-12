const esbuild = require('esbuild');
const resolve = require('esbuild-plugin-resolve');
const fs = require('fs-extra');
const { exec } = require('child_process');
const babel = require('./esbuild-plugin-babel');
const path = require('path')

const BUILD_DIR = './web-build';

async function readAndReplaceFileContent(path, writeFn) {
  const content = fs.readFileSync(path, 'utf-8');
  return Promise.resolve().then(() => {    
      return writeFn && writeFn(content);
  }).then((modifiedContent) => {
      if (modifiedContent !== undefined && modifiedContent !== null) {
          fs.writeFileSync(path, modifiedContent);
          return modifiedContent;
      }
      return content;
  });
}

class EsBuilder {
  cleanBuildDir() {
    if (fs.existsSync(BUILD_DIR)) {
      fs.removeSync(BUILD_DIR);
    }
  }

  prepareIndexHtml() {
    console.log('build success');
    try {
    const bundleName = fs.readdirSync('./web-build').find(n => /^bundle.*js$/.test(n));
    let content = fs.readFileSync(__dirname + '/index.html', 'utf-8');
    content = content.replace(/".\/bundle.js"/, `"./${bundleName}"`);
    fs.writeFileSync('./web-build/index.html', content);
    } catch (err) {
      console.error(err);
    }
  }

  patchPackageLib(paths) {
    paths.forEach((path) => {
      const packageFile = `${__dirname}/../node_modules/${path}/package.json`;
      if (fs.existsSync(packageFile)) {
        const _package = fs.readJSONSync(packageFile);
        console.log('patch applied on package at.. ', packageFile);
        delete _package['module'];
        delete _package['type'];
        fs.writeFileSync(packageFile, JSON.stringify(_package, null, 4));
      }
    });
  }

  async patchCamera() {
    return readAndReplaceFileContent(`${__dirname}/../node_modules/expo-camera/build/useWebQRScanner.js`, (c) => {
      if (c.indexOf('@koale/useworker') > 0) {
          return fs.readFileSync(`${__dirname}/expo-camera-patch/useWebQRScanner.js`, {
              encoding: 'utf-8'
          })
      }
      return c;
    });
  }

  async patchReactNativeAssets() {
    const path = `${__dirname}/../node_modules/@react-native/assets-registry/`
    fs.removeSync(path+'registry.js');
    const registry_content = `
    'use strict';

    export type PackagerAsset = {
      __packager_asset: boolean,
      fileSystemLocation: string,
      httpServerLocation: string,
      width?: number,
      height?: number,
      scales: Array<number>,
      hash: string,
      name: string,
      type: string,
    };
    
    const assets: Array<PackagerAsset> = [];
    
    export function registerAsset(asset: PackagerAsset): number {
      // push returns new array length, so the first asset will
      // get id 1 (not 0) to make the value truthy
      return assets.push(asset);
    }
    
    export function getAssetByID(assetId: number): PackagerAsset {
      return assets[assetId - 1];
    }
    `;
    fs.writeFileSync(path+'registry.ts', registry_content);
    const content = fs.readFileSync(path+'path-support.js', 'utf-8');
    fs.removeSync(path+'path-support.js')
    fs.writeFileSync(path+'path-support.ts', content);
    await readAndReplaceFileContent(path+'path-support.ts', (content)=>{
      return content.replace(`import type {PackagerAsset} from './registry.js';`,`import type {PackagerAsset} from './registry.ts';`)
      .replace(` | $TEMPORARY$string<'raw'> `, '');
    });
  }

  async patchReactNativeWeb() {
    const path = `${__dirname}/../node_modules/react-native-web/dist/cjs/exports/render/index.js`;
    await readAndReplaceFileContent(path, (content) => {
        return content.replace(
            'var _reactDom = require("react-dom");',
            `var React = require("react");
            var _reactDom = require("react-dom");
            var _reactDomClient = require("react-dom/client");`
        ).replace('hydrate(element', 'hydrateOld(element')
        .replace('render(element', 'renderOld(element') + 
        `
        function hydrate(element, root, callback) {
          (0, _dom.createSheet)(root);
          return (0, _reactDomClient.hydrateRoot)(element, root, callback);
        }
        
        function AppWithCallbackAfterRender(props) {
          React.useEffect(() => {props.callback && props.callback()});
          return props.element;
        }
        
        function render(element, root, callback) {
          (0, _dom.createSheet)(root);
          return (0, _reactDomClient.createRoot)(root).render(
            React.createElement(AppWithCallbackAfterRender, 
              {
                "callback": callback,
                element: element
              }
            )
          );
        }`;
    });
    console.log('Patched react-native-web');
  }

  patchWithDevTools(path) {
    const packageFile = `${__dirname}/../node_modules/${path}`;
    if (fs.existsSync(packageFile)) {
      const _package = "import * as React from 'react';export function withDevTools(AppRootComponent) {return (props) => React.createElement(AppRootComponent, { ...props });}"
      fs.writeFileSync(packageFile, _package);
    }
  }

  buildLibraries() {
    const promises = [{
      name: 'expo-web-browser',
      build: (path) => {
        fs.writeFileSync(`${path}/build/WebBrowser.js`, `
        export const openBrowserAsync = (url) => {
          window.open(url, '_blank');
        };`);
      }
    }].map(p => {
      let libPath = `${__dirname}/../node_modules/${p.name}`;
      if (!fs.existsSync(libPath)) {
        libPath = `${__dirname}/../node_modules/@wavemaker/app-rn-runtime/node_modules/${p.name}`;
      }
      if (!fs.existsSync(libPath)) {
        const msg = `${p.name} library is not found`;
        console.error(msg);
        return Promise.reject(msg);
      }
      const destPath = `${__dirname}/node_modules/${p.name}`;
      if (fs.existsSync(destPath)) {
        fs.removeSync(destPath);
      }
      fs.copySync(libPath, destPath);
      return p.build && p.build(destPath);
    });
    return Promise.all(promises)
        .then(() => this.patchPackageLib(['@koale/useworker', 'victory',
          'd3-array', 'd3-color', 'd3-ease', 'd3-format', 'd3-interpolate', 
          'd3-path', 'd3-scale', 'd3-shape', 'd3-time', 'd3-time-format',
          'd3-timer', 'd3-voronoi']))
        .then(() => this.patchWithDevTools('expo/build/launch/withDevTools.js'))
        .then(() => this.patchReactNativeWeb())
        .then(() => this.patchReactNativeAssets())
        .then(() => this.patchCamera())
        .then(() => {
          console.log('*********** LIBRARIES ARE BUILT FOR ESBUILD **************');
        }, (e) => {
          console.error(e);
          console.log('*********** FAILED TO BUILD LIBRARIES FOR ESBUILD **************');
        });
  }

  build() {
    console.log('excluded react-native-vector-icons module in esbuild');
    return esbuild.build({
      entryPoints: ['./node_modules/expo/AppEntry.js'],
      external:['./node_modules/react-native-vector-icons'],
      bundle: true,
      entryNames: 'bundle-[hash]',
      outdir: 'web-build',
      tsconfig: './esbuild/jsconfig.json',
      define: {'process.env.NODE_ENV': '"development"', '__DEV__': false, global:'window'},
      resolveExtensions: ['.web.tsx','.web.ts','.web.jsx','.web.js','.tsx','.ts','.jsx','.js',],
      loader: {".png": "file", ".jpeg": "file", ".ttf": "file", ".js": "jsx", ".gif": "file", ".svg": "file" },
      minify: false,
      sourcemap: true,
      plugins: [babel({
        filter: /\/src\/.*jsx?/,
        config : {
          targets: {
            browsers: 'last 2 versions',
            esmodules: true
          },
          sourceMaps: 'inline',
          plugins: [__dirname + '/../scripts/wm-babel.transform.plugin.js']
        }
      }), resolve({
        'victory-native': 'victory'
      })]
    })
  }

  triggerBuild() {
    console.log('*********** REACT NATIVE ESBUILD STARTED **************');
    console.time('react native with esbuild');
    this.cleanBuildDir();
    this.build()
    .then(() => this.prepareIndexHtml())
    .then(() => {
      console.timeEnd('react native with esbuild');
      console.log('*********** REACT NATIVE ESBUILD SUCCESSFUL **************');
    }).catch(() => {
      console.timeEnd('react native with esbuild');
      console.log('*********** REACT PROJECT ESBUILD FAILED **************');
    });
  }
}

if (process.argv[2] === '--prepare-lib') {
  (new EsBuilder()).buildLibraries();
} else {
  (new EsBuilder()).triggerBuild();
}
