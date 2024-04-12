function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { Text, View, TouchableOpacity, Platform, TouchableWithoutFeedback } from 'react-native';
import { isArray, merge } from 'lodash';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmWizardProps from './wizard.props';
import { DEFAULT_CLASS } from './wizard.styles';
import WmButton from '@wavemaker/app-rn-runtime/components/basic/button/button.component';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import WmAnchor from '@wavemaker/app-rn-runtime/components/basic/anchor/anchor.component';
import WmProgressCircle from '@wavemaker/app-rn-runtime/components/basic/progress-circle/progress-circle.component';
import WmPopover from '@wavemaker/app-rn-runtime/components/navigation/popover/popover.component';
import WmLabel from '@wavemaker/app-rn-runtime/components/basic/label/label.component';
export class WmWizardState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "currentStep", 0);
    _defineProperty(this, "isDone", false);
  }
}
export default class WmWizard extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmWizardProps());
    _defineProperty(this, "numberOfSteps", null);
    _defineProperty(this, "steps", []);
    _defineProperty(this, "popOverRef", null);
    _defineProperty(this, "listener", {
      onComponentInit: c => {
        if (c instanceof WmPopover) {
          this.popOverRef = c;
        }
      }
    });
    const steps = props.children;
    let defaultStepIndex = 0;
    if (isArray(steps) && props.defaultstep) {
      steps.map((item, index) => {
        if (props.defaultstep === item.props.name) {
          defaultStepIndex = index;
        }
      });
    }
    this.updateCurrentStep(defaultStepIndex);
  }
  addWizardStep(step) {
    this.steps[step.props.index] = step;
    this.forceUpdate();
  }
  componentDidMount() {
    super.componentDidMount();
    this.showActiveStep();
  }
  showActiveStep() {
    var _this$steps$this$stat;
    (_this$steps$this$stat = this.steps[this.state.currentStep]) === null || _this$steps$this$stat === void 0 ? void 0 : _this$steps$this$stat.setActive();
  }
  updateCurrentStep(index) {
    var _this$steps$this$stat2;
    let isDone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    const lastStep = this.state.currentStep;
    (_this$steps$this$stat2 = this.steps[this.state.currentStep]) === null || _this$steps$this$stat2 === void 0 ? void 0 : _this$steps$this$stat2.setInActive();
    this.updateState({
      currentStep: index,
      isDone: isDone
    }, () => {
      this.showActiveStep();
      if (lastStep !== index) {
        this.invokeEventCallback('onChange', [null, this.proxy, index + 1, lastStep + 1]);
      }
    });
  }
  getStepStyle(index) {
    const style = [this.styles.step];
    if (this.state.isDone || index < this.state.currentStep) {
      style.push(this.styles.doneStep);
    } else if (this.state.currentStep === index) {
      style.push(this.styles.activeStep);
    }
    return style;
  }
  renderMenuPopover() {
    const menuDataset = this.props.getmenudataexpression || ((item, index) => '');
    const Labels = this.steps.map(step => step.state.props.title);
    return /*#__PURE__*/React.createElement(WmPopover, {
      id: this.getTestId('menu'),
      styles: this.styles.popover,
      contentanimation: 'slideInDown',
      caption: '',
      popoverheight: this.styles.popover.popover.height || null,
      popoverwidth: this.styles.popover.popover.width || null,
      listener: this.listener,
      iconclass: this.props.popovericonclass || 'fa fa-caret-down',
      iconposition: "right",
      type: "dropdown"
    }, /*#__PURE__*/React.createElement(View, {
      style: this.styles.popover.popover
    }, Labels.map((item, index) => {
      const currentMenuItem = index == this.state.currentStep;
      const caption = menuDataset({
        "count": this.steps.length
      }, index);
      return /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
        key: 'wizard_menu_item_' + index,
        onPress: () => {
          this.popOverRef.hide();
        }
      }, /*#__PURE__*/React.createElement(View, {
        style: [this.styles.stepMenu, currentMenuItem ? this.styles.activeStepMenu : {}]
      }, /*#__PURE__*/React.createElement(WmIcon, {
        caption: caption,
        iconclass: currentMenuItem ? "wi wi-radio-button-checked" : 'wi wi-radio-button-unchecked',
        styles: currentMenuItem ? this.styles.stepMenuActiveIcon : this.styles.stepMenuIcon
      }), /*#__PURE__*/React.createElement(WmLabel, {
        caption: item,
        styles: currentMenuItem ? this.styles.stepMenuActiveLabel : this.styles.stepMenuLabel
      })));
    })));
  }
  renderProgressCircleHeader(item, index) {
    const progressTitle = this.props.progresstitle || index + 1 + '/' + this.steps.length;
    return /*#__PURE__*/React.createElement(View, {
      style: [this.styles.headerWrapper],
      key: index + 1
    }, /*#__PURE__*/React.createElement(View, {
      style: this.styles.stepWrapper
    }, /*#__PURE__*/React.createElement(View, {
      style: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row'
      }
    }, /*#__PURE__*/React.createElement(WmProgressCircle, {
      minvalue: 0,
      maxvalue: this.steps.length,
      datavalue: index + 1,
      captionplacement: 'inside',
      type: this.props.progresstype,
      title: progressTitle,
      subtitle: '',
      styles: this.styles.progressCircle
    })), /*#__PURE__*/React.createElement(View, {
      style: {
        flex: 2,
        justifyContent: 'center',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement(Text, {
      style: this.styles.stepTitle
    }, item.props.title || 'Step Title'), /*#__PURE__*/React.createElement(Text, {
      style: this.styles.stepSubTitle
    }, item.props.subtitle || 'Step Sub Title')), /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
      }
    }, this.renderMenuPopover())));
  }
  renderWizardHeader(item, index) {
    const isLastStep = index === this.numberOfSteps - 1;
    const isFirstStep = index === 0;
    const isActiveStep = index === this.state.currentStep;
    const isNumberTextLayout = this.state.props.classname === 'number-text-inline';
    return item.state.props.show != false ? /*#__PURE__*/React.createElement(View, {
      style: [this.styles.headerWrapper, isNumberTextLayout ? {
        paddingRight: isActiveStep ? 0 : 5,
        paddingLeft: index === this.state.currentStep + 1 ? 0 : 5
      } : {}],
      key: index + 1
    }, /*#__PURE__*/React.createElement(TouchableOpacity, {
      style: this.styles.stepWrapper,
      onPress: this.updateCurrentStep.bind(this, index, false),
      disabled: index >= this.state.currentStep
    }, /*#__PURE__*/React.createElement(View, {
      style: this.getStepStyle(index)
    }, index >= this.state.currentStep && !this.state.isDone && /*#__PURE__*/React.createElement(Text, {
      style: isActiveStep ? this.styles.activeStep : this.styles.stepCounter
    }, index + 1), (index < this.state.currentStep || this.state.isDone) && /*#__PURE__*/React.createElement(WmIcon, {
      styles: merge({}, this.styles.stepIcon, {
        icon: {
          color: this.styles.activeStep.color
        }
      }),
      iconclass: item.state.props.iconclass || 'wm-sl-l sl-check'
    })), (isNumberTextLayout && isActiveStep || !isNumberTextLayout) && /*#__PURE__*/React.createElement(Text, {
      style: this.styles.stepTitle
    }, item.state.props.title || 'Step Title'), this.numberOfSteps > 1 && isActiveStep && /*#__PURE__*/React.createElement(View, {
      style: [this.styles.numberTextStepConnector, {
        width: isLastStep ? 0 : 50
      }]
    })), this.numberOfSteps > 1 && /*#__PURE__*/React.createElement(View, {
      style: [this.styles.stepConnector, {
        width: isFirstStep || isLastStep ? '50%' : '100%',
        left: Platform.OS == "web" ? !this.isRTL && isFirstStep || this.isRTL && isLastStep ? '50%' : '0%' : isFirstStep ? '50%' : '0%'
      }]
    })) : null;
  }
  prev() {
    const index = this.state.currentStep;
    if (index <= 0) {
      return;
    }
    const currentStep = this.steps[index];
    if (currentStep.invokePrevCB(index) == false) {
      return;
    }
    this.updateCurrentStep(index - 1);
  }
  next(eventName) {
    const index = this.state.currentStep;
    if (index >= this.steps.length - 1) {
      return;
    }
    const currentStep = this.steps[index];
    if (eventName === 'skip') {
      currentStep.invokeSkipCB(index);
    } else if (currentStep.invokeNextCB(index) == false) {
      return;
    }
    this.updateCurrentStep(index + 1);
  }
  done($event) {
    if (this.state.currentStep !== this.steps.length - 1) {
      return;
    }
    this.updateState({
      isDone: true
    });
    this.invokeEventCallback('onDone', [$event, this.proxy]);
  }
  cancel() {
    this.invokeEventCallback('onCancel', [null, this.proxy]);
  }
  skip() {
    this.next('skip');
  }
  renderWidget(props) {
    var _this$state$props$cla;
    this.numberOfSteps = this.steps.length;
    const activeStep = this.steps[this.state.currentStep];
    const isSkippable = activeStep && activeStep.state.props.enableskip;
    const isProgressCircleHeader = (_this$state$props$cla = this.state.props.classname) === null || _this$state$props$cla === void 0 ? void 0 : _this$state$props$cla.includes('progress-circle-header');
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, /*#__PURE__*/React.createElement(View, {
      style: this.styles.wizardHeader
    }, activeStep && isProgressCircleHeader ? this.renderProgressCircleHeader(activeStep, this.state.currentStep) : this.steps ? this.steps.map((step, i) => this.renderWizardHeader(step, i)) : null), /*#__PURE__*/React.createElement(View, {
      style: this.styles.wizardBody
    }, props.children), /*#__PURE__*/React.createElement(View, {
      style: [this.styles.wizardFooter, {
        flexDirection: props.actionsalignment === 'right' ? 'row-reverse' : 'row'
      }]
    }, this.state.currentStep + 1 === this.numberOfSteps && activeStep.state.props.showdone && /*#__PURE__*/React.createElement(WmButton, {
      iconclass: 'wm-sl-l sl-check',
      styles: merge({}, this.styles.wizardActions, this.theme.getStyle('btn-default'), this.styles.doneButton),
      id: this.getTestId('donebtn'),
      caption: props.donebtnlabel,
      onTap: this.done.bind(this),
      disabled: activeStep.state.props.disabledone
    }), this.state.currentStep + 1 < this.numberOfSteps && activeStep.state.props.shownext && /*#__PURE__*/React.createElement(WmButton, {
      iconclass: 'wi wi-chevron-right',
      styles: merge({}, this.styles.wizardActions, this.theme.getStyle('btn-default'), this.styles.nextButton),
      id: this.getTestId('nextbtn'),
      iconposition: 'right',
      caption: props.nextbtnlabel,
      onTap: this.next.bind(this),
      disabled: activeStep.state.props.disablenext
    }), this.state.currentStep > 0 && activeStep.state.props.showprev && /*#__PURE__*/React.createElement(WmButton, {
      iconclass: 'wi wi-chevron-left',
      styles: merge({}, this.theme.getStyle('btn-default'), this.styles.wizardActions, this.styles.prevButton),
      caption: props.previousbtnlabel,
      id: this.getTestId('prevbtn'),
      onTap: this.prev.bind(this),
      disabled: activeStep.state.props.disableprev
    }), props.cancelable ? /*#__PURE__*/React.createElement(WmButton, {
      id: this.getTestId('cancelbtn'),
      caption: props.cancelbtnlabel,
      styles: merge({}, this.theme.getStyle('btn-default'), this.styles.wizardActions, this.styles.cancelButton),
      onTap: this.cancel.bind(this)
    }) : null, isSkippable && /*#__PURE__*/React.createElement(WmAnchor, {
      iconclass: 'wi wi-chevron-right',
      iconposition: 'right',
      caption: 'Skip',
      id: this.getTestId('skip'),
      styles: merge({}, this.styles.wizardActions, this.styles.skipLink),
      onTap: this.skip.bind(this)
    })));
  }
}
//# sourceMappingURL=wizard.component.js.map