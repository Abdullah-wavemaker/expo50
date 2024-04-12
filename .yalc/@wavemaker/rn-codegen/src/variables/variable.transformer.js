"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bind_ex_transformer_1 = __importDefault(require("../transpile/bind.ex.transformer"));
const lodash_1 = require("lodash");
function transformDataItem(d, scope) {
    let v = (0, lodash_1.isArray)(d.value) ? d.value[0] : d.value;
    if (v) {
        if (v.startsWith && v.startsWith('bind:')) {
            v = `${scope}.eval(() => ${(0, bind_ex_transformer_1.default)(v.substr(5), scope, 'attr').replace(/\\n/g, '')})`;
        }
        else if (d.type === 'string') {
            v = `${v}`;
        }
    }
    return {
        name: d.target,
        value: v
    };
}
function appendIfNotEmpty(input, str) {
    return input && (input + '');
}
function checkEmptyObject(obj) {
    let isVariableEmpty = true;
    (0, lodash_1.forEach)(obj, (value) => {
        if ((0, lodash_1.isEmpty)(value) && !(0, lodash_1.isBoolean)(value) && !(0, lodash_1.isNumber)(value)) {
            return;
        }
        if (!(0, lodash_1.isObject)(value)) {
            isVariableEmpty = false;
        }
        else if ((0, lodash_1.isArray)(value)) {
            isVariableEmpty = (0, lodash_1.isEmpty)(value) || (value.length === 1 ? (0, lodash_1.isEmpty)(value[0]) : false);
        }
        else {
            isVariableEmpty = checkEmptyObject(value);
        }
        return isVariableEmpty;
    });
    return isVariableEmpty;
}
;
function transformVariable(variable, scope) {
    let params = {}, filters = {};
    if (variable.category !== 'wm.DeviceVariable') {
        if ((0, lodash_1.isArray)(variable.dataSet)) {
            if (variable.category === 'wm.NavigationVariable') {
                variable.dataSet.forEach((d) => {
                    const { name, value } = transformDataItem(d, scope);
                    (0, lodash_1.set)(params, name, value);
                });
            }
            else if (variable.isList && variable.category === 'wm.Variable') {
                params = (0, lodash_1.clone)(variable.dataSet);
            }
        }
        else if (variable.dataSet) {
            Object.keys(variable.dataSet).forEach((k) => {
                if (params[k] == undefined || params[k] == null) {
                    (0, lodash_1.set)(params, k, (0, lodash_1.get)(variable.dataSet, k));
                }
            });
        }
    }
    if (variable.dataBinding) {
        variable.dataBinding.forEach((d) => {
            const { name, value } = transformDataItem(d, scope);
            (0, lodash_1.set)(params, name, value);
        });
        if (params.dataBinding) {
            params = params.dataBinding;
        }
    }
    const filterProvider = (rules) => {
        rules === null || rules === void 0 ? void 0 : rules.forEach((r) => {
            if (r.rules) {
                filterProvider(r.rules);
            }
            else {
                const { name, value } = transformDataItem(r, scope);
                filters[name] = value;
            }
        });
    };
    if (variable.filterExpressions) {
        filterProvider(variable.filterExpressions.rules);
    }
    // Todo: these properties directly on variable are to be handled from studio
    if (variable.category === 'wm.DeviceVariable' && variable.operation === 'scanBarCode') {
        params['barcodeFormat'] = variable.barcodeFormat;
    }
    if (variable.category === 'wm.DeviceVariable' && variable.service === 'file' && variable.operation === 'upload') {
        params['browse'] = !variable.localFile;
    }
    const obj = {
        name: variable.name,
        group: 'variable',
        params: params,
        filters: filters,
        onSuccess: appendIfNotEmpty((0, bind_ex_transformer_1.default)(variable.onSuccess, scope, 'event'), ';'),
        onError: appendIfNotEmpty((0, bind_ex_transformer_1.default)(variable.onError, scope, 'event'), ';')
    };
    if (variable.onCanUpdate) {
        obj.onCanUpdate = appendIfNotEmpty((0, bind_ex_transformer_1.default)(variable.onCanUpdate, scope, 'event'), ';');
    }
    if (variable.onBeforeUpdate) {
        obj.onBeforeUpdate = appendIfNotEmpty((0, bind_ex_transformer_1.default)(variable.onBeforeUpdate, scope, 'event'), ';');
    }
    if (variable.onResult) {
        obj.onResult = appendIfNotEmpty((0, bind_ex_transformer_1.default)(variable.onResult, scope, 'event'), ';');
    }
    if (variable.onBeforeDatasetReady) {
        obj.onBeforeDatasetReady = appendIfNotEmpty((0, bind_ex_transformer_1.default)(variable.onBeforeDatasetReady, scope, 'event'), ';');
    }
    if (variable.spinnerContext) {
        obj.spinnerContext = variable.spinnerContext;
        obj.spinnerMessage = variable.spinnerMessage;
    }
    if (variable.category === 'wm.LoginVariable' || variable.category === 'wm.LogoutVariable') {
        obj.useDefaultSuccessHandler = variable.useDefaultSuccessHandler;
    }
    return obj;
}
function transformModelVariable(variable, scope) {
    if ((0, lodash_1.isArray)(variable.dataSet) && variable.dataSet.length === 1 && checkEmptyObject(variable.dataSet[0])) {
        variable.dataSet = [];
    }
    const tv = transformVariable(variable, scope);
    tv.classname = 'ModelVariable';
    tv.twoWayBinding = variable.twoWayBinding;
    tv.isList = !!variable.isList;
    return tv;
}
function transformServiceVariable(variable, scope) {
    const tv = transformVariable(variable, scope);
    tv.classname = 'ServiceVariable';
    tv.operationId = variable.operationId;
    tv.isList = !!variable.isList;
    tv.inFlightBehavior = variable.inFlightBehavior;
    tv.service = variable.service;
    tv.operation = variable.operation;
    tv.operationId = variable.operationId;
    tv.maxResults = variable.maxResults;
    tv._context = variable._context;
    tv.serviceType = variable.serviceType;
    return tv;
}
function transformNavigationAction(variable, scope) {
    const tv = transformVariable(variable, scope);
    tv.classname = 'NavigationAction';
    tv.group = 'action';
    tv.operation = variable.operation;
    tv.params = (0, lodash_1.isArray)(tv.params) && tv.params.length == 0 ? {} : tv.params;
    if (!tv.params['pageName'] && variable.pageName) {
        tv.params['pageName'] = variable.pageName;
    }
    return tv;
}
function transformTimerAction(variable, scope) {
    const tv = transformVariable(variable, scope);
    tv.classname = 'TimerAction';
    tv.group = 'action';
    tv.repeating = variable.repeating;
    tv.delay = variable.delay;
    if (variable.onTimerFire) {
        tv.onTimerFire = appendIfNotEmpty((0, bind_ex_transformer_1.default)(variable.onTimerFire, scope, 'event'), ';');
    }
    return tv;
}
function transformNotificationAction(variable, scope) {
    const tv = transformVariable(variable, scope);
    tv.classname = 'NotificationAction';
    tv.group = 'action';
    tv.operation = variable.operation;
    const partialContent = variable.dataBinding.filter((binding) => {
        return binding.target === 'page';
    })[0];
    if (variable.onOk || variable.onClick) {
        tv.onOk = appendIfNotEmpty((0, bind_ex_transformer_1.default)(variable.onOk || variable.onClick, scope, 'event'), ';');
    }
    if (variable.onCancel) {
        tv.onCancel = appendIfNotEmpty((0, bind_ex_transformer_1.default)(variable.onCancel, scope, 'event'), ';');
    }
    if (variable.onClose || variable.onHide) {
        tv.onClose = appendIfNotEmpty((0, bind_ex_transformer_1.default)(variable.onClose || variable.onHide, scope, 'event'), ';');
    }
    if (variable.operation === 'alert' || variable.operation === 'confirm') {
        const owner = scope === 'App' ? 'App.commonPartial' : scope;
        const widgetName = scope === 'App' ? `Common${(0, lodash_1.upperFirst)(variable.operation)}Dialog` : `notification${variable.operation}dialog`;
        tv.showDialog = `${owner}.notification = options;${owner}.Widgets.${widgetName}.open();`;
    }
    if (partialContent) {
        tv.partialContent = { content: partialContent.value };
    }
    return tv;
}
function transformDeviceVariable(variable, scope, appUrl) {
    if ((0, lodash_1.isArray)(variable.dataSet) && variable.dataSet.length === 1 && checkEmptyObject(variable.dataSet[0])) {
        variable.dataSet = [];
    }
    const tv = transformVariable(variable, scope);
    tv.classname = 'DeviceVariable';
    tv.operation = variable.operation;
    tv.service = variable.service;
    if (variable.service === 'file') {
        tv.params.serverUrl = `${scope}.eval(() => ${scope}.appConfig.url)`;
    }
    return tv;
}
function transformLoginVariable(variable, scope) {
    const tv = transformVariable(variable, scope);
    tv.classname = 'LoginAction';
    tv.group = 'action';
    return tv;
}
function transformLogoutVariable(variable, scope) {
    const tv = transformVariable(variable, scope);
    tv.classname = 'LogoutAction';
    tv.group = 'action';
    tv.redirectTo = variable.redirectTo;
    return tv;
}
function transformLiveVariable(variable, scope) {
    const tv = transformVariable(variable, scope);
    tv.classname = 'LiveVariable';
    tv.isList = !!variable.isList;
    tv.inFlightBehavior = variable.inFlightBehavior;
    tv.maxResults = variable.maxResults;
    tv._context = variable._context;
    tv.operation = variable.operation;
    tv.type = variable.type;
    tv.autoUpdate = variable.autoUpdate;
    tv.orderBy = variable.orderBy;
    tv.liveSource = variable.liveSource;
    tv.category = variable.category;
    tv.tableName = variable.tableName;
    tv.tableType = variable.tableType;
    tv.relatedTables = variable.relatedTables;
    tv.filterExpressions = variable.filterExpressions;
    return tv;
}
exports.default = (variable, scope, appUrl) => {
    switch (variable.category) {
        case 'wm.Variable':
            return transformModelVariable(variable, scope);
        case 'wm.ServiceVariable':
            return transformServiceVariable(variable, scope);
        case 'wm.NavigationVariable':
            return transformNavigationAction(variable, scope);
        case 'wm.TimerVariable':
            return transformTimerAction(variable, scope);
        case 'wm.NotificationVariable':
            return transformNotificationAction(variable, scope);
        case 'wm.DeviceVariable':
            return transformDeviceVariable(variable, scope, appUrl);
        case 'wm.LoginVariable':
            return transformLoginVariable(variable, scope);
        case 'wm.LogoutVariable':
            return transformLogoutVariable(variable, scope);
        case 'wm.LiveVariable':
            return transformLiveVariable(variable, scope);
    }
    return null;
};
//# sourceMappingURL=variable.transformer.js.map