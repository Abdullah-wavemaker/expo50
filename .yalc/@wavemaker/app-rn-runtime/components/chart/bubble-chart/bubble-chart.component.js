function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { View, Platform } from 'react-native';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
import WmBubbleChartProps from './bubble-chart.props';
import { DEFAULT_CLASS } from './bubble-chart.styles';
import { BaseChartComponent, BaseChartComponentState } from "@wavemaker/app-rn-runtime/components/chart/basechart.component";
import { VictoryChart, VictoryLegend, VictoryScatter } from "victory-native";
import { Svg } from "react-native-svg";
export class WmBubbleChartState extends BaseChartComponentState {}
export default class WmBubbleChart extends BaseChartComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmBubbleChartProps(), new WmBubbleChartState());
  }
  onSelect(event, data) {
    let value = data.data[data.index].y;
    let label = this.state.xaxisDatakeyArr[data.datum.x];
    let selectedItem = this.props.dataset[data.index];
    let selectedChartItem = [{
      series: 0,
      x: data.index,
      y: value,
      _dataObj: selectedItem
    }, data.index];
    this.invokeEventCallback('onSelect', [event.nativeEvent, this.proxy, selectedItem, selectedChartItem]);
  }
  renderWidget(props) {
    var _this$state$data;
    this.invokeEventCallback('onBeforerender', [this.proxy, null]);
    if (!((_this$state$data = this.state.data) !== null && _this$state$data !== void 0 && _this$state$data.length)) {
      return null;
    }
    return /*#__PURE__*/React.createElement(View, _extends({}, getAccessibilityProps(AccessibilityWidgetType.LINECHART, props), {
      style: this.styles.root
    }), /*#__PURE__*/React.createElement(VictoryChart, {
      theme: this.state.theme,
      height: this.styles.root.height,
      width: this.styles.root.width || this.screenWidth,
      padding: {
        top: props.offsettop,
        bottom: props.offsetbottom,
        left: props.offsetleft,
        right: props.offsetright
      },
      containerComponent: this.getTooltip(props)
    }, /*#__PURE__*/React.createElement(VictoryLegend, {
      name: 'legend',
      containerComponent: /*#__PURE__*/React.createElement(Svg, null),
      title: [props.title, props.subheading],
      orientation: "horizontal",
      gutter: 20,
      data: [],
      theme: this.state.theme
    }), this.getLegendView(), this.getXaxis(), this.getYAxis(), this.state.data.map((d, i) => {
      return /*#__PURE__*/React.createElement(VictoryScatter, {
        colorScale: this.state.colors,
        style: {
          data: {
            fill: this.state.colors[i],
            opacity: _ref => {
              let {
                datum
              } = _ref;
              return datum.opacity;
            }
          }
        },
        key: props.name + '_bubble_' + i,
        name: props.name + '_bubble_' + i,
        data: d,
        size: 5,
        events: [{
          target: 'data',
          eventHandlers: Platform.OS == "web" ? {
            onClick: this.onSelect.bind(this)
          } : {
            onPress: this.onSelect.bind(this)
          }
        }]
      });
    })));
  }
}
//# sourceMappingURL=bubble-chart.component.js.map