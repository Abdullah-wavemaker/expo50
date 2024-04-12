import React from 'react';
import { StyleSheet, View } from 'react-native';
export let HideMode = /*#__PURE__*/function (HideMode) {
  HideMode[HideMode["DONOT_ADD_TO_DOM"] = 0] = "DONOT_ADD_TO_DOM";
  HideMode[HideMode["ADD_TO_DOM"] = 1] = "ADD_TO_DOM";
  return HideMode;
}({});
const styles = StyleSheet.create({
  hidden: {
    width: 0,
    height: 0,
    transform: [{
      scale: 0
    }]
  },
  visible: {}
});
export const WmIf = _ref => {
  let {
    condition = true,
    hideMode = 0,
    style,
    children
  } = _ref;
  if (hideMode === HideMode.ADD_TO_DOM) {
    React.Children.map;
    return /*#__PURE__*/React.createElement(View, {
      style: [condition ? styles.visible : styles.hidden, style]
    }, children);
  } else if (condition) {
    return children;
  } else {
    return null;
  }
};
//# sourceMappingURL=if.component.js.map