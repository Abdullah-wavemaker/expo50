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
      areaChartVar: new ModelVariable({
        name: 'areaChartVar',
        _context: Page,
        paramProvider: () => [
          { name: 'umfqu', value: 100 },
          { name: 'aflrw', value: 103 },
          { name: 'dfykk', value: 106 },
          { name: 'blyga', value: 109 },
          { name: 'cyhzy', value: 112 },
          { name: 'vquxt', value: 115 },
          { name: 'jysyi', value: 118 },
          { name: 'lpnrk', value: 121 },
          { name: 'yqvgh', value: 124 },
          { name: 'sfxtc', value: 127 },
          { name: 'xf \n etcasj', value: 130 },
        ],
        isList: true,
      }),
      staticVariable4: new ModelVariable({
        name: 'staticVariable4',
        _context: Page,
        paramProvider: () => [
          { dataValue: '0' },
          { dataValue: '1' },
          { dataValue: '2' },
        ],
        isList: true,
      }),
    },
    Actions: {},
  };
};
