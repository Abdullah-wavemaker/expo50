function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from "react";
import { Dimensions } from 'react-native';
import moment from "moment";
import { forEach, get, isArray, isEmpty, isObject, maxBy, minBy, set, trim, orderBy } from "lodash-es";
import { VictoryAxis, VictoryLegend, VictoryLabel, VictoryVoronoiContainer, VictoryTooltip } from "victory-native";
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import WmIcon from "@wavemaker/app-rn-runtime/components/basic/icon/icon.component";
import ThemeFactory from "@wavemaker/app-rn-runtime/components/chart/theme/chart.theme";
import { DEFAULT_CLASS } from "./basechart.styles";
import { constructSampleData, getChartType } from "./staticdata";
export class BaseChartComponentState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "data", []);
    _defineProperty(this, "content", null);
    _defineProperty(this, "yAxis", []);
    _defineProperty(this, "xaxisDatakeyArr", []);
    _defineProperty(this, "legendData", []);
    _defineProperty(this, "theme", void 0);
    _defineProperty(this, "colors", void 0);
    _defineProperty(this, "xLabel", '');
    _defineProperty(this, "yLabel", '');
    _defineProperty(this, "total", 0);
    _defineProperty(this, "endAngle", 0);
    _defineProperty(this, "loading", true);
    _defineProperty(this, "chartHeight", 0);
    _defineProperty(this, "chartWidth", 0);
    _defineProperty(this, "chartMinY", undefined);
    _defineProperty(this, "chartMinX", undefined);
    _defineProperty(this, "chartMaxY", undefined);
    _defineProperty(this, "chartMaxX", undefined);
  }
}
const screenWidth = Dimensions.get("window").width;
const shapes = {
  'circle': 'circle',
  'cross': 'cross',
  'diamond': 'diamond',
  'plus': 'plus',
  'minus': 'minus',
  'square': 'square',
  'star': 'star',
  'triangle-down': 'triangleDown',
  'triangle-up': 'triangleUp'
};
const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
export class BaseChartComponent extends BaseComponent {
  constructor(props) {
    let defaultClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_CLASS;
    let defaultProps = arguments.length > 2 ? arguments[2] : undefined;
    let defaultState = arguments.length > 3 ? arguments[3] : undefined;
    super(props, defaultClass, defaultProps, defaultState);
    this.defaultClass = defaultClass;
    _defineProperty(this, "screenWidth", screenWidth);
    if (!props.theme) {
      this.applyTheme(props);
    }
  }
  componentDidMount() {
    super.componentDidMount();
  }
  abbreviateNumber(number) {
    if (typeof number !== 'number') {
      return number;
    }
    const tier = Math.log10(Math.abs(number)) / 3 | 0;
    if (tier == 0) {
      return number;
    }

    // get suffix and determine scale
    const suffix = SI_SYMBOL[tier];
    const scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    // format number and add suffix
    return scaled.toFixed(1) + suffix;
  }
  getLegendView(colorScale) {
    if (this.state.props.showlegend === 'hide') {
      return null;
    }
    const props = this.state.props;
    let top = props.showlegend === 'bottom' ? parseInt(this.styles.root.height) : 0;
    if (top) {
      top = top - 50; // remove legendHeight
    }

    const orientation = props.showlegend === 'right' || props.showlegend === 'left' ? 'vertical' : 'horizontal';
    return /*#__PURE__*/React.createElement(VictoryLegend, {
      colorScale: colorScale,
      name: 'legendData',
      orientation: orientation,
      gutter: 20,
      data: this.state.legendData,
      style: {
        border: {
          stroke: 'none'
        }
      },
      borderPadding: {
        top: 30,
        left: 50
      },
      y: top
    });
  }
  getYScaleMinValue(value) {
    const _min = Math.floor(value);
    return Math.abs(value) - _min > 0 ? value - .1 : _min - 1;
  }
  // x axis with vertical lines having grid stroke colors
  getXaxis() {
    const minIndex = 0;
    const maxIndex = this.state.xaxisDatakeyArr.length - 1;
    const props = this.state.props;
    const getTickValueLabel = props.xtickexpr;
    let height = this.styles.root.height || 250;
    let yaxislabeldistance = props.yaxislabeldistance ? props.yaxislabeldistance : height - 20;
    if (height && typeof height === 'string') {
      height = parseInt(height);
    }
    return /*#__PURE__*/React.createElement(VictoryAxis, {
      crossAxis: false,
      label: (props.xaxislabel || props.xaxisdatakey || "name") + (props.xunits ? `(${props.xunits})` : ''),
      style: {
        axisLabel: this.theme.mergeStyle(this.styles.axisLabel, this.styles.yAxisLabel),
        grid: props.hidegridxaxis ? {
          stroke: null
        } : this.theme.mergeStyle(this.styles.grid, this.styles.xGrid),
        axis: props.showxaxis === false ? {
          stroke: 'none'
        } : this.theme.mergeStyle(this.styles.axis, this.styles.xAxis),
        ticks: this.theme.mergeStyle(this.styles.ticks, this.styles.xTicks),
        tickLabels: this.theme.mergeStyle(this.styles.tickLabels, this.styles.xTickLabels)
      },
      fixLabelOverlap: props.autoadjustlabels ? true : false,
      axisLabelComponent: /*#__PURE__*/React.createElement(VictoryLabel, {
        y: yaxislabeldistance
      }),
      tickLabelComponent: /*#__PURE__*/React.createElement(VictoryLabel, {
        y: props.offsetyaxis ? props.offsetyaxis : height - 30,
        angle: props.labelangle || 0
      }),
      theme: this.state.theme,
      tickCount: this.state.xaxisDatakeyArr.length,
      invertAxis: this.isRTL,
      tickFormat: (d, i, ticks) => {
        if (getTickValueLabel) {
          return getTickValueLabel(this.state.xaxisDatakeyArr[d], i, (ticks || []).length);
        } else if (this.state.xaxisDatakeyArr) {
          return this.state.xaxisDatakeyArr[d];
        }
        return '';
      }
    });
  }

