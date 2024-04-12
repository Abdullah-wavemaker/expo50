"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getStyleDefs: () => ([{
            className: '.app-wizard',
            rnStyleSelector: 'app-wizard.root',
            studioStyleSelector: '.app-wizard',
            style: {
                'background-color': '@wizardBackgroundColor'
            }
        }, {
            className: '.app-wizard-text',
            rnStyleSelector: 'app-wizard.text',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-wizard-header',
            rnStyleSelector: 'app-wizard.wizardHeader',
            studioStyleSelector: '.app-wizard >.app-wizard-heading',
            style: {}
        }, {
            className: '.app-wizard-step-wrapper',
            rnStyleSelector: 'app-wizard.stepWrapper',
            studioStyleSelector: '.app-wizard >.app-wizard-heading .app-wizard-step',
            style: {}
        }, {
            className: '.app-wizard-step-title',
            rnStyleSelector: 'app-wizard.stepTitle',
            studioStyleSelector: '.app-wizard >.app-wizard-heading .step-title',
            style: {
                color: '@wizardStepTitleColor'
            }
        }, {
            className: '.app-wizard-step-sub-title',
            rnStyleSelector: 'app-wizard.stepSubTitle',
            studioStyleSelector: '.app-wizard >.app-wizard-heading .step-sub-title',
            style: {
                color: '@wizardStepTitleColor'
            }
        }, {
            className: '.app-wizard-progress-circle',
            rnStyleSelector: 'app-wizard.progressCircle',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-wizard-step-popover',
            rnStyleSelector: 'app-wizard.popover',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-wizard-step-menu-label',
            rnStyleSelector: 'app-wizard.stepMenuLabel',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-wizard-step-menu-active-label',
            rnStyleSelector: 'app-wizard.stepMenuActiveLabel',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-wizard-step-menu-icon',
            rnStyleSelector: 'app-wizard.stepMenuIcon',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-wizard-step-menu-active-icon',
            rnStyleSelector: 'app-wizard.stepMenuActiveIcon',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-wizard-step-menu',
            rnStyleSelector: 'app-wizard.stepMenu',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-wizard-step-menu-active',
            rnStyleSelector: 'app-wizard.activeStepMenu',
            studioStyleSelector: '',
            style: {}
        }, {
            className: '.app-wizard-step',
            rnStyleSelector: 'app-wizard.step',
            studioStyleSelector: '.app-wizard >.app-wizard-heading .app-wizard-step',
            style: {
                'background-color': '@wizardBackgroundColor',
                'color': '@wizardStepColor',
                'border-color': '@wizardStepColor'
            }
        }, {
            className: '.app-wizard-active-step',
            rnStyleSelector: 'app-wizard.activeStep',
            studioStyleSelector: '.app-wizard >.app-wizard-heading .app-wizard-step.current a .wizard-step-number',
            style: {
                'background-color': '@wizardStepActiveColor',
                'border-color': '@wizardStepActiveColor',
                'color': '@wizardActiveStepColor'
            }
        }, {
            className: '.app-wizard-done-step',
            rnStyleSelector: 'app-wizard.doneStep',
            studioStyleSelector: '',
            style: {
                'background-color': '@wizardStepDoneColor',
                'border-color': '@wizardDoneStepColor',
                'color': '@wizardStepDoneColor'
            }
        }, {
            className: '.app-wizard-step-icon',
            rnStyleSelector: 'app-wizard.stepIcon',
            studioStyleSelector: '.app-wizard-step-icon .no-studio-class',
            style: {}
        }, {
            className: '.app-wizard-step-icon .app-icon-shape',
            style: {}
        }, {
            className: '.app-wizard-body',
            rnStyleSelector: 'app-wizard.wizardBody',
            studioStyleSelector: '.app-wizard .app-wizard-body',
            style: {
                'border-color': '@wizardBorderColor'
            }
        }, {
            className: '.app-wizard-footer',
            rnStyleSelector: 'app-wizard.wizardFooter',
            studioStyleSelector: '.app-wizard >.app-wizard-actions',
            style: {}
        }, {
            className: '.app-wizard-action',
            rnStyleSelector: 'app-wizard.wizardActions',
            studioStyleSelector: '.app-wizard >.app-wizard-actions .app-button',
            style: {}
        }, {
            className: '.app-wizard-next-btn',
            rnStyleSelector: 'app-wizard.nextButton',
            studioStyleSelector: '.app-wizard >.app-wizard-actions .app-button.btn-primary',
        }, {
            className: '.app-wizard-prev-btn',
            rnStyleSelector: 'app-wizard.prevButton',
        }, {
            className: '.app-wizard-cancel-btn',
            rnStyleSelector: 'app-wizard.cancelButton',
        }, {
            className: '.app-wizard-next-btn .app-button',
            style: {
                'background-color': '@wizardNextBtnColor',
                'border-color': '@wizardNextBtnColor'
            }
        }, {
            className: '.app-wizard-done-btn',
            rnStyleSelector: 'app-wizard.doneButton',
            studioStyleSelector: '.app-wizard >.app-wizard-actions .app-button.btn-success',
        }, {
            className: '.app-wizard-done-btn .app-button',
            style: {
                'background-color': '@wizardDoneBtnColor'
            }
        }, {
            className: '.app-wizard-skip-link',
            rnStyleSelector: 'app-wizard.skipLink.root',
            studioStyleSelector: '.app-wizard >.app-wizard-actions .app-wizard-skip',
            style: {}
        }, {
            className: '.app-wizard-step-connector',
            rnStyleSelector: 'app-wizard.stepConnector',
            studioStyleSelector: '.no-studio-class',
            style: {
                'background-color': '@wizardStepConnectorColor'
            }
        }, {
            className: '.app-wizard-step-counter',
            rnStyleSelector: 'app-wizard.stepCounter',
            studioStyleSelector: '.app-wizard >.app-wizard-heading .app-wizard-step .wizard-step-number .count',
            style: {
                color: '@wizardStepColor'
            }
        }, {
            className: '.app-wizard-number-text-step-connector',
            rnStyleSelector: 'app-wizard.numberTextStepConnector',
            studioStyleSelector: '',
            style: {
                color: '@wizardStepColor'
            }
        }])
};
//# sourceMappingURL=wizard.styledef.js.map