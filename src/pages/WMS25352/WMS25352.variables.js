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
      radiosetdaraGroup: new ModelVariable({
        name: 'radiosetdaraGroup',
        _context: Page,
        paramProvider: () => [
          { displayvalue: 'chicken', dataValue: 'option1', category: 'nonveg' },
          { displayvalue: 'mutton', dataValue: 'option2', category: 'nonveg' },
          { displayvalue: 'fish', dataValue: 'option3', category: 'nonveg' },
          { displayvalue: 'paneer', dataValue: 'option4', category: 'veg' },
        ],
        isList: true,
      }),
    },
    Actions: {},
  };
};