  /* y axis with horizontal lines having grid stroke colors*/
  getYAxis() {
    const props = this.state.props;
    if (props.showyaxis === false) {
      return null;
    }
    const getTickValueLabel = props.ytickexpr;
    let xaxislabeldistance = props.xaxislabeldistance ? props.xaxislabeldistance : 20;
    return /*#__PURE__*/React.createElement(VictoryAxis, {
      crossAxis: false,
      label: (props.yaxislabel || props.yaxisdatakey) + (props.yunits ? `(${props.yunits})` : ''),
      style: {
        axisLabel: this.theme.mergeStyle(this.styles.axisLabel, this.styles.yAxisLabel),
        grid: props.hidegridyaxis ? {
          stroke: null
        } : this.theme.mergeStyle(this.styles.grid, this.styles.yGrid),
        axis: props.showxaxis === false ? {
          stroke: 'none'
        } : this.theme.mergeStyle(this.styles.axis, this.styles.yAxis),
        ticks: this.theme.mergeStyle(this.styles.ticks, this.styles.yTicks),
        tickLabels: this.theme.mergeStyle(this.styles.tickLabels, this.styles.yTickLabels)
      },
      fixLabelOverlap: props.autoadjustlabels ? true : false,
      axisLabelComponent: /*#__PURE__*/React.createElement(VictoryLabel, {
        x: xaxislabeldistance
      }),
      tickLabelComponent: /*#__PURE__*/React.createElement(VictoryLabel, {
        x: props.offsetxaxis ? props.offsetxaxis : 50
      }),
      theme: this.state.theme,
      tickFormat: (d, i, ticks) => {
        if (getTickValueLabel) {
          return getTickValueLabel(d, i, (ticks || []).length);
        }
        return this.abbreviateNumber(d);
      },
      orientation: this.isRTL ? "right" : "left",
      dependentAxis: true
    });
  }
  getTooltip(props) {
    const tooltipContainer = this.styles.tooltipContainer;
    const xaxis = props.xaxisdatakey;
    return /*#__PURE__*/React.createElement(VictoryVoronoiContainer, {
      voronoiDimension: "x",
      labels: _ref => {
        let {
          datum
        } = _ref;
        return `${props.dataset[datum.x][xaxis]} \n Value ${datum.y} `;
      },
      voronoiBlacklist: this.state.data.map((item, i) => props.name + '_' + i),
      labelComponent: /*#__PURE__*/React.createElement(VictoryTooltip, {
        style: [{
          fill: this.styles.tooltipXText.color,
          ...this.styles.tooltipXText
        }, {
          fill: this.styles.tooltipYText.color,
          ...this.styles.tooltipYText
        }],
        orientation: props.tooltiporientation,
        pointerLength: props.tooltippointerlength,
        pointerWidth: props.tooltippointerwidth,
        flyoutHeight: props.tooltipheight,
        flyoutWidth: props.tooltipwidth,
        flyoutStyle: {
          fill: tooltipContainer.backgroundColor,
          stroke: tooltipContainer.borderColor,
          strokeWidth: tooltipContainer.borderWidth,
          ...this.styles.tooltipContainer
        },
        flyoutPadding: {
          top: tooltipContainer.paddingTop,
          bottom: tooltipContainer.paddingBottom,
          left: tooltipContainer.paddingLeft,
          right: tooltipContainer.paddingRight
        },
        cornerRadius: tooltipContainer.borderRadius,
        centerOffset: {
          x: props.tooltipcenteroffsetx,
          y: props.tooltipcenteroffsety
        },
        constrainToVisibleArea: true
      })
    });
  }

