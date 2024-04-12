function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Svg } from 'react-native-svg';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
import { VictoryLabel, VictoryPie } from 'victory-native';
import WmPieChartProps from './pie-chart.props';
import { DEFAULT_CLASS } from './pie-chart.styles';
import { formatCompactNumber } from '@wavemaker/app-rn-runtime/core/utils';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import { BaseChartComponent, BaseChartComponentState } from '@wavemaker/app-rn-runtime/components/chart/basechart.component';
import WmDonutChartProps from '@wavemaker/app-rn-runtime/components/chart/donut-chart/donut-chart.props';
import { Legend } from '../legend/legend.component';
export class WmPieChartState extends BaseChartComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "chartWidth", 0);
    _defineProperty(this, "totalHeight", 0);
    _defineProperty(this, "infoHeight", 10);
    _defineProperty(this, "legendWidth", 0);
    _defineProperty(this, "legendHeight", 0);
    _defineProperty(this, "opacity", 0);
  }
}
export default class WmPieChart extends BaseChartComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, props.type === 'Donut' ? new WmDonutChartProps() : new WmPieChartProps(), new WmPieChartState());
    _defineProperty(this, "onViewLayoutChange", e => {
      var _e$nativeEvent;
      let viewWidth = e.nativeEvent.layout.width;
      this.updateState({
        chartWidth: viewWidth,
        totalHeight: (_e$nativeEvent = e.nativeEvent) === null || _e$nativeEvent === void 0 ? void 0 : _e$nativeEvent.layout.height
      });
    });
    _defineProperty(this, "onInfoViewLayoutChange", e => {
      var _e$nativeEvent2;
      this.updateState({
        infoHeight: (_e$nativeEvent2 = e.nativeEvent) === null || _e$nativeEvent2 === void 0 ? void 0 : _e$nativeEvent2.layout.height,
        opacity: 1
      });
    });
    _defineProperty(this, "onLegendViewLayoutChange", e => {
      var _e$nativeEvent3, _e$nativeEvent4;
      this.updateState({
        legendWidth: (_e$nativeEvent3 = e.nativeEvent) === null || _e$nativeEvent3 === void 0 ? void 0 : _e$nativeEvent3.layout.width,
        legendHeight: (_e$nativeEvent4 = e.nativeEvent) === null || _e$nativeEvent4 === void 0 ? void 0 : _e$nativeEvent4.layout.height
      });
    });
  }
  componentDidMount() {
    super.componentDidMount();
  }
  getLabel(d, props) {
    switch (props.labeltype) {
      case 'percent':
        {
          return Math.round(d.y * 100 / this.state.total) + '%';
        }
      case 'key':
        {
          return this.state.xaxisDatakeyArr[d.x];
        }
      case 'value':
        {
          return formatCompactNumber(d.y);
        }
      case 'key-value':
        {
          return this.state.xaxisDatakeyArr[d.x] + ' ' + d.y;
        }
    }
  }
  onSelect(event, data) {
    let value = data.slice.value;
    let label = this.state.xaxisDatakeyArr[data.datum.x];
    let selectedItem = this.props.dataset[data.index];
    let selectedChartItem = data.slice;
    selectedChartItem["data"] = {
      x: label,
      y: value,
      color: data.style.fill,
      _dataObj: selectedItem
    };
    this.invokeEventCallback('onSelect', [event.nativeEvent, this.proxy, selectedItem, selectedChartItem]);
  }
  renderWidget(props) {
    this.invokeEventCallback('onBeforerender', [this.proxy, null]);
    if (!this.state.data.length) {
      return null;
    }
    const pieData = this.state.data[0];
    const chartWidth = this.state.chartWidth - (props.showlegend === 'right' ? this.state.legendWidth : 0);
    const chartHeight = (this.styles.root.height ? this.state.totalHeight : chartWidth) - this.state.infoHeight - (props.showlegend === 'right' ? 0 : this.state.legendHeight);
    let radius = (Math.min(chartWidth, chartHeight) - 40) / 2;
    let innerRadius = props.donutratio * radius;
    let styleProp = {};
    let labelRadius;
    if (props.showlabels === 'hide') {
      styleProp = {
        labels: {
          display: "none"
        }
      };
    } else if (props.showlabels === 'inside') {
      labelRadius = radius / 2;
    } else {
      labelRadius = radius + 8;
    }
    const origin = {
      x: chartWidth / 2,
      y: chartHeight / 2
    };
    const orientation = props.showlegend === 'right' ? 'vertical' : 'horizontal';
    let legendData = pieData.map((d, index) => {
      return {
        name: this.state.xaxisDatakeyArr[d.x],
        color: this.state.colors[index % this.state.colors.length]
      };
    });
    return /*#__PURE__*/React.createElement(View, _extends({
      style: [{
        opacity: this.state.opacity
      }, this.styles.root]
    }, getAccessibilityProps(AccessibilityWidgetType.LINECHART, props), {
      onLayout: this.onViewLayoutChange
    }), /*#__PURE__*/React.createElement(View, {
      onLayout: this.onInfoViewLayoutChange
    }, /*#__PURE__*/React.createElement(View, {
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
    }, props.subheading)), props.showlegend === 'top' ? /*#__PURE__*/React.createElement(View, {
      onLayout: this.onLegendViewLayoutChange
    }, /*#__PURE__*/React.createElement(Legend, {
      data: legendData,
      testStyle: this.styles.legendText,
      dotStyle: this.styles.legenedDot
    })) : null, /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(View, {
      style: {
        flex: 1
      }
    }, chartWidth ? /*#__PURE__*/React.createElement(Svg, {
      width: chartWidth,
      height: chartHeight
    }, /*#__PURE__*/React.createElement(VictoryPie, {
      style: styleProp,
      standalone: false,
      colorScale: this.state.colors,
      labels: _ref => {
        let {
          datum
        } = _ref;
        return this.getLabel(datum, props);
      },
      endAngle: this.state.endAngle || 0,
      radius: radius,
      innerRadius: innerRadius,
      theme: this.state.theme,
      key: props.name,
      name: props.name,
      data: this.isRTL ? pieData.toReversed() : pieData,
      origin: origin,
      labelPlacement: props.labelplacement,
      labelRadius: labelRadius,
      events: [{
        target: 'data',
        eventHandlers: Platform.OS == "web" ? {
          onClick: this.onSelect.bind(this)
        } : {
          onPress: this.onSelect.bind(this)
        }
      }]
    }), /*#__PURE__*/React.createElement(VictoryLabel, {
      textAnchor: "middle",
      style: this.styles.title,
      x: origin.x,
      y: origin.y,
      text: props.centerlabel
    })) : null), props.showlegend === 'right' ? /*#__PURE__*/React.createElement(View, {
      style: {
        maxWidth: '50%'
      },
      onLayout: this.onLegendViewLayoutChange
    }, /*#__PURE__*/React.createElement(Legend, {
      data: legendData,
      testStyle: this.styles.legendText,
      dotStyle: this.styles.legenedDot,
      orientation: "vertical"
    })) : null), props.showlegend === 'bottom' ? /*#__PURE__*/React.createElement(View, {
      onLayout: this.onLegendViewLayoutChange
    }, /*#__PURE__*/React.createElement(Legend, {
      data: legendData,
      testStyle: this.styles.legendText,
      dotStyle: this.styles.legenedDot
    })) : null);
  }
}
//# sourceMappingURL=pie-chart.component.js.map