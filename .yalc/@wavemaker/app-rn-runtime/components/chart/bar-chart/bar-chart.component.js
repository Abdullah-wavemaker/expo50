function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { View, Text, Platform } from 'react-native';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
import { VictoryChart, VictoryBar, VictoryStack, VictoryGroup } from "victory-native";
import { BaseChartComponent, BaseChartComponentState } from "@wavemaker/app-rn-runtime/components/chart/basechart.component";
import WmBarChartProps from './bar-chart.props';
import { DEFAULT_CLASS } from './bar-chart.styles';
import WmIcon from "@wavemaker/app-rn-runtime/components/basic/icon/icon.component";
export class WmBarChartState extends BaseChartComponentState {}
export default class WmBarChart extends BaseChartComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmBarChartProps(), new WmBarChartState());
  }
  labelFn(data) {
    return this.abbreviateNumber(data.datum.y);
  }
  getBarChart(props) {
    return this.state.data.map((d, i) => {
      return /*#__PURE__*/React.createElement(VictoryBar, {
        key: props.name + '_' + i,
        horizontal: props.horizontal,
        labels: props.showvalues ? this.labelFn.bind(this) : undefined,
        data: this.isRTL ? d.toReversed() : d,
        height: 100,
        alignment: "start",
        style: props.customcolors ? {
          data: {
            fill: _ref => {
              let {
                datum
              } = _ref;
              return this.state.colors[datum.x] ?? this.state.colors[datum.x % this.state.colors.length];
            }
          }
        } : {},
        cornerRadius: {
          topLeft: this.styles.bar.borderTopLeftRadius,
          topRight: this.styles.bar.borderTopRightRadius,
          bottomLeft: this.styles.bar.borderBottomLeftRadius,
          bottomRight: this.styles.bar.borderBottomRightRadius
        },
        events: [{
          target: 'data',
          eventHandlers: Platform.OS == "web" ? {
            onClick: this.onSelect.bind(this)
          } : {
            onPress: this.onSelect.bind(this)
          }
        }]
      });
    });
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
    this.invokeEventCallback('onBeforerender', [this.proxy, null]);
    if (!this.state.data.length) {
      return null;
    }
    let mindomain = {
      x: this.props.xdomain === 'Min' ? this.state.chartMinX : undefined,
      y: this.props.ydomain === 'Min' ? this.state.chartMinY : undefined
    };
    return /*#__PURE__*/React.createElement(View, _extends({}, getAccessibilityProps(AccessibilityWidgetType.LINECHART, props), {
      style: this.styles.root
    }), /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'row',
        alignItems: 'center'
      }
    }, props.iconclass ? /*#__PURE__*/React.createElement(WmIcon, {
      iconclass: props.iconclass,
      styles: this.styles.icon
    }) : null, /*#__PURE__*/React.createElement(Text, {
      style: this.styles.title
    }, props.title)), /*#__PURE__*/React.createElement(Text, {
      style: this.styles.subHeading
    }, props.subheading)), /*#__PURE__*/React.createElement(VictoryChart, {
      theme: this.state.theme,
      height: this.styles.root.height,
      width: this.styles.root.width || this.screenWidth,
      minDomain: mindomain,
      padding: {
        top: props.offsettop,
        bottom: props.offsetbottom,
        left: props.offsetleft,
        right: props.offsetright
      },
      containerComponent: this.getTooltip(props)
    }, this.getLegendView(), this.getXaxis(), this.getYAxis(), props.viewtype === 'Stacked' ? /*#__PURE__*/React.createElement(VictoryStack, {
      colorScale: this.state.colors
    }, this.getBarChart(props)) : /*#__PURE__*/React.createElement(VictoryGroup, {
      colorScale: this.state.colors,
      offset: 10
    }, this.getBarChart(props))));
  }
}
//# sourceMappingURL=bar-chart.component.js.map