  // X/Y Domain properties are supported only for Column and Area charts
  isAxisDomainSupported(type) {
    return type === 'Column' || type === 'Area';
  }

  // Check whether X/Y Domain was set to Min and is supported for the present chart
  isAxisDomainValid(axis) {
    const props = this.state.props;
    if (get(props, axis + 'domain') === 'Min' && this.isAxisDomainSupported(props.type)) {
      return true;
    }
    return false;
  }
  // Check whether min and max values are finite or not
  areMinMaxValuesValid(values) {
    if (isFinite(values.min) && isFinite(values.max)) {
      return true;
    }
    return false;
  }
  setDomainValues() {
    let xDomainValues, yDomainValues;
    if (this.state.data.length > 0) {
      if (this.isAxisDomainValid('x') && typeof this.state.data[0].x === 'number') {
        xDomainValues = this.getXMinMaxValues(this.state.data[0]);
      }
      if (this.isAxisDomainValid('y')) {
        yDomainValues = this.getYMinMaxValues(this.state.data);
      }
      if (xDomainValues) {
        this.updateState({
          chartMinX: yDomainValues.min.x,
          chartMaxX: yDomainValues.max.x
        });
      }
      let yMin;
      if (yDomainValues) {
        if (this.areMinMaxValuesValid({
          max: yDomainValues.max.y,
          min: yDomainValues.min.y
        })) {
          yMin = this.getYScaleMinValue(yDomainValues.min.y);
        }
        this.updateState({
          chartMinY: yMin ? yMin : yDomainValues.min.y,
          chartMaxY: yDomainValues.max.y
        });
      }
    }
  }

  // Getting the min and max values among all the x values
  getXMinMaxValues(datum) {
    if (!datum) {
      return;
    }
    const xValues = {};
    /*
     compute the min x valuex
     eg: When data has objects
        input: [{x:1, y:2}, {x:2, y:3}, {x:3, y:4}]
        min x: 1
     eg: When data has arrays
        input: [[10, 20], [20, 30], [30, 40]];
        min x: 10
    */
    xValues.min = minBy(datum, dataObject => dataObject.x) || {
      x: undefined
    };
    /*
     compute the max x value
     eg: When data has objects
        input: [{x:1, y:2}, {x:2, y:3}, {x:3, y:4}]
        max x: 3
     eg: When data has arrays
        input: [[10, 20], [20, 30], [30, 40]];
        max x: 30
     */
    xValues.max = maxBy(datum, dataObject => dataObject.x) || {
      x: undefined
    };
    return xValues;
  }

