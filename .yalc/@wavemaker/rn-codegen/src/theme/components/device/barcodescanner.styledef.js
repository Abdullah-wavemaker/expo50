"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-barcodescanner',
            rnStyleSelector: 'app-barcodescanner.button.root',
            studioStyleSelector: '.app-barcode',
            style: {
                'background-color': '@barcodeScannerBgColor',
                'border-color': '@barcodeScannerBorderColor'
            }
        }, {
            className: '.app-barcodescanner-text',
            rnStyleSelector: 'app-barcodescanner.button.text',
            studioStyleSelector: '.app-barcode .btn-caption',
            style: {
                'color': '@barcodeScannerTextColor'
            }
        }, {
            className: '.app-barcodescanner-icon',
            rnStyleSelector: 'app-barcodescanner.button.icon.icon',
            studioStyleSelector: '.app-barcode',
            style: {
                'color': '@barcodeScannerTextColor'
            }
        }])
};
//# sourceMappingURL=barcodescanner.styledef.js.map