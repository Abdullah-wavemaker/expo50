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
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("path");
const lodash_1 = require("lodash");
const execa_1 = __importDefault(require("execa"));
const semver_1 = __importDefault(require("semver"));
const path_2 = __importDefault(require("path"));
const transpile_1 = require("./transpile/transpile");
const variable_transformer_1 = __importDefault(require("./variables/variable.transformer"));
const utils_1 = require("./utils");
const bind_ex_transformer_1 = __importDefault(require("./transpile/bind.ex.transformer"));
const theme_service_1 = require("./theme/theme.service");
const profile_1 = __importDefault(require("./profiles/profile"));
const APP_TEMPLATE = (0, utils_1.loadTemplate)(__dirname + '/templates/app.template');
const APP_THEME_TEMPLATE = (0, utils_1.loadTemplate)(__dirname + '/templates/app.theme.template');
const BABEL_CONFIG_TEMPLATE = (0, utils_1.loadTemplate)(__dirname + '/templates/babel.config.js.template');
const BOOTSTRAP_TEMPLATE = (0, utils_1.loadTemplate)(__dirname + '/templates/bootstrap.template');
const RESOURCE_RESOLVER_TEMPLATE = (0, utils_1.loadTemplate)(__dirname + '/templates/resource.resolver.template');
const THEME_ASSET_RESOLVER_TEMPLATE = (0, utils_1.loadTemplate)(__dirname + '/templates/theme-asset.resolver.template');
const COMPONENT_TEMPLATE = (0, utils_1.loadTemplate)(__dirname + '/templates/component/component.template');
const COMPONENT_PROPS_TEMPLATE = (0, utils_1.loadTemplate)(__dirname + '/templates/component/component.props.template');
const SCRIPT_TEMPLATE = (0, utils_1.loadTemplate)(__dirname + '/templates/component/script.template');
const STYLE_TEMPLATE = (0, utils_1.loadTemplate)(__dirname + '/templates/component/style.template');
const PAGE_CONFIG_TEMPLATE = (0, utils_1.loadTemplate)(__dirname + '/templates/pages-config.template');
const SERVICE_DEFINITIONS = (0, utils_1.loadTemplate)(__dirname + '/templates/service.defs.template');
const FORMATTERS_TEMPLATE = (0, utils_1.loadTemplate)(__dirname + '/templates/extensions/formatters.template');
const VARIABLE_TEMPLATE = (0, utils_1.loadTemplate)(__dirname + '/templates/variables.template');
const DEVICE_SERVICES_TEMPLATE = (0, utils_1.loadTemplate)(__dirname + '/templates/device-operation-loader.template');
const ENTITY_PROVIDER_TEMPLATE = (0, utils_1.loadTemplate)(__dirname + '/templates/entity-provider.template');
const ALL_GENERATED_FILES = '(src/**/*.js|app.js|app.style.js|bootstrap.js)';
// REF: https://github.com/facebook/metro/blob/master/packages/metro-config/src/defaults/defaults.js#L14-L44
const ALLOWED_RESOURCE_EXT = [
    // Image formats
    'bmp', 'gif', 'jpg', 'jpeg', 'png', 'psd', 'svg', 'webp',
    // Video formats
    'm4v', 'mov', 'mp4', 'mpeg', 'mpg', 'webm',
    // Audio formats
    'aac', 'aiff', 'caf', 'm4a', 'mp3', 'wav',
    // Document formats
    'html', 'pdf', 'yaml', 'yml', 'json',
    // Font formats
    'otf', 'ttf',
    // Archives (virtual files)
    'zip',
    'js'
];
const pluginOperationConfig = [];
const operationMap = {
    'captureImage': { name: 'Camera', method: 'CaptureImageOperation', filename: 'capture-image', hasConstructorParams: true },
    'captureVideo': { name: 'Camera', method: 'CaptureVideoOperation', filename: 'capture-video', hasConstructorParams: true },
    'scanBarCode': { name: 'Scan', method: 'ScanOperation', filename: 'scan', hasConstructorParams: true },
    'getAppInfo': { name: 'Device', method: 'AppInfoOperation', filename: 'app-info', hasConstructorParams: false },
    'getDeviceInfo': { name: 'Device', method: 'DeviceInfoOperation', filename: 'device-info', hasConstructorParams: false },
    'getNetworkInfo': { name: 'Device', method: 'NetworkInfoOperation', filename: 'network-info', hasConstructorParams: false },
    'vibrate': { name: 'Device', method: 'VibrateOperation', filename: 'vibrate', hasConstructorParams: false },
    'getCurrentGeoPosition': { name: 'Location', method: 'CurrentGeoPositionOperation', filename: 'current-geo-position', hasConstructorParams: true },
    'getContacts': { name: 'Contacts', method: 'GetContactsOperation', filename: 'get-contacts', hasConstructorParams: true },
    'getEvents': { name: 'Calendar', method: 'GetEventsOperation', filename: 'get-events', hasConstructorParams: true },
    'createEvent': { name: 'Calendar', method: 'CreateEventOperation', filename: 'create-event', hasConstructorParams: true },
    'deleteEvent': { name: 'Calendar', method: 'DeleteEventOperation', filename: 'delete-event', hasConstructorParams: true },
    'upload': { name: 'File', method: 'UploadFileOperation', filename: 'upload-file', hasConstructorParams: false },
};
const serviceParams = {
    'Camera': [{
            name: 'AppDisplayManagerService',
            filename: 'app-display-manager.service'
        }],
    'Scan': [{
            name: 'AppDisplayManagerService',
            filename: 'app-display-manager.service'
        }],
    'Location': [],
    'Contacts': [],
    'Calendar': []
};
let deviceVariables = [];
let appVersion;
const servicesConfig = [];
class AppGenerator {
    constructor(projectPath, projectService, appUrl, prefabName = '', incBuilder, dynamicPrefabProps) {
        this.projectPath = projectPath;
        this.projectService = projectService;
        this.appUrl = appUrl;
        this.prefabName = prefabName;
        this.incBuilder = incBuilder;
        this.dynamicPrefabProps = dynamicPrefabProps;
        this.transpiledComponents = {
            pages: {},
            partials: {},
            prefabs: {}
        };
        this.liveVariables = [];
        this.isPrefabApp = false;
        this.themeService = new theme_service_1.ThemeService();
        this.isPrefabApp = !!prefabName;
    }
    prepareVariables(variableJSON, scope, imports) {
        const variables = Object.values(variableJSON)
            .map((v) => (0, variable_transformer_1.default)(v, scope, this.appUrl)).filter(v => !!v);
        return VARIABLE_TEMPLATE({
            scope: scope,
            imports: imports,
            addEntityProvider: !this.isPrefabApp && scope !== 'App',
            isPrefabApp: this.isPrefabApp,
            prefabName: this.prefabName,
            context: {
                Variables: variables.filter(v => v.group === 'variable'),
                Actions: variables.filter(v => v.group === 'action')
            }
        });
    }
    getFilePath(name) {
        let nameArr = name.split('');
        const index = nameArr.findIndex(character => {
            return (character === character.toUpperCase() && character !== '-');
        });
        if (index === -1) {
            return name;
        }
        if (index === 0) {
            name = name[index].toLowerCase() + name.substring(index + 1);
        }
        else {
            name = name.substring(0, index) + '-' + name[index].toLowerCase() + name.substring(index + 1);
        }
        return this.getFilePath(name);
    }
    generatePluginsOperationConfig() {
        const servicesList = [];
        deviceVariables.forEach((v) => {
            const hasEntry = pluginOperationConfig.find(p => p.operation === v.operation);
            if (hasEntry) {
                return false;
            }
            const selectedOperation = operationMap[v.operation];
            if (!selectedOperation) {
                console.log('Cannot find operation named ' + v.operation);
            }
            const excludeServices = ['Device', 'File'];
            if (!servicesList.includes(selectedOperation.name) && !excludeServices.includes(selectedOperation.name)) {
                servicesList.push(selectedOperation.name);
            }
            pluginOperationConfig.push({
                'operation': v.operation,
                'service': v.service,
                'filename': selectedOperation.filename,
                'method': selectedOperation.method,
                'hasparams': selectedOperation.hasConstructorParams,
                'type': selectedOperation.name
            });
        });
        let uniqueImports = [];
        servicesList.forEach((s) => {
            const item = serviceParams[s] || [];
            if (item && item.length) {
                item.forEach((e) => {
                    var itemName = e.name;
                    const isImported = uniqueImports.length && uniqueImports.find(i => {
                        return i.name === itemName;
                    });
                    if (!isImported) {
                        uniqueImports.push(e);
                    }
                });
            }
            servicesConfig.push({
                name: s,
                constructorParams: item,
                servicesStr: '',
                filePath: ''
            });
        });
        servicesConfig.forEach((item) => {
            let servicesStr = '';
            item.constructorParams.forEach((o) => {
                const serviceName = o['name'];
                if (serviceName) {
                    if (!servicesStr) {
                        servicesStr = servicesStr + serviceName;
                    }
                    if (!servicesStr.includes(serviceName)) {
                        servicesStr = servicesStr + ', ' + serviceName;
                    }
                }
            });
            item.servicesStr = servicesStr;
            item.filePath = this.getFilePath(item.name);
        });
        const output = DEVICE_SERVICES_TEMPLATE({
            pluginOperationConfig: pluginOperationConfig,
            appVersion: appVersion,
            servicesConfig: servicesConfig,
            imports: uniqueImports
        });
        (0, utils_1.writeFile)(`${this.projectPath}/src/device-operation-loader.js`, output);
    }
    prepareDeviceOperationLoader() {
        const config = fs_extra_1.default.readJsonSync(`${this.projectPath}/wm_rn_config.json`, {
            encoding: 'utf8'
        });
        appVersion = config.version;
        this.generatePluginsOperationConfig();
    }
    isPartial(type) {
        return type === 'PARTIAL' || type === 'LEFTNAV' || type === 'POPOVER' || type === 'TEMPLATE';
    }
    prettify(target = ALL_GENERATED_FILES) {
        let prettierPath = null;
        let d = __dirname;
        while (d) {
            prettierPath = d + path_1.sep + 'node_modules' + path_1.sep + 'prettier';
            if (fs_extra_1.default.existsSync(prettierPath)) {
                break;
            }
            const s = d.split(path_1.sep);
            s.pop();
            d = s.join(path_1.sep);
        }
        if (d) {
            return (0, execa_1.default)('node', [`${prettierPath}${path_1.sep}bin-prettier.js`, '--write', `${this.projectPath}/${target}`]);
        }
        console.warn('Prettier is not found');
        return Promise.reject();
    }
    setDeviceVariables(variables) {
        variables = Object.values(variables);
        const filterOutput = variables.filter((v) => v.category === 'wm.DeviceVariable');
        deviceVariables = deviceVariables.concat(filterOutput);
    }
    savePageDesignStyles(designStyles, pageName) {
        const p = `${this.projectPath}/designtime/pages/${pageName}`;
        fs_extra_1.default.mkdirpSync(p);
        fs_extra_1.default.writeFileSync(`${p}/${pageName}.css`, designStyles);
        return Promise.resolve();
    }
    saveAppDesignStyles(designStyles) {
        const p = `${this.projectPath}/designtime`;
        fs_extra_1.default.mkdirpSync(p);
        fs_extra_1.default.writeFileSync(`${p}/app.css`, designStyles);
        return Promise.resolve();
    }
    generateAppVariables() {
        if (this.incBuilder) {
            console.log(`Generating App variables.`);
        }
        return this.projectService.getAppVariables().then(variables => {
            this.setDeviceVariables(variables);
            Object.keys(variables).map((key) => {
                // @ts-ignore
                if (variables[key]["category"] === 'wm.LiveVariable') {
                    // @ts-ignore
                    this.liveVariables.push(variables[key]);
                }
            });
            const output = this.prepareVariables(variables, 'App', []);
            (0, utils_1.writeFile)(`${this.projectPath}/src/app.variables.js`, output);
        });
    }
    generateRNConfig() {
        if (this.incBuilder) {
            console.log(`Generating RN config.`);
        }
        return this.projectService.getRNConfig().then(data => {
            var _a;
            const config = JSON.parse(data);
            if (profile_1.default.generateWeb) {
                config.serverPath = '..';
            }
            else if ((_a = config.serverPath) === null || _a === void 0 ? void 0 : _a.startsWith('http://NOSERVERREQUIRED.com')) {
                config.serverPath = null;
            }
            if ((0, lodash_1.isUndefined)(config.preferences.enableLogs) && profile_1.default.targetPlatform === 'web') {
                config.preferences.enableLogs = true;
            }
            config.splash.animationSrc = config.splash.animationSrc ? config.splash.animationSrc : '';
            config.loader = config.loader ? config.loader : 'skeleton';
            (0, utils_1.writeFile)(`${this.projectPath}/wm_rn_config.json`, JSON.stringify(config, null, 4));
        });
    }
    generateAppConfig() {
        if (this.incBuilder) {
            console.log(`Generating App config.`);
        }
        let appConfig = fs_extra_1.default.readJsonSync(`${this.projectPath}/app.json`, { encoding: 'utf8' });
        this.projectService.getRNConfig().then(data => {
            const config = JSON.parse(data);
            if (config.splash.src) {
                appConfig['expo']['name'] = config.name;
                appConfig['expo']['slug'] = config.name;
                appConfig['expo']['version'] = config.version;
                appConfig['expo']['android']['package'] = config.id;
                appConfig['expo']['ios']['bundleIdentifier'] = config.id;
                appConfig['expo']['jsEngine'] = config.preferences.enableHermes ? 'hermes' : 'jsc';
                appConfig['expo']['icon'] = './assets/' + config.icon.src;
                appConfig["expo"]["splash"]["image"] = './assets/' + config.splash.src;
                appConfig['expo']['android']['adaptiveIcon']['foregroundImage'] = './assets/' + config.icon.src;
            }
        }).then(() => {
            return this.projectService.getAppJSON()
                .then(appConfigOverride => (0, lodash_1.merge)(appConfig, appConfigOverride));
        }).then(() => {
            (0, utils_1.writeFile)(`${this.projectPath}/app.json`, JSON.stringify(appConfig, null, 4));
        });
    }
    generateAppScript() {
        if (this.incBuilder) {
            console.log(`Generating App.js.`);
        }
        return this.projectService.getRNConfig().then(data => {
            var _a, _b, _c;
            const config = JSON.parse(data);
            const animatedSplash = (config.splash.animationSrc && profile_1.default.targetPlatform === 'native' && fs_extra_1.default.existsSync(this.projectPath + '/assets/' + config.splash.animationSrc));
            const sslPinning = profile_1.default.targetPlatform === 'web'
                || !((_a = config.sslPinning) === null || _a === void 0 ? void 0 : _a.enabled)
                || (0, lodash_1.isEmpty)((_b = config.sslPinning) === null || _b === void 0 ? void 0 : _b.domains) ? null : (_c = config.sslPinning) === null || _c === void 0 ? void 0 : _c.domains;
            sslPinning && Object.values(sslPinning).forEach((v) => {
                if (v.publicKeyHashes.length === 1) {
                    v.publicKeyHashes.push("NoBackUpKey" + v.publicKeyHashes[0].substring(11));
                }
            });
            return this.projectService.getAppVariables().then(variables => {
                return this.projectService.getAppJs().then(script => {
                    const output = APP_TEMPLATE({
                        script: script,
                        startUpVariables: Object.values(variables).filter((v) => (v.startUpdate || v.category === 'wm.Variable') && v.category !== 'wm.TimerVariable').map((v) => v.name),
                        startUpActions: Object.values(variables).filter((v) => v.startUpdate && v.category === 'wm.TimerVariable').map((v) => v.name),
                        autoUpdateVariables: Object.values(variables).filter((v) => v.autoUpdate || ((v.category === 'wm.Variable' || v.category === 'wm.LiveVariable') && v.dataBinding && v.dataBinding.length)).map((v) => v.name),
                        animatedSplash: animatedSplash,
                        sslPinning: sslPinning
                    });
                    (0, utils_1.writeFile)(`${this.projectPath}/App.js`, output);
                });
            });
        });
    }
    generatePageConfig(pageConfigs) {
        pageConfigs = pageConfigs.filter((p) => p.type == 'PAGE');
        const output = PAGE_CONFIG_TEMPLATE({
            pageConfigs: pageConfigs,
            pageConfigsStr: JSON.stringify(pageConfigs),
            lazyload: profile_1.default.lazyloadPages
        });
        (0, utils_1.writeFile)(`${this.projectPath}/src/pages/pages-config.js`, output);
    }
    generatePartialConfig(pageConfigs) {
        pageConfigs = pageConfigs.filter((p) => this.isPartial(p.type));
        const output = PAGE_CONFIG_TEMPLATE({
            pageConfigs: pageConfigs,
            pageConfigsStr: JSON.stringify(pageConfigs),
            lazyload: profile_1.default.lazyloadPartials
        });
        (0, utils_1.writeFile)(`${this.projectPath}/src/partials/partial-config.js`, output);
    }
    transformStyle(styles) {
        if (!styles) {
            return '{}';
        }
        const splitStr = '/*REACT_NATIVE_STYLES*/';
        const splitAt = styles.indexOf(splitStr);
        if (splitAt > 0) {
            styles = styles.substr(splitAt + splitStr.length);
        }
        return this.themeService.generateReactNativeStyles(styles);
    }
    generateDesignStyles(styles) {
        if (!styles) {
            return '';
        }
        return this.themeService.generateStudioStyles(styles);
    }
    generateComponent(info, type, name) {
        if (this.incBuilder && !this.incBuilder.isFragmentModified(name)) {
            return Promise.resolve();
        }
        if (this.incBuilder) {
            console.log(`Generating ${name} component.`);
        }
        const lType = type.toLowerCase();
        const typeLabel = (0, lodash_1.capitalize)(type);
        const variables = JSON.parse(info.variables);
        Object.keys(variables).map((key) => {
            if (variables[key]["category"] === 'wm.LiveVariable') {
                this.liveVariables.push(variables[key]);
            }
        });
        this.setDeviceVariables(variables);
        const dest = type === 'PREFAB' ? `${this.projectPath}/src/pages/${name}` : `${this.projectPath}/src/${lType}s/${name}`;
        try {
            const output = this.prepareVariables(variables, typeLabel, []);
            (0, utils_1.writeFile)(`${dest}/${name}.variables.js`, output);
            const transpiledOutput = (0, transpile_1.transpileMarkup)(info.markup, this.isPrefabApp);
            if (this.isPrefabApp) {
                transpiledOutput.imports.forEach(i => {
                    if (i.from.indexOf('/prefabs/') > 0) {
                        i.from = '../../../' + i.from;
                    }
                });
            }
            if (info.markup.includes('metadata')) {
                transpiledOutput.imports.push({ name: '{dynamicForm}', from: `${this.projectPath}/component/dynamic/form.generator` });
            }
            const imports = (0, lodash_1.sortBy)((0, lodash_1.uniqBy)(transpiledOutput.imports, i => i.name + i.from), i => i.name);
            const component = COMPONENT_TEMPLATE({
                name: name,
                type: type,
                lType: lType,
                typeLabel: typeLabel,
                dynamicPrefabProps: this.dynamicPrefabProps || {},
                prefabName: this.prefabName,
                markup: '\n' + transpiledOutput.markup,
                components: transpiledOutput.components,
                startUpVariables: Object.values(variables).filter((v) => v.startUpdate && v.category !== 'wm.TimerVariable').map((v) => v.name),
                startUpActions: Object.values(variables).filter((v) => v.startUpdate && v.category === 'wm.TimerVariable').map((v) => v.name),
                autoUpdateVariables: Object.values(variables).filter((v) => v.autoUpdate || ((v.category === 'wm.Variable' || v.category === 'wm.LiveVariable') && v.dataBinding && v.dataBinding.length)).map((v) => v.name),
                eagerImports: imports.filter(i => !i.lazy),
                lazyImports: imports.filter(i => i.lazy)
            });
            (0, utils_1.writeFile)(`${dest}/${name}.component.js`, component);
            const script = SCRIPT_TEMPLATE({
                typeLabel: typeLabel,
                script: info.script
            });
            (0, utils_1.writeFile)(`${dest}/${name}.script.js`, script);
            const styles = STYLE_TEMPLATE({
                styles: this.transformStyle(info.styles)
            });
            (0, utils_1.writeFile)(`${dest}/${name}.style.js`, styles);
            if (profile_1.default.targetPlatform === 'web') {
                this.savePageDesignStyles(this.generateDesignStyles(info.styles), name);
            }
            return Promise.all(transpiledOutput.prefabs.map(p => this.generatePrefabComponent(p, false)));
        }
        catch (e) {
            console.log(`failed to generate component ${dest}/${name}`);
            throw e;
        }
    }
    generatePrefabProps(name, projectPath) {
        const dynamicProps = {};
        return this.projectService.getPrefabInfo(name)
            .then(info => {
            const propConfig = {};
            Object.keys(info.config.properties).map((k) => {
                const value = info.config.properties[k].value;
                if ((0, lodash_1.isString)(value) && value.startsWith('bind:')) {
                    let exStr = decodeURIComponent(value.substring(5));
                    dynamicProps[k] = `this.eval(() => ${(0, bind_ex_transformer_1.default)(exStr, '_this', 'attr')})`;
                    propConfig[k] = null;
                }
                else {
                    propConfig[k] = value === undefined ? null : value;
                }
            });
            let propsStr = JSON.stringify(propConfig);
            if (info.config.events) {
                propsStr = propsStr.replace(/\}$/, '');
                Object.keys(info.config.events).map((k) => {
                    propsStr += `${propsStr.length === 1 ? '' : ','} ${k} : () => {}`;
                });
                propsStr += '}';
            }
            const props = COMPONENT_PROPS_TEMPLATE({
                props: propsStr
            });
            (0, utils_1.writeFile)(`${projectPath}/src/prefabs/${name}/src/pages/Main/Main.props.js`, props);
            return dynamicProps;
        });
    }
    generatePrefabComponent(name, overwrite = true) {
        var _a;
        if ((!overwrite && this.transpiledComponents.prefabs[name])
            || (this.incBuilder && !((_a = this.incBuilder) === null || _a === void 0 ? void 0 : _a.isPrefabModified(name)))) {
            return Promise.resolve();
        }
        if (this.incBuilder) {
            console.log(`Generating ${name} prefab component.`);
        }
        const projectPath = this.isPrefabApp ? this.projectPath.split('/src/prefabs/')[0] : this.projectPath;
        const appUrl = this.isPrefabApp ? this.appUrl.split('/app/prefabs/')[0] : this.appUrl;
        this.transpiledComponents.prefabs[name] = true;
        return this.generatePrefabProps(name, projectPath).then(dynamicPrefabProps => {
            const prefabGenerator = new AppGenerator(`${projectPath}/src/prefabs/${name}`, this.projectService.getPrefabProjectService(name), `${appUrl}/app/prefabs/${name}`, name, undefined, dynamicPrefabProps);
            return prefabGenerator.generatePagesAndPartials()
                .then(() => prefabGenerator.generateResourceResolver());
        });
    }
    generateAllPrefabComponents(overwrite) {
        return this.projectService.getPrefabs().then(prefabs => {
            return Promise.all(prefabs === null || prefabs === void 0 ? void 0 : prefabs.map(prefab => this.generatePrefabComponent(prefab, overwrite)));
        });
    }
    generatePageComponent(name, overwrite = true) {
        if (!overwrite && this.transpiledComponents.pages[name]) {
            return Promise.resolve();
        }
        this.transpiledComponents.pages[name] = true;
        return this.projectService.getPageInfo(name).then(info => {
            return this.generateComponent(info, this.isPrefabApp ? 'PREFAB' : 'PAGE', name);
        });
    }
    generatePartialComponent(name, overwrite = true) {
        if (!overwrite && this.transpiledComponents.partials[name]) {
            return Promise.resolve();
        }
        this.transpiledComponents.partials[name] = true;
        return this.projectService.getPageInfo(name).then(info => {
            return this.generateComponent(info, 'PARTIAL', name);
        });
    }
    generateServiceDefs() {
        return this.projectService.getServiceDefs().then(serviceDefs => {
            const output = SERVICE_DEFINITIONS({ serviceDefs: JSON.stringify(serviceDefs) });
            (0, utils_1.writeFile)(`${this.projectPath}/src/service-definitions.js`, output);
        });
    }
    generateBootstrapScript() {
        if (this.incBuilder) {
            console.log(`Generating bootstrap.js .`);
        }
        const config = fs_extra_1.default.readJsonSync(`${this.projectPath}/wm_rn_config.json`, {
            encoding: 'utf8'
        });
        let appUrl = this.appUrl;
        if (!(0, lodash_1.isEmpty)(config.serverPath) && config.serverPath !== '{{DEVELOPMENT_URL}}') {
            appUrl = config.serverPath;
        }
        if (appUrl.endsWith('/')) {
            appUrl = appUrl.substring(0, appUrl.length - 1);
        }
        const output = BOOTSTRAP_TEMPLATE({
            appUrl: appUrl,
            enableLogs: config.preferences.enableLogs,
            loader: config.loader || 'skeleton'
        });
        (0, utils_1.writeFile)(`${this.projectPath}/bootstrap.js`, output);
    }
    generateBabelConfig() {
        if (this.incBuilder) {
            console.log(`Generating babel config.`);
        }
        const config = fs_extra_1.default.readJsonSync(`${this.projectPath}/wm_rn_config.json`, {
            encoding: 'utf8'
        });
        const output = BABEL_CONFIG_TEMPLATE({
            enableLogs: config.preferences.enableLogs
        });
        (0, utils_1.writeFile)(`${this.projectPath}/babel.config.js`, output);
    }
    generateAppStyles() {
        if (this.incBuilder) {
            console.log(`Generating app.styles.js .`);
        }
        return this.projectService.getAppCss().then(response => {
            const styles = STYLE_TEMPLATE({
                styles: this.transformStyle(response)
            });
            (0, utils_1.writeFile)(`${this.projectPath}/app.style.js`, styles);
            if (profile_1.default.targetPlatform === 'web') {
                return this.saveAppDesignStyles(this.generateDesignStyles(response));
            }
        });
    }
    generateThemeVariables() {
        if (this.incBuilder) {
            console.log(`Generating Theme variables.`);
        }
        return this.projectService.getAppThemeVariables().then(response => {
            (0, utils_1.writeFile)(`${this.projectPath}/app.theme.variables.js`, response);
        }, () => { });
    }
    generateFormatters() {
        if (this.incBuilder) {
            console.log(`Generating formatters.`);
        }
        return this.projectService.getFormatters()
            .then((script) => {
            const code = FORMATTERS_TEMPLATE({
                script: script
            });
            (0, utils_1.writeFile)(`${this.projectPath}/src/extensions/formatters.js`, code);
        });
    }
    getAllResources(filter = (str) => true, dirPath = this.projectPath + '/assets/resources', pathPrefix = 'resources', arrayOfFiles = []) {
        if (fs_extra_1.default.existsSync(dirPath)) {
            fs_extra_1.default.readdirSync(dirPath).forEach((file) => {
                if (fs_extra_1.default.statSync(dirPath + "/" + file).isDirectory()) {
                    arrayOfFiles = this.getAllResources(filter, dirPath + "/" + file, pathPrefix + '/' + file, arrayOfFiles);
                }
                else if (filter(dirPath + "/" + file)) {
                    const ext = (0, lodash_1.last)(file.split('.'));
                    if (file.indexOf('@') < 0 && ALLOWED_RESOURCE_EXT.indexOf(ext || '') >= 0) {
                        arrayOfFiles.push(pathPrefix + "/" + file);
                    }
                }
            });
        }
        return arrayOfFiles;
    }
    generateFontConfig() {
        if (this.incBuilder) {
            console.log(`Generating Font config.`);
        }
        return this.projectService.getFontConfig().then(code => {
            (0, utils_1.writeFile)(`${this.projectPath}/font.config.js`, code);
        }).catch(() => { });
    }
    generateResourceResolver() {
        if (this.incBuilder) {
            console.log(`Copying Resources.`);
        }
        return this.projectService.getResources().then(src => {
            if (src) {
                fs_extra_1.default.copySync(src, this.projectPath + '/assets/resources', {
                    filter: (src) => {
                        return (!(profile_1.default.targetPlatform === 'web'
                            && src.endsWith('.native.js'))
                            && !(profile_1.default.targetPlatform === 'native'
                                && src.endsWith('.web.js'))
                            && (profile_1.default.copyResources
                                || src.endsWith('.js')
                                || src.indexOf('resources/icons/') >= 0
                                || fs_extra_1.default.lstatSync(src).isDirectory()));
                    }
                });
            }
        }).then(() => {
            const resources = profile_1.default.copyResources ? this.getAllResources() : this.getAllResources((src) => src.endsWith('.js'));
            const content = RESOURCE_RESOLVER_TEMPLATE({
                resources: resources,
                path: '../../assets/'
            });
            (0, utils_1.writeFile)(`${this.projectPath}/src/resolve/resource.resolver.js`, content);
        });
    }
    generateLocaleResolver() {
        if (this.incBuilder) {
            console.log(`Generating Locale resolver.`);
        }
        return Promise.resolve().then(() => {
            const resources = profile_1.default.useLocalMetadata ? this.getAllResources(() => true, this.projectPath + '/i18n', 'i18n') : [];
            const content = RESOURCE_RESOLVER_TEMPLATE({
                resources: resources,
                path: '../../'
            });
            (0, utils_1.writeFile)(`${this.projectPath}/src/resolve/locale.resolver.js`, content);
        });
    }
    copyi18nFiles() {
        if (profile_1.default.useLocalMetadata) {
            if (this.incBuilder) {
                console.log(`Copying i18n files.`);
            }
            return this.projectService.geti18NFiles().then(p => {
                if (p) {
                    fs_extra_1.default.copySync(p, this.projectPath + '/i18n');
                }
            });
        }
        return Promise.resolve();
    }
    generatePagesAndPartials() {
        let pageConfigs = null;
        return this.projectService.getPageConfigs().then(_pageConfigs => {
            pageConfigs = _pageConfigs;
            const pageCreationPromises = pageConfigs.map(p => {
                if (p.type === 'PAGE') {
                    return this.generatePageComponent(p.name);
                }
                if (this.isPartial(p.type)) {
                    return this.generatePartialComponent(p.name);
                }
            });
            return Promise.all(pageCreationPromises);
        })
            .then(() => this.generatePageConfig(pageConfigs))
            .then(() => this.generatePartialConfig(pageConfigs));
    }
    async mergePackageJson() {
        if (this.incBuilder) {
            console.log(`Merging package.json .`);
        }
        let packageToOveride = fs_extra_1.default.readJSONSync(`${this.projectPath}/package.json`, { encoding: 'utf-8' });
        if (profile_1.default.targetPlatform === 'web') {
            const webPackageJson = fs_extra_1.default.readJSONSync(`${__dirname}/templates/package.web.json`, { encoding: 'utf-8' });
            packageToOveride = (0, lodash_1.merge)(packageToOveride, webPackageJson);
        }
        const packageOverride = await this.projectService.getPackageJSONOverride();
        if (packageOverride) {
            const packageOverriden = (0, lodash_1.merge)(packageToOveride, packageOverride);
            fs_extra_1.default.writeFileSync(`${this.projectPath}/package.json`, JSON.stringify(packageOverriden, null, 4));
        }
    }
    async addCustomPluginsToPackageJson() {
        var _a;
        if (this.incBuilder) {
            console.log(`Adding custom plugins.`);
        }
        await this.projectService.getExpoPlugins().then(src => {
            if (src) {
                fs_extra_1.default.mkdirsSync(`${this.projectPath}/expo-plugins`);
                fs_extra_1.default.copySync(src, this.projectPath + '/expo-plugins');
            }
        });
        const config = fs_extra_1.default.readJsonSync(`${this.projectPath}/wm_rn_config.json`, {
            encoding: 'utf8'
        });
        let plugins = config.plugins;
        let data = fs_extra_1.default.readFileSync(`${this.projectPath}/package.json`, 'utf-8');
        const jsonData = JSON.parse(data);
        if (Object.keys(this.transpiledComponents.prefabs).length > 0) {
            (_a = Object.keys(this.transpiledComponents.prefabs)) === null || _a === void 0 ? void 0 : _a.map(async (prefab) => {
                await this.projectService.getPrefabInfo(prefab).then(info => {
                    var _a;
                    (_a = info.config["resources"]["scripts"]) === null || _a === void 0 ? void 0 : _a.map((script) => {
                        if (script.includes('npm://')) {
                            if (jsonData['dependencies'][script.match(/[\/]+(.*?)@\d/)[1]] && semver_1.default.lt(jsonData['dependencies'][script.match(/[\/]+(.*?)@\d/)[1]], script.match('.*@(.*?)$')[1])) {
                                console.log("adding new version " + script.match('.*@(.*?)$')[1] + "for script.match(/[\/]+(.*?)@\d/)![1] dependency");
                                jsonData['dependencies'][script.match(/[\/]+(.*?)@\d/)[1]] = script.match('.*@(.*?)$')[1];
                            }
                            else {
                                jsonData['dependencies'][script.match(/[\/]+(.*?)@\d/)[1]] = script.match('.*@(.*?)$')[1];
                            }
                        }
                    });
                });
                plugins.forEach((p) => {
                    if (p.spec) {
                        if (p.spec.includes('tgz')) {
                            jsonData['dependencies'][p.name] = 'file:' + p.spec;
                        }
                        else if (semver_1.default.valid(p.spec) && !semver_1.default.lt(p.spec, jsonData['dependencies'][p.name] || '0.0.0')) {
                            jsonData['dependencies'][p.name] = p.spec;
                        }
                        else if (!semver_1.default.valid(p.spec)) {
                            jsonData['dependencies'][p.name] = p.spec;
                        }
                    }
                });
                fs_extra_1.default.writeFileSync(`${this.projectPath}/package.json`, JSON.stringify(jsonData, null, 4));
            });
        }
        else {
            plugins.forEach((p) => {
                if (p.spec) {
                    if (p.spec.includes('tgz')) {
                        jsonData['dependencies'][p.name] = 'file:' + p.spec;
                    }
                    else if (semver_1.default.valid(p.spec) && !semver_1.default.lt(p.spec, jsonData['dependencies'][p.name] || '0.0.0')) {
                        jsonData['dependencies'][p.name] = p.spec;
                    }
                    else if (!semver_1.default.valid(p.spec)) {
                        jsonData['dependencies'][p.name] = p.spec;
                    }
                }
            });
            fs_extra_1.default.writeFileSync(`${this.projectPath}/package.json`, JSON.stringify(jsonData, null, 4));
        }
    }
    async generateAppTheme() {
        if (this.isPrefabApp) {
            return Promise.resolve();
        }
        if (this.incBuilder) {
            console.log(`Generating App theme.`);
        }
        return this.projectService.getThemes().then(themes => {
            return themes.map(t => {
                const themeName = (0, lodash_1.last)(t.split('/'));
                fs_extra_1.default.copySync(t, this.projectPath + '/theme/' + themeName);
                return themeName;
            });
        }).then(themes => {
            themes.map(t => [
                `${this.projectPath}/theme/${t}/android/assets`,
                `${this.projectPath}/theme/${t}/ios/assets`
            ]).flat().map(p => {
                const resources = this.getAllResources((str) => true, p, 'theme/assets');
                const content = THEME_ASSET_RESOLVER_TEMPLATE({
                    resources: resources,
                    path: '____'
                });
                (0, utils_1.writeFile)(`${p}/../asset.resolver.js`, content.replace(/\_\_\_\_theme\//g, './'));
            });
            return themes;
        }).then(themes => {
            const output = APP_THEME_TEMPLATE({
                themes: themes
            });
            (0, utils_1.writeFile)(`${this.projectPath}/app.theme.js`, output);
        });
    }
    generateEntityMetadata() {
        if (this.incBuilder) {
            console.log(`Generating Entity data.`);
        }
        const liveSources = {};
        this.liveVariables.forEach((lv) => {
            const liveSource = lv.liveSource;
            const entityName = lv.type;
            if (!liveSources[liveSource]) {
                liveSources[liveSource] = {};
            }
            if (!liveSources[liveSource][entityName]) {
                liveSources[liveSource][entityName] = {
                    "propertiesMap": lv.propertiesMap,
                    "relatedTables": lv.relatedTables
                };
            }
        });
        Object.keys(liveSources).forEach((liveSource) => {
            (0, utils_1.writeFile)(`${this.projectPath}/metadata/entities/${liveSource}.json`, JSON.stringify(liveSources[liveSource], null, 4));
        });
        const output = ENTITY_PROVIDER_TEMPLATE({
            liveSources: Object.keys(liveSources)
        });
        (0, utils_1.writeFile)(`${this.projectPath}/metadata/entities/entity-provider.js`, output);
    }
    generateFonts() {
        return this.projectService.getFontConfig().then((code) => {
            var _a;
            const fontConfigUrl = `${this.projectPath}/font.config.js`;
            code = code.replace('export default', 'module.exports = ');
            (0, utils_1.writeFile)(fontConfigUrl, code);
            return (_a = fontConfigUrl, Promise.resolve().then(() => __importStar(require(_a)))).then((fontConfig) => {
                return Promise.all(fontConfig.default.fonts.map((font) => {
                    if (font.csspath) {
                        return this.themeService.getIconFontScripts(path_2.default.join(this.projectPath, '/assets/', font.csspath));
                    }
                    return;
                }));
            });
        }).then(() => this.generateResourceResolver());
    }
    generateApp() {
        this.incBuilder || fs_extra_1.default.copySync(__dirname + '/templates/project', this.projectPath);
        return this.generatePagesAndPartials()
            .then(() => this.incBuilder && this.generateAllPrefabComponents())
            .then(() => !this.incBuilder || this.incBuilder.isResourceModified())
            .then((build) => (build && this.generateResourceResolver()))
            .then(() => !this.incBuilder || this.incBuilder.isConfigModified())
            .then((build) => (build && this.generateAppConfig()))
            .then(() => !this.incBuilder || this.incBuilder.isAppScriptModified())
            .then((build) => (build && this.generateAppScript()))
            .then(() => !this.incBuilder || this.incBuilder.isAppStyleModified())
            .then((build) => (build && this.generateAppStyles()))
            .then(() => !this.incBuilder || this.incBuilder.isThemeVariablesModified())
            .then((build) => (build && this.generateThemeVariables()))
            .then(() => !this.incBuilder || this.incBuilder.isAppVariablesModified())
            .then((build) => (build && this.generateAppVariables()))
            .then(() => !this.incBuilder || this.incBuilder.isEntityModified())
            .then((build) => (build && this.generateEntityMetadata()))
            .then(() => !this.incBuilder || this.incBuilder.isFontConfigModified())
            .then((build) => (build && this.generateFontConfig()))
            .then(() => !this.incBuilder || this.incBuilder.isFontConfigModified())
            .then((build) => (build && this.generateFonts()))
            .then(() => !this.incBuilder || this.incBuilder.isConfigModified())
            .then((build) => (build && this.generateRNConfig()))
            .then(() => !this.incBuilder || this.incBuilder.isFormatterModified())
            .then((build) => (build && this.generateFormatters()))
            .then(() => !this.incBuilder || this.incBuilder.isConfigModified())
            .then((build) => (build && this.generateBootstrapScript()))
            .then(() => !this.incBuilder || this.incBuilder.isConfigModified())
            .then((build) => (build && this.generateBabelConfig()))
            .then(() => !this.incBuilder || this.incBuilder.isThemeModified())
            .then((build) => (build && this.generateAppTheme()))
            .then(() => !this.incBuilder || this.incBuilder.isi18nModified())
            .then((build) => (build && this.copyi18nFiles()))
            .then(() => !this.incBuilder || this.incBuilder.isi18nModified())
            .then((build) => (build && this.generateLocaleResolver()))
            .then(() => !this.incBuilder)
            .then((build) => (build && this.prepareDeviceOperationLoader()))
            .then(() => !this.incBuilder || this.incBuilder.isConfigModified())
            .then((build) => (build && this.addCustomPluginsToPackageJson()))
            .then(() => !this.incBuilder)
            .then((build) => (build && this.prettify()))
            .then(() => this.mergePackageJson())
            .then(() => this.projectService.copyNpmPackages(this.projectPath))
            .then(() => console.log('code generated at ' + this.projectPath));
    }
    generateFragment(name) {
        let pageConfigs = null;
        return this.projectService.getPageConfigs().then(_pageConfigs => {
            pageConfigs = _pageConfigs;
            const info = pageConfigs.find((config) => config.name === name);
            if (info) {
                if (info.type === 'PAGE') {
                    return this.generatePageComponent(info.name);
                }
                if (this.isPartial(info.type)) {
                    return this.generatePartialComponent(name);
                }
            }
        })
            .then(() => this.generatePageConfig(pageConfigs))
            .then(() => this.generatePartialConfig(pageConfigs))
            .then(() => this.prettify(`**/${name}/**/*.js`))
            .then(() => console.log('code generated at ' + this.projectPath));
    }
    ;
}
exports.default = AppGenerator;
//# sourceMappingURL=app.generator.js.map