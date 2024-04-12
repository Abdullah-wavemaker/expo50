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
      FdaInvoke: new ServiceVariable({
        name: 'FdaInvoke',
        _context: Partial,
        serviceType: 'RestService',
        operation: 'invoke',
        service: 'fda',
        maxResults: '20',
        operationId: 'fda_invoke',
        paramProvider: () => ({
          search:
            'patient.drug.openfda.pharm_class_epc:nonsteroidal+anti-inflammatory+drug',
          count: 'patient.reaction.reactionmeddrapt.exact',
        }),
        baseUrl: Partial.baseUrl,
        getServiceInfo: () =>
          Partial.serviceDefinitions['fda_invoke']?.wmServiceOperationInfo,
        inFlightBehavior: 'executeLast',
      }),
    },
    Actions: {},
  };
};
