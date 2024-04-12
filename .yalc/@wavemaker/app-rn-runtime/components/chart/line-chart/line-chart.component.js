function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Text, View, Platform } from 'react-native';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
import { VictoryChart, VictoryLine, VictoryScatter, VictoryGroup } from 'victory-native';
import WmLineChartProps from './line-chart.props';
import { DEFAULT_CLASS } from './line-chart.styles';
import { BaseChartComponent, BaseChartComponentState } from "@wavemaker/app-rn-runtime/components/chart/basechart.component";
import ThemeVariables from '@wavemaker/app-rn-runtime/styles/theme.variables';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
export class WmLineChartState extends BaseChartComponentState {}
export default class WmLineChart extends BaseChartComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmLineChartProps(), new WmLineChartState());
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
    return /*#__PURE__*/React.createElement(View, _extends({
      style: this.styles.root
    }, getAccessibilityProps(AccessibilityWidgetType.LINECHART, props)), /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(View, {
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
      padding: {
        top: props.offsettop,
        bottom: props.offsetbottom,
        left: props.offsetleft,
        right: props.offsetright
      },
      containerComponent: this.getTooltip(props)
    }, this.getLegendView(), this.getXaxis(), this.getYAxis(), this.state.data.map((d, i) => {
      return /*#__PURE__*/React.createElement(VictoryGroup, {
        key: props.name + '_line_group_' + i
      }, /*#__PURE__*/React.createElement(VictoryLine, {
        interpolation: props.interpolation,
        key: props.name + '_line_' + i,
        name: props.name + '_' + i,
        standalone: true,
        style: {
          data: {
            stroke: this.state.colors[i] || ThemeVariables.INSTANCE.chartLineColor,
            strokeWidth: props.linethickness
          }
        },
        data: this.isRTL ? d.toReversed() : d
      }), /*#__PURE__*/React.createElement(VictoryScatter, {
        size: 5,
        key: props.name + '_scatter' + i,
        style: {
          data: props.highlightpoints || this.state.data.length === 1 ? {
            fill: this.state.colors[i],
            opacity: 0.8
          } : {
            opacity: 0
          }
        },
        data: this.isRTL ? d.toReversed() : d,
        events: [{
          target: 'data',
          eventHandlers: Platform.OS == "web" ? {
            onClick: this.onSelect.bind(this)
          } : {
            onPress: this.onSelect.bind(this)
          }
        }]
      }));
    })));
  }
}
//# sourceMappingURL=line-chart.component.js.map