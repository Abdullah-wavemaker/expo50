function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Platform, Text, TextInput, View } from 'react-native';
import { isArray } from 'lodash';
import IMask from 'imask';
import { FloatingLabel } from './floatinglabel.component';
const WmCursor = /*#__PURE__*/React.memo(props => {
  const opacityAnimation = useRef(new Animated.Value(0.5)).current;
  const runAnimation = useCallback(() => {
    Animated.timing(opacityAnimation, {
      toValue: 0.2,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(opacityAnimation, {
        toValue: 0.6,
        duration: 500,
        useNativeDriver: true
      }).start(runAnimation);
    });
  }, []);
  useEffect(() => {
    runAnimation();
  }, []);
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: {
      backgroundColor: props.color,
      width: 2,
      marginHorizontal: 1,
      height: props.height,
      opacity: opacityAnimation
    }
  });
});
export const WMTextInput = /*#__PURE__*/React.forwardRef((props, ref) => {
  const [selectRange, setSelectRange] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [iMask, setIMask] = useState(null);
  const [displayCursor, setDisplayCursor] = useState(false);
  const value = useRef(props.value || '');
  const [x, forceUpdate] = useState(1);
  const [displayValue, setDisplayValue] = useState('');
  const element = useRef(null);
  // iMask initialization
  useEffect(() => {
    const iMask = props.displayformat ? new IMask.MaskedPattern({
      mask: props.displayformat,
      skipInvalid: true,
      lazy: false,
      definitions: {
        '9': /\d/,
        'A': /[a-zA-Z]/,
        'a': /[a-z]/,
        '*': /\w/
      }
    }) : null;
    if (iMask) {
      iMask.typedValue = value;
      setDisplayValue(iMask.displayValue);
      setIMask(iMask);
    }
  }, [props.displayformat]);
  // set default value
  useEffect(() => {
    const defaultValue = props.defaultValue || props.value || '';
    if (!value.current) {
      value.current = defaultValue;
      onChangeText(defaultValue);
    }
  }, [props.defaultValue, props.value]);
  // set cursor position in windows
  useEffect(() => {
    setTimeout(() => {
      if (Platform.OS === 'web' && (props.displayformat || props.maskchar)) {
        var _element$current;
        element === null || element === void 0 || (_element$current = element.current) === null || _element$current === void 0 ? void 0 : _element$current.setSelectionRange(value.current.length, value.current.length);
      }
    }, 100);
  }, [value.current, props]);
  const onSelectionChange = useCallback(e => {
    var _e$nativeEvent;
    if (Platform.OS !== 'android') {
      return;
    }
    const selection = e === null || e === void 0 || (_e$nativeEvent = e.nativeEvent) === null || _e$nativeEvent === void 0 ? void 0 : _e$nativeEvent.selection;
    if (!props.allowContentSelection && selection && selection.end - selection.start > 0) {
      setSelectRange({
        start: value.current.length + 2,
        end: value.current.length + 2
      });
    } else if (selectRange && selectRange.end > 0) {
      setSelectRange(null);
    }
  }, [props.allowContentSelection, value]);
  // when text changes
  const onChangeText = useCallback(text => {
    if (!(iMask || props.maskchar)) {
      value.current = text;
      props.onChangeText && props.onChangeText(text);
      return;
    }
    let _value = value.current || '';
    if (value.current.length - text.length > 0) {
      _value = _value.substring(0, _value.length - (value.current.length - text.length));
    } else if (text.length - value.current.length > 0) {
      _value += text.slice(-1 * (text.length - value.current.length));
    }
    let formattedValue = _value;
    if (props.maskchar) {
      formattedValue = _value.replace(/./g, props.maskchar);
    }
    if (iMask) {
      iMask.typedValue = _value;
      formattedValue = iMask.displayValue;
    }
    if (formattedValue !== displayValue) {
      value.current = _value;
      props.onChangeText && props.onChangeText(_value);
    }
    forceUpdate(x + 1);
    setDisplayValue(formattedValue);
  }, [iMask, value, displayValue, props.onChangeText]);
  const valueExpr = Platform.OS === 'web' ? 'value' : 'defaultValue';
  const opts = {};
  opts[valueExpr] = value.current;
  const textStyle = Object.assign({}, ...(isArray(props.style) ? props.style : [props.style]));
  const hideInput = props.displayformat || props.maskchar;
  return /*#__PURE__*/React.createElement(React.Fragment, null, props.floatingLabel ? /*#__PURE__*/React.createElement(FloatingLabel, {
    moveUp: !!(value.current || isInputFocused || displayValue),
    label: props.floatingLabel ?? props.placeholder,
    style: {
      ...(props.floatingLabelStyle || []),
      ...(isInputFocused ? props.activeFloatingLabelStyle || {} : {})
    }
  }) : null, /*#__PURE__*/React.createElement(TextInput, _extends({}, props, hideInput ? opts : {}, {
    placeholder: props.floatingLabel || displayValue ? '' : props.placeholder,
    style: [props.style, hideInput ? {
      color: 'transparent',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      zIndex: 1
    } : {}],
    onFocus: e => {
      var _props$onFocus;
      (_props$onFocus = props.onFocus) === null || _props$onFocus === void 0 ? void 0 : _props$onFocus.call(props, e);
      setIsInputFocused(true);
      setDisplayCursor(true);
      element.current = e.target;
    },
    onBlur: e => {
      var _props$onBlur;
      props === null || props === void 0 || (_props$onBlur = props.onBlur) === null || _props$onBlur === void 0 ? void 0 : _props$onBlur.call(props, e);
      setIsInputFocused(false);
      setDisplayCursor(false);
    },
    ref: ref,
    selection: selectRange,
    onSelectionChange: onSelectionChange,
    caretHidden: !!(selectRange !== null && selectRange !== void 0 && selectRange.end),
    onChangeText: text => {
      onChangeText(text);
    }
  }, hideInput ? {
    selectionColor: 'transparent',
    cursorColor: 'transparent',
    onChange: () => {}
  } : {}, {
    contextMenuHidden: !props.allowContentSelection
  })), hideInput ? /*#__PURE__*/React.createElement(View, {
    style: [props.style, {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: -1 * (textStyle.height || textStyle.minHeight || 0) + (textStyle.marginTop || 0)
    }]
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      width: undefined,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      padding: 0,
      display: 'flex',
      color: textStyle.color,
      fontFamily: textStyle.fontFamily,
      fontSize: textStyle.fontSize,
      fontWeight: textStyle.fontWeight
    }
  }, displayValue), displayCursor && !props.displayformat ? /*#__PURE__*/React.createElement(WmCursor, {
    color: textStyle.color || '#000000',
    height: textStyle.fontSize || 14
  }) : null) : null);
});
//# sourceMappingURL=textinput.component.js.map