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
      findDepartments: new ServiceVariable({
        name: 'findDepartments',
        _context: Page,
        serviceType: 'OpenAPIService',
        operation: 'HRdatabase_DepartmentController_findDepartments',
        service: 'HRdatabase',
        maxResults: '20',
        operationId: 'HRdatabase_DepartmentController_findDepartments',
        paramProvider: () => ({}),
        baseUrl: Page.baseUrl + '/services',
        getServiceInfo: () =>
          Page.serviceDefinitions[
            'HRdatabase_DepartmentController_findDepartments'
          ]?.wmServiceOperationInfo,
        inFlightBehavior: 'executeLast',
        isList: true,
      }),
    },
    Actions: {},
  };
};
