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
    Variables: {},
    Actions: {
      notificationAction1: new NotificationAction({
        name: 'notificationAction1',
        _context: Page,
        operation: 'toast',
        paramProvider: () => ({
          content: 'page',
          page: 'partail1',
        }),
        partialContent: React.createElement(WmPartialContainer, {
          ...{ content: 'partail1' },
          parentWatcher: Page.watcher,
        }),
        onOk: (variable, data, options) => {},
        toasterService: () => Page.toaster,
        onClose: (variable, data, options) => {},
      }),
    },
  };
};
