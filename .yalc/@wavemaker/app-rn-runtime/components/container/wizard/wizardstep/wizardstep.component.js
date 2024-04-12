function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmWizardstepProps from './wizardstep.props';
import { DEFAULT_CLASS } from './wizardstep.styles';
export class WmWizardstepState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "active", false);
    _defineProperty(this, "showContent", false);
  }
}
export default class WmWizardstep extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmWizardstepProps(), new WmWizardstepState());
  }
  componentDidMount() {
    const wizard = this.parent;
    wizard.addWizardStep(this);
    super.componentDidMount();
  }
  onPropertyChange(name, $new, $old) {
    super.onPropertyChange(name, $new, $old);
    switch (name) {
      case 'title':
        const wizard = this.parent;
        wizard === null || wizard === void 0 ? void 0 : wizard.refresh();
        break;
      case 'disableprev':
      case 'disablenext':
      case 'disabledone':
      case 'enableskip':
        setTimeout(() => {
          this.parent.forceUpdate();
        }, 10);
        break;
    }
  }
  setActive() {
    this.updateState({
      active: true
    });
  }
  setInActive() {
    this.updateState({
      active: false
    });
  }
  isVisible() {
    return super.isVisible() && this.state.active;
  }
  invokeNextCB(index) {
    return this.invokeEventCallback('onNext', [this.proxy, this, index]);
  }
  invokePrevCB(index) {
    return this.invokeEventCallback('onPrev', [this.proxy, this, index]);
  }
  invokeSkipCB(index) {
    this.invokeEventCallback('onSkip', [this.proxy, this, index]);
  }
  renderWidget(props) {
    if (!this.state.showContent && this.isVisible()) {
      this.updateState({
        showContent: true
      }, () => {
        this.invokeEventCallback('onLoad', [this]);
      });
    }
    return this.state.showContent && /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, props.children);
  }
}
//# sourceMappingURL=wizardstep.component.js.map