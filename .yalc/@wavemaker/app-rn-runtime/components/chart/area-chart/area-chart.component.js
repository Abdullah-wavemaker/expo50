function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import Color from "color";
import { View, Text, Platform } from 'react-native';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { VictoryArea, VictoryChart, VictoryStack, VictoryScatter, VictoryGroup } from "victory-native";
import WmAreaChartProps from './area-chart.props';
import { DEFAULT_CLASS } from './area-chart.styles';
import { BaseChartComponent, BaseChartComponentState } from "@wavemaker/app-rn-runtime/components/chart/basechart.component";
import WmIcon from "@wavemaker/app-rn-runtime/components/basic/icon/icon.component";
import { isNumber } from 'lodash-es';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
export class WmAreaChartState extends BaseChartComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "chartWidth", 0);
  }
}
export default class WmAreaChart extends BaseChartComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmAreaChartProps(), new WmAreaChartState());
    _defineProperty(this, "onViewLayoutChange", e => {
      let viewWidth = e.nativeEvent.layout.width;
      this.updateState({
        chartWidth: viewWidth
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
    var _this$state$data;
    this.invokeEventCallback('onBeforerender', [this.proxy, null]);
    if (!((_this$state$data = this.state.data) !== null && _this$state$data !== void 0 && _this$state$data.length)) {
      return null;
    }
    let mindomain = {
      x: props.xdomain === 'Min' ? this.state.chartMinX : undefined,
      y: props.ydomain === 'Min' ? this.state.chartMinY : undefined
    };
    const chartName = this.props.name ?? 'nonameAreachart';
    let gradientStop = '100%';
    if (isNumber(this.state.chartMaxY) && isNumber(this.state.chartMinY) && this.state.chartMaxY > 0) {
      gradientStop = (this.state.chartMaxY - this.state.chartMinY) * 100 / this.state.chartMaxY + '%';
    }
    return /*#__PURE__*/React.createElement(View, _extends({}, getAccessibilityProps(AccessibilityWidgetType.LINECHART, props), {
      style: this.styles.root,
      onLayout: this.onViewLayoutChange.bind(this)
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
    }, props.subheading)), this.state.chartWidth ? /*#__PURE__*/React.createElement(VictoryChart, {
      theme: this.state.theme,
      height: this.styles.root.height,
      width: this.state.chartWidth || 120,
      padding: {
        top: props.offsettop,
        bottom: props.offsetbottom,
        left: props.offsetleft,
        right: props.offsetright
      },
      minDomain: mindomain,
      containerComponent: this.getTooltip(props)
    }, this.getLegendView(), this.getXaxis(), this.getYAxis(), /*#__PURE__*/React.createElement(VictoryStack, null, this.state.data.map((d, i) => {
      return /*#__PURE__*/React.createElement(VictoryGroup, {
        key: props.name + '_area_group_' + i
      }, /*#__PURE__*/React.createElement(Defs, null, /*#__PURE__*/React.createElement(LinearGradient, {
        id: `${chartName}Gradient${i}`,
        x1: "0%",
        y1: "0%",
        x2: "0%",
        y2: "100%"
      }, /*#__PURE__*/React.createElement(Stop, {
        offset: "0%",
        stopColor: Color(this.state.colors[i]).lighten(0.2).rgb().toString()
      }), /*#__PURE__*/React.createElement(Stop, {
        offset: gradientStop,
        stopColor: Color(this.state.colors[i]).lighten(0.6).rgb().toString()
      }))), /*#__PURE__*/React.createElement(VictoryArea, {
        interpolation: props.interpolation,
        key: props.name + '_' + i,
        name: props.name + '_' + i,
        style: {
          data: {
            fill: `url(#${chartName}Gradient${i})`,
            stroke: this.state.colors[i],
            strokeWidth: props.linethickness
          }
        },
        data: this.isRTL ? d.toReversed() : d
      }), /*#__PURE__*/React.createElement(VictoryScatter, {
        size: 5,
        key: props.name + '_scatter' + i,
        style: {
          data: props.highlightpoints ? {
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
    }))) : null);
  }
}
//# sourceMappingURL=area-chart.component.js.map