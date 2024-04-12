"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCmd = void 0;
const transform_register_1 = __importDefault(require("./src/transpile/components/transform-register"));
const project_service_1 = __importDefault(require("./src/project.service"));
const handlebar_helpers_1 = __importDefault(require("./src/handlebar-helpers"));
const app_generator_1 = __importDefault(require("./src/app.generator"));
const execa_1 = __importDefault(require("execa"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const crypto_1 = __importDefault(require("crypto"));
const os_1 = require("os");
const profile_1 = __importStar(require("./src/profiles/profile"));
const development_profile_1 = __importDefault(require("./src/profiles/development.profile"));
const expo_preview_profile_1 = __importDefault(require("./src/profiles/expo-preview.profile"));
const web_preview_profile_1 = __importDefault(require("./src/profiles/web-preview.profile"));
const expo_web_preview_profile_1 = __importDefault(require("./src/profiles/expo-web-preview.profile"));
const increment_builder_1 = require("./src/increment-builder");
const utils_1 = require("./src/utils");
const version = require('./package.json').version;
const sampleProjectPath = `${(0, os_1.homedir)()}/.wm/node_modules/wm-rn-sample-app/${version}/`;
const isConnectedToInternet = () => {
    return new Promise((resolve) => {
        const req = require('https').get('https://npmjs.com', { timeout: 5000 }, () => {
            resolve(true);
        });
        req.on('error', (e) => {
            console.error(e);
            resolve(false);
        });
        req.on('timeout', (e) => {
            console.error('npmjs request timed out.');
            resolve(false);
        });
    });
};
const npmInstall = (src) => {
    return isConnectedToInternet().then((isConnected) => {
        if (!isConnected) {
            console.log('Not able to access npm.');
            return;
        }
        console.time('npm install');
        console.log('Installing node modules at ' + src);
        return (0, execa_1.default)('npm', ['install'], {
            cwd: src,
            stdio: [process.stdin, process.stdout, process.stderr]
        }).then(() => {
            console.timeEnd('npm install');
        });
    });
};
const getLastModifiedDate = (p) => {
    try {
        return fs_extra_1.default.statSync(p).mtime;
    }
    catch (error) {
        return 0;
    }
};
const cleanNodeModulesIfNecessary = (src, dest, forceClean = false) => {
    const packageJSON = `${dest}/package.json`;
    const dependencies = `${dest}/dependencies.info`;
    const nodeModules = `${dest}/node_modules`;
    let clean = forceClean;
    if (!fs_extra_1.default.existsSync(dependencies) || !fs_extra_1.default.existsSync(nodeModules)) {
        clean = true;
    }
    const data = fs_extra_1.default.readFileSync(dest + '/package.json', 'utf-8');
    const hash = crypto_1.default.createHash('md5').update(data, 'utf-8').digest('hex');
    let dependenciesData = {
        packageHash: '',
        cleanInstall: 0
    };
    if (!clean) {
        try {
            dependenciesData = JSON.parse(fs_extra_1.default.readFileSync(dependencies, 'utf-8'));
            clean = dependenciesData.packageHash !== hash;
        }
        catch (e) {
            console.error(e);
            clean = true;
        }
    }
    if (!clean && fs_extra_1.default.existsSync(packageJSON)) {
        const _package = require(packageJSON);
        let files = [];
        if (_package.dependencies) {
            files.push(...Object.values(_package.dependencies));
        }
        if (_package.devDependencies) {
            files.push(...Object.values(_package.devDependencies));
        }
        files = files.filter((f) => f.startsWith('file:')).map(f => `${src}/${f.replace('file:', '')}`);
        const dependenciesLastModifiedTime = files.map(p => getLastModifiedDate(p)).reduce((m, c) => m > c ? m : c, 0);
        clean = dependenciesData.cleanInstall < dependenciesLastModifiedTime;
    }
    if (clean) {
        if (fs_extra_1.default.existsSync(nodeModules)) {
            fs_extra_1.default.rmdirSync(nodeModules, {
                recursive: true
            });
        }
        fs_extra_1.default.mkdirpSync(nodeModules);
        fs_extra_1.default.writeFileSync(dependencies, JSON.stringify({
            packageHash: hash,
            cleanInstall: Date.now()
        }, null, 4));
    }
    return clean;
};
const installDependencies = (src, dest, force = false) => {
    const nodeModules = `${dest}/node_modules`;
    if (!cleanNodeModulesIfNecessary(src, dest, force)) {
        return Promise.resolve(false);
    }
    return Promise.resolve().then(() => {
        if (profile_1.default.linkNodeModules) {
            return Promise.resolve().then(() => {
                if (!fs_extra_1.default.existsSync(sampleProjectPath)) {
                    fs_extra_1.default.mkdirpSync(sampleProjectPath);
                    fs_extra_1.default.copySync(`${__dirname}/src/templates/package.web.json`, sampleProjectPath + 'package.json');
                    return npmInstall(sampleProjectPath);
                }
            }).then(() => {
                console.time('copied node modules');
                fs_extra_1.default.rmdirSync(nodeModules, {
                    recursive: true
                });
                fs_extra_1.default.copySync(`${sampleProjectPath}/node_modules`, nodeModules, {
                    recursive: true
                });
                console.timeEnd('copied node modules');
            });
        }
    })
        .then(npmInstall.bind(undefined, dest))
        .then(() => true);
};
const generateWebCmd = (src, dest) => {
    updatePackagesForEsBuild(dest);
    return installDependencies(src, dest)
        .then((updated) => {
        if (updated || !fs_extra_1.default.existsSync(`${dest}/esbuild/node_modules`)) {
            return (0, execa_1.default)('node', ['./esbuild/esbuild.script.js', '--prepare-lib'], {
                cwd: dest,
                stdio: [process.stdin, process.stdout, process.stderr]
            });
        }
    })
        .then(() => console.time('web preview build'))
        //.then(() => execa('expo', ['build:web', '-d', '--no-pwa'], {
        .then(() => (0, execa_1.default)('node', ['esbuild/esbuild.script.js'], {
        cwd: dest,
        stdio: [process.stdin, process.stdout, process.stderr]
    })).then(() => {
        const data = fs_extra_1.default.readFileSync(dest + '/web-build/index.html', 'utf-8');
        const modData = data.replace(new RegExp('"/static', 'g'), '"./static');
        fs_extra_1.default.writeFileSync(dest + '/web-build/index.html', modData);
        if (!src.startsWith('http')) {
            fs_extra_1.default.copySync(dest + '/web-build', src + '/rn-bundle');
        }
        console.timeEnd('web preview build');
    });
};
// This method is added as reanimated plugin is updated to latest version to support expo sdk 45.
// once esbuild works with latest version then this can be removed.
const updatePackagesForEsBuild = (dest) => {
    let content = fs_extra_1.default.readFileSync(`${dest}/babel.config.js`, 'utf-8');
    content = content.replace(`'react-native-reanimated/plugin',`, '');
    content = content.replace(`'transform-remove-console'`, '');
    fs_extra_1.default.writeFileSync(`${dest}/babel.config.js`, content);
};
const removeEsBuildFiles = (dest) => {
    fs_extra_1.default.removeSync(`${dest}/esbuild`);
    const packageJson = fs_extra_1.default.readJSONSync(`${dest}/package.json`);
    delete packageJson['dependencies']['@unimodules/react-native-adapter'];
    delete packageJson['devDependencies']['esbuild'];
    delete packageJson['devDependencies']['fs-extra'];
    fs_extra_1.default.writeFileSync(`${dest}/package.json`, JSON.stringify(packageJson, null, 4));
};
const installLocalDependencies = (dest) => {
    var _a;
    const packageInfo = fs_extra_1.default.readJsonSync(`${dest}/package.json`, { encoding: 'utf-8' });
    if (((_a = packageInfo === null || packageInfo === void 0 ? void 0 : packageInfo.dependencies['@wavemaker/app-rn-runtime']) === null || _a === void 0 ? void 0 : _a.indexOf('.yalc')) > 0) {
        return (0, execa_1.default)('yalc', ['add', '@wavemaker/variables', '@wavemaker/app-rn-runtime', '@wavemaker/rn-codegen'], {
            cwd: dest
        });
    }
};
const isCleanNecessary = (dest) => {
    const file = `${__dirname}/.wm_lock`;
    if (!fs_extra_1.default.existsSync(file)) {
        fs_extra_1.default.writeFileSync(file, '');
        return true;
    }
    const platformUpdatedOn = getLastModifiedDate(file);
    const destCreatedOn = getLastModifiedDate(dest);
    return platformUpdatedOn > destCreatedOn;
};
const buildCmd = ({ src, dest, page, profile, autoClean, incrementalBuild }) => {
    const isRemoteProvider = src.startsWith('http');
    const appUrl = isRemoteProvider ? src : '..';
    const buildDataPath = `${dest}/.build`;
    let buildData = {};
    let buildStartTime = Date.now();
    (0, transform_register_1.default)();
    (0, handlebar_helpers_1.default)();
    console.log(`Generating the project from "${src}".`);
    const projectService = (0, project_service_1.default)({ 'src': src });
    let incBuilder = undefined;
    if (!src.startsWith('http') && fs_extra_1.default.existsSync(buildDataPath)) {
        buildData = fs_extra_1.default.readJSONSync(buildDataPath) || {};
        if (profile !== 'web-preview' && incrementalBuild && buildData.lastBuildTime) {
            incBuilder = new increment_builder_1.IncrementalBuilder(src, buildData.lastBuildTime);
        }
    }
    const generator = new app_generator_1.default(dest, projectService, appUrl, undefined, incBuilder);
    const rnBundle = `${src}/rn-bundle`;
    const buildInfo = `${__dirname}/src/templates/build-info`;
    console.time('App creation');
    if (profile === 'expo-preview') {
        (0, profile_1.setProfile)(expo_preview_profile_1.default);
    }
    else if (profile === 'expo-web-preview') {
        (0, profile_1.setProfile)(expo_web_preview_profile_1.default);
    }
    else if (profile === 'web-preview') {
        (0, profile_1.setProfile)(web_preview_profile_1.default);
    }
    else if (isRemoteProvider || profile === 'development') {
        (0, profile_1.setProfile)(development_profile_1.default);
    }
    else if (profile === 'skip-build') {
        const data = fs_extra_1.default.readFileSync(`${buildInfo}/info.html`, 'utf-8');
        const modData = data.replace(/\{\{modified_date\}\}/g, Date.now() + '');
        fs_extra_1.default.mkdirpSync(rnBundle);
        fs_extra_1.default.writeFileSync(`${rnBundle}/index.html`, modData);
        return Promise.resolve();
    }
    return Promise.resolve().then(() => {
        if (profile_1.default.generateWeb) {
            if (autoClean
                && fs_extra_1.default.existsSync(dest)
                && isCleanNecessary(dest)) {
                fs_extra_1.default.removeSync(dest);
                fs_extra_1.default.mkdirpSync(dest);
            }
            if (fs_extra_1.default.existsSync(rnBundle)) {
                fs_extra_1.default.removeSync(rnBundle);
            }
            fs_extra_1.default.mkdirpSync(rnBundle);
            fs_extra_1.default.copyFileSync(`${buildInfo}/index.html`, `${rnBundle}/index.html`);
        }
    }).then(() => {
        if (page) {
            return generator.generateFragment(page);
        }
        return generator.generateApp();
    }).then(() => {
        if (!page && profile === 'expo-web-preview') {
            return (0, utils_1.readAndReplaceFileContent)(`${dest}/babel.config.js`, content => content.replace(`'react-native-reanimated/plugin',`, ''));
        }
    }).then(() => {
        buildData.lastBuildTime = buildStartTime;
        fs_extra_1.default.writeJSONSync(buildDataPath, buildData);
        console.timeEnd('App creation');
    })
        .then(() => installLocalDependencies(dest))
        .then(() => {
        const localFile = `${dest}/.yalc/@wavemaker/rn-codegen/src/utils.js`;
        (0, utils_1.readAndReplaceFileContent)(localFile, (c) => {
            c = c.replace('const fs_extra', '//const fs_extra');
            return c;
        });
        if (!fs_extra_1.default.existsSync(localFile)) {
            (0, utils_1.readAndReplaceFileContent)(`${dest}/node_modules/@wavemaker/rn-codegen/src/utils.js`, (c) => {
                c = c.replace('const fs_extra', '//const fs_extra');
                return c;
            });
        }
        if (profile_1.default.generateWeb) {
            return generateWebCmd(src, dest);
        }
        else if (profile_1.default.targetPlatform === 'native') {
            return removeEsBuildFiles(dest);
        }
    }).catch((e) => {
        if (profile_1.default.generateWeb) {
            fs_extra_1.default.mkdirpSync(rnBundle);
            fs_extra_1.default.copyFileSync(`${buildInfo}/error.html`, `${rnBundle}/index.html`);
        }
        Promise.reject(e);
    });
};
exports.buildCmd = buildCmd;
//# sourceMappingURL=command.js.map