function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmButton from '@wavemaker/app-rn-runtime/components/basic/button/button.component';
import WmFormActionProps from './form-action.props';
import { DEFAULT_CLASS } from './form-action.styles';
import { debounce } from "lodash";
export class WmFormActionState extends BaseComponentState {}
export default class WmFormAction extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmFormActionProps());
    _defineProperty(this, "_debouncedFormAction", debounce(this.onClick, 250));
  }
  onClick($event, cb) {
    cb && cb($event);
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(WmButton, {
      id: this.getTestId(),
      show: props.show,
      disabled: props.disabled,
      caption: props.displayName,
      styles: this.styles,
      name: props.name,
      iconclass: props.iconclass,
      iconposition: props.iconposition,
      onTap: $event => {
        this._debouncedFormAction($event, props.formAction);
      }
    });
  }
}
//# sourceMappingURL=form-action.component.js.map