import React, { useState } from 'react';
import { View } from 'react-native';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';
const Animated = isWebPreviewMode() ? {} : require('react-native-reanimated');
export const CollapsiblePane = props => {
  const [height, setHeight] = useState(0);
  const offset = Animated.useSharedValue(0);
  offset.value = props.close ? 0 : 1;
  const onLayoutChange = e => {
    var _e$nativeEvent;
    setHeight((((_e$nativeEvent = e.nativeEvent) === null || _e$nativeEvent === void 0 || (_e$nativeEvent = _e$nativeEvent.layout) === null || _e$nativeEvent === void 0 ? void 0 : _e$nativeEvent.height) || height || 100000000) + 1000);
  };
  const animatedStyles = Animated.useAnimatedStyle(() => {
    return {
      maxHeight: Animated.withTiming(offset.value * height)
    };
  });
  return /*#__PURE__*/React.createElement(Animated.default.View, {
    style: [{
      overflow: 'hidden'
    }, animatedStyles]
  }, /*#__PURE__*/React.createElement(View, {
    onLayout: onLayoutChange
  }, props.children));
};
//# sourceMappingURL=collapsible-pane.component.js.map