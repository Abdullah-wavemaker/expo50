function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmButton from '@wavemaker/app-rn-runtime/components/basic/button/button.component';
import WmLabel from '@wavemaker/app-rn-runtime/components/basic/label/label.component';
import WmDialog from '../dialog/dialog.component';
import WmDialogcontent from '../dialogcontent/dialogcontent.component';
import WmDialogactions from '../dialogactions/dialogactions.component';
import WmConfirmdialogProps from './confirmdialog.props';
import { DEFAULT_CLASS } from './confirmdialog.styles';
export class WmConfirmdialogState extends BaseComponentState {}
export default class WmConfirmdialog extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmConfirmdialogProps());
    _defineProperty(this, "dialogRef", null);
    _defineProperty(this, "listener", {
      onComponentInit: c => {
        if (c instanceof WmDialog) {
          this.dialogRef = c;
        }
      }
    });
  }
  open() {
    this.dialogRef.open();
  }
  close() {
    this.dialogRef.close();
  }
  getMessageStyle(type) {}
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(WmDialog, {
      id: this.getTestId('dialog'),
      iconclass: props.iconclass,
      iconurl: props.iconurl,
      iconheight: props.iconheight,
      iconmargin: props.iconmargin,
      iconwidth: props.iconwidth,
      animation: props.animation,
      closable: props.closable,
      modal: props.modal,
      styles: this.styles.dialog,
      title: props.title,
      listener: this.listener,
      onOpened: () => {
        this.invokeEventCallback('onOpened', [null, this]);
      }
    }, /*#__PURE__*/React.createElement(WmDialogcontent, {
      styles: this.styles.dialogContent
    }, /*#__PURE__*/React.createElement(WmLabel, {
      id: this.getTestId('msg'),
      caption: props.message || '',
      styles: this.styles.message
    })), /*#__PURE__*/React.createElement(WmDialogactions, {
      styles: this.styles.dialogActions
    }, /*#__PURE__*/React.createElement(WmButton, {
      id: this.getTestId('cancelbtn'),
      caption: props.canceltext,
      styles: this.theme.mergeStyle({}, this.theme.getStyle('btn-onlyLabel'), this.styles.cancelButton),
      onTap: () => {
        this.dialogRef.close();
        this.invokeEventCallback('onCancel', [null, this]);
      }
    }), /*#__PURE__*/React.createElement(WmButton, {
      id: this.getTestId('okbtn'),
      caption: props.oktext,
      styles: this.theme.mergeStyle({}, this.theme.getStyle('btn-only-label'), this.styles.okButton),
      onTap: () => {
        this.dialogRef.close();
        this.invokeEventCallback('onOk', [null, this]);
      }
    })));
  }
}
//# sourceMappingURL=confirmdialog.component.js.map