"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeService = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const clean_css_1 = __importDefault(require("clean-css"));
const rimraf_1 = __importDefault(require("rimraf"));
const adm_zip_1 = __importDefault(require("adm-zip"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const style_definition_provider_1 = require("./components/style-definition.provider");
const lodash_1 = require("lodash");
const variables_1 = __importDefault(require("./variables"));
const less_1 = __importDefault(require("less"));
const utils_1 = require("../utils");
const rn_stylesheet_transpiler_1 = require("./rn-stylesheet.transpiler");
const font_stylesheet_transpiler_1 = require("./font-stylesheet.transpiler");
const THEME_TEMPLATE_PATH = __dirname + '/../templates/theme';
const STYLE__TEMPLATE = (0, utils_1.loadTemplate)(__dirname + '/../templates/theme/wavemaker/styles.less.template');
const VARIABLE__TEMPLATE = (0, utils_1.loadTemplate)(__dirname + '/../templates/theme/wavemaker/variables.less.template');
const VARIABLE_JS_LESS__TEMPLATE = (0, utils_1.loadTemplate)(__dirname + '/../templates/theme/wavemaker/variables.js.less.template');
const COMPONENT_STYLE_LESS_DEF_TEMPLATE = (0, utils_1.loadTemplate)(__dirname + '/../templates/component/style-def.template');
const WM_PROPERTIES_TEMPLATE = (0, utils_1.loadTemplate)(__dirname + '/../templates/theme/wmproject.properties.template');
class ThemeService {
    constructor() {
        this.rnStylesheetTranspiler = new rn_stylesheet_transpiler_1.RnStylesheetTranspiler();
        this.fontStylesheetTranspiler = new font_stylesheet_transpiler_1.FontStylesheetTranspiler();
    }
    cleanDir(path) {
        return new Promise((resolve, reject) => {
            (0, rimraf_1.default)(path, (e) => e ? reject(e) : resolve());
        }).then(() => {
            fs_extra_1.default.mkdirsSync(path);
        });
    }
    prepareBuildDir(src, os, dest) {
        return this.cleanDir(`${dest}`).then(() => {
            fs_extra_1.default.copySync(`${src}/wavemaker`, `${dest}/wavemaker`);
            fs_extra_1.default.copySync(`${src}/src/common`, `${dest}/custom`);
            fs_extra_1.default.copySync(`${src}/src/${os}`, `${dest}/custom/os`);
        });
    }
    minifyCSS(src, dest = src) {
        const data = fs_extra_1.default.readFileSync(src, 'utf8');
        return new Promise((resolve) => {
            new clean_css_1.default({
                format: {
                    semicolonAfterLastProperty: true
                }
            }).minify(data, (errors, minified) => {
                fs_extra_1.default.writeFileSync(dest, minified.styles);
                resolve();
            });
        });
    }
    compileLess(src, cwd, dest = src) {
        const content = fs_extra_1.default.readFileSync(src, 'utf8');
        return less_1.default.render(content, {
            paths: [cwd]
        }).then(output => {
            if (output) {
                fs_extra_1.default.writeFileSync(dest, output.css);
            }
        });
    }
    compressStyles(styles) {
        return styles.trim().replace(/\/\*(.|\s)*?\*\//g, '').replace(/\}\s\./g, '}.');
    }
    update(themePath) {
        return new Promise((resolve, reject) => {
            if (fs_extra_1.default.existsSync(`${themePath}/wavemaker`)) {
                (0, rimraf_1.default)(`${themePath}/wavemaker`, (e) => {
                    if (e) {
                        reject(e);
                    }
                    else {
                        resolve();
                    }
                });
            }
        }).then(() => {
            fs_extra_1.default.copySync(`${THEME_TEMPLATE_PATH}/wavemaker`, `${themePath}/wavemaker`, {
                filter: (src) => !src.endsWith('.template')
            });
            this.generateStyle(themePath);
            this.generateVariables(themePath);
        });
    }
    generateStudioStyles(rawStyles) {
        return this.rnStylesheetTranspiler.toDesignStyles(rawStyles);
    }
    generateReactNativeStyles(rawStyles) {
        return JSON.stringify(this.rnStylesheetTranspiler.toReactNativeStyles(rawStyles), null, 4);
    }
    generateFontReactNativeStyles(rawStyles) {
        return JSON.stringify(this.fontStylesheetTranspiler.toReactNativeStyles(rawStyles), null, 4)
            .replace(/@_u/g, '\\u');
    }
    async takeScreenShots(themeProjectPath) {
        const dist = `${themeProjectPath}/dist`;
        let browser = null;
        try {
            browser = await puppeteer_1.default.launch();
            const page = await browser.newPage();
            await page.goto(`file://${dist}/index.html`);
            await page.setViewport({ width: 220, height: 232 });
            await page.screenshot({
                path: `${themeProjectPath}/theme.png`,
                clip: {
                    x: 0,
                    y: 0,
                    width: 200,
                    height: 160
                }
            });
        }
        catch (e) {
            console.log('Not able to take representative screenshot of theme, using Puppeteer. Please check the error.');
            console.error(e);
        }
        finally {
            browser && browser.close();
        }
    }
    compile(themeProjectPath, buildDir = themeProjectPath, os) {
        if (!fs_extra_1.default.existsSync(`${themeProjectPath}`)) {
            return Promise.resolve();
        }
        if (os) {
            const osBuild = `${buildDir}/build/${os}`;
            const osDist = `${buildDir}/dist/${os}`;
            return this.cleanDir(osBuild)
                .then(() => this.cleanDir(osDist))
                .then(() => this.prepareBuildDir(themeProjectPath, os, osBuild))
                .then(() => this.compileLess(`${osBuild}/wavemaker/styles.less`, `${osBuild}/wavemaker`, `${osDist}/raw-styles.css`)).then(() => this.minifyCSS(`${osDist}/raw-styles.css`, `${osDist}/raw-styles.min.css`))
                .then(() => {
                const rawStyle = fs_extra_1.default.readFileSync(`${osDist}/raw-styles.min.css`, 'utf-8');
                fs_extra_1.default.writeFileSync(`${osDist}/style.css`, this.generateStudioStyles(rawStyle));
                fs_extra_1.default.writeFileSync(`${osDist}/style.js`, 'export default ' + this.generateReactNativeStyles(rawStyle) + ';');
                fs_extra_1.default.removeSync(`${osDist}/raw-styles.css`);
                fs_extra_1.default.removeSync(`${osDist}/raw-styles.min.css`);
            })
                .then(() => {
                return this.compileLess(`${osBuild}/wavemaker/variables.js.less`, `${osBuild}/wavemaker`, `${osDist}/variables.js`);
            })
                .then(() => {
                fs_extra_1.default.copySync(`${osBuild}/wavemaker/assets`, `${osDist}/assets`);
                fs_extra_1.default.copySync(`${osBuild}/custom/assets`, `${osDist}/assets`);
            })
                .then(async () => {
                const platformFontConfigJson = require(`${themeProjectPath}/wavemaker/assets/fonts/font.config.json`);
                const themeFontConfigJsonPath = `${osBuild}/custom/assets/fonts/font.config.json`;
                let themeFontConfigJson = null;
                if (fs_extra_1.default.existsSync(themeFontConfigJsonPath)) {
                    themeFontConfigJson = require(`${osBuild}/custom/assets/fonts/font.config.json`);
                }
                const fontConfigTemplate = (0, utils_1.loadTemplate)(`${themeProjectPath}/wavemaker/assets/fonts/font.config.js.hbs`);
                fs_extra_1.default.removeSync(`${osDist}/assets/fonts/font.config.js.hbs`);
                fs_extra_1.default.removeSync(`${osDist}/assets/fonts/font.config.json`);
                const fonts = [...platformFontConfigJson.fonts, ...((themeFontConfigJson === null || themeFontConfigJson === void 0 ? void 0 : themeFontConfigJson.fonts) || [])];
                const fontGenPromise = Promise.all(fonts.map(f => {
                    if (f.csspath) {
                        f.stylePath = f.csspath.replace('.css', '.js');
                        return this.getIconFontScripts(path_1.default.normalize(`${osDist}/assets/fonts/${f.csspath}`));
                    }
                    return Promise.resolve();
                }));
                (0, utils_1.writeFile)(`${osDist}/assets/fonts/font.config.js`, fontConfigTemplate({
                    baseFont: (themeFontConfigJson === null || themeFontConfigJson === void 0 ? void 0 : themeFontConfigJson.baseFont) || platformFontConfigJson.baseFont,
                    fonts: fonts
                }));
                let content = fs_extra_1.default.readFileSync(`${osDist}/variables.js`, 'utf8');
                content = content.replace(/;/g, ',');
                content = 'import fontConfig from "./assets/fonts/font.config";\n' +
                    'export default {\n' +
                    '  baseFont: fontConfig.baseFont,\n' +
                    '  fontConfig: fontConfig,' +
                    content.substring(content.indexOf('{') + 1);
                fs_extra_1.default.writeFileSync(`${osDist}/variables.js`, content);
                return fontGenPromise;
            });
        }
        else {
            if (fs_extra_1.default.existsSync(`${themeProjectPath}/dist`)) {
                fs_extra_1.default.removeSync(`${themeProjectPath}/dist`);
            }
            return this.compile(themeProjectPath, buildDir, 'android')
                .then(() => this.compile(themeProjectPath, buildDir, 'ios'))
                .then(() => {
                fs_extra_1.default.copyFileSync(`${__dirname}/../templates/theme.index.html`, `${buildDir}/dist/index.html`);
                const fontConfig = fs_extra_1.default.readFileSync(`${buildDir}/dist/android/assets/fonts/font.config.js`, {
                    encoding: 'utf-8'
                });
                const baseFont = (fontConfig.match(/baseFont: '(.*)',/) || [])[1];
                const fontPath = './android/assets/fonts/'
                    + (fontConfig.match(new RegExp('name:\\s*\'' + baseFont + '\',[\\n\\s\\t]*path:\\s*require\\(\'\(.*\)\'\\)')) || [])[1];
                return (0, utils_1.readAndReplaceFileContent)(`${buildDir}/dist/index.html`, (content) => {
                    return content.replace(/\{\{headerFontFamily\}\}/g, baseFont)
                        .replace(/\{\{headerFontFamilyPath\}\}/g, fontPath)
                        .replace(/\{\{labelFontFamily\}\}/g, baseFont)
                        .replace(/\{\{labelFontFamilyPath\}\}/g, fontPath);
                });
            }).then(() => {
                fs_extra_1.default.copyFileSync(`${themeProjectPath}/.wmproject.properties`, `${buildDir}/dist/.wmproject.properties`);
                return this.takeScreenShots(themeProjectPath);
            }).then(() => {
                fs_extra_1.default.copyFileSync(`${themeProjectPath}/theme.png`, `${buildDir}/dist/theme.png`);
            });
        }
    }
    zipTheme(themeProjectPath) {
        const zipPath = `${themeProjectPath}/dist/theme.zip`;
        return new Promise((resolve, reject) => {
            const zip = new adm_zip_1.default();
            zip.addLocalFolder(`${themeProjectPath}/dist`);
            zip.writeZip(zipPath, (error) => {
                error ? reject(error) : resolve(zipPath);
            });
        });
    }
    generateStyle(path) {
        const components = [];
        style_definition_provider_1.StyleDefinitions.forEach((defs, name) => {
            const output = COMPONENT_STYLE_LESS_DEF_TEMPLATE({
                styledefs: defs,
                path: `components/${name}.less`,
                basePath: name.split('/').map(c => '../').join('')
            });
            (0, utils_1.writeFile)(`${path}/wavemaker/components/${name}.less`, output);
            components.push(name);
        });
        const style = STYLE__TEMPLATE({
            components: components.map(c => `./components/${c}.less`)
        });
        (0, utils_1.writeFile)(`${path}/wavemaker/styles.less`, style);
    }
    generateVariables(path) {
        let mVariables = {};
        Object.keys(variables_1.default).forEach(k => {
            const v = (0, lodash_1.cloneDeep)((variables_1.default[k]));
            if (v && (0, lodash_1.isString)(v.md)) {
                v.md = v.md.replace('--', '@--');
                v.mdValue = v.mdValue.replace('--', '@--');
            }
            mVariables[k] = v;
        });
        (0, utils_1.writeFile)(`${path}/wavemaker/variables.less`, VARIABLE__TEMPLATE({ variables: mVariables }));
        mVariables = {};
        Object.keys(variables_1.default).map(k => {
            const v = (variables_1.default[k]).dValue;
            if ((0, lodash_1.isString)(v)) {
                mVariables[k] = `"@{${k}}"`;
            }
            else {
                mVariables[k] = `@${k}`;
            }
        });
        (0, utils_1.writeFile)(`${path}/wavemaker/variables.js.less`, VARIABLE_JS_LESS__TEMPLATE({ variables: mVariables }));
    }
    generate(themeName, path, force = false) {
        const themePath = `${path}/${themeName}`;
        if (fs_extra_1.default.existsSync(themePath)) {
            return Promise.reject(`${themePath} exists`);
        }
        fs_extra_1.default.copySync(THEME_TEMPLATE_PATH, themePath, {
            filter: (src) => !src.endsWith('.template')
        });
        this.generateStyle(themePath);
        this.generateVariables(themePath);
        (0, utils_1.writeFile)(`${themePath}/.wmproject.properties`, WM_PROPERTIES_TEMPLATE({ theme: themeName }));
        return Promise.resolve();
    }
    getIconFontScripts(csspath) {
        const cssPathSplits = csspath.split(path_1.default.sep);
        const fileName = cssPathSplits[cssPathSplits.length - 1].replace('.css', '');
        cssPathSplits.splice(cssPathSplits.length - 1, 1);
        const dest = cssPathSplits.join(path_1.default.sep);
        return this.minifyCSS(`${dest}/${fileName}.css`, `${dest}/font-styles.min.css`).then(() => {
            let rawStyle = fs_extra_1.default.readFileSync(`${dest}/font-styles.min.css`, 'utf8');
            fs_extra_1.default.writeFileSync(`${dest}/${fileName}.js`, 'export default ' + this.generateFontReactNativeStyles(rawStyle) + ';');
            fs_extra_1.default.removeSync(`${dest}/font-styles.min.css`);
        });
    }
}
exports.ThemeService = ThemeService;
//# sourceMappingURL=theme.service.js.map