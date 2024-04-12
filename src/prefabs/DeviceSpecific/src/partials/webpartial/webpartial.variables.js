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

export default Partial => {
  return {
    Variables: {
      RandomuserInvoke: new ServiceVariable({
        name: 'RandomuserInvoke',
        _context: Partial,
        serviceType: 'RestService',
        operation: 'invoke',
        service: 'randomuser',
        maxResults: '20',
        operationId: 'randomuser_invoke',
        paramProvider: () => ({ results: '20' }),
        baseUrl: Partial.baseUrl,
        getServiceInfo: () =>
          Partial.serviceDefinitions['randomuser_invoke']
            ?.wmServiceOperationInfo,
        inFlightBehavior: 'executeLast',
      }),
    },
    Actions: {},
  };
};
