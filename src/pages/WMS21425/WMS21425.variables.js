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
} from '../../../metadata/entities/entity-provider';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import React from 'react';

export default Page => {
  return {
    Variables: {
      serviceVariable3: new ServiceVariable({
        name: 'serviceVariable3',
        _context: Page,
        serviceType: 'OpenAPIService',
        operation: 'HRdatabase_EmployeeController_filterEmployees',
        service: 'HRdatabase',
        maxResults: '20',
        operationId: 'HRdatabase_EmployeeController_filterEmployees',
        paramProvider: () => ({
          q: Page.eval(() => 'empId=' + Page.Widgets.search1.query || 1),
        }),
        baseUrl: Page.baseUrl + '/services',
        getServiceInfo: () =>
          Page.serviceDefinitions[
            'HRdatabase_EmployeeController_filterEmployees'
          ]?.wmServiceOperationInfo,
        inFlightBehavior: 'executeLast',
        isList: true,
      }),
    },
    Actions: {},
  };
};