  // Getting the min and max values among all the y values
  getYMinMaxValues(datum) {
    const yValues = {},
      minValues = [],
      maxValues = [];
    if (!datum) {
      return;
    }

    /*
     Getting the min and max y values among all the series of data
     compute the min y value
     eg: When data has objects
        input: [[{x:1, y:2}, {x:2, y:3}, {x:3, y:4}], [{x:2, y:3}, {x:3, y:4}, {x:4, y:5}]]
        min y values : '2'(among first set) & '3'(among second set)
        max y values : '4'(among first set) & '5'(among second set)
      eg: When data has arrays
        input: [[[10, 20], [20, 30], [30, 40]], [[20, 30], [30, 40], [40, 50]]]
        min y values : '20'(among first set) & '30'(among second set)
        max y values : '40'(among first set) & '50'(among second set)
     */

    forEach(datum, data => {
      if (data && !isEmpty(data)) {
        minValues.push(minBy(data, dataObject => {
          return dataObject.y;
        }));
        maxValues.push(maxBy(data, dataObject => {
          return dataObject.y;
        }));
      }
    });
    // Gets the least and highest values among all the min and max values of respective series of data
    yValues.min = minBy(minValues, dataObject => dataObject.y) || {
      y: undefined
    };
    yValues.max = maxBy(maxValues, dataObject => dataObject.y) || {
      y: undefined
    };
    return yValues;
  }
  setHeightWidthOnChart(cb) {
    let height = this.styles.root.height || 250;
    let width = this.styles.root.width || screenWidth;
    if (height && typeof height === 'string') {
      height = parseInt(height);
    }
    if (width && typeof width === 'string') {
      width = parseInt(width);
    }
    this.updateState({
      chartHeight: height,
      chartWidth: width
    }, cb);
  }
  applyTheme(props) {
    let themeName = props.theme ? props.theme : props.type === 'Pie' ? 'Azure' : 'Terrestrial';
    let colorsToUse = [];
    if (typeof props.customcolors === 'string' && !isEmpty(props.customcolors)) {
      colorsToUse = props.customcolors.split(',').map(trim);
    }
    let themeToUse;
    if (typeof themeName === 'string') {
      if (!colorsToUse.length) {
        colorsToUse = props.customcolors;
      }
      if (props.customcolors === undefined) {
        colorsToUse = ThemeFactory.getColorsObj(themeName);
      }
      themeToUse = ThemeFactory.getTheme(themeName, props.styles, colorsToUse);
    } else if (typeof themeName === 'object') {
      // if theme is passed as an object then use that custom theme.
      themeToUse = props.theme;
    }
    this.updateState({
      colors: colorsToUse,
      theme: themeToUse
    });
  }
  prepareLegendData() {
    const props = this.state.props;
    if (this.state.yAxis) {
      let ldata;
      if (props.type === 'Stack') {
        const data = orderBy(this.state.data[0], 'y', 'asc');
        ldata = data.map(d => {
          return {
            name: this.state.xaxisDatakeyArr[d.x]
          };
        });
      } else {
        ldata = this.state.yAxis.map(d => {
          return {
            name: d
          };
        });
      }
      this.updateState({
        legendData: ldata
      });
    }
  }
  prepareEvents(name) {
    return this.state.legendData.map((_, idx) => {
      return {
        childName: ['legend'],
        target: 'data',
        eventKey: String(idx),
        eventHandlers: {
          onClick: () => {
            return [{
              childName: [name + '_' + idx],
              target: 'data',
              eventKey: 'all',
              mutation: props => {
                return null;
              }
            }];
          },
          onMouseOver: () => {},
          onMouseOut: () => {}
        }
      };
    });
  }

