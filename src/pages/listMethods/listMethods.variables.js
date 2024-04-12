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
      EmployeesList: new ServiceVariable({
        name: 'EmployeesList',
        _context: Page,
        serviceType: 'DataService',
        operation: 'findEmployees',
        service: 'hrdb',
        maxResults: '20',
        operationId: 'EmployeeController_findEmployees',
        paramProvider: () => ({}),
        baseUrl: Page.baseUrl + '/services',
        getServiceInfo: () =>
          Page.serviceDefinitions['EmployeeController_findEmployees']
            ?.wmServiceOperationInfo,
        inFlightBehavior: 'executeLast',
        isList: true,
      }),
    },
    Actions: {},
  };
};
