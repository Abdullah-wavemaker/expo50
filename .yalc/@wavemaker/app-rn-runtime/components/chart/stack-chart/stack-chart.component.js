function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View, Platform } from 'react-native';
import { Svg } from 'react-native-svg';
import { VictoryStack, VictoryBar, VictoryChart, VictoryPie, VictoryLegend, VictoryAxis } from 'victory-native';
import { Axis, Scale } from 'victory-core';
import { orderBy, cloneDeep, findIndex, isString } from 'lodash';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
import WmStackChartProps from './stack-chart.props';
import { DEFAULT_CLASS } from './stack-chart.styles';
import { BaseChartComponent, BaseChartComponentState } from '@wavemaker/app-rn-runtime/components/chart/basechart.component';
export class WmStackChartState extends BaseChartComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "chartWidth", 0);
  }
}
export default class WmStackChart extends BaseChartComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmStackChartProps(), new WmStackChartState());
    _defineProperty(this, "onViewLayoutChange", e => {
      let viewWidth = e.nativeEvent.layout.width;
      this.updateState({
        chartWidth: viewWidth
      });
    });
  }
  componentDidMount() {
    super.componentDidMount();
    this.setHeightWidthOnChart();
  }
  getNegativeValuesArray() {
    let negativeValuesArray = cloneDeep(this.state.data[0]).filter(d => d.y < 0);
    negativeValuesArray = orderBy(negativeValuesArray, 'y', 'desc');
    return negativeValuesArray;
  }
  getPositiveValuesArray() {
    let positiveValuesArray = cloneDeep(this.state.data[0]).filter(d => d.y > 0);
    positiveValuesArray = orderBy(positiveValuesArray, 'y', 'asc');
    return positiveValuesArray;
  }
  getData() {
    const negativeValues = cloneDeep(this.getNegativeValuesArray());
    return negativeValues.concat(cloneDeep(this.getPositiveValuesArray()));
  }
  updateColors() {
    if (this.state.colors.length === 1) {
      return this.state.colors[0];
    } else {
      let colorCodes = cloneDeep(this.state.colors);
      if (this.state.data.length > 0) {
        const orderedData = this.getData();
        this.state.data[0].map((d, i) => {
          let index = findIndex(orderedData, d);
          colorCodes[index] = this.state.colors[i];
        });
        return colorCodes;
      }
    }
  }
  getBarChart(props) {
    if (this.state.data.length > 0) {
      const negativeValues = cloneDeep(this.getNegativeValuesArray());
      const data = this.getData();
      let currentValue = 0;
      let cornerRadius;
      return data.map((d, i) => {
        let d1 = [];
        d.x = 0;
        d.y = d.y - currentValue;
        d1.push(d);
        currentValue = d.y < 0 && i === negativeValues.length - 1 ? 0 : d.y + currentValue;
        if (i === 0) {
          cornerRadius = {
            top: 0,
            bottom: -5
          };
        }
        if (i === data.length - 1) {
          cornerRadius = {
            top: -5,
            bottom: -5
          };
        }
        return /*#__PURE__*/React.createElement(VictoryBar, {
          key: props.name + '_' + i,
          cornerRadius: cornerRadius,
          data: d1
        });
      });
    }
  }
  getColorCodes() {
    const colors = cloneDeep(this.updateColors());
    return isString(colors) ? [colors] : colors.reverse();
  }
  getArcChart(props) {
    if (this.state.data.length > 0) {
      let data = cloneDeep(this.state.data[0]);
      const colorScaleArray = this.getColorCodes();
      const maxValue = Math.max(...data.map(o => o.y));
      data = orderBy(data, 'y', 'desc');
      const radius = Math.min(this.state.chartWidth / 2, this.state.chartHeight - 50);
      return data.map((d, i) => {
        let d1 = [];
        d1.push(d);
        d1.push({
          x: d.x,
          y: maxValue - d.y
        });
        return /*#__PURE__*/React.createElement(VictoryPie, {
          key: props.name + '_' + i,
          radius: radius,
          colorScale: [colorScaleArray[i], '#fff0'],
          startAngle: -80,
          endAngle: 80,
          cornerRadius: 100,
          standalone: false,
          origin: {
            x: this.state.chartWidth / 2,
            y: this.state.chartHeight - 50
          },
          innerRadius: radius - this.state.props.thickness,
          labels: [],
          data: d1
        });
      });
    }
  }
  getArcAxis() {
    const ticks = this.getTickValues();
    const radius = Math.min(this.state.chartWidth / 2, this.state.chartHeight - 50);
    const axisData = [];
    ticks.forEach((d, i) => {
      axisData.push({
        x: `${this.state.props.yunits}${d}`,
        y: 1
      });
    });
    return /*#__PURE__*/React.createElement(VictoryPie, {
      style: {
        labels: {
          fontSize: 12,
          paddingLeft: 50,
          paddingRight: 80
        }
      },
      startAngle: -90,
      endAngle: 90,
      standalone: false,
      colorScale: ['#fff0'],
      origin: {
        x: this.state.chartWidth / 2 - 5,
        y: this.state.chartHeight - 50
      },
      labelRadius: radius - this.state.props.thickness - 20,
      data: axisData
    });
  }
  getTickValues() {
    let ticks = [];
    if (this.state.data[0].length) {
      let data = cloneDeep(this.state.data[0]);
      const maxValue = Math.max(...data.map(o => o.y ? o.y : 0));
      const minValue = Math.min(...data.map(o => o.y ? o.y : 0));
      const scale = Scale.getBaseScale({}, 'x');
      scale.domain([minValue > 0 ? 0 : minValue, maxValue]);
      ticks = Axis.getTicks({}, scale);
      ticks[ticks.length - 1] = maxValue;
      if (minValue < 0) {
        if (ticks[0] === 0) {
          ticks.unshift(minValue);
        } else {
          ticks[0] = minValue;
        }
      } else {
        ticks[0] = this.state.props.minvalue;
      }
    }
    return ticks;
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
      style: this.styles.root,
      onLayout: this.onViewLayoutChange
    }), props.viewtype === 'Bar' ? /*#__PURE__*/React.createElement(VictoryChart, {
      theme: this.state.theme,
      minDomain: mindomain,
      height: this.styles.root.height,
      width: this.styles.root.width || this.state.chartWidth || 200,
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
      style: {
        title: {
          fontFamily: "'Helvetica Neue', 'Helvetica', sans-serif",
          fontSize: 18
        }
      },
      title: [props.title, props.subheading],
      orientation: "horizontal",
      gutter: 20,
      data: [],
      theme: this.state.theme
    }), this.getLegendView(this.updateColors()), /*#__PURE__*/React.createElement(VictoryAxis, {
      crossAxis: true,
      style: {
        tickLabels: {
          fill: this.state.props.showyaxis === false ? 'transparent' : '#000000',
          fontSize: 12,
          padding: this.state.props.thickness / 2 + 5
        },
        axisLabel: {
          padding: 15 + this.state.props.thickness / 2
        },
        grid: {
          stroke: 'none'
        }
      },
      theme: this.state.theme,
      tickValues: this.getTickValues(),
      tickFormat: t => this.state.props.yunits ? `${this.abbreviateNumber(t)}${this.state.props.yunits}` : `${this.abbreviateNumber(t)}`,
      dependentAxis: true
    }), /*#__PURE__*/React.createElement(VictoryStack, {
      colorScale: this.updateColors(),
      horizontal: true,
      style: {
        data: {
          strokeWidth: this.state.props.thickness
        }
      },
      events: [{
        target: 'data',
        eventHandlers: Platform.OS == "web" ? {
          onClick: this.onSelect.bind(this)
        } : {
          onPress: this.onSelect.bind(this)
        }
      }]
    }, this.getBarChart(props))) : /*#__PURE__*/React.createElement(Svg, {
      width: this.state.chartWidth,
      height: this.state.chartHeight
    }, /*#__PURE__*/React.createElement(VictoryLegend, {
      name: 'legend',
      containerComponent: /*#__PURE__*/React.createElement(Svg, null),
      title: [props.title, props.subheading],
      orientation: "horizontal",
      gutter: 20,
      data: [],
      theme: this.state.theme
    }), this.getArcChart(props), this.getArcAxis()));
  }
}
//# sourceMappingURL=stack-chart.component.js.map