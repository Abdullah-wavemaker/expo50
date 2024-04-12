"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const rn_stylesheet_transpiler_1 = require("../../src/theme/rn-stylesheet.transpiler");
const instance = new rn_stylesheet_transpiler_1.RnStylesheetTranspiler();
(0, globals_1.describe)('Check design style generation', () => {
    const prefix = '.wm-studio .wm-right-panel-container .file-container-pane .wm-file-container .wm-workspace .workspace-content .canvas-panel ';
    (0, globals_1.test)('basic style', () => {
        const input = `
            .app-linearlayout {
                margin-top: 8px;
                padding: 6px;
            }
        `;
        const output = instance.toDesignStyles(input);
        (0, globals_1.expect)(output).toEqual(prefix + ' .app-linear-layout{margin-top:8px;padding:6px;}');
    });
    (0, globals_1.test)('class selector style', () => {
        const input = `
            .mylayout.app-linearlayout {
                margin-top: 8px
            }
        `;
        const output = instance.toDesignStyles(input);
        (0, globals_1.expect)(output).toEqual(prefix + ' .mylayout.app-linear-layout{margin-top:8px;}');
    });
    (0, globals_1.test)('inner child style', () => {
        const input = `
            .mybtn.app-button-icon.app-icon-text {
                margin-top: 10px
            }
        `;
        const output = instance.toDesignStyles(input);
        (0, globals_1.expect)(output).toEqual(prefix + ' .mybtn.app-button .app-icon+.app-label{margin-top:10px;}');
    });
    (0, globals_1.test)('multi selector', () => {
        const input = `
        .mybtn.app-button-icon.app-icon-shape,
        .mybtn.app-button-icon.app-icon-text {
                margin-top: 13px
            }
        `;
        const output = instance.toDesignStyles(input);
        (0, globals_1.expect)(output).toEqual(prefix + ' .mybtn.app-button .app-icon,'
            + prefix + ' .mybtn.app-button .app-icon+.app-label{margin-top:13px;}');
    });
    (0, globals_1.test)('prefab style', () => {
        const input = `
            .my-prefab.app-prefab.mybtn.app-button-icon.app-icon-shape {
                margin-top: 11px
            }
        `;
        const output = instance.toDesignStyles(input);
        (0, globals_1.expect)(output).toEqual(prefix + ' .my-prefab.app-prefab .mybtn.app-button .app-icon{margin-top:11px;}');
    });
    (0, globals_1.test)('partial style', () => {
        const input = `
            .my-partial.app-partial.mybtn.app-button-icon.app-icon-shape {
                margin-top: 12px
            }
        `;
        const output = instance.toDesignStyles(input);
        (0, globals_1.expect)(output).toEqual(prefix + ' .my-partial.app-partial .mybtn.app-button .app-icon{margin-top:12px;}');
    });
});
(0, globals_1.describe)('Check react native style generation', () => {
    (0, globals_1.test)('basic style', () => {
        const input = `
            .app-label {
                margin-top: 8px
            }
        `;
        const output = instance.toReactNativeStyles(input);
        (0, globals_1.expect)(output['app-label'].root.marginTop).toEqual(8);
    });
    (0, globals_1.test)('class selector style', () => {
        const input = `
            .title.app-label {
                margin-top: 8px
            }
        `;
        const output = instance.toReactNativeStyles(input);
        (0, globals_1.expect)(output.title.root.marginTop).toEqual(8);
    });
    (0, globals_1.test)('inner child style', () => {
        const input = `
            .mybtn.app-button-icon.app-icon-text {
                margin-top: 10px
            }
        `;
        const output = instance.toReactNativeStyles(input);
        (0, globals_1.expect)(output.mybtn.icon.text.marginTop).toEqual(10);
    });
    (0, globals_1.test)('multi selector', () => {
        const input = `
        .success-container .app-container,
        .danger-container .app-container {   
            width: 100%;
            height: 40px;
            margin: 4px 0;
        }
        .success-container .app-container {
            background-color: #00ff00;
        }
        .danger-container .app-container { 
            background-color: #ff0000;
        }
        `;
        const output = instance.toReactNativeStyles(input);
        (0, globals_1.expect)(output['success-container'].root.marginTop).toEqual(4);
        (0, globals_1.expect)(output['danger-container'].root.marginTop).toEqual(4);
        (0, globals_1.expect)(output['success-container'].root.backgroundColor).toEqual('#00ff00');
        (0, globals_1.expect)(output['danger-container'].root.backgroundColor).toEqual('#ff0000');
    });
    (0, globals_1.test)('prefab style', () => {
        const input = `
            .my-prefab.app-prefab.mybtn.app-button-icon.app-icon-shape {
                margin-top: 11px
            }
        `;
        const output = instance.toReactNativeStyles(input);
        (0, globals_1.expect)(output['my-prefab']['mybtn'].icon.icon.marginTop).toEqual(11);
    });
    (0, globals_1.test)('partial style', () => {
        const input = `
            .my-partial.app-partial.mybtn.app-button-icon.app-icon-shape {
                margin-top: 12px
            }
        `;
        const output = instance.toReactNativeStyles(input);
        (0, globals_1.expect)(output['my-partial']['mybtn'].icon.icon.marginTop).toEqual(12);
    });
});
(0, globals_1.describe)('Style Play ground', () => {
    (0, globals_1.test)('test', () => {
        const input = `
        
        `;
        const output = instance.toReactNativeStyles(input);
        console.log(output);
    });
});
//# sourceMappingURL=rn-stylesheet.transpiler.test.js.map