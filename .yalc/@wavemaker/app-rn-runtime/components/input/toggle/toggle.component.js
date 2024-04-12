function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { TouchableOpacity, Animated, Easing } from 'react-native';
import { BackgroundComponent } from '@wavemaker/app-rn-runtime/styles/background.component';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import { unStringify, validateField } from '@wavemaker/app-rn-runtime/core/utils';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
import WmToggleProps from './toggle.props';
import { DEFAULT_CLASS } from './toggle.styles';
export class WmToggleState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "isSwitchOn", false);
    _defineProperty(this, "isValid", true);
    _defineProperty(this, "errorType", '');
    _defineProperty(this, "viewWidth", 0);
  }
}
export default class WmToggle extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmToggleProps(), new WmToggleState());
    _defineProperty(this, "animationValue", new Animated.Value(0));
    _defineProperty(this, "scaleValue", new Animated.Value(1));
  }
  onPropertyChange(name, $new, $old) {
    switch (name) {
      case 'datavalue':
        let value = unStringify($new) === unStringify(this.state.props.checkedvalue, true);
        this.updateState({
          isSwitchOn: value
        });
        break;
    }
  }
  updateDatavalue(value) {
    this.updateState({
      props: {
        datavalue: value
      }
    });
  }
  validate(value) {
    const validationObj = validateField(this.state.props, value);
    this.updateState({
      isValid: validationObj.isValid,
      errorType: validationObj.errorType
    });
  }
  onToggleSwitch(value) {
    const oldValue = this.state.props.datavalue;
    this.validate(value);
    this.updateState({
      isSwitchOn: value
    });
    const dataValue = value === true ? this.state.props.checkedvalue : this.state.props.uncheckedvalue;
    Animated.sequence([Animated.timing(this.scaleValue, {
      toValue: 1.6,
      duration: 300,
      useNativeDriver: true
    }), Animated.timing(this.animationValue, {
      toValue: value ? 1 : 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true
    })]).start(() => {
      Animated.timing(this.scaleValue, {
        toValue: value ? 1.5 : 1,
        duration: 0,
        useNativeDriver: true
      }).start();
    });
    // @ts-ignore
    this.updateState({
      props: {
        datavalue: dataValue
      }
    }, () => {
      if (!this.props.onFieldChange) {
        this.invokeEventCallback('onChange', [null, this.proxy, dataValue, oldValue]);
      } else {
        this.props.onFieldChange && this.props.onFieldChange('datavalue', dataValue, oldValue);
      }
      this.invokeEventCallback('onBlur', [null, this.proxy]);
    });
  }
  onLayoutChange(event) {
    let width = event.nativeEvent.layout.width;
    this.setState({
      viewWidth: width
    });
  }
  renderWidget(props) {
    const styles = this.theme.mergeStyle(this.styles, this.theme.getStyle(this.state.isSwitchOn ? 'app-toggle-on' : 'app-toggle-off'));
    return /*#__PURE__*/React.createElement(TouchableOpacity, _extends({
      onLayout: e => {
        this.onLayoutChange(e);
      }
    }, getAccessibilityProps(AccessibilityWidgetType.TOGGLE, {
      ...this.props,
      selected: this.state.isSwitchOn
    }), {
      onPress: () => {
        if (this.props.disabled) {
          return;
        }
        // Added setTimeout to smooth animation
        setTimeout(() => {
          if (!props.readonly) {
            this.invokeEventCallback('onFocus', [null, this]);
          }
          this.invokeEventCallback('onTap', [null, this]);
        }, 500);
        this.onToggleSwitch(!this.state.isSwitchOn);
      }
    }, this.getTestPropsForAction(), {
      style: styles.root
    }), this._background, /*#__PURE__*/React.createElement(Animated.View, {
      style: [styles.handle, {
        transform: [{
          translateX: this.animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, this.state.viewWidth - (this.styles.handle.width + 18)]
          })
        }, {
          scale: this.scaleValue
        }]
      }]
    }, /*#__PURE__*/React.createElement(BackgroundComponent, {
      size: styles.handle.backgroundSize || 'contain',
      position: styles.handle.backgroundPosition,
      image: styles.handle.backgroundImage,
      repeat: styles.handle.backgroundRepeat || 'no-repeat'
    })));
  }
}
//# sourceMappingURL=toggle.component.js.map