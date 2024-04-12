#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const helpers_1 = require("yargs/helpers");
const theme_service_1 = require("./src/theme/theme.service");
const command_1 = require("./command");
const handlebar_helpers_1 = __importDefault(require("./src/handlebar-helpers"));
const getBuildCmd = (dest, onlyLocal = false) => {
    if (!onlyLocal) {
        return Promise.resolve((args) => {
            return (0, command_1.buildCmd)(args)
                // try local build if exists
                .then(() => getBuildCmd(dest, true))
                .then(buildCmd => buildCmd({ ...args, autoClean: false }));
        });
    }
    else {
        return Promise.resolve(() => { });
    }
};
const updateThemeArtifacts = (artifactsPath) => {
    const themeService = new theme_service_1.ThemeService();
    const themeParentFolder = `${artifactsPath}/default/themes`;
    const themesInfo = fs_extra_1.default.readdirSync(themeParentFolder, {
        withFileTypes: true
    }).filter(info => {
        const p = `${themeParentFolder}/${info.name}`;
        if (info.isDirectory()) {
            const text = fs_extra_1.default.readFileSync(`${p}/.wmproject.properties`, 'utf-8');
            return text.indexOf('NATIVE_MOBILE') > 0;
        }
        return false;
    }).map(info => ({
        path: `${themeParentFolder}/${info.name}`,
        name: info.name
    }));
    return Promise.all(themesInfo.map(themeInfo => {
        const path = themeInfo.path;
        const theme = themeInfo.name;
        return themeService.update(path)
            .then(() => console.log(`${theme} updated`))
            .then(() => themeService.compile(path))
            .then(() => {
            console.log(`${theme} compiled`);
            fs_extra_1.default.removeSync(`${path}/build`);
            if (fs_extra_1.default.existsSync(`${path}/artifact`)) {
                fs_extra_1.default.removeSync(`${path}/artifact`);
            }
            fs_extra_1.default.moveSync(`${path}/dist`, `${path}/artifact`);
            console.log(`${theme} created`);
        });
    })).then(() => {
        console.log(`Themes at ${artifactsPath} are updated.`);
    });
};
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .command('transpile <src> <dest>', 'to create a react native project out of WaveMaker project', (yargs) => {
    yargs.positional('src', {
        describe: 'url of the project src',
        type: 'string',
        normalize: false,
        coerce: (path) => path_1.default.resolve(path)
    }).positional('dest', {
        describe: 'location at which the project',
        type: 'string',
        normalize: true,
        coerce: (path) => path_1.default.resolve(path)
    }).options({
        profile: {
            describe: "code generation profile ",
            type: 'string',
            choices: ['default', 'development', 'web-preview', 'expo-preview', 'expo-web-preview', 'skip-build'],
            alias: 'p',
            default: 'default'
        },
        autoClean: {
            describe: "Clean the dest folder, if required.",
            type: "boolean",
            default: true
        },
        page: {
            describe: "Genrates only the given page or partail and prefabs included in those pages.",
            type: "string"
        },
        incrementalBuild: {
            describe: "Transpile only the modified content since last build.",
            type: "boolean",
            default: true
        },
    });
}, (argv) => {
    console.time('transpile');
    return getBuildCmd(argv.dest)
        .then(buildCmd => buildCmd(argv))
        .then(() => {
        console.timeEnd('transpile');
    });
})
    .command('theme', 'Theme commands', (yargs) => {
    const themeService = new theme_service_1.ThemeService();
    (0, handlebar_helpers_1.default)();
    yargs.command('generate <name> [path]', 'to generate theme', (yargs) => {
        yargs.positional('name', {
            describe: 'name of the theme',
            type: 'string'
        }).positional('path', {
            describe: 'Folder at which the theme has to be created.',
            type: 'string',
            default: '.',
            normalize: true,
            coerce: (path) => path_1.default.resolve(path)
        });
    }, (argv) => {
        return themeService.generate(argv.name, argv.path).then(() => {
            console.log(`${argv.name} theme is generated at ${argv.path}.`);
        });
    }).command('compile [path]', 'to compile theme', (yargs) => {
        yargs.positional('path', {
            describe: 'path of theme project',
            type: 'string',
            default: '.',
            normalize: true,
            coerce: (path) => path_1.default.resolve(path)
        }).option('updatePlatform', {
            describe: 'path of theme project',
            type: 'string',
            default: false,
            normalize: true
        });
    }, (argv) => {
        return Promise.resolve().then(() => {
            if (argv.updatePlatform) {
                return themeService.update(argv.path);
            }
        }).then(() => themeService.compile(argv.path))
            .then(() => themeService.zipTheme(argv.path))
            .then(() => console.log('Theme compiled successfully.'));
    }).command('update [path]', 'to update wavemaker theme', (yargs) => {
        yargs.positional('path', {
            describe: 'path of theme project',
            type: 'string',
            default: '.',
            normalize: true,
            coerce: (path) => path_1.default.resolve(path)
        });
    }, (argv) => {
        return themeService.update(argv.path).then(() => {
            console.log('Theme updated successfully.');
        });
    }).command('update-artifacts [path]', 'to update themes in artifacts.', (yargs) => {
        yargs.positional('path', {
            describe: 'path to the folder in which themes are found',
            type: 'string',
            default: __dirname + '/../../wavemaker-artifacts',
            normalize: true
        });
    }, (argv) => updateThemeArtifacts(argv.path));
})
    .showHelpOnFail(false)
    .argv;
//# sourceMappingURL=index.js.map