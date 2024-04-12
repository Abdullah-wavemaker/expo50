"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-camera',
            rnStyleSelector: 'app-camera.button.root',
            studioStyleSelector: '.app-camera',
            style: {
                'background-color': '@cameraBgColor',
                'border-color': '@cameraBorderColor'
            }
        }, {
            className: '.app-camera-text',
            rnStyleSelector: 'app-camera.button.text',
            studioStyleSelector: '.app-camera .btn-caption',
            style: {
                'color': '@cameraTextColor'
            }
        }, {
            className: '.app-camera-icon',
            rnStyleSelector: 'app-camera.button.icon.icon',
            studioStyleSelector: '.app-camera',
            style: {
                'color': '@cameraTextColor'
            }
        }])
};
//# sourceMappingURL=camera.styledef.js.map