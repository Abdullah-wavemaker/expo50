function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { find, isEmpty } from 'lodash';
import WmSelectProps from './select.props';
import { DEFAULT_CLASS } from './select.styles';
import { BaseDatasetComponent, BaseDatasetState } from '@wavemaker/app-rn-runtime/components/input/basedataset/basedataset.component';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import { ModalConsumer } from '@wavemaker/app-rn-runtime/core/modal.service';
import WmButton from '@wavemaker/app-rn-runtime/components/basic/button/button.component';
import { Tappable } from '@wavemaker/app-rn-runtime/core/tappable.component';
import ThemeVariables from '@wavemaker/app-rn-runtime/styles/theme.variables';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
export class WmSelectState extends BaseDatasetState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "modalOptions", {});
    _defineProperty(this, "isOpened", false);
    _defineProperty(this, "selectedValue", '');
  }
}
export default class WmSelect extends BaseDatasetComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmSelectProps(), new WmSelectState());
    _defineProperty(this, "view", null);
    _defineProperty(this, "widgetRef", null);
    _defineProperty(this, "isDefaultValue", true);
    _defineProperty(this, "showPopover", () => {
      this.updateState({
        isOpened: true
      });
    });
    _defineProperty(this, "hide", () => {});
  }
  onPress(event) {
    if (this.state.props.disabled) {
      return;
    }
    if (!this.state.isOpened) {
      this.showPopover();
    }
    this.invokeEventCallback('onFocus', [event, this.proxy]);
  }
  onPropertyChange(name, $new, $old) {
    super.onPropertyChange(name, $new, $old);
    switch (name) {
      case 'datavalue':
        if (isNaN($new) && isEmpty($new)) {
          this.updateState({
            props: {
              displayValue: this.state.props.placeholder || ''
            }
          });
        }
    }
  }
  prepareModalOptions(content, styles, modalService) {
    const o = this.state.modalOptions;
    o.modalStyle = styles.modal;
    o.contentStyle = {
      ...styles.modalContent
    };
    o.content = content;
    o.isModal = true;
    o.centered = true;
    o.onClose = () => {
      this.hide = () => {};
      if (this.isDefaultValue && this.state.props.displayValue === '') {
        this.validate(this.state.props.displayValue);
        this.props.triggerValidation && this.props.triggerValidation();
      }
      this.invokeEventCallback('onBlur', [{}, this.proxy]);
      this.setState({
        isOpened: false,
        modalOptions: {}
      });
    };
    this.hide = () => modalService.hideModal(this.state.modalOptions);
    return o;
  }
  focus() {
    var _this$widgetRef;
    this === null || this === void 0 || (_this$widgetRef = this.widgetRef) === null || _this$widgetRef === void 0 ? void 0 : _this$widgetRef.focus();
  }
  renderSelect() {
    const props = this.state.props;
    return (
      /*#__PURE__*/
      /*
       * onLayout function is required.
       * https://github.com/naoufal/react-native-accordion/pull/19/files
       */
      React.createElement(View, _extends({}, getAccessibilityProps(AccessibilityWidgetType.SELECT, props), {
        style: [this.styles.root, this.state.isValid ? {} : this.styles.invalid, {
          backgroundColor: props.disabled ? this.styles.disabledText.backgroundColor : this.styles.root.backgroundColor
        }],
        ref: ref => {
          this.view = ref;
        },
        onLayout: () => {}
      }), /*#__PURE__*/React.createElement(Text, _extends({
        style: [this.styles.text, this.state.props.displayValue ? {} : {
          color: this.styles.placeholderText.color
        }],
        ref: ref => {
          this.widgetRef = ref;
        }
      }, this.getTestPropsForInput(), {
        onPress: this.onPress.bind(this)
      }), this.state.props.displayValue || props.placeholder || ' '), /*#__PURE__*/React.createElement(WmButton, {
        styles: this.styles.arrowButton,
        iconclass: 'wi wi-keyboard-arrow-down',
        onTap: this.onPress.bind(this)
      }))
    );
  }
  isSelected(item) {
    const val = this.state.props.datafield === 'All Fields' ? item.dataObject : item.datafield;
    return this.state.props.datavalue === val;
  }
  onItemSelect(item, isPlaceholder) {
    this.isDefaultValue = false;
    this.onChange(isPlaceholder ? '' : this.state.props.datafield === 'All Fields' ? item.dataObject : item.datafield);
    this.hide();
  }
  renderSelectItem(item, index, isPlaceholder, isLast) {
    let selected = this.isSelected(item);
    return /*#__PURE__*/React.createElement(Tappable, _extends({}, this.getTestPropsForAction(index + ''), {
      onTap: this.onItemSelect.bind(this, item, isPlaceholder)
    }, getAccessibilityProps(AccessibilityWidgetType.SELECT, {
      ...this.props,
      expanded: this.state.isOpened
    })), /*#__PURE__*/React.createElement(View, {
      style: [this.styles.selectItem, isLast ? this.styles.lastSelectItem : null, selected ? this.styles.selectedItem : null]
    }, /*#__PURE__*/React.createElement(Text, _extends({}, this.getTestPropsForLabel(index + ''), {
      style: [this.styles.selectItemText, {
        color: isPlaceholder ? this.styles.placeholderText.color : selected ? this.styles.selectedItemText.color : this.styles.selectItemText.color
      }]
    }), isPlaceholder ? this.state.props.placeholder : item.displayexp || item.displayfield), /*#__PURE__*/React.createElement(WmIcon, {
      id: this.getTestId('checkicon' + index),
      iconclass: "wi wi-check",
      styles: this.theme.mergeStyle(this.styles.checkIcon, {
        root: {
          opacity: !isPlaceholder && selected ? 1 : 0
        }
      })
    })));
  }
  updateDefaultQueryModel() {
    if (this.state.dataItems && this.state.dataItems.length && this.isDefaultValue) {
      const selectedItem = find(this.state.dataItems, item => item.selected);
      selectedItem && this.updateState({
        props: {
          displayValue: selectedItem.displayexp || selectedItem.displayfield || ''
        }
      });
    }
  }
  componentDidMount() {
    super.componentDidMount();
    this.updateDefaultQueryModel();
  }
  onDataItemsUpdate() {
    super.onDataItemsUpdate();
    this.updateDefaultQueryModel();
  }
  renderWidget(props) {
    return /*#__PURE__*/React.createElement(View, null, this.renderSelect(), this.state.isOpened ? /*#__PURE__*/React.createElement(ModalConsumer, null, modalService => {
      const items = this.state.dataItems;
      modalService.showModal(this.prepareModalOptions( /*#__PURE__*/React.createElement(ScrollView, {
        style: {
          width: '100%',
          maxHeight: ThemeVariables.INSTANCE.maxModalHeight
        },
        contentContainerStyle: this.styles.dropDownContent
      }, props.placeholder ? /*#__PURE__*/React.createElement(View, {
        key: props.name + '_placeholder',
        style: this.styles.placeholderText
      }, this.renderSelectItem({}, 0, true, false)) : null, items && items.map((item, index) => /*#__PURE__*/React.createElement(View, {
        key: item.key
      }, this.renderSelectItem(item, index, false, index === items.length - 1)))), this.styles, modalService));
      return null;
    }) : null);
  }
}
//# sourceMappingURL=select.component.js.map