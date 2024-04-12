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
      FileServiceUploadFile: new ServiceVariable({
        name: 'FileServiceUploadFile',
        _context: Page,
        serviceType: 'JavaService',
        operation: 'uploadFile',
        service: 'FileService',
        maxResults: '20',
        operationId: 'FileController_uploadFile',
        paramProvider: () => ({
          files: Page.eval(() => Page.Widgets.fileupload1.selectedFiles),
        }),
        baseUrl: Page.baseUrl + '/services',
        getServiceInfo: () =>
          Page.serviceDefinitions['FileController_uploadFile']
            ?.wmServiceOperationInfo,
        inFlightBehavior: 'executeLast',
      }),
    },
    Actions: {},
  };
};
