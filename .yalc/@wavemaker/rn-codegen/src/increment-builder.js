"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncrementalBuilder = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
class IncrementalBuilder {
    constructor(projectSrc, lastBuildTime) {
        this.projectSrc = projectSrc;
        this.modifiledFiles = [];
        this.modifiledFiles = this.scanForModifiedSourceFiles(projectSrc, lastBuildTime);
        console.log('Files Modified:');
        console.log(this.modifiledFiles.join('\n'));
    }
    scanForModifiedSourceFiles(path, after) {
        const lstat = fs_extra_1.default.lstatSync(path);
        const result = [];
        if (lstat.isDirectory()) {
            fs_extra_1.default.readdirSync(path)
                .forEach(f => result.push(...this.scanForModifiedSourceFiles(`${path}/${f}`, after)));
        }
        else if (lstat.mtime.getTime() > after) {
            result.push(path);
        }
        return result;
    }
    isModified(path) {
        return !!this.modifiledFiles.find(p => p.startsWith(path));
    }
    isFragmentModified(name) {
        return this.isModified(`${this.projectSrc}/pages/${name}/`);
    }
    isPrefabModified(name) {
        return this.isModified(`${this.projectSrc}/WEB-INF/prefabs/${name}/`);
    }
    isResourceModified() {
        return this.isModified(`${this.projectSrc}/resources/`);
    }
    isThemeModified() {
        return this.isModified(`${this.projectSrc}/themes/`);
    }
    isConfigModified() {
        return this.isModified(`${this.projectSrc}/wm_rn_config.js`)
            || this.isModified(`${this.projectSrc}/App.json`);
    }
    isPackageJSONModified() {
        return this.isModified(`${this.projectSrc}/package.json`);
    }
    isAppScriptModified() {
        return this.isConfigModified()
            || this.isModified(`${this.projectSrc}/app.js`)
            || this.isModified(`${this.projectSrc}/app.variables.js`);
    }
    isAppStyleModified() {
        return this.isModified(`${this.projectSrc}/app.css`);
    }
    isThemeVariablesModified() {
        return this.isModified(`${this.projectSrc}/theme.variables.js`);
    }
    isAppVariablesModified() {
        return this.isModified(`${this.projectSrc}/app.variables.json`);
    }
    isEntityModified() {
        return this.isModified(`${this.projectSrc}/metadata/entities/`);
    }
    isFontConfigModified() {
        return this.isModified(`${this.projectSrc}/font.config.js`);
    }
    isFormatterModified() {
        return this.isModified(`${this.projectSrc}/extensions`);
    }
    isi18nModified() {
        return this.isModified(`${this.projectSrc}/resources/i18n`);
    }
}
exports.IncrementalBuilder = IncrementalBuilder;
//# sourceMappingURL=increment-builder.js.map