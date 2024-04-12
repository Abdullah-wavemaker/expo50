import * as React from 'react';
import { View, Text } from "react-native";
export const Legend = function (props) {
  var _props$data;
  return /*#__PURE__*/React.createElement(View, {
    style: [props.orientation === 'vertical' ? {
      flexDirection: 'column',
      justifyContent: 'center'
    } : {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }]
  }, (_props$data = props.data) === null || _props$data === void 0 ? void 0 : _props$data.map(d => {
    return /*#__PURE__*/React.createElement(View, {
      key: d.name,
      style: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4
      }
    }, /*#__PURE__*/React.createElement(View, {
      style: [{
        width: 12,
        height: 12
      }, props.dotStyle, {
        backgroundColor: d.color
      }]
    }), /*#__PURE__*/React.createElement(Text, {
      style: [{
        paddingLeft: 4
      }, props.testStyle]
    }, d.name));
  }));
};
//# sourceMappingURL=legend.component.js.map