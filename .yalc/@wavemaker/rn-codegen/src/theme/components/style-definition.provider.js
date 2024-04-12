"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRNSelector = exports.getStudioSelector = exports.getAllCSSSelectorMeta = exports.StyleDefinitions = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const utils_1 = require("../../utils");
const carousel_content_styledef_1 = __importDefault(require("./advanced/carousel/carousel-content.styledef"));
const carousel_template_styledef_1 = __importDefault(require("./advanced/carousel/carousel-template.styledef"));
const carousel_styledef_1 = __importDefault(require("./advanced/carousel.styledef"));
const login_styledef_1 = __importDefault(require("./advanced/login.styledef"));
const webview_styledef_1 = __importDefault(require("./advanced/webview.styledef"));
const anchor_styledef_1 = __importDefault(require("./basic/anchor.styledef"));
const button_styledef_1 = __importDefault(require("./basic/button.styledef"));
const buttongroup_styledef_1 = __importDefault(require("./basic/buttongroup.styledef"));
const icon_styledef_1 = __importDefault(require("./basic/icon.styledef"));
const label_styledef_1 = __importDefault(require("./basic/label.styledef"));
const message_styledef_1 = __importDefault(require("./basic/message.styledef"));
const modal_styledef_1 = __importDefault(require("./basic/modal.styledef"));
const picture_styledef_1 = __importDefault(require("./basic/picture.styledef"));
const progress_bar_styledef_1 = __importDefault(require("./basic/progress-bar.styledef"));
const progress_circle_styledef_1 = __importDefault(require("./basic/progress-circle.styledef"));
const search_styledef_1 = __importDefault(require("./basic/search.styledef"));
const spinner_styledef_1 = __importDefault(require("./basic/spinner.styledef"));
const accordionpane_styledef_1 = __importDefault(require("./container/accordion/accordionpane.styledef"));
const accordion_styledef_1 = __importDefault(require("./container/accordion.styledef"));
const gridcolumn_styledef_1 = __importDefault(require("./container/layoutgrid/gridcolumn.styledef"));
const gridrow_styledef_1 = __importDefault(require("./container/layoutgrid/gridrow.styledef"));
const layoutgrid_styledef_1 = __importDefault(require("./container/layoutgrid.styledef"));
const linearlayoutitem_styledef_1 = __importDefault(require("./container/linearlayout/linearlayoutitem.styledef"));
const linearlayout_styledef_1 = __importDefault(require("./container/linearlayout.styledef"));
const panel_content_styledef_1 = __importDefault(require("./container/panel/panel-content.styledef"));
const panel_footer_styledef_1 = __importDefault(require("./container/panel/panel-footer.styledef"));
const panel_styledef_1 = __importDefault(require("./container/panel.styledef"));
const tabpane_styledef_1 = __importDefault(require("./container/tabs/tabpane.styledef"));
const tabs_styledef_1 = __importDefault(require("./container/tabs.styledef"));
const tile_styledef_1 = __importDefault(require("./container/tile.styledef"));
const wizardstep_styledef_1 = __importDefault(require("./container/wizard/wizardstep.styledef"));
const wizard_styledef_1 = __importDefault(require("./container/wizard.styledef"));
const container_styledef_1 = __importDefault(require("./container.styledef"));
const card_content_styledef_1 = __importDefault(require("./data/card/card-content.styledef"));
const card_footer_styledef_1 = __importDefault(require("./data/card/card-footer.styledef"));
const card_styledef_1 = __importDefault(require("./data/card.styledef"));
const form_body_styledef_1 = __importDefault(require("./data/form/form-body.styledef"));
const form_field_styledef_1 = __importDefault(require("./data/form/form-field.styledef"));
const form_footer_styledef_1 = __importDefault(require("./data/form/form-footer.styledef"));
const form_styledef_1 = __importDefault(require("./data/form.styledef"));
const list_template_styledef_1 = __importDefault(require("./data/list/list-template.styledef"));
const list_styledef_1 = __importDefault(require("./data/list.styledef"));
const barcodescanner_styledef_1 = __importDefault(require("./device/barcodescanner.styledef"));
const camera_styledef_1 = __importDefault(require("./device/camera.styledef"));
const alertdialog_styledef_1 = __importDefault(require("./dialogs/alertdialog.styledef"));
const confirmdialog_styledef_1 = __importDefault(require("./dialogs/confirmdialog.styledef"));
const dialog_styledef_1 = __importDefault(require("./dialogs/dialog.styledef"));
const dialogactions_styledef_1 = __importDefault(require("./dialogs/dialogactions.styledef"));
const dialogcontent_styledef_1 = __importDefault(require("./dialogs/dialogcontent.styledef"));
const basedataset_styledef_1 = __importDefault(require("./input/basedataset.styledef"));
const baseinput_styledef_1 = __importDefault(require("./input/baseinput.styledef"));
const basenumber_styledef_1 = __importDefault(require("./input/basenumber.styledef"));
const views_styledef_1 = __importDefault(require("./input/calendar/views.styledef"));
const calendar_styledef_1 = __importDefault(require("./input/calendar.styledef"));
const checkbox_styledef_1 = __importDefault(require("./input/checkbox.styledef"));
const checkboxset_styledef_1 = __importDefault(require("./input/checkboxset.styledef"));
const chips_styledef_1 = __importDefault(require("./input/chips.styledef"));
const composite_styledef_1 = __importDefault(require("./input/composite.styledef"));
const currency_styledef_1 = __importDefault(require("./input/currency.styledef"));
const date_styledef_1 = __importDefault(require("./input/epoch/date.styledef"));
const datetime_styledef_1 = __importDefault(require("./input/epoch/datetime.styledef"));
const time_styledef_1 = __importDefault(require("./input/epoch/time.styledef"));
const number_styledef_1 = __importDefault(require("./input/number.styledef"));
const radioset_styledef_1 = __importDefault(require("./input/radioset.styledef"));
const rating_styledef_1 = __importDefault(require("./input/rating.styledef"));
const select_styledef_1 = __importDefault(require("./input/select.styledef"));
const slider_styledef_1 = __importDefault(require("./input/slider.styledef"));
const switch_styledef_1 = __importDefault(require("./input/switch.styledef"));
const text_styledef_1 = __importDefault(require("./input/text.styledef"));
const textarea_styledef_1 = __importDefault(require("./input/textarea.styledef"));
const toggle_styledef_1 = __importDefault(require("./input/toggle.styledef"));
const fileupload_styledef_1 = __importDefault(require("./input/fileupload.styledef"));
const appnavbar_styledef_1 = __importDefault(require("./navigation/appnavbar.styledef"));
const basenav_styledef_1 = __importDefault(require("./navigation/basenav.styledef"));
const menu_styledef_1 = __importDefault(require("./navigation/menu.styledef"));
const navbar_styledef_1 = __importDefault(require("./navigation/navbar.styledef"));
const navitem_styledef_1 = __importDefault(require("./navigation/navitem.styledef"));
const popover_styledef_1 = __importDefault(require("./navigation/popover.styledef"));
const content_styledef_1 = __importDefault(require("./page/content.styledef"));
const left_panel_styledef_1 = __importDefault(require("./page/left-panel.styledef"));
const page_content_styledef_1 = __importDefault(require("./page/page-content.styledef"));
const partial_styledef_1 = __importDefault(require("./page/partial.styledef"));
const partial_container_styledef_1 = __importDefault(require("./page/partial-container.styledef"));
const tabbar_styledef_1 = __importDefault(require("./page/tabbar.styledef"));
const page_styledef_1 = __importDefault(require("./page.styledef"));
const prefab_styledef_1 = __importDefault(require("./prefab.styledef"));
const line_chart_styledef_1 = __importDefault(require("./chart/line-chart.styledef"));
const bar_chart_styledef_1 = __importDefault(require("./chart/bar-chart.styledef"));
const pie_chart_styledef_1 = __importDefault(require("./chart/pie-chart.styledef"));
const area_chart_styledef_1 = __importDefault(require("./chart/area-chart.styledef"));
const column_chart_styledef_1 = __importDefault(require("./chart/column-chart.styledef"));
const donut_chart_styledef_1 = __importDefault(require("./chart/donut-chart.styledef"));
const bubble_chart_styledef_1 = __importDefault(require("./chart/bubble-chart.styledef"));
const tabheader_styledef_1 = __importDefault(require("./container/tabs/tabheader.styledef"));
const network_info_toaster_styledef_1 = __importDefault(require("./advanced/network-info-toaster.styledef"));
const skeleton_styledef_1 = __importDefault(require("./basic/skeleton.styledef"));
const video_styledef_1 = __importDefault(require("./basic/video.styledef"));
const custom_styledef_1 = __importDefault(require("./basic/custom.styledef"));
const lottie_styledef_1 = __importDefault(require("./basic/lottie.styledef"));
const audio_styledef_1 = __importDefault(require("./basic/audio.styledef"));
//ADD_STYLE_IMPORT
exports.StyleDefinitions = new Map([
    ['advanced/carousel/carousel-content', carousel_content_styledef_1.default.getStyleDefs()],
    ['advanced/carousel/carousel-template', carousel_template_styledef_1.default.getStyleDefs()],
    ['advanced/carousel', carousel_styledef_1.default.getStyleDefs()],
    ['advanced/login', login_styledef_1.default.getStyleDefs()],
    ['advanced/webview', webview_styledef_1.default.getStyleDefs()],
    ['advanced/network-toast', network_info_toaster_styledef_1.default.getStyleDefs()],
    ['basic/anchor', anchor_styledef_1.default.getStyleDefs()],
    ['basic/button', button_styledef_1.default.getStyleDefs()],
    ['basic/buttongroup', buttongroup_styledef_1.default.getStyleDefs()],
    ['basic/icon', icon_styledef_1.default.getStyleDefs()],
    ['basic/label', label_styledef_1.default.getStyleDefs()],
    ['basic/message', message_styledef_1.default.getStyleDefs()],
    ['basic/modal', modal_styledef_1.default.getStyleDefs()],
    ['basic/picture', picture_styledef_1.default.getStyleDefs()],
    ['basic/progress-bar', progress_bar_styledef_1.default.getStyleDefs()],
    ['basic/progress-circle', progress_circle_styledef_1.default.getStyleDefs()],
    ['basic/search', search_styledef_1.default.getStyleDefs()],
    ['basic/spinner', spinner_styledef_1.default.getStyleDefs()],
    ['container/accordion/accordionpane', accordionpane_styledef_1.default.getStyleDefs()],
    ['container/accordion', accordion_styledef_1.default.getStyleDefs()],
    ['container/layoutgrid/gridcolumn', gridcolumn_styledef_1.default.getStyleDefs()],
    ['container/layoutgrid/gridrow', gridrow_styledef_1.default.getStyleDefs()],
    ['container/layoutgrid', layoutgrid_styledef_1.default.getStyleDefs()],
    ['container/linearlayout/linearlayoutitem', linearlayoutitem_styledef_1.default.getStyleDefs()],
    ['container/linearlayout', linearlayout_styledef_1.default.getStyleDefs()],
    ['container/panel/panel-content', panel_content_styledef_1.default.getStyleDefs()],
    ['container/panel/panel-footer', panel_footer_styledef_1.default.getStyleDefs()],
    ['container/panel', panel_styledef_1.default.getStyleDefs()],
    ['container/tabs/tabpane', tabpane_styledef_1.default.getStyleDefs()],
    ['container/tabs', tabs_styledef_1.default.getStyleDefs()],
    ['container/tile', tile_styledef_1.default.getStyleDefs()],
    ['container/wizard/wizardstep', wizardstep_styledef_1.default.getStyleDefs()],
    ['container/wizard', wizard_styledef_1.default.getStyleDefs()],
    ['container', container_styledef_1.default.getStyleDefs()],
    ['data/card/card-content', card_content_styledef_1.default.getStyleDefs()],
    ['data/card/card-footer', card_footer_styledef_1.default.getStyleDefs()],
    ['data/card', card_styledef_1.default.getStyleDefs()],
    ['data/form/form-body', form_body_styledef_1.default.getStyleDefs()],
    ['data/form/form-field', form_field_styledef_1.default.getStyleDefs()],
    ['data/form/form-footer', form_footer_styledef_1.default.getStyleDefs()],
    ['data/form', form_styledef_1.default.getStyleDefs()],
    ['data/list/list-template', list_template_styledef_1.default.getStyleDefs()],
    ['data/list', list_styledef_1.default.getStyleDefs()],
    ['device/barcodescanner', barcodescanner_styledef_1.default.getStyleDefs()],
    ['device/camera', camera_styledef_1.default.getStyleDefs()],
    ['dialogs/alertdialog', alertdialog_styledef_1.default.getStyleDefs()],
    ['dialogs/confirmdialog', confirmdialog_styledef_1.default.getStyleDefs()],
    ['dialogs/dialog', dialog_styledef_1.default.getStyleDefs()],
    ['dialogs/dialogactions', dialogactions_styledef_1.default.getStyleDefs()],
    ['dialogs/dialogcontent', dialogcontent_styledef_1.default.getStyleDefs()],
    ['input/basedataset', basedataset_styledef_1.default.getStyleDefs()],
    ['input/baseinput', baseinput_styledef_1.default.getStyleDefs()],
    ['input/basenumber', basenumber_styledef_1.default.getStyleDefs()],
    ['input/calendar/views', views_styledef_1.default.getStyleDefs()],
    ['input/calendar', calendar_styledef_1.default.getStyleDefs()],
    ['input/checkbox', checkbox_styledef_1.default.getStyleDefs()],
    ['input/checkboxset', checkboxset_styledef_1.default.getStyleDefs()],
    ['input/chips', chips_styledef_1.default.getStyleDefs()],
    ['input/composite', composite_styledef_1.default.getStyleDefs()],
    ['input/currency', currency_styledef_1.default.getStyleDefs()],
    ['input/epoch/date', date_styledef_1.default.getStyleDefs()],
    ['input/epoch/datetime', datetime_styledef_1.default.getStyleDefs()],
    ['input/epoch/time', time_styledef_1.default.getStyleDefs()],
    ['input/number', number_styledef_1.default.getStyleDefs()],
    ['input/radioset', radioset_styledef_1.default.getStyleDefs()],
    ['input/rating', rating_styledef_1.default.getStyleDefs()],
    ['input/select', select_styledef_1.default.getStyleDefs()],
    ['input/slider', slider_styledef_1.default.getStyleDefs()],
    ['input/switch', switch_styledef_1.default.getStyleDefs()],
    ['input/text', text_styledef_1.default.getStyleDefs()],
    ['input/textarea', textarea_styledef_1.default.getStyleDefs()],
    ['input/toggle', toggle_styledef_1.default.getStyleDefs()],
    ['navigation/appnavbar', appnavbar_styledef_1.default.getStyleDefs()],
    ['navigation/basenav', basenav_styledef_1.default.getStyleDefs()],
    ['navigation/menu', menu_styledef_1.default.getStyleDefs()],
    ['navigation/navbar', navbar_styledef_1.default.getStyleDefs()],
    ['navigation/navitem', navitem_styledef_1.default.getStyleDefs()],
    ['navigation/popover', popover_styledef_1.default.getStyleDefs()],
    ['page/content', content_styledef_1.default.getStyleDefs()],
    ['page/left-panel', left_panel_styledef_1.default.getStyleDefs()],
    ['page/page-content', page_content_styledef_1.default.getStyleDefs()],
    ['page/partial', partial_styledef_1.default.getStyleDefs()],
    ['page/partial-container', partial_container_styledef_1.default.getStyleDefs()],
    ['page/tabbar', tabbar_styledef_1.default.getStyleDefs()],
    ['page', page_styledef_1.default.getStyleDefs()],
    ['prefab', prefab_styledef_1.default.getStyleDefs()],
    ['input/fileupload', fileupload_styledef_1.default.getStyleDefs()],
    ['chart/line-chart', line_chart_styledef_1.default.getStyleDefs()],
    ['chart/bar-chart', bar_chart_styledef_1.default.getStyleDefs()],
    ['chart/pie-chart', pie_chart_styledef_1.default.getStyleDefs()],
    ['chart/area-chart', area_chart_styledef_1.default.getStyleDefs()],
    ['chart/column-chart', column_chart_styledef_1.default.getStyleDefs()],
    ['chart/donut-chart', donut_chart_styledef_1.default.getStyleDefs()],
    ['chart/bubble-chart', bubble_chart_styledef_1.default.getStyleDefs()],
    ['container/tabs/tab-header', tabheader_styledef_1.default.getStyleDefs()],
    ['basic/skeleton', skeleton_styledef_1.default.getStyleDefs()],
    ['basic/video', video_styledef_1.default.getStyleDefs()],
    ['basic/custom', custom_styledef_1.default.getStyleDefs()],
    ['basic/lottie', lottie_styledef_1.default.getStyleDefs()],
    ['basic', audio_styledef_1.default.getStyleDefs()],
    //ADD_STYLE_DEF
]);
const scanStyleDocs = () => {
    const styleDocs = {};
    const docsPath = `${__dirname}/../../../../style-docs/widgets`;
    if (!fs_extra_1.default.existsSync(docsPath)) {
        return;
    }
    (0, utils_1.readdir)(docsPath, { recursive: true }, (path) => {
        if (path.endsWith('.md')) {
            const text = fs_extra_1.default.readFileSync(path, 'utf-8');
            (text.match(/\|(.*)\|$/gm) || [])
                .map(s => s.substring(1, s.length - 1))
                .map(s => s.split('|'))
                .filter(a => a.length === 3)
                .forEach(a => {
                const key = a[0].trim();
                const value = a[2].trim();
                if (key.startsWith('.')) {
                    styleDocs[key] = value;
                }
            });
        }
    });
    exports.StyleDefinitions.forEach(v => {
        v.forEach(styleDef => {
            styleDef.document = styleDocs[styleDef.className];
        });
    });
    return styleDocs;
};
scanStyleDocs();
const studioCSSMappings = {};
const rnStyles = {};
exports.StyleDefinitions.forEach(v => {
    v.forEach(styleDef => {
        studioCSSMappings[styleDef.className] = styleDef.studioStyleSelector;
        rnStyles[styleDef.className] = styleDef.rnStyleSelector;
    });
});
const getAllCSSSelectorMeta = () => {
    const meta = {};
    Object.keys(studioCSSMappings).forEach((k) => {
        const s = studioCSSMappings[k];
        meta[k] = (s && s.document) || '';
    });
    return meta;
};
exports.getAllCSSSelectorMeta = getAllCSSSelectorMeta;
const getStudioSelector = (cssSelector) => {
    cssSelector = cssSelector.trim();
    let selector = cssSelector || '';
    if (cssSelector) {
        if (!studioCSSMappings[cssSelector]) {
            const i = cssSelector.indexOf('.', 1);
            if (i > 0) {
                const prefix = cssSelector.substring(0, i);
                selector = ((0, exports.getStudioSelector)(prefix.trim()) || prefix) + (0, exports.getStudioSelector)(cssSelector.substring(i));
            }
        }
        else {
            selector = studioCSSMappings[cssSelector];
        }
    }
    return selector;
};
exports.getStudioSelector = getStudioSelector;
const getRNSelector = (cssSelector, trimApp = false) => {
    cssSelector = cssSelector.trim();
    let selector = cssSelector;
    if (cssSelector) {
        if (!rnStyles[cssSelector]) {
            const i = cssSelector.indexOf('.', 1);
            if (i > 0) {
                let prefix = cssSelector.substring(1, i).trim();
                const isPrefabOrPartial = (prefix === 'app-prefab' || prefix === 'app-partial');
                const suffix = (0, exports.getRNSelector)(cssSelector.substring(i), !isPrefabOrPartial);
                prefix = (0, exports.getRNSelector)('.' + prefix) || prefix;
                if (suffix && isPrefabOrPartial) {
                    prefix = prefix.substring(0, prefix.lastIndexOf('.root')).trim();
                    prefix = prefix + '.__child';
                }
                selector = prefix + '.' + suffix;
            }
            else {
                selector = cssSelector.substring(1);
            }
        }
        else {
            selector = rnStyles[cssSelector];
        }
    }
    if (trimApp && selector.startsWith('app-') && selector.indexOf('.') > 0) {
        selector = selector.substring(selector.indexOf('.') + 1);
    }
    return selector.startsWith('.') ? selector.substring(1) : selector;
};
exports.getRNSelector = getRNSelector;
//# sourceMappingURL=style-definition.provider.js.map