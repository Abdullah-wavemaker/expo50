import { IDataSource } from "../../types/types";
import { ApiAwareVariable } from './api-aware-variable';
export declare class LiveVariable extends ApiAwareVariable implements IDataSource {
    matchMode: any;
    liveSource: any;
    propertiesMap: any;
    pagination: any;
    type: any;
    orderBy: any;
    _options: any;
    _observable: any;
    filterExpressions: any;
    httpService: any;
    dateFormatter: any;
    constructor(variable: any);
    execute(operation: any, options: any): any;
    listRecords(options?: any, success?: any, error?: any): Promise<unknown>;
    updateRecord(options?: any, success?: any, error?: any): Promise<unknown>;
    insertRecord(options?: any, success?: any, error?: any): Promise<unknown>;
    deleteRecord(options?: any, success?: any, error?: any): Promise<unknown>;
    setInput(key: any, val: any, options: any): any;
    setFilter(key: any, val: any): any;
    download(options: any, success?: any, error?: any): Promise<unknown>;
    invoke(options?: any, success?: any, error?: any): Promise<unknown>;
    getRelatedTablePrimaryKeys(columnName: any): any;
    getRelatedTableData(columnName: any, options: any, success?: any, error?: any): Promise<unknown>;
    getDistinctDataByFields(options: any, success?: any, error?: any): Promise<unknown>;
    getAggregatedData(options: any, success?: any, error?: any): Promise<unknown>;
    getPrimaryKey(): any;
    searchRecords(options: any, success?: any, error?: any): Promise<unknown>;
    getRequestParams(options: any): any;
    _downgradeInputData(data: any): any;
    _upgradeInputData(response: any, data: any): any;
    setOrderBy(expression: any): any;
    update(options?: any, success?: any, error?: any): Promise<unknown>;
    createRecord(options?: any, success?: any, error?: any): Promise<unknown>;
    init(): void;
    invokeOnFiltertExpressionChange(obj: any, targetNodeKey: any, newVal: any, oldVal: any): void;
    cancel(options?: any): void;
}
