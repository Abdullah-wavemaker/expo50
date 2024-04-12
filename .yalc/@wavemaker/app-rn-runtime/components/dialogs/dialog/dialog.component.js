function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View } from 'react-native';
import { ModalConsumer } from '@wavemaker/app-rn-runtime/core/modal.service';
import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import { HideMode } from '@wavemaker/app-rn-runtime/core/if.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import WmButton from '@wavemaker/app-rn-runtime/components/basic/button/button.component';
import WmDialogProps from './dialog.props';
import { DEFAULT_CLASS } from './dialog.styles';
export class WmDialogState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "modalOptions", {});
  }
}
export default class WmDialog extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmDialogProps(), new WmDialogState());
    _defineProperty(this, "_close", () => {});
    this.hideMode = HideMode.DONOT_ADD_TO_DOM;
    this.state.modalOptions.onClose = () => {
      return new Promise(res => {
        this.updateState({
          props: {
            show: false
          }
        }, () => {
          this.invokeEventCallback('onClose', [null, this]);
          res();
        });
      });
    };
    this.state.modalOptions.onOpen = () => {
      this.invokeEventCallback('onOpened', [null, this]);
    };
  }
  open() {
    if (!this.state.props.show) {
      this.updateState({
        props: {
          show: true
        }
      });
    }
  }
  close() {
    this._close();
  }
  prepareModalOptions(content, modalService) {
    const o = this.state.modalOptions;
    o.name = this.state.props.name;
    o.modalStyle = this.styles.modal;
    o.content = content;
    o.contentStyle = this.styles.content;
    o.isModal = !!this.state.props.modal;
    o.centered = true;
    o.animation = this.state.props.animation;
    this._close = () => modalService.hideModal(this.state.modalOptions);
    return o;
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(ModalConsumer, null, modalService => {
      modalService.showModal(this.prepareModalOptions( /*#__PURE__*/React.createElement(AssetProvider, {
        value: this.loadAsset
      }, /*#__PURE__*/React.createElement(ThemeProvider, {
        value: this.theme
      }, /*#__PURE__*/React.createElement(View, {
        style: this.styles.root
      }, this._background, props.showheader ? /*#__PURE__*/React.createElement(View, {
        style: this.styles.header
      }, /*#__PURE__*/React.createElement(View, {
        style: this.styles.headerLabel
      }, props.iconclass || props.iconurl ? /*#__PURE__*/React.createElement(WmIcon, {
        id: this.getTestId('icon'),
        caption: props.title,
        iconclass: props.iconclass,
        styles: this.styles.icon,
        iconurl: props.iconurl,
        iconheight: props.iconheight,
        iconmargin: props.iconmargin,
        iconwidth: props.iconwidth
      }) : null), props.closable && /*#__PURE__*/React.createElement(WmButton, {
        id: this.getTestId('closebtn'),
        show: props.closable,
        iconclass: "wm-sl-l sl-close",
        onTap: () => this.close(),
        styles: this.styles.closeBtn
      })) : null, props.children))), modalService));
      return null;
    });
  }
}
//# sourceMappingURL=dialog.component.js.map