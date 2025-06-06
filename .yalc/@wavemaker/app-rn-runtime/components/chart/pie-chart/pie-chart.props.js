function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import BaseChartComponentProps from '@wavemaker/app-rn-runtime/components/chart/basechart.props';
export default class WmPieChartProps extends BaseChartComponentProps {
  constructor() {
    super(...arguments);
    _defineProperty(this, "donutratio", 0);
    _defineProperty(this, "labelplacement", 'vertical');
    _defineProperty(this, "centerlabel", '');
    _defineProperty(this, "onSelect", void 0);
  }
}
//# sourceMappingURL=pie-chart.props.js.map