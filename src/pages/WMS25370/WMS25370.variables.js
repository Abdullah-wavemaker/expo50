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
      dates12: new ModelVariable({
        name: 'dates12',
        _context: Page,
        paramProvider: () => [
          { date: '01/20/2020' },
          { date: '02/20/2020' },
          { date: '03/21/2020' },
          { date: '04/20/2020' },
          { date: '05/20/2020' },
          { date: '06/19/2020' },
          { date: '07/19/2020' },
          { date: '08/18/2020' },
          { date: '09/17/2020' },
          { date: '10/17/2020' },
          { date: '11/16/2020' },
          { date: '12/16/2020' },
        ],
        isList: true,
      }),
    },
    Actions: {},
  };
};