  // If date string is bound to xaxis then we are pushing the x values as indexes.
  getxAxisVal(dataObj, xKey, index, xaxisDatakeyArr) {
    const value = get(dataObj, xKey);
    if (moment(value).isValid() || isNaN(value) || typeof value === 'string' || typeof value === 'number') {
      xaxisDatakeyArr.push(value);
      return index;
    }
    return value;
  }
  prepareDataItems(dataset) {
    const props = this.state.props;
    let xaxis = props.xaxisdatakey;
    let yaxis = props.yaxisdatakey;
    let xaxisDatakeyArr = [];
    let datasets = [];
    if (dataset.length === 0) {
      var _yaxis;
      dataset = constructSampleData(getChartType(this.props), (_yaxis = yaxis) === null || _yaxis === void 0 ? void 0 : _yaxis.split(','), this.props.shape);
      xaxis = "x";
      yaxis = "y";
    }
    if (xaxis && yaxis) {
      let yPts = yaxis.split(',');
      yPts.forEach(y => {
        if (xaxis !== y) {
          datasets.push(dataset.map((o, xindex) => {
            const xVal = this.getxAxisVal(o, xaxis, xindex, xaxisDatakeyArr);
            let yVal = get(o, y);
            if (typeof yVal === 'string') {
              yVal = parseFloat(yVal) || yVal;
            }
            let dataObj = {
              x: xVal,
              y: yVal
            };
            if (props.bubblesize) {
              set(dataObj, 'size', get(o, props.bubblesize, 5));
            }
            if (props.shape) {
              set(dataObj, 'symbol', shapes[props.shape]);
            }
            return dataObj;
          }));
        }
      });
      // chartTransform
      this.invokeEventCallback('onTransform', [undefined, this.proxy]);
      if (props.type == 'Pie' || props.type === 'Donut') {
        // for animation effect
        setTimeout(() => {
          this.updateState({
            endAngle: 360
          });
        }, 500);
      }
      this.updateData(datasets, yPts, xaxisDatakeyArr);
    }
  }
  renderLoadingIcon() {
    const props = this.state.props;
    return /*#__PURE__*/React.createElement(WmIcon, {
      styles: this.styles.loadingIcon,
      iconclass: props.loadingicon,
      caption: props.loadingdatamsg
    });
  }
  updateData(datasets, yPts, xaxisDatakeyArr) {
    const props = this.state.props;
    this.updateState({
      data: datasets,
      yAxis: yPts,
      xaxisDatakeyArr: xaxisDatakeyArr
    }, () => {
      this.prepareLegendData();
      if (!props.labeltype || props.labeltype === 'percent') {
        this.setTotal(this.state.data[0]);
      }
      if (this.isAxisDomainSupported(props.type) && (props.ydomain || props.xdomain)) {
        this.setDomainValues();
      }
      this.updateState({
        loading: false
      });
    });
  }
  setTotal(data) {
    let total = 0;
    data.forEach(d => {
      total += d.y;
    });
    this.updateState({
      total: total
    });
  }
  onPropertyChange(name, $new, $old) {
    super.onPropertyChange(name, $new, $old);
    const props = this.state.props;
    let units = '';
    switch (name) {
      case 'customcolors':
        if (isEmpty($new)) {
          return;
        }
        if (typeof $new === 'string') {
          $new = $new.split(',');
        }
        this.updateState({
          colors: $new
        });
        break;
      case 'theme':
        this.applyTheme(props);
        break;
      case 'dataset':
        if (!isArray($new)) {
          if (isObject($new) && !isEmpty($new)) {
            $new = [$new];
          } else {
            $new = [];
          }
        }
        $new && this.prepareDataItems($new);
        break;
      case 'xaxislabel':
        if (props.xunits) {
          units = ' (' + props.xunits + ')';
        }
        this.updateState({
          xLabel: $new + units
        });
        break;
      case 'yaxislabel':
        if (props.yunits) {
          units = ' (' + props.yunits + ')';
        }
        this.updateState({
          yLabel: $new + units
        });
        break;
    }
  }
}
function getDataType(widgetContext) {
  throw new Error("Function not implemented.");
}
//# sourceMappingURL=basechart.component.js.map