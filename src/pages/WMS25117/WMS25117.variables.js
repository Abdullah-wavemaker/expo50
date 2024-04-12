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
      stvPaycheckContributions: new ModelVariable({
        name: 'stvPaycheckContributions',
        _context: Page,
        paramProvider: () => ({
          paycheckContributions: [
            {
              sourceType: 'ROLLOVER',
              currentContributionRate: 0,
              currentContributionAmount: 5,
              contributionMinPercentageRange: 1,
              contributionMaxPercentageRange: 100,
              contributionMinAmountRange: 1,
              contributionMaxAmountRange: 3000,
              currentContributionMethodType: { key: 'A', value: '$' },
              showContributionMethodTypeDropdown: true,
              showIrsRulesFlag: false,
              newContributionRate: 0,
              newContributionAmount: 0,
            },
            {
              sourceType: 'PRE-TAX',
              currentContributionRate: 100,
              currentContributionAmount: 0,
              contributionMinPercentageRange: 1,
              contributionMaxPercentageRange: 100,
              contributionMinAmountRange: 1,
              contributionMaxAmountRange: 3000,
              currentContributionMethodType: { key: 'P', value: '%' },
              showContributionMethodTypeDropdown: true,
              showIrsRulesFlag: false,
              newContributionRate: 0,
              newContributionAmount: 0,
            },
            {
              sourceType: 'CATCH-UP',
              currentContributionRate: 0,
              currentContributionAmount: 0,
              contributionMinPercentageRange: 1,
              contributionMaxPercentageRange: 100,
              contributionMinAmountRange: 1,
              contributionMaxAmountRange: 3000,
              currentContributionMethodType: { key: 'A', value: '$' },
              showContributionMethodTypeDropdown: false,
              showIrsRulesFlag: false,
              newContributionRate: 0,
              newContributionAmount: 0,
            },
          ],
        }),
      }),
      stvPaycheckContributions1: new ModelVariable({
        name: 'stvPaycheckContributions1',
        _context: Page,
        paramProvider: () => ({
          paycheckContributions: [
            {
              sourceType: 'ROLLOVER',
              currentContributionRate: 0,
              currentContributionAmount: 5,
              contributionMinPercentageRange: 1,
              contributionMaxPercentageRange: 100,
              contributionMinAmountRange: 1,
              contributionMaxAmountRange: 3000,
              currentContributionMethodType: { key: 'A', value: '$' },
              showContributionMethodTypeDropdown: true,
              showIrsRulesFlag: false,
              newContributionRate: 0,
              newContributionAmount: 0,
            },
            {
              sourceType: 'PRE-TAX',
              currentContributionRate: 100,
              currentContributionAmount: 0,
              contributionMinPercentageRange: 1,
              contributionMaxPercentageRange: 100,
              contributionMinAmountRange: 1,
              contributionMaxAmountRange: 3000,
              currentContributionMethodType: { key: 'P', value: '%' },
              showContributionMethodTypeDropdown: true,
              showIrsRulesFlag: false,
              newContributionRate: 0,
              newContributionAmount: 0,
            },
            {
              sourceType: 'CATCH-UP',
              currentContributionRate: 0,
              currentContributionAmount: 0,
              contributionMinPercentageRange: 1,
              contributionMaxPercentageRange: 100,
              contributionMinAmountRange: 1,
              contributionMaxAmountRange: 3000,
              currentContributionMethodType: { key: 'A', value: '$' },
              showContributionMethodTypeDropdown: false,
              showIrsRulesFlag: false,
              newContributionRate: 0,
              newContributionAmount: 0,
            },
          ],
        }),
      }),
      stvTotalData: new ModelVariable({
        name: 'stvTotalData',
        _context: Page,
        paramProvider: () => ({ amountTotal: 0, percentageTotal: 0 }),
      }),
      stvTotalData1: new ModelVariable({
        name: 'stvTotalData1',
        _context: Page,
        paramProvider: () => ({ amountTotal: 0, percentageTotal: 0 }),
      }),
    },
    Actions: {},
  };
};
