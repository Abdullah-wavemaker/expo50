import { ModelVariable } from '@wavemaker/app-rn-runtime/variables/model-variable';
import { ServiceVariable } from '@wavemaker/app-rn-runtime/variables/service-variable';
import { LiveVariable } from '@wavemaker/app-rn-runtime/variables/live-variable';
import { NavigationAction } from '@wavemaker/app-rn-runtime/actions/navigation-action';
import { TimerAction } from '@wavemaker/app-rn-runtime/actions/timer-action';
import { NotificationAction } from '@wavemaker/app-rn-runtime/actions/notification-action';
import { DeviceVariable } from '@wavemaker/app-rn-runtime/variables/device-variable';
import { LoginAction } from '@wavemaker/app-rn-runtime/actions/login-action';
import { LogoutAction } from '@wavemaker/app-rn-runtime/actions/logout-action';
import {
  getEntityPropertyMap,
  getEntityRelatedTables,
} from '../metadata/entities/entity-provider';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import React from 'react';

export default App => {
  return {
    Variables: {
      appInfo: new DeviceVariable({
        name: 'appInfo',
        _context: App,
        operation: 'getAppInfo',
        service: 'device',
        paramProvider: () => ({}),
      }),
      boolean: new ModelVariable({
        name: 'boolean',
        _context: App,
        paramProvider: () => [{ dataValue: 'true' }, { dataValue: 'false' }],
        isList: true,
      }),
      chartData: new ModelVariable({
        name: 'chartData',
        _context: App,
        paramProvider: () => [
          { date: '08-01-2022', value: 228000 },
          { date: '09-01-2022', value: 210000 },
          { date: '10-01-2022', value: 206000 },
          { date: '11-01-2022', value: 215000 },
          { date: '12-01-2022', value: 222000 },
          { date: '01-01-2023', value: 205000 },
          { date: '02-01-2023', value: 195000 },
          { date: '03-01-2023', value: 213000 },
          { date: '04-01-2023', value: 208000 },
          { date: '05-01-2023', value: 204000 },
          { date: '06-01-2023', value: 190000 },
          { date: '07-01-2023', value: 180000 },
        ],
        isList: true,
      }),
      chartdata2: new ModelVariable({
        name: 'chartdata2',
        _context: App,
        paramProvider: () => [
          { name: 'John', value: 228000 },
          { name: 'Alice', value: 210000 },
          { name: 'Bob', value: 206000 },
          { name: 'Eva', value: 215000 },
          { name: 'Charlie', value: 222000 },
          { name: 'Sophia', value: 205000 },
          { name: 'Daniel', value: 195000 },
          { name: 'Grace', value: 213000 },
          { name: 'Oliver', value: 208000 },
          { name: 'Mia', value: 204000 },
        ],
        isList: true,
      }),
      chips: new ModelVariable({
        name: 'chips',
        _context: App,
        paramProvider: () => [
          {
            name: 'Ethan Thompson',
            imgSrc:
              'https://m.media-amazon.com/images/M/MV5BMGNhODY0ZjktYjY2ZS00MGNkLTg2ZTUtMGEwNGRlMmY3ZjQ4XkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_.jpg',
            Designation: 'Senior Software Engineer',
          },
          {
            name: 'Jackson Harris',
            imgSrc:
              'data:image/jpeg;base64,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',
            Designation: 'Software Developer',
          },
          {
            name: 'Olivia Rodriguez',
            imgSrc:
              'data:image/jpeg;base64,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',
            Designation: 'Data Scientist',
          },
          {
            name: 'Isabella Garcia',
            imgSrc:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYHW3Vy1-oeLGeE7xoybQzImGHBOLp2zkekg&usqp=CAU',
            Designation: 'UX/UI Designer',
          },
          {
            name: 'Mason White',
            imgSrc:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVNfYWpCPggh76gl-TrGcPFyvMQG8o5COVTQ&usqp=CAU',
            Designation: 'DevOps Engineer',
          },
          {
            name: 'Sophia Taylor',
            imgSrc:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo7OeXS8D8gsi14ZcKsWCK3p20a2pqNERitw&usqp=CAU',
            Designation: 'Network Engineer',
          },
          {
            name: 'Aiden Smith',
            imgSrc:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKh8FZrPRiFVBB3-DVtwHpS7ZuNWiqJlknJA&usqp=CAU',
            Designation: 'Business Analyst',
          },
          {
            name: 'Grace Anderson',
            imgSrc:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAbQImK-vDLX38nhWge709TeYVw07-Tx1hgA&usqp=CAU',
            Designation: 'Quality Assurance Engineer',
          },
          {
            name: 'Elijah Parker',
            imgSrc:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPHUFLa9mhNmKPnSgsrH2qpbdoP4xlN9PaAKvSrEXub6HlOmx1Y24JAMKFGDV2XEiwEkM&usqp=CAU',
            Designation: 'Product Manager',
          },
        ],
        isList: true,
      }),
      cities: new ModelVariable({
        name: 'cities',
        _context: App,
        paramProvider: () => [
          { name: 'Delhi', dataValue: 30 },
          { name: 'Htyderabad', dataValue: 50 },
          { name: 'Chennai', dataValue: 20 },
        ],
        isList: true,
      }),
      dateFormats: new ModelVariable({
        name: 'dateFormats',
        _context: App,
        paramProvider: () => [
          { date: '1/15/2023' },
          { date: '1-15-2023' },
          { date: '1.15.2023' },
          { date: '2023/01/15' },
          { date: '2023-01-15' },
          { date: '2023.01.15' },
          { date: '01/15/23' },
          { date: '01-5-23' },
          { date: '1.15.23' },
          { date: '15 January 2023' },
          { date: '15 Jan 2023' },
          { date: 'January 15, 2023' },
        ],
        isList: true,
      }),
      deviceInfo: new DeviceVariable({
        name: 'deviceInfo',
        _context: App,
        operation: 'getDeviceInfo',
        service: 'device',
        paramProvider: () => ({}),
      }),
      filterDepartments: new ServiceVariable({
        name: 'filterDepartments',
        _context: App,
        serviceType: 'OpenAPIService',
        operation: 'HRdatabase_DepartmentController_filterDepartments',
        service: 'HRdatabase',
        maxResults: '20',
        operationId: 'HRdatabase_DepartmentController_filterDepartments',
        paramProvider: () => ({}),
        baseUrl: App.baseUrl + '/services',
        getServiceInfo: () =>
          App.serviceDefinitions[
            'HRdatabase_DepartmentController_filterDepartments'
          ]?.wmServiceOperationInfo,
        inFlightBehavior: 'executeLast',
        isList: true,
      }),
      findEmployees: new ServiceVariable({
        name: 'findEmployees',
        _context: App,
        serviceType: 'OpenAPIService',
        operation: 'HRdatabase_EmployeeController_findEmployees',
        service: 'HRdatabase',
        maxResults: '20',
        operationId: 'HRdatabase_EmployeeController_findEmployees',
        paramProvider: () => ({}),
        baseUrl: App.baseUrl + '/services',
        getServiceInfo: () =>
          App.serviceDefinitions['HRdatabase_EmployeeController_findEmployees']
            ?.wmServiceOperationInfo,
        inFlightBehavior: 'executeLast',
        isList: true,
      }),
      getDepartment: new ServiceVariable({
        name: 'getDepartment',
        _context: App,
        serviceType: 'OpenAPIService',
        operation: 'HRdatabase_DepartmentController_getDepartment',
        service: 'HRdatabase',
        maxResults: '20',
        operationId: 'HRdatabase_DepartmentController_getDepartment',
        paramProvider: () => ({}),
        baseUrl: App.baseUrl + '/services',
        getServiceInfo: () =>
          App.serviceDefinitions[
            'HRdatabase_DepartmentController_getDepartment'
          ]?.wmServiceOperationInfo,
        inFlightBehavior: 'executeLast',
      }),
      menuitems: new ModelVariable({
        name: 'menuitems',
        _context: App,
        paramProvider: () => [
          { itemlabel: 'Item1', itemicon: 'wi wi-menu', itemlink: '/item1' },
          { itemlabel: 'Item2', itemicon: 'wi wi-refresh', itemlink: '/item2' },
          { itemlabel: 'Item3', itemicon: 'wi wi-adb', itemlink: '/item2' },
          { itemlabel: 'Item1', itemicon: 'wi wi-pool', itemlink: '/item1' },
          {
            itemlabel: 'Item2',
            itemicon: 'wi wi-more-vert',
            itemlink: '/item2',
          },
          { itemlabel: 'Item3', itemicon: 'wi wi-check', itemlink: '/item2' },
          {
            itemlabel: 'Item1',
            itemicon: 'wi wi-last-page',
            itemlink: '/item1',
          },
          { itemlabel: 'Item2', itemicon: 'wi wi-menu', itemlink: '/item2' },
          { itemlabel: 'Item3', itemicon: 'wi wi-menu', itemlink: '/item2' },
        ],
        isList: true,
      }),
      nestedListData: new ModelVariable({
        name: 'nestedListData',
        _context: App,
        paramProvider: () => [
          {
            company: 'XYZ Corporation',
            departments: [
              {
                name: 'Human Resources',
                manager: 'John Doe',
                employees: [
                  { name: 'Alice' },
                  { name: 'Bob' },
                  { name: 'Charlie' },
                ],
              },
              {
                name: 'Finance',
                manager: 'Jane Smith',
                employees: [
                  { name: 'David' },
                  { name: 'Eva' },
                  { name: 'Frank' },
                ],
              },
              {
                name: 'Engineering',
                manager: 'Michael Johnson',
                employees: [
                  { name: 'Grace' },
                  { name: 'Henry' },
                  { name: 'Ivy' },
                ],
              },
            ],
          },
          {
            company: 'ABC Corporation',
            departments: [
              {
                name: 'Sales',
                manager: 'Sarah Brown',
                employees: [
                  { name: 'Jack' },
                  { name: 'Karen' },
                  { name: 'Liam' },
                ],
              },
              {
                name: 'Marketing',
                manager: 'Thomas Wilson',
                employees: [
                  { name: 'Mia' },
                  { name: 'Nathan' },
                  { name: 'Olivia' },
                ],
              },
              {
                name: 'Research and Development',
                manager: 'Emily Garcia',
                employees: [
                  { name: 'Peter' },
                  { name: 'Quinn' },
                  { name: 'Rachel' },
                ],
              },
            ],
          },
        ],
        isList: true,
      }),
      radiosetData: new ModelVariable({
        name: 'radiosetData',
        _context: App,
        paramProvider: () => [
          { displayvalue: 'chicken', dataValue: 'option1' },
          { displayvalue: 'mutton', dataValue: 'option2' },
          { displayvalue: 'fish', dataValue: 'option3' },
        ],
        isList: true,
      }),
      serviceVariable1: new ServiceVariable({
        name: 'serviceVariable1',
        _context: App,
        serviceType: 'OpenAPIService',
        operation: 'HRdatabase_EmployeeController_getEmployee',
        service: 'HRdatabase',
        maxResults: '20',
        operationId: 'HRdatabase_EmployeeController_getEmployee',
        paramProvider: () => ({
          empId: App.eval(() => App.Widgets.search1.query),
        }),
        baseUrl: App.baseUrl + '/services',
        getServiceInfo: () =>
          App.serviceDefinitions['HRdatabase_EmployeeController_getEmployee']
            ?.wmServiceOperationInfo,
        inFlightBehavior: 'executeLast',
      }),
      serviceVariable2: new ServiceVariable({
        name: 'serviceVariable2',
        _context: App,
        serviceType: 'OpenAPIService',
        operation: 'HRdatabase_DepartmentController_findDepartments',
        service: 'HRdatabase',
        maxResults: '20',
        operationId: 'HRdatabase_DepartmentController_findDepartments',
        paramProvider: () => ({}),
        baseUrl: App.baseUrl + '/services',
        getServiceInfo: () =>
          App.serviceDefinitions[
            'HRdatabase_DepartmentController_findDepartments'
          ]?.wmServiceOperationInfo,
        inFlightBehavior: 'executeLast',
        isList: true,
      }),
      staticVariable1: new ModelVariable({
        name: 'staticVariable1',
        _context: App,
        paramProvider: () => [
          {
            name: 'name0',
            dataValue: 'dataValue0',
            city: 'hyderabad',
            country: 'india',
            email: 'abdullah.mohammed@wavemaker.com',
            Q1: 100,
            Q2: 200,
          },
        ],
        isList: true,
      }),
      staticVariable2: new ModelVariable({
        name: 'staticVariable2',
        _context: App,
        paramProvider: () => [
          { name: 'january', profit: 100, loss: 30, ebita: 35 },
          { name: 'febrauary', profit: 200, loss: 50, ebita: 140 },
          { name: 'march', profit: 300, loss: 70, ebita: 70 },
          { name: 'april', profit: 250, loss: 390, ebita: 90 },
          { name: 'may', profit: 310, loss: 230, ebita: 120 },
          { name: 'june', profit: 270, loss: 230, ebita: 460 },
          { name: 'july', profit: 370, loss: 430, ebita: 60 },
        ],
        isList: true,
      }),
      staticVariable3: new ModelVariable({
        name: 'staticVariable3',
        _context: App,
        paramProvider: () => [
          { key: 'key0', value: 'value0' },
          { key: 'key0', value: 'value0' },
          { key: 'key0', value: 'value0' },
        ],
        isList: true,
      }),
      staticVariable5: new ModelVariable({
        name: 'staticVariable5',
        _context: App,
        paramProvider: () => [
          { 'MM/DD/YYYY': '01/15/2023' },
          { 'MM-DD-YYYY': '01-15-2023' },
          { 'MM.DD.YYYY': '01.15.2023' },
          { 'YYYY/MM/DD': '2023/01/15' },
          { 'YYYY-MM-DD': '2023-01-15' },
          { 'YYYY.MM.DD': '2023.01.15' },
          { 'MM/DD/YY': '01/15/23' },
          { 'MM-DD-YY': '01-15-23' },
          { 'MM.DD.YY': '01.15.23' },
          { 'DD Month YYYY': '15 January 2023' },
          { 'DD MMM YYYY': '15 Jan 2023' },
          { 'Month DD, YYYY': 'January 15, 2023' },
        ],
        isList: true,
      }),
      staticVariable6: new ModelVariable({
        name: 'staticVariable6',
        _context: App,
        paramProvider: () => [
          { itemlabel: 'Item1' },
          { itemlabel: 'Item2' },
          { itemlabel: 'Item3' },
          { itemlabel: 'Item4' },
        ],
        isList: true,
      }),
      supportedLocale: new ModelVariable({
        name: 'supportedLocale',
        _context: App,
        paramProvider: () => ({ de: 'Deutsch', en: 'English', ar: 'العربية' }),
      }),
      testMenu: new ModelVariable({
        name: 'testMenu',
        _context: App,
        paramProvider: () => [{ name: 'name0' }, { name: 'name1' }],
        isList: true,
      }),
      testVariable: new ServiceVariable({
        name: 'testVariable',
        _context: App,
        serviceType: 'DataService',
        operation: 'createEmployee',
        service: 'hrdb',
        maxResults: '20',
        operationId: 'EmployeeController_createEmployee',
        paramProvider: () => ({}),
        baseUrl: App.baseUrl + '/services',
        getServiceInfo: () =>
          App.serviceDefinitions['EmployeeController_createEmployee']
            ?.wmServiceOperationInfo,
        inFlightBehavior: 'executeLast',
      }),
      wizard: new ModelVariable({
        name: 'wizard',
        _context: App,
        paramProvider: () => ({ dataValue: 'wizardstep5' }),
      }),
      WMS22575: new ModelVariable({
        name: 'WMS22575',
        _context: App,
        paramProvider: () => ({
          firstname: '',
          lastname: '',
          'Certified In': [],
          Address: { 'Building No.': '', City: '', State: '' },
        }),
      }),
      WMS23639: new ServiceVariable({
        name: 'WMS23639',
        _context: App,
        serviceType: 'RestService',
        operation: 'invoke',
        service: 'googleapis',
        maxResults: '20',
        operationId: 'googleapis_invoke',
        paramProvider: () => ({ q: '{q}' }),
        baseUrl: App.baseUrl + '/services',
        getServiceInfo: () =>
          App.serviceDefinitions['googleapis_invoke']?.wmServiceOperationInfo,
        inFlightBehavior: 'executeLast',
      }),
    },
    Actions: {
      appNotification: new NotificationAction({
        name: 'appNotification',
        _context: App,
        operation: 'toast',
        paramProvider: () => ({
          class: 'Error',
          toasterPosition: 'bottom right',
        }),
        onOk: (variable, data, options) => {},
        toasterService: () => App.appConfig.currentPage.toaster,
        onClose: (variable, data, options) => {},
      }),
      goToPage_Dates: new NavigationAction({
        name: 'goToPage_Dates',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'Dates',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_DecimalsForCurrency: new NavigationAction({
        name: 'goToPage_DecimalsForCurrency',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'DecimalsForCurrency',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_EV_test: new NavigationAction({
        name: 'goToPage_EV_test',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'EV_test',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_FIS_Test: new NavigationAction({
        name: 'goToPage_FIS_Test',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'FIS_Test',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_listMethods: new NavigationAction({
        name: 'goToPage_listMethods',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'listMethods',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_Main: new NavigationAction({
        name: 'goToPage_Main',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'Main',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_temp: new NavigationAction({
        name: 'goToPage_temp',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'temp',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_test: new NavigationAction({
        name: 'goToPage_test',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'test',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS21425: new NavigationAction({
        name: 'goToPage_WMS21425',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS21425',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS21512: new NavigationAction({
        name: 'goToPage_WMS21512',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS21512',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS21651: new NavigationAction({
        name: 'goToPage_WMS21651',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS21651',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS21671: new NavigationAction({
        name: 'goToPage_WMS21671',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS21671',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS21781: new NavigationAction({
        name: 'goToPage_WMS21781',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS21781',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS21922WMS22688: new NavigationAction({
        name: 'goToPage_WMS21922WMS22688',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS21922WMS22688',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS22045: new NavigationAction({
        name: 'goToPage_WMS22045',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS22045',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS22288: new NavigationAction({
        name: 'goToPage_WMS22288',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS22288',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS22337: new NavigationAction({
        name: 'goToPage_WMS22337',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS22337',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS22550: new NavigationAction({
        name: 'goToPage_WMS22550',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS22550',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS22575: new NavigationAction({
        name: 'goToPage_WMS22575',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS22575',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS22670WMS23987: new NavigationAction({
        name: 'goToPage_WMS22670WMS23987',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS22670WMS23987',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS22682WMS22124: new NavigationAction({
        name: 'goToPage_WMS22682WMS22124',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS22682WMS22124',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS22687: new NavigationAction({
        name: 'goToPage_WMS22687',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS22687',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS22706WMS22042: new NavigationAction({
        name: 'goToPage_WMS22706WMS22042',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS22706WMS22042',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS22739: new NavigationAction({
        name: 'goToPage_WMS22739',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS22739',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS22823: new NavigationAction({
        name: 'goToPage_WMS22823',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS22823',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS22841: new NavigationAction({
        name: 'goToPage_WMS22841',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS22841',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS22860: new NavigationAction({
        name: 'goToPage_WMS22860',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS22860',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS22916: new NavigationAction({
        name: 'goToPage_WMS22916',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS22916',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS22977: new NavigationAction({
        name: 'goToPage_WMS22977',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS22977',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS22987: new NavigationAction({
        name: 'goToPage_WMS22987',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS22987',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS22999WMS23781: new NavigationAction({
        name: 'goToPage_WMS22999WMS23781',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS22999WMS23781',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS23195: new NavigationAction({
        name: 'goToPage_WMS23195',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS23195',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS23269WMS23196: new NavigationAction({
        name: 'goToPage_WMS23269WMS23196',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS23269WMS23196',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS23597: new NavigationAction({
        name: 'goToPage_WMS23597',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS23597',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS23639: new NavigationAction({
        name: 'goToPage_WMS23639',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS23639',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS23643: new NavigationAction({
        name: 'goToPage_WMS23643',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS23643',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS23695: new NavigationAction({
        name: 'goToPage_WMS23695',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS23695',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS23714: new NavigationAction({
        name: 'goToPage_WMS23714',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS23714',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS23736: new NavigationAction({
        name: 'goToPage_WMS23736',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS23736',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS23765: new NavigationAction({
        name: 'goToPage_WMS23765',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS23765',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS23776: new NavigationAction({
        name: 'goToPage_WMS23776',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS23776',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS23794: new NavigationAction({
        name: 'goToPage_WMS23794',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS23794',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS23809: new NavigationAction({
        name: 'goToPage_WMS23809',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS23809',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS23986: new NavigationAction({
        name: 'goToPage_WMS23986',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS23986',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS24032: new NavigationAction({
        name: 'goToPage_WMS24032',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS24032',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS24579: new NavigationAction({
        name: 'goToPage_WMS24579',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS24579',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS24675: new NavigationAction({
        name: 'goToPage_WMS24675',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS24675',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS24810: new NavigationAction({
        name: 'goToPage_WMS24810',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS24810',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS24931: new NavigationAction({
        name: 'goToPage_WMS24931',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS24931',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS24937: new NavigationAction({
        name: 'goToPage_WMS24937',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS24937',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS24937part2: new NavigationAction({
        name: 'goToPage_WMS24937part2',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS24937part2',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS24973: new NavigationAction({
        name: 'goToPage_WMS24973',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS24973',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS24974: new NavigationAction({
        name: 'goToPage_WMS24974',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS24974',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS25083: new NavigationAction({
        name: 'goToPage_WMS25083',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS25083',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS25100: new NavigationAction({
        name: 'goToPage_WMS25100',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS25100',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS25101: new NavigationAction({
        name: 'goToPage_WMS25101',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS25101',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS25115: new NavigationAction({
        name: 'goToPage_WMS25115',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS25115',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS25117: new NavigationAction({
        name: 'goToPage_WMS25117',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS25117',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS25138: new NavigationAction({
        name: 'goToPage_WMS25138',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS25138',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS25139: new NavigationAction({
        name: 'goToPage_WMS25139',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS25139',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS25160: new NavigationAction({
        name: 'goToPage_WMS25160',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS25160',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS25161: new NavigationAction({
        name: 'goToPage_WMS25161',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS25161',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS25170: new NavigationAction({
        name: 'goToPage_WMS25170',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS25170',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS25174WMS25175: new NavigationAction({
        name: 'goToPage_WMS25174WMS25175',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS25174WMS25175',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS25176: new NavigationAction({
        name: 'goToPage_WMS25176',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS25176',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS25229: new NavigationAction({
        name: 'goToPage_WMS25229',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS25229',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS25351: new NavigationAction({
        name: 'goToPage_WMS25351',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS25351',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS25352: new NavigationAction({
        name: 'goToPage_WMS25352',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS25352',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS25370: new NavigationAction({
        name: 'goToPage_WMS25370',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS25370',
        }),
        appConfig: App.appConfig,
      }),
      goToPage_WMS25421: new NavigationAction({
        name: 'goToPage_WMS25421',
        _context: App,
        operation: 'gotoPage',
        paramProvider: () => ({
          pageName: 'WMS25421',
        }),
        appConfig: App.appConfig,
      }),
    },
  };
};
