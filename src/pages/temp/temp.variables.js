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
      people: new ModelVariable({
        name: 'people',
        _context: Page,
        paramProvider: () => [
          {
            name: { title: 'Mr', first: 'Grigorije', last: 'Radanović' },
            picture: {
              large: 'https://randomuser.me/api/portraits/men/59.jpg',
              medium: 'https://randomuser.me/api/portraits/med/men/59.jpg',
              thumbnail: 'https://randomuser.me/api/portraits/thumb/men/59.jpg',
            },
          },
          {
            name: { title: 'Miss', first: 'Nalan', last: 'Çankaya' },
            picture: {
              large: 'https://randomuser.me/api/portraits/women/28.jpg',
              medium: 'https://randomuser.me/api/portraits/med/women/28.jpg',
              thumbnail:
                'https://randomuser.me/api/portraits/thumb/women/28.jpg',
            },
          },
          {
            name: { title: 'Madame', first: 'Leila', last: 'Giraud' },
            picture: {
              large: 'https://randomuser.me/api/portraits/women/74.jpg',
              medium: 'https://randomuser.me/api/portraits/med/women/74.jpg',
              thumbnail:
                'https://randomuser.me/api/portraits/thumb/women/74.jpg',
            },
          },
          {
            name: { title: 'Ms', first: 'Rosa', last: 'Cano' },
            picture: {
              large: 'https://randomuser.me/api/portraits/women/17.jpg',
              medium: 'https://randomuser.me/api/portraits/med/women/17.jpg',
              thumbnail:
                'https://randomuser.me/api/portraits/thumb/women/17.jpg',
            },
          },
          {
            name: { title: 'Mr', first: 'Dale', last: 'Owens' },
            picture: {
              large: 'https://randomuser.me/api/portraits/men/6.jpg',
              medium: 'https://randomuser.me/api/portraits/med/men/6.jpg',
              thumbnail: 'https://randomuser.me/api/portraits/thumb/men/6.jpg',
            },
          },
        ],
        isList: true,
      }),
    },
    Actions: {},
  };
};
