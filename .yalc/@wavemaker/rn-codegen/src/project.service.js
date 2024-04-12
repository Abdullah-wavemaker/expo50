"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalProjectService = exports.RemoteProjectService = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const _decodeURIComponent = (str) => decodeURIComponent(str.replace(/\+/g, ' '));
class RemoteProjectService {
    constructor(appUrl = '') {
        this.appUrl = appUrl;
    }
    getServiceDefs() {
        return axios_1.default.get(this.appUrl + '/services/servicedefs').then(res => res.data);
    }
    getPackageJSONOverride() {
        return axios_1.default.get(this.appUrl + '/package.json').then(res => res.data, () => null);
    }
    getAppJs() {
        return axios_1.default.get(this.appUrl + '/app.js').then(res => res.data);
    }
    getAppCss() {
        return axios_1.default.get(this.appUrl + '/app.css').then(res => res.data);
    }
    getAppThemeVariables() {
        return axios_1.default.get(this.appUrl + '/app.theme.variables.js').then(res => res.data);
    }
    getFormatters() {
        return axios_1.default.get(this.appUrl + '/extensions/formatters.js').then(res => res.data);
    }
    getAppVariables() {
        return axios_1.default.get(this.appUrl + '/app.variables.json').then(res => res.data);
    }
    getAppJSON() {
        return axios_1.default.get(this.appUrl + '/app.json')
            .catch(() => { })
            .then(res => res && JSON.parse(res.data || '{}'));
    }
    getRNConfig() {
        return axios_1.default.get(this.appUrl + '/wm_rn_config.json').then(res => {
            res.data.serverPath = this.appUrl;
            return JSON.stringify(res.data);
        });
    }
    getPrefabs() {
        return Promise.all([]);
    }
    getPageConfigs() {
        return axios_1.default.get(this.appUrl + '/pages/pages-config.json')
            .then(res => res.data);
    }
    getPageInfo(pageName) {
        return axios_1.default.get(this.appUrl + `/pages/${pageName}/page.min.json`)
            .then(res => {
            const data = res.data;
            return {
                markup: _decodeURIComponent(data.markup),
                script: _decodeURIComponent(data.script),
                styles: _decodeURIComponent(data.styles),
                variables: _decodeURIComponent(data.variables)
            };
        });
    }
    getPrefabInfo(prefabName) {
        const appUrl = this.appUrl.split('/app/prefabs')[0];
        return axios_1.default.get(appUrl + `/app/prefabs/${prefabName}/config.json`)
            .then(res => ({ config: res.data }));
    }
    getResources() {
        return Promise.resolve('');
    }
    getExpoPlugins() {
        return Promise.resolve('');
    }
    getFontConfig() {
        return axios_1.default.get(this.appUrl + `/font.config.js`).then(res => res.data);
    }
    getThemes() {
        return Promise.resolve([`${__dirname}/../../../wavemaker-artifacts/default/themes/native-mobile/artifact`]);
    }
    geti18NFiles() {
        return Promise.resolve('');
    }
    getPrefabProjectService(prefabName) {
        return new RemoteProjectService(`${this.appUrl.split('/app/prefabs')[0]}/app/prefabs/${prefabName}`);
    }
    copyNpmPackages(dest) {
        return Promise.resolve();
    }
}
exports.RemoteProjectService = RemoteProjectService;
class LocalProjectService {
    constructor(path) {
        this.path = path;
    }
    readFile(path) {
        return new Promise((resolve, reject) => {
            fs_extra_1.default.readFile(path, { encoding: 'utf-8' }, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data.toString());
                }
            });
        });
    }
    getServiceDefs() {
        return Promise.resolve('{}');
    }
    getAppJs() {
        return this.readFile(this.path + '/app.js');
    }
    getAppCss() {
        return this.readFile(this.path + '/app.css');
    }
    getAppVariables() {
        return this.readFile(this.path + '/app.variables.json')
            .then(data => JSON.parse(data));
    }
    getAppThemeVariables() {
        return this.readFile(this.path + '/app.theme.variables.js');
    }
    getFormatters() {
        return this.readFile(this.path + '/extensions/formatters.js');
    }
    getAppJSON() {
        return this.readFile(this.path + '/app.json')
            .catch(() => { })
            .then(data => JSON.parse(data || '{}'));
    }
    getRNConfig() {
        return this.readFile(this.path + '/wm_rn_config.json');
    }
    getPageConfigs() {
        return this.readFile(this.path + '/pages/pages-config.json')
            .then(data => JSON.parse(data));
    }
    getPageInfo(pageName) {
        return Promise.resolve({
            markup: fs_extra_1.default.readFileSync(this.path + `/pages/${pageName}/${pageName}.html`, 'utf-8'),
            script: fs_extra_1.default.readFileSync(this.path + `/pages/${pageName}/${pageName}.js`, 'utf-8'),
            styles: fs_extra_1.default.readFileSync(this.path + `/pages/${pageName}/${pageName}.css`, 'utf-8'),
            variables: fs_extra_1.default.readFileSync(this.path + `/pages/${pageName}/${pageName}.variables.json`, 'utf-8')
        });
    }
    getPrefabs() {
        let prefabs = [];
        const prefabDir = `${this.path}/WEB-INF/prefabs/`;
        if (fs_extra_1.default.existsSync(prefabDir)) {
            prefabs = fs_extra_1.default.readdirSync(prefabDir, {
                withFileTypes: true
            }).filter(f => f && f.isDirectory())
                .map(f => f.name);
        }
        return Promise.all(prefabs);
    }
    getPrefabInfo(prefabName) {
        const path = this.path.split('/WEB-INF')[0];
        return Promise.resolve({
            config: JSON.parse(fs_extra_1.default.readFileSync(`${path}/WEB-INF/prefabs/${prefabName}/webapp/config.json`, 'utf-8') || '{}')
        });
    }
    getExpoPlugins() {
        if (fs_extra_1.default.existsSync(`${this.path}/expo-plugins`)) {
            return Promise.resolve(this.path + '/expo-plugins');
        }
        return Promise.resolve('');
    }
    getResources() {
        return Promise.resolve(this.path + '/resources');
    }
    getFontConfig() {
        return Promise.resolve().then(() => fs_extra_1.default.readFileSync(this.path + `/font.config.js`, 'utf-8'));
    }
    getThemes() {
        return Promise.resolve([...this.getAllThemes(), ...this.getAllThemes('extraThemes')]);
    }
    getAllThemes(s = 'themes') {
        const themeDir = this.path + '/' + s;
        if (fs_extra_1.default.existsSync(themeDir)) {
            const themes = fs_extra_1.default.readdirSync(themeDir, {
                withFileTypes: true
            }).filter(f => f && f.isDirectory())
                .map(f => this.path + '/' + s + '/' + f.name);
            return themes;
        }
        return [];
    }
    geti18NFiles() {
        return Promise.resolve(`${this.path}/../../../i18n`);
    }
    getPrefabProjectService(prefabName) {
        return new LocalProjectService(`${this.path.split('/WEB-INF')[0]}/WEB-INF/prefabs/${prefabName}/webapp`);
    }
    getPackageJSONOverride() {
        if (fs_extra_1.default.existsSync(`${this.path}/package.json`)) {
            return fs_extra_1.default.readJSONSync(`${this.path}/package.json`, { encoding: 'utf-8' });
        }
        return Promise.resolve({});
    }
    copyNpmPackages(dest) {
        if (fs_extra_1.default.existsSync(`${this.path}/npm-packages`)) {
            fs_extra_1.default.copySync(`${this.path}/npm-packages`, `${dest}/npm-packages`);
        }
        return Promise.resolve();
    }
}
exports.LocalProjectService = LocalProjectService;
let instance;
exports.default = (config) => {
    if (!instance && config) {
        if (config.src.startsWith('http')) {
            instance = new RemoteProjectService(config.src);
        }
        else {
            instance = new LocalProjectService(config.src);
        }
    }
    return instance;
};
//# sourceMappingURL=project.service.js.map