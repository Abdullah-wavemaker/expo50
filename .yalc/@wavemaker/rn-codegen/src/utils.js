"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inferTypeAndParseProperty = exports.readAndReplaceFileContent = exports.findNodeModules = exports.readdir = exports.writeFile = exports.loadTemplate = exports.fromUnicode = void 0;
//const fs_extra_1 = __importDefault(require("fs-extra"));
const handlebars_1 = __importDefault(require("handlebars"));
const profile_1 = __importDefault(require("./profiles/profile"));
const fromUnicode = (str) => JSON.parse('"' + str.replace(/\"/g, '\\"') + '"');
exports.fromUnicode = fromUnicode;
const loadTemplate = (templatePath) => {
    const template = fs_extra_1.default.readFileSync(templatePath, 'utf8');
    const fn = handlebars_1.default.compile(template);
    return (data) => fn({ profile: profile_1.default, ...data });
};
exports.loadTemplate = loadTemplate;
const writeFile = (path, content) => {
    const parent = path.substring(0, path.lastIndexOf('/'));
    if (!fs_extra_1.default.existsSync(parent)) {
        fs_extra_1.default.mkdirpSync(parent);
    }
    if (profile_1.default.targetPlatform === 'native' && (path.endsWith('js') || path.endsWith('jsx'))) {
        content = content.replace(/debugger/ig, '//debugger');
    }
    fs_extra_1.default.writeFileSync(path, content);
};
exports.writeFile = writeFile;
const readdir = (path, opts = { recursive: false }, callback = (f) => ({})) => {
    fs_extra_1.default.readdirSync(path).forEach(name => {
        const child = `${path}/${name}`;
        if (fs_extra_1.default.statSync(child).isDirectory() && opts.recursive) {
            (0, exports.readdir)(child, opts, callback);
        }
        else {
            callback(child);
        }
    });
};
exports.readdir = readdir;
const findNodeModules = (path) => {
    if (fs_extra_1.default.existsSync(`${path}/node_modules`)) {
        return `${path}/node_modules`;
    }
    else {
        const splits = path.split('/');
        splits.pop();
        if (splits.length) {
            return (0, exports.findNodeModules)(splits.join('/'));
        }
    }
    return '';
};
exports.findNodeModules = findNodeModules;
const readAndReplaceFileContent = async function (path, writeFn) {
    if (!fs_extra_1.default.existsSync(path)) {
        return Promise.resolve();
    }
    const content = fs_extra_1.default.readFileSync(path, 'utf-8');
    return Promise.resolve().then(() => {
        return writeFn && writeFn(content);
    }).then((modifiedContent) => {
        if (modifiedContent !== undefined && modifiedContent !== null) {
            fs_extra_1.default.writeFileSync(path, modifiedContent);
            return modifiedContent;
        }
        return content;
    });
};
exports.readAndReplaceFileContent = readAndReplaceFileContent;
const inferTypeAndParseProperty = (name, valWithQuotes) => {
    let val = valWithQuotes.startsWith('"') ? valWithQuotes.substring(1) : valWithQuotes;
    val = val.endsWith('"') ? val.substring(0, val.length - 1) : val;
    try {
        if (val === 'true') {
            return '{true}';
        }
        else if (val === 'false') {
            return '{false}';
        }
        return /^-?[0-9]*(.[0-9]*)$/.test(val) ? `{${parseFloat(val)}}` : valWithQuotes;
    }
    catch (e) {
        return valWithQuotes;
    }
};
exports.inferTypeAndParseProperty = inferTypeAndParseProperty;
//# sourceMappingURL=utils.js.map