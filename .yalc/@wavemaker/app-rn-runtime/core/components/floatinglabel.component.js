import React, { useEffect, useState } from 'react';
import { Animated, Text } from 'react-native';
import { Theme } from '@wavemaker/app-rn-runtime/styles/theme';
export const FloatingLabel = props => {
  var _props$style, _props$style2;
  const width = ((_props$style = props.style) === null || _props$style === void 0 ? void 0 : _props$style.width) || 160;
  const [labelPositionX] = useState(new Animated.Value(0));
  const [labelPositionY] = useState(new Animated.Value(0));
  const [labelScale] = useState(new Animated.Value(1));
  const fontSize = ((_props$style2 = props.style) === null || _props$style2 === void 0 ? void 0 : _props$style2.fontSize) || 16;
  useEffect(() => {
    Animated.parallel([Animated.timing(labelPositionX, {
      toValue: props.moveUp ? -1 * 0.1 * width : 0,
      duration: 200,
      useNativeDriver: true
    }), Animated.timing(labelPositionY, {
      toValue: props.moveUp ? -1 * fontSize : 0,
      duration: 200,
      useNativeDriver: true
    }), Animated.timing(labelScale, {
      toValue: props.moveUp ? 0.8 : 1,
      duration: 200,
      useNativeDriver: true
    })]).start();
  }, [props.moveUp]);
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [{
      position: 'absolute',
      zIndex: 1,
      width: width,
      transform: [{
        translateY: labelPositionY
      }, {
        translateX: labelPositionX
      }, {
        scale: labelScale
      }]
    }, props.style],
    pointerEvents: "none"
  }, /*#__PURE__*/React.createElement(Text, {
    style: Theme.BASE.getTextStyle(props.style),
    ellipsizeMode: "tail"
  }, props.label));
};
//# sourceMappingURL=floatinglabel.component.js.map