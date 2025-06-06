var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// import { $invokeWatchers, processFilterExpBindNode } from '@wm/core';
import { getClonedObject, isDateTimeType, isDefined, triggerFn } from "../../util/utils";
import { BaseVariableManager } from './base-variable.manager';
import { formatExportExpression, initiateCallback, setInput, appManager, formatDate, getErrMessage } from '../../util/variable/variables.utils';
import { LiveVariableUtils } from '../../util/variable/live-variable.utils';
import { decodeData } from './../../util/variable/variables.utils';
import { $queue } from '../../util/inflight-queue';
import { $rootScope, CONSTANTS, VARIABLE_CONSTANTS, DB_CONSTANTS } from '../../constants/variables.constants';
import { generateConnectionParams } from '../../util/variable/live-variable.http.utils';
import { VariableEvents } from "../../model/base-variable";
var emptyArr = [];
import _ from 'lodash';
var LiveVariableManager = /** @class */ (function (_super) {
    __extends(LiveVariableManager, _super);
    function LiveVariableManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Traverses recursively the filterExpressions object and if there is any required field present with no value,
         * then we will return without proceeding further. Its upto the developer to provide the mandatory value,
         * if he wants to assign it in teh onbefore<delete/insert/update>function then make that field in
         * the filter query section as optional
         * @param filterExpressions - recursive rule Object
         * @returns {Object} object or boolean. Object if everything gets validated or else just boolean indicating failure in the validations
         */
        _this.getFilterExprFields = function (filterExpressions) {
            var isRequiredFieldAbsent = false;
            var traverseCallbackFn = function (parentFilExpObj, filExpObj) {
                if (filExpObj
                    && filExpObj.required
                    && ((_.indexOf(['null', 'isnotnull', 'empty', 'isnotempty', 'nullorempty'], filExpObj.matchMode) === -1) && filExpObj.value === '')) {
                    isRequiredFieldAbsent = true;
                    return false;
                }
            };
            LiveVariableUtils.traverseFilterExpressions(filterExpressions, traverseCallbackFn);
            return isRequiredFieldAbsent ? !isRequiredFieldAbsent : filterExpressions;
        };
        /**
         * Allows the user to get the criteria of filtering and the filter fields, based on the method called
         */
        _this.getDataFilterObj = function (clonedFilterFields) {
            return (function (clonedFields) {
                function getCriteria(filterField) {
                    var criterian = [];
                    LiveVariableUtils.traverseFilterExpressions(clonedFields, function (filterExpressions, criteria) {
                        if (filterField === criteria.target) {
                            criterian.push(criteria);
                        }
                    });
                    return criterian;
                }
                function getFilterFields() {
                    return clonedFields;
                }
                return {
                    getFilterFields: getFilterFields,
                    getCriteria: getCriteria
                };
            }(clonedFilterFields));
        };
        return _this;
    }
    LiveVariableManager.prototype.initFilterExpressionBinding = function (variable) {
        var context = variable._context;
        var destroyFn = context.registerDestroyListener ? context.registerDestroyListener.bind(context) : _.noop;
        // ToDo - variable seperation
        // const filterSubscription = processFilterExpBindNode(context, variable.filterExpressions).subscribe((response: any) => {
        //     if (variable.operation === 'read') {
        //         /* if auto-update set for the variable with read operation only, get its data */
        //         if (variable.autoUpdate && !_.isUndefined(response.newVal) && _.isFunction(variable.update)) {
        //             debounceVariableCall(variable, 'update');
        //         }
        //     } else {
        //         /* if auto-update set for the variable with read operation only, get its data */
        //         if (variable.autoUpdate && !_.isUndefined(response.newVal) && _.isFunction(variable[variable.operation + 'Record'])) {
        //             debounceVariableCall(variable, variable.operation + 'Record');
        //         }
        //     }
        // });
        //  destroyFn(() => filterSubscription.unsubscribe());
    };
    LiveVariableManager.prototype.updateDataset = function (variable, data, propertiesMap, pagination) {
        variable.pagination = pagination;
        variable.dataSet = data;
        // legacy properties in dataSet, [data, pagination]
        Object.defineProperty(variable.dataSet, 'data', {
            get: function () {
                return variable.dataSet;
            }
        });
        Object.defineProperty(variable.dataSet, 'pagination', {
            get: function () {
                return variable.pagination;
            }
        });
    };
    // Set the _options on variable which can be used by the widgets
    LiveVariableManager.prototype.setVariableOptions = function (variable, options) {
        variable._options = variable._options || {};
        variable._options.orderBy = options && options.orderBy;
        variable._options.filterFields = options && options.filterFields;
        variable._options.logicalOp = options && options.logicalOp;
    };
    LiveVariableManager.prototype.handleError = function (variable, errorCB, response, options, advancedOptions) {
        var opt;
        /* If callback function is provided, send the data to the callback.
         * The same callback if triggered in case of error also. The error-handling is done in grid.js*/
        triggerFn(errorCB, response);
        //  EVENT: ON_RESULT
        initiateCallback(VARIABLE_CONSTANTS.EVENT.RESULT, variable, response, advancedOptions);
        /* update the dataSet against the variable */
        if (!options.skipDataSetUpdate) {
            this.updateDataset(variable, emptyArr, variable.propertiesMap, null);
        }
        //  EVENT: ON_ERROR
        opt = this.prepareCallbackOptions(options.errorDetails);
        initiateCallback(VARIABLE_CONSTANTS.EVENT.ERROR, variable, response, opt);
        //  EVENT: ON_CAN_UPDATE
        variable.canUpdate = true;
        initiateCallback(VARIABLE_CONSTANTS.EVENT.CAN_UPDATE, variable, response, advancedOptions);
    };
    LiveVariableManager.prototype.makeCall = function (variable, dbOperation, params) {
        var _this = this;
        var successHandler = function (response, resolve) {
            if (response && response.type || response && response.status) {
                resolve(response);
            }
        };
        var errorHandler = function (error, reject) {
            var errMsg = getErrMessage(error, variable.httpService.getLocale());
            // notify variable error
            _this.notifyInflight(variable, false);
            reject({
                error: errMsg,
                details: error
            });
        };
        return new Promise(function (resolve, reject) {
            var reqParams = generateConnectionParams(params, dbOperation);
            reqParams = {
                url: reqParams.url,
                method: reqParams.method,
                data: reqParams.data,
                headers: reqParams.headers
            };
            params.operation = dbOperation;
            _this.httpCall(reqParams, variable, params).then(function (response) {
                successHandler(response, resolve);
            }, function (e) {
                errorHandler(e, reject);
            });
        });
    };
    LiveVariableManager.prototype.getEntityData = function (variable, options, success, error) {
        var _this = this;
        var dataObj = {};
        var tableOptions, dbOperation, output, newDataSet, clonedFields, requestData, dbOperationOptions, getEntitySuccess, getEntityError;
        // empty array kept (if variable is not of read type filterExpressions will be undefined)
        clonedFields = this.getFilterExprFields(getClonedObject(variable.filterExpressions || {}));
        // clonedFields = getClonedObject(variable.filterFields);
        //  EVENT: ON_BEFORE_UPDATE
        output = initiateCallback(VARIABLE_CONSTANTS.EVENT.BEFORE_UPDATE, variable, this.getDataFilterObj(clonedFields), options);
        // if filterFields are updated or modified inside the onBeforeUpdate event then in device use these fields to filter.
        var updateFilterFields = _.isObject(output) ? getClonedObject(output) : undefined;
        if (output === false) {
            $queue.process(variable);
            // $rootScope.$emit('toggle-variable-state', variable, false);
            triggerFn(error, 'Call stopped from the event: ' + VARIABLE_CONSTANTS.EVENT.BEFORE_UPDATE);
            return Promise.reject('Call stopped from the event: ' + VARIABLE_CONSTANTS.EVENT.BEFORE_UPDATE);
        }
        variable.canUpdate = false;
        tableOptions = LiveVariableUtils.prepareTableOptions(variable, options, _.isObject(output) ? output : clonedFields);
        //  if tableOptions object has query then set the dbOperation to 'searchTableDataWithQuery'
        if (options.searchWithQuery) {
            dbOperation = 'searchTableDataWithQuery';
            requestData = tableOptions.query ? ('q=' + tableOptions.query) : '';
        }
        else {
            dbOperation = (tableOptions.filter && tableOptions.filter.length) ? 'searchTableData' : 'readTableData';
            requestData = tableOptions.filter;
        }
        dbOperationOptions = {
            'projectID': $rootScope.project.id,
            'service': variable.getPrefabName() ? '' : 'services',
            'dataModelName': variable.liveSource,
            'entityName': variable.type,
            'page': options.page || 1,
            'size': options.pagesize || (CONSTANTS.isRunMode ? (variable.maxResults || 20) : (variable.designMaxResults || 20)),
            'sort': tableOptions.sort,
            'data': requestData,
            'filter': LiveVariableUtils.getWhereClauseGenerator(variable, options, updateFilterFields),
            // 'filterMeta': tableOptions.filter,
            'url': variable.getPrefabName() ? ($rootScope.project.deployedUrl + '/prefabs/' + variable.getPrefabName()) : $rootScope.project.deployedUrl
        };
        getEntitySuccess = function (response, resolve) {
            if (response && (response.type || response.status)) {
                response = response.body || response.data;
                dataObj.data = response.content;
                dataObj.pagination = _.omit(response, 'content');
                var advancedOptions_1 = _this.prepareCallbackOptions(response, { pagination: dataObj.pagination });
                if ((response && response.error) || !response || !_.isArray(response.content)) {
                    _this.handleError(variable, error, response.error, options, advancedOptions_1);
                    return Promise.reject(response.error);
                }
                decodeData(response.content);
                LiveVariableUtils.processBlobColumns(response.content, variable);
                if (!options.skipDataSetUpdate) {
                    //  EVENT: ON_RESULT
                    initiateCallback(VARIABLE_CONSTANTS.EVENT.RESULT, variable, dataObj.data, advancedOptions_1);
                    //  EVENT: ON_PREPARESETDATA
                    newDataSet = initiateCallback(VARIABLE_CONSTANTS.EVENT.PREPARE_SETDATA, variable, dataObj.data, advancedOptions_1);
                    if (newDataSet) {
                        // setting newDataSet as the response to service variable onPrepareSetData
                        dataObj.data = newDataSet;
                    }
                    /* update the dataSet against the variable */
                    _this.updateDataset(variable, dataObj.data, variable.propertiesMap, dataObj.pagination);
                    _this.setVariableOptions(variable, options);
                    // watchers should get triggered before calling onSuccess event.
                    // so that any variable/widget depending on this variable's data is updated
                    variable.notify(VariableEvents.AFTER_INVOKE, [_this, dataObj.data]);
                    setTimeout(function () {
                        // if callback function is provided, send the data to the callback
                        triggerFn(success, dataObj.data, variable.propertiesMap, dataObj.pagination);
                        //  EVENT: ON_SUCCESS
                        initiateCallback(VARIABLE_CONSTANTS.EVENT.SUCCESS, variable, dataObj.data, advancedOptions_1);
                        //  EVENT: ON_CAN_UPDATE
                        variable.canUpdate = true;
                        initiateCallback(VARIABLE_CONSTANTS.EVENT.CAN_UPDATE, variable, dataObj.data, advancedOptions_1);
                    });
                }
                return resolve({ data: dataObj.data, pagination: dataObj.pagination });
            }
        };
        getEntityError = function (e, reject) {
            _this.setVariableOptions(variable, options);
            _this.handleError(variable, error, e.error, _.extend(options, { errorDetails: e.details }));
            return reject(e.error);
        };
        /* if it is a prefab variable (used in a normal project), modify the url */
        /*Fetch the table data*/
        return new Promise(function (resolve, reject) {
            _this.makeCall(variable, dbOperation, dbOperationOptions).then(function (response) {
                getEntitySuccess(response, resolve);
            }, function (err) {
                getEntityError(err, reject);
            });
        });
    };
    LiveVariableManager.prototype.performCUD = function (operation, variable, options, success, error) {
        var _this = this;
        options = options || {};
        options.inputFields = options.inputFields || getClonedObject(variable.inputFields);
        return $queue.submit(variable).then(function () {
            _this.notifyInflight(variable, !options.skipToggleState);
            return _this.doCUD(operation, variable, options, success, error)
                .then(function (response) {
                $queue.process(variable);
                _this.notifyInflight(variable, false, response);
                return Promise.resolve(response);
            }, function (err) {
                $queue.process(variable);
                _this.notifyInflight(variable, false, err);
                return Promise.reject(err);
            });
        }, error);
    };
    LiveVariableManager.prototype.doCUD = function (action, variable, options, success, error) {
        var _this = this;
        var projectID = $rootScope.project.id || $rootScope.projectName, primaryKey = LiveVariableUtils.getPrimaryKey(variable), isFormDataSupported = (window.File && window.FileReader && window.FileList && window.Blob);
        var dbName, compositeId = '', rowObject = {}, prevData, compositeKeysData = {}, prevCompositeKeysData = {}, id, columnName, clonedFields, output, onCUDerror, onCUDsuccess, inputFields = options.inputFields || variable.inputFields;
        // EVENT: ON_BEFORE_UPDATE
        clonedFields = getClonedObject(inputFields);
        output = initiateCallback(VARIABLE_CONSTANTS.EVENT.BEFORE_UPDATE, variable, clonedFields, options);
        if (output === false) {
            // $rootScope.$emit('toggle-variable-state', variable, false);
            triggerFn(error);
            return Promise.reject('Call stopped from the event: ' + VARIABLE_CONSTANTS.EVENT.BEFORE_UPDATE);
        }
        inputFields = _.isObject(output) ? output : clonedFields;
        variable.canUpdate = false;
        if (options.row) {
            rowObject = options.row;
            // For datetime types, convert the value to the format accepted by backend
            _.forEach(rowObject, function (value, key) {
                var fieldType = LiveVariableUtils.getFieldType(key, variable);
                var fieldValue;
                if (isDateTimeType(fieldType)) {
                    fieldValue = formatDate(value, fieldType, variable.dateFormatter);
                    rowObject[key] = fieldValue;
                }
                else if (_.isArray(value) && LiveVariableUtils.isStringType(fieldType)) {
                    // Construct ',' separated string if param is not array type but value is an array
                    fieldValue = _.join(value, ',');
                    rowObject[key] = fieldValue;
                }
            });
            // Merge inputFields along with dataObj while making Insert/Update/Delete
            _.forEach(inputFields, function (attrValue, attrName) {
                if ((isDefined(attrValue) && attrValue !== '') && (!isDefined(rowObject[attrName]) || rowObject[attrName] === '')) {
                    rowObject[attrName] = attrValue;
                }
            });
        }
        else {
            _.forEach(inputFields, function (fieldValue, fieldName) {
                var fieldType;
                var primaryKeys = variable.propertiesMap.primaryFields || variable.propertiesMap.primaryKeys;
                if (!_.isUndefined(fieldValue) && fieldValue !== '') {
                    /*For delete action, the inputFields need to be set in the request URL. Hence compositeId is set.
                     * For insert action inputFields need to be set in the request data. Hence rowObject is set.
                     * For update action, both need to be set.*/
                    if (action === 'deleteTableData') {
                        compositeId = fieldValue;
                    }
                    if (action === 'updateTableData') {
                        primaryKeys.forEach(function (key) {
                            if (fieldName === key) {
                                compositeId = fieldValue;
                            }
                        });
                    }
                    if (action !== 'deleteTableData' || LiveVariableUtils.isCompositeKey(primaryKey)) {
                        fieldType = LiveVariableUtils.getFieldType(fieldName, variable);
                        if (isDateTimeType(fieldType)) {
                            fieldValue = formatDate(fieldValue, fieldType, variable.dateFormatter);
                        }
                        else if (_.isArray(fieldValue) && LiveVariableUtils.isStringType(fieldType)) {
                            // Construct ',' separated string if param is not array type but value is an array
                            fieldValue = _.join(fieldValue, ',');
                        }
                        rowObject[fieldName] = fieldValue;
                    }
                    // for related entities, clear the blob type fields
                    if (_.isObject(fieldValue) && !_.isArray(fieldValue)) {
                        _.forEach(fieldValue, function (val, key) {
                            if (LiveVariableUtils.getFieldType(fieldName, variable, key) === 'blob') {
                                fieldValue[key] = val === null ? val : '';
                            }
                        });
                    }
                }
            });
        }
        switch (action) {
            case 'updateTableData':
                prevData = options.prevData || {};
                /*Construct the "requestData" based on whether the table associated with the live-variable has a composite key or not.*/
                if (LiveVariableUtils.isCompositeKey(primaryKey)) {
                    if (LiveVariableUtils.isNoPrimaryKey(primaryKey)) {
                        prevCompositeKeysData = prevData || options.rowData || rowObject;
                        compositeKeysData = rowObject;
                    }
                    else {
                        primaryKey.forEach(function (key) {
                            compositeKeysData[key] = rowObject[key];
                            // In case of periodic update for Business temporal fields, passing updated field data.
                            if (options.period) {
                                prevCompositeKeysData[key] = rowObject[key];
                            }
                            else {
                                prevCompositeKeysData[key] = prevData[key] || (options.rowData && options.rowData[key]) || rowObject[key];
                            }
                        });
                    }
                    options.row = compositeKeysData;
                    options.compositeKeysData = prevCompositeKeysData;
                }
                else {
                    primaryKey.forEach(function (key) {
                        if (key.indexOf('.') === -1) {
                            id = prevData[key] || (options.rowData && options.rowData[key]) || rowObject[key];
                        }
                        else {
                            columnName = key.split('.');
                            id = prevData[columnName[0]][columnName[1]];
                        }
                    });
                    options.id = id;
                    options.row = rowObject;
                }
                break;
            case 'deleteTableData':
                /*Construct the "requestData" based on whether the table associated with the live-variable has a composite key or not.*/
                if (LiveVariableUtils.isCompositeKey(primaryKey)) {
                    if (LiveVariableUtils.isNoPrimaryKey(primaryKey)) {
                        compositeKeysData = rowObject;
                    }
                    else {
                        primaryKey.forEach(function (key) {
                            compositeKeysData[key] = rowObject[key];
                        });
                    }
                    options.compositeKeysData = compositeKeysData;
                }
                else if (!_.isEmpty(rowObject)) {
                    primaryKey.forEach(function (key) {
                        if (key.indexOf('.') === -1) {
                            id = rowObject[key];
                        }
                        else {
                            columnName = key.split('.');
                            id = rowObject[columnName[0]][columnName[1]];
                        }
                    });
                    options.id = id;
                }
                break;
            default:
                break;
        }
        // If table has blob column then send multipart data
        if ((action === 'updateTableData' || action === 'insertTableData') && LiveVariableUtils.hasBlob(variable) && isFormDataSupported) {
            if (action === 'updateTableData') {
                action = 'updateMultiPartTableData';
            }
            else {
                action = 'insertMultiPartTableData';
            }
            rowObject = LiveVariableUtils.prepareFormData(variable, rowObject);
        }
        /*Check if "options" have the "compositeKeysData" property.*/
        if (options.compositeKeysData) {
            switch (action) {
                case 'updateTableData':
                    action = 'updateCompositeTableData';
                    break;
                case 'deleteTableData':
                    action = 'deleteCompositeTableData';
                    break;
                case 'updateMultiPartTableData':
                    action = 'updateMultiPartCompositeTableData';
                    break;
                default:
                    break;
            }
            compositeId = LiveVariableUtils.getCompositeIDURL(options.compositeKeysData);
        }
        dbName = variable.liveSource;
        /*Set the "data" in the request to "undefined" if there is no data.
        * This handles cases such as "Delete" requests where data should not be passed.*/
        if (_.isEmpty(rowObject) && action === 'deleteTableData') {
            rowObject = undefined;
        }
        if ((action === 'updateCompositeTableData' || action === 'deleteCompositeTableData') && options.period) {
            // capitalize first character
            action = 'period' + action.charAt(0).toUpperCase() + action.substr(1);
        }
        var dbOperations = {
            'projectID': projectID,
            'service': variable._prefabName ? '' : 'services',
            'dataModelName': dbName,
            'entityName': variable.type,
            'id': !_.isUndefined(options.id) ? encodeURIComponent(options.id) : compositeId,
            'data': rowObject,
            'url': variable._prefabName ? ($rootScope.project.deployedUrl + '/prefabs/' + variable._prefabName) : $rootScope.project.deployedUrl
        };
        onCUDerror = function (response, reject) {
            var errMsg = response.error;
            var advancedOptions = _this.prepareCallbackOptions(response);
            // EVENT: ON_RESULT
            initiateCallback(VARIABLE_CONSTANTS.EVENT.RESULT, variable, errMsg, advancedOptions);
            // EVENT: ON_ERROR
            if (!options.skipNotification) {
                initiateCallback(VARIABLE_CONSTANTS.EVENT.ERROR, variable, errMsg, advancedOptions);
            }
            // EVENT: ON_CAN_UPDATE
            variable.canUpdate = true;
            initiateCallback(VARIABLE_CONSTANTS.EVENT.CAN_UPDATE, variable, errMsg, advancedOptions);
            triggerFn(error, errMsg);
            reject(errMsg);
        };
        onCUDsuccess = function (data, resolve) {
            var response = data.body || data.data;
            var advancedOptions = _this.prepareCallbackOptions(data);
            $queue.process(variable);
            /* if error received on making call, call error callback */
            if (response && response.error) {
                // EVENT: ON_RESULT
                initiateCallback(VARIABLE_CONSTANTS.EVENT.RESULT, variable, response, advancedOptions);
                // EVENT: ON_ERROR
                initiateCallback(VARIABLE_CONSTANTS.EVENT.ERROR, variable, response.error, advancedOptions);
                // EVENT: ON_CAN_UPDATE
                variable.canUpdate = true;
                initiateCallback(VARIABLE_CONSTANTS.EVENT.CAN_UPDATE, variable, response.error, advancedOptions);
                triggerFn(error, response.error);
                return Promise.reject(response.error);
            }
            // EVENT: ON_RESULT
            initiateCallback(VARIABLE_CONSTANTS.EVENT.RESULT, variable, response, advancedOptions);
            if (variable.operation !== 'read') {
                // EVENT: ON_PREPARESETDATA
                var newDataSet = initiateCallback(VARIABLE_CONSTANTS.EVENT.PREPARE_SETDATA, variable, response, advancedOptions);
                if (newDataSet) {
                    // setting newDataSet as the response to service variable onPrepareSetData
                    response = newDataSet;
                }
                variable.dataSet = response;
            }
            // watchers should get triggered before calling onSuccess event.
            // so that any variable/widget depending on this variable's data is updated
            variable.notify(VariableEvents.AFTER_INVOKE, [_this, response]);
            setTimeout(function () {
                // EVENT: ON_SUCCESS
                initiateCallback(VARIABLE_CONSTANTS.EVENT.SUCCESS, variable, response, advancedOptions);
                // EVENT: ON_CAN_UPDATE
                variable.canUpdate = true;
                initiateCallback(VARIABLE_CONSTANTS.EVENT.CAN_UPDATE, variable, response, advancedOptions);
            });
            triggerFn(success, response);
            resolve(response);
        };
        return new Promise(function (resolve, reject) {
            _this.makeCall(variable, action, dbOperations).then(function (data) {
                onCUDsuccess(data, resolve);
            }, function (response) {
                onCUDerror(response, reject);
            });
        });
    };
    LiveVariableManager.prototype.aggregateData = function (deployedUrl, variable, options, success, error) {
        var _this = this;
        var tableOptions, dbOperationOptions, aggregateDataSuccess, aggregateDataError;
        var dbOperation = 'executeAggregateQuery';
        options = options || {};
        options.skipEncode = true;
        if (variable.filterFields) {
            tableOptions = LiveVariableUtils.prepareTableOptions(variable, options);
            options.aggregations.filter = tableOptions.query;
        }
        dbOperationOptions = {
            'dataModelName': variable.liveSource,
            'entityName': variable.type,
            'page': options.page || 1,
            'size': options.size || variable.maxResults,
            'sort': options.sort || '',
            'url': deployedUrl,
            'data': options.aggregations
        };
        aggregateDataSuccess = function (response, resolve) {
            if (response && response.type) {
                if ((response && response.error) || !response) {
                    triggerFn(error, response.error);
                    return;
                }
                triggerFn(success, response);
                resolve(response);
            }
        };
        aggregateDataError = function (errorMsg, reject) {
            triggerFn(error, errorMsg);
            reject(errorMsg);
        };
        return new Promise(function (resolve, reject) {
            _this.makeCall(variable, dbOperation, dbOperationOptions).then(function (response) {
                aggregateDataSuccess(response, resolve);
            }, function (err) {
                aggregateDataError(err, reject);
            });
        });
    };
    // *********************************************************** PUBLIC ***********************************************************//
    /**
     * Makes http call for a Live Variable against the configured DB Entity.
     * Gets the paginated records against the entity
     * @param variable
     * @param options
     * @param success
     * @param error
     * @returns {Promise<any>}: will be resolved on successful data fetch
     */
    LiveVariableManager.prototype.listRecords = function (variable, options, success, error) {
        var _this = this;
        options = options || {};
        options.filterFields = options.filterFields || getClonedObject(variable.filterFields);
        return $queue.submit(variable).then(function () {
            _this.notifyInflight(variable, !options.skipToggleState, undefined, options);
            return _this.getEntityData(variable, options, success, error)
                .then(function (response) {
                $queue.process(variable);
                _this.notifyInflight(variable, false, response);
                return Promise.resolve(response);
            }, function (err) {
                $queue.process(variable);
                _this.notifyInflight(variable, false, err);
                return Promise.reject(err);
            });
        }, error);
    };
    /**
     * Makes a POST http call for a Live Variable against the configured DB Entity.
     * Sends a Table record object with the request body
     * the record is inserted into the entity at the backend
     * @param variable
     * @param options
     * @param success
     * @param error
     * @returns {Promise<any>}: will be resolved on successful data fetch
     */
    LiveVariableManager.prototype.insertRecord = function (variable, options, success, error) {
        return this.performCUD('insertTableData', variable, options, success, error);
    };
    /**
     * Makes a PUT http call for a Live Variable against the configured DB Entity.
     * Sends a Table record object with the request body against the primary key of an existing record
     * the record is updated into the entity at the backend
     * @param variable
     * @param options
     * @param success
     * @param error
     * @returns {Promise<any>}: will be resolved on successful data fetch
     */
    LiveVariableManager.prototype.updateRecord = function (variable, options, success, error) {
        return this.performCUD('updateTableData', variable, options, success, error);
    };
    /**
     * Makes a DELETE http call for a Live Variable against the configured DB Entity.
     * Sends the primary key of an existing record
     * the record is deleted from the entity at the backend
     * @param variable
     * @param options
     * @param success
     * @param error
     * @returns {Promise<any>}: will be resolved on successful data fetch
     */
    LiveVariableManager.prototype.deleteRecord = function (variable, options, success, error) {
        return this.performCUD('deleteTableData', variable, options, success, error);
    };
    /**
     * sets the value against passed key on the "inputFields" object in the variable
     * @param variable
     * @param key: can be:
     *  - a string e.g. "username"
     *  - an object, e.g. {"username": "john", "ssn": "11111"}
     * @param val
     * - if key is string, the value against it (for that data type)
     * - if key is object, not required
     * @param options
     * @returns {any}
     */
    LiveVariableManager.prototype.setInput = function (variable, key, val, options) {
        variable.inputFields = variable.inputFields || {};
        return setInput(variable.inputFields, key, val, options);
    };
    /**
     * sets the value against passed key on the "filterFields" object in the variable
     * @param variable
     * @param key: can be:
     *  - a string e.g. "username"
     *  - an object, e.g. {"username": "john", "ssn": "11111"}
     * @param val
     * - if key is string, the value against it (for that data type)
     * - if key is object, not required
     * @param options
     * @returns {any}
     */
    LiveVariableManager.prototype.setFilter = function (variable, key, val) {
        var paramObj = {}, targetObj = {};
        if (_.isObject(key)) {
            paramObj = key;
        }
        else {
            paramObj[key] = val;
        }
        if (!variable.filterExpressions || _.isEmpty(variable.filterExpressions)) {
            variable.filterExpressions = { 'condition': 'AND', 'rules': [] };
        }
        targetObj = variable.filterExpressions;
        // find the existing criteria if present or else return null. Find the first one and return.
        // If the user wants to set a different object, then he has to use the getCriteria API defined
        // on the dataFilter object passed to the onBeforeListRecords
        function getExistingCriteria(filterField) {
            var existingCriteria = null;
            LiveVariableUtils.traverseFilterExpressions(targetObj, function (filterExpressions, criteria) {
                if (filterField === criteria.target) {
                    return existingCriteria = criteria;
                }
            });
            return existingCriteria;
        }
        _.forEach(paramObj, function (paramVal, paramKey) {
            var existingCriteria = getExistingCriteria(paramKey);
            if (existingCriteria !== null) {
                existingCriteria.value = paramVal;
            }
            else {
                targetObj.rules.push({
                    target: paramKey,
                    type: '',
                    matchMode: '',
                    value: paramVal,
                    required: false
                });
            }
        });
        return targetObj;
    };
    /**
     * Makes a file download call for a table
     * @param variable
     * @param options
     */
    LiveVariableManager.prototype.download = function (variable, options, successHandler, errorHandler) {
        var _this = this;
        options = options || {};
        var tableOptions, dbOperationOptions, downloadSuccess, downloadError;
        var data = {};
        var dbOperation = 'exportTableData';
        var projectID = $rootScope.project.id || $rootScope.projectName;
        options.data.searchWithQuery = true; // For export, query api is used. So set this flag to true
        options.data.skipEncode = true;
        tableOptions = LiveVariableUtils.prepareTableOptions(variable, options.data, undefined);
        data.query = tableOptions.query ? tableOptions.query : '';
        data.exportSize = options.data.exportSize;
        data.exportType = options.data.exportType;
        data.fields = formatExportExpression(options.data.fields);
        if (options.data.fileName) {
            data.fileName = options.data.fileName;
        }
        dbOperationOptions = {
            'projectID': projectID,
            'service': variable.getPrefabName() ? '' : 'services',
            'dataModelName': variable.liveSource,
            'entityName': variable.type,
            'sort': tableOptions.sort,
            'url': variable.getPrefabName() ? ($rootScope.project.deployedUrl + '/prefabs/' + variable.getPrefabName()) : $rootScope.project.deployedUrl,
            'data': data,
            'filter': LiveVariableUtils.getWhereClauseGenerator(variable, options)
            // 'filterMeta'    : tableOptions.filter
        };
        downloadSuccess = function (response, resolve) {
            if (response && response.type) {
                window.location.href = response.body.result;
                triggerFn(successHandler, response);
                resolve(response);
            }
        };
        downloadError = function (err, reject) {
            var opt = _this.prepareCallbackOptions(err.details);
            initiateCallback(VARIABLE_CONSTANTS.EVENT.ERROR, variable, err.error, opt);
            triggerFn(errorHandler, err.error);
            reject(err);
        };
        return new Promise(function (resolve, reject) {
            _this.makeCall(variable, dbOperation, dbOperationOptions).then(function (response) {
                downloadSuccess(response, resolve);
            }, function (error) {
                downloadError(error, reject);
            });
        });
    };
    /**
     * gets primary keys against the passed related Table
     * @param variable
     * @param relatedField
     * @returns {any}
     */
    LiveVariableManager.prototype.getRelatedTablePrimaryKeys = function (variable, relatedField) {
        var primaryKeys, result, relatedCols;
        if (!variable.propertiesMap) {
            return;
        }
        result = _.find(variable.propertiesMap.columns || [], { 'fieldName': relatedField });
        // if related field name passed, get its type from columns inside the current field
        if (result) {
            relatedCols = result.columns;
            primaryKeys = _.map(_.filter(relatedCols, 'isPrimaryKey'), 'fieldName');
            if (primaryKeys.length) {
                return primaryKeys;
            }
            if (relatedCols && relatedCols.length) {
                relatedCols = _.find(relatedCols, { 'isRelated': false });
                return relatedCols && relatedCols.fieldName;
            }
        }
    };
    /**
     * Makes HTTP call to get the data for related entity of a field in an entity
     * @param variable
     * @param columnName
     * @param options
     * @param success
     * @param error
     */
    LiveVariableManager.prototype.getRelatedTableData = function (variable, columnName, options, success, error) {
        var _this = this;
        var projectID = $rootScope.project.id || $rootScope.projectName;
        var relatedTable = _.find(variable.relatedTables, function (table) { return table.relationName === columnName || table.columnName === columnName; }); // Comparing column name to support the old projects
        var selfRelatedCols = _.map(_.filter(variable.relatedTables, function (o) { return o.type === variable.type; }), 'relationName');
        var filterFields = [];
        var orderBy, filterOptions, query, action, dbOperationOptions, getRelatedTableDataSuccess, getRelatedTableDataError;
        _.forEach(options.filterFields, function (value, key) {
            value.fieldName = key;
            value.type = LiveVariableUtils.getFieldType(columnName, variable, key);
            /**
             * for 'in' mode we are taking the input as comma separated values and for between in ui there are two different fields
             * but these are processed and merged into a single value with comma as separator. For these conditions like 'in' and 'between',
             * for building the query, the function expects the values to be an array
             */
            if (value.filterCondition === DB_CONSTANTS.DATABASE_MATCH_MODES.in.toLowerCase() || value.filterCondition === DB_CONSTANTS.DATABASE_MATCH_MODES.between.toLowerCase()) {
                value.value = value.value.split(',');
            }
            filterFields.push(value);
        });
        filterOptions = LiveVariableUtils.getFilterOptions(variable, filterFields, options);
        query = LiveVariableUtils.getSearchQuery(filterOptions, ' ' + (options.logicalOp || 'AND') + ' ', variable.ignoreCase);
        if (options.filterExpr) {
            var _clonedFields = getClonedObject(_.isObject(options.filterExpr) ? options.filterExpr : JSON.parse(options.filterExpr));
            LiveVariableUtils.processFilterFields(_clonedFields.rules, variable, options);
            var filterExpQuery = LiveVariableUtils.generateSearchQuery(_clonedFields.rules, _clonedFields.condition, variable.ignoreCase, options.skipEncode);
            if (query !== '') {
                if (filterExpQuery !== '') {
                    query = '(' + query + ') AND (' + filterExpQuery + ')';
                }
            }
            else if (filterExpQuery !== '') {
                query = filterExpQuery;
            }
        }
        query = query ? ('q=' + query) : '';
        action = 'searchTableDataWithQuery';
        orderBy = _.isEmpty(options.orderBy) ? '' : 'sort=' + options.orderBy;
        dbOperationOptions = {
            projectID: projectID,
            service: variable.getPrefabName() ? '' : 'services',
            dataModelName: variable.liveSource,
            entityName: relatedTable ? relatedTable.type : '',
            page: options.page || 1,
            size: options.pagesize || undefined,
            url: variable.getPrefabName() ? ($rootScope.project.deployedUrl + '/prefabs/' + variable.getPrefabName()) : $rootScope.project.deployedUrl,
            data: query || '',
            filter: LiveVariableUtils.getWhereClauseGenerator(variable, options),
            sort: orderBy
        };
        getRelatedTableDataSuccess = function (res, resolve) {
            if (res && (res.type || res.status)) {
                var response = res.body || res.data;
                /*Remove the self related columns from the data. As backend is restricting the self related column to one level, In liveform select, dataset and datavalue object
                 * equality does not work. So, removing the self related columns to acheive the quality*/
                var data = _.map(response.content, function (o) { return _.omit(o, selfRelatedCols); });
                var pagination = Object.assign({}, response);
                delete pagination.content;
                decodeData(data);
                var result = { data: data, pagination: pagination };
                triggerFn(success, result);
                resolve(result);
            }
        };
        getRelatedTableDataError = function (errMsg, reject) {
            triggerFn(error, errMsg);
            reject(errMsg);
        };
        return new Promise(function (resolve, reject) {
            _this.makeCall(variable, action, dbOperationOptions).then(function (response) {
                getRelatedTableDataSuccess(response, resolve);
            }, function (err) {
                getRelatedTableDataError(err, reject);
            });
        });
    };
    /**
     * Gets the distinct records for an entity
     * @param variable
     * @param options
     * @param success
     * @param error
     */
    LiveVariableManager.prototype.getDistinctDataByFields = function (variable, options, success, error) {
        var _this = this;
        var dbOperation = 'getDistinctDataByFields';
        var projectID = $rootScope.project.id || $rootScope.projectName;
        var requestData = {};
        var sort;
        var tableOptions, dbOperationOptions, getDistinctDataByFieldsSuccess, getDistinctDataByFieldsError;
        options.skipEncode = true;
        options.operation = 'read';
        options = options || {};
        tableOptions = LiveVariableUtils.prepareTableOptions(variable, options);
        if (tableOptions.query) {
            requestData.filter = tableOptions.query;
        }
        requestData.groupByFields = _.isArray(options.fields) ? options.fields : [options.fields];
        sort = options.sort || requestData.groupByFields[0] + ' asc';
        sort = sort ? 'sort=' + sort : '';
        dbOperationOptions = {
            'projectID': projectID,
            'service': variable.getPrefabName() ? '' : 'services',
            'dataModelName': variable.liveSource,
            'entityName': options.entityName || variable.type,
            'page': options.page || 1,
            'size': options.pagesize,
            'sort': sort,
            'data': requestData,
            'filter': LiveVariableUtils.getWhereClauseGenerator(variable, options),
            'url': variable.getPrefabName() ? ($rootScope.project.deployedUrl + '/prefabs/' + variable.getPrefabName()) : $rootScope.project.deployedUrl
        };
        getDistinctDataByFieldsSuccess = function (response, resolve) {
            if (response && response.type) {
                if ((response && response.error) || !response) {
                    triggerFn(error, response.error);
                    return Promise.reject(response.error);
                }
                var result = response.body;
                var pagination = Object.assign({}, response.body);
                delete pagination.content;
                result = { data: result.content, pagination: pagination };
                triggerFn(success, result);
                resolve(result);
            }
        };
        getDistinctDataByFieldsError = function (errorMsg, reject) {
            triggerFn(error, errorMsg);
            reject(errorMsg);
        };
        return new Promise(function (resolve, reject) {
            _this.makeCall(variable, dbOperation, dbOperationOptions).then(function (response) {
                getDistinctDataByFieldsSuccess(response, resolve);
            }, function () {
                getDistinctDataByFieldsError(error, reject);
            });
        });
    };
    /*Function to get the aggregated data based on the fields chosen*/
    LiveVariableManager.prototype.getAggregatedData = function (variable, options, success, error) {
        var deployedURL = appManager.getDeployedURL();
        if (deployedURL) {
            return this.aggregateData(deployedURL, variable, options, success, error);
        }
    };
    LiveVariableManager.prototype.defineFirstLastRecord = function (variable) {
        if (variable.operation === 'read') {
            Object.defineProperty(variable, 'firstRecord', {
                'configurable': true,
                'get': function () {
                    return _.get(variable.dataSet, 'data[0]', {});
                }
            });
            Object.defineProperty(variable, 'lastRecord', {
                'configurable': true,
                'get': function () {
                    var data = _.get(variable.dataSet, 'data', []);
                    return data[data.length - 1];
                }
            });
        }
    };
    LiveVariableManager.prototype.getPrimaryKey = function (variable) {
        return LiveVariableUtils.getPrimaryKey(variable);
    };
    // Returns the search query params.
    LiveVariableManager.prototype.prepareRequestParams = function (options) {
        var requestParams;
        var searchKeys = _.split(options.searchKey, ','), matchModes = _.split(options.matchMode, ','), formFields = {};
        _.forEach(searchKeys, function (colName, index) {
            formFields[colName] = {
                value: options.query,
                logicalOp: 'AND',
                matchMode: matchModes[index] || matchModes[0] || 'startignorecase'
            };
        });
        requestParams = {
            filterFields: formFields,
            page: options.page,
            pagesize: options.limit || options.pagesize,
            skipDataSetUpdate: true,
            skipToggleState: true,
            inFlightBehavior: 'executeAll',
            logicalOp: 'OR',
            orderBy: options.orderby ? _.replace(options.orderby, /:/g, ' ') : ''
        };
        if (options.onBeforeservicecall) {
            options.onBeforeservicecall(formFields);
        }
        return requestParams;
    };
    /**
     * Gets the filtered records based on searchKey
     * @param variable
     * @param options contains the searchKey and queryText
     * @param success
     * @param error
     * @returns {Promise<any>}
     */
    LiveVariableManager.prototype.searchRecords = function (variable, options, success, error) {
        var requestParams = this.prepareRequestParams(options);
        return this.listRecords(variable, requestParams, success, error);
    };
    /**
     * used in onBeforeUpdate call - called last in the function - used in old Variables using dataBinding.
     * This function migrates the old data dataBinding to filterExpressions equivalent format
     * @param variable
     * @param inputData
     * @private
     */
    LiveVariableManager.prototype.upgradeInputDataToFilterExpressions = function (variable, response, inputData) {
        if (_.isObject(response)) {
            inputData = response;
            inputData.condition = 'AND';
            inputData.rules = [];
        }
        /**
         * if the user deletes a particular criteria, we need to remove this form our data aswell.
         * so we are keeping a copy of it and the emptying the existing object and now fill it with the
         * user set criteria. If its just modified, change the data and push it tohe rules or else just add a new criteria
         */
        var clonedRules = _.cloneDeep(inputData.rules);
        inputData.rules = [];
        _.forEach(inputData, function (valueObj, key) {
            if (key !== 'condition' && key !== 'rules') {
                var filteredObj = _.find(clonedRules, function (o) { return o.target === key; });
                // if the key is found update the value, else create a new rule obj and add it to the existing rules
                if (filteredObj) {
                    filteredObj.value = valueObj.value;
                    filteredObj.matchMode = valueObj.matchMode || valueObj.filterCondition || filteredObj.matchMode || '';
                    inputData.rules.push(filteredObj);
                }
                else {
                    inputData.rules.push({
                        'target': key,
                        'type': '',
                        'matchMode': valueObj.matchMode || valueObj.filterCondition || '',
                        'value': valueObj.value,
                        'required': false
                    });
                }
                delete inputData[key];
            }
        });
        return inputData;
    };
    /**
     * used in onBeforeUpdate call - called first in the function - used in old Variables using dataBinding.
     * This function migrates the filterExpressions object to flat map structure
     * @param variable
     * @param inputData
     * @private
     */
    LiveVariableManager.prototype.downgradeFilterExpressionsToInputData = function (variable, inputData) {
        if (inputData.hasOwnProperty('getFilterFields')) {
            inputData = inputData.getFilterFields();
        }
        _.forEach(inputData.rules, function (ruleObj) {
            if (!_.isNil(ruleObj.target) && ruleObj.target !== '') {
                inputData[ruleObj.target] = {
                    'value': ruleObj.value,
                    'matchMode': ruleObj.matchMode
                };
            }
        });
        return inputData;
    };
    LiveVariableManager.prototype.cancel = function (variable, options) {
        if ($queue.requestsQueue.has(variable) && variable._observable) {
            variable._observable.unsubscribe();
            $queue.process(variable);
            // notify inflight variable
            this.notifyInflight(variable, false);
        }
    };
    return LiveVariableManager;
}(BaseVariableManager));
export { LiveVariableManager };
//# sourceMappingURL=live-variable.manager.js.map