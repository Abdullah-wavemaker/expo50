import { ModelVariable } from '@wavemaker/app-rn-runtime/variables/model-variable';
import { ServiceVariable } from '@wavemaker/app-rn-runtime/variables/service-variable';
import { LiveVariable } from '@wavemaker/app-rn-runtime/variables/live-variable';
import { NavigationAction } from '@wavemaker/app-rn-runtime/actions/navigation-action';
import { TimerAction } from '@wavemaker/app-rn-runtime/actions/timer-action';
import { NotificationAction } from '@wavemaker/app-rn-runtime/actions/notification-action';
import { DeviceVariable } from '@wavemaker/app-rn-runtime/variables/device-variable';
import { LoginAction } from '@wavemaker/app-rn-runtime/actions/login-action';
import { LogoutAction } from '@wavemaker/app-rn-runtime/actions/logout-action';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import React from 'react';

export default Prefab => {
  return {
    Variables: {
      serviceVariable1: new ServiceVariable({
        name: 'serviceVariable1',
        _context: Prefab,
        serviceType: 'RestService',
        operation: 'invoke',
        service: 'randomuser',
        maxResults: '20',
        operationId: 'randomuser_invoke',
        paramProvider: () => ({ results: '20' }),
        baseUrl: Prefab.baseUrl,
        getServiceInfo: () =>
          Prefab.serviceDefinitions['randomuser_invoke']
            ?.wmServiceOperationInfo,
        inFlightBehavior: 'executeLast',
      }),
      staticVariable1: new ModelVariable({
        name: 'staticVariable1',
        _context: Prefab,
        paramProvider: () => [],
        isList: true,
      }),
      supportedLocale: new ModelVariable({
        name: 'supportedLocale',
        _context: Prefab,
        paramProvider: () => ({ en: 'English' }),
      }),
    },
    Actions: {},
  };
};
