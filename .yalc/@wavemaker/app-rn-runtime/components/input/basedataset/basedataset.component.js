function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseComponent, BaseComponentState } from "@wavemaker/app-rn-runtime/core/base.component";
import { find, isEqual, isFunction, includes, get, forEach, isObject, isArray, filter, trim, uniqBy, uniqWith } from 'lodash';
import { getGroupedData, getOrderedDataset, isDefined, validateField } from "@wavemaker/app-rn-runtime/core/utils";
import { DEFAULT_CLASS } from "@wavemaker/app-rn-runtime/components/input/basedataset/basedataset.styles";
export class BaseDatasetState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "dataItems", void 0);
    _defineProperty(this, "groupedData", void 0);
    _defineProperty(this, "isDefault", false);
    _defineProperty(this, "isValid", true);
    _defineProperty(this, "errorType", '');
  }
}
export class BaseDatasetComponent extends BaseComponent {
  constructor(props) {
    let defaultClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_CLASS;
    let defaultProps = arguments.length > 2 ? arguments[2] : undefined;
    let defaultState = arguments.length > 3 ? arguments[3] : undefined;
    super(props, defaultClass, defaultProps, defaultState);
    this.defaultClass = defaultClass;
  }
  onPropertyChange(name, $new, $old) {
    const props = this.state.props;
    switch (name) {
      case 'dataset':
        this.setDataItems($new);
        break;
      case 'getDisplayExpression':
      case 'displayfield':
      case 'displaylabel':
      case 'displayimagesrc':
      case 'datafield':
      case 'orderby':
        this.setDataItems(this.state.props.dataset);
        break;
      case 'groupby':
      case 'match':
        this.setGroupData(this.state.dataItems);
      case 'datavalue':
        this.setDataItems(this.state.props.dataset, {
          dataValue: $new
        });
        const isDefault = this.state.isDefault;
        if (isDefault) {
          this.updateState({
            isDefault: false
          }, this.props.onFieldChange && this.props.onFieldChange.bind(this, 'datavalue', $new, $old, isDefault));
        } else {
          this.props.onFieldChange && this.props.onFieldChange('datavalue', $new, $old, isDefault);
        }
    }
  }
  setGroupData(items) {
    const dataItems = items;
    const props = this.state.props;
    if (props.groupby) {
      const groupedData = dataItems && getGroupedData(dataItems, props.groupby, props.match, props.orderby, props.dateformat, this, 'dataObject');
      this.updateState({
        groupedData: groupedData
      }, () => this.onDataItemsUpdate());
    }
  }
  validate(value) {
    const validationObj = validateField(this.state.props, value);
    this.setState({
      isValid: validationObj.isValid,
      errorType: validationObj.errorType
    });
  }
  updateDatavalue(value) {
    return new Promise(resolve => {
      this.updateState({
        props: {
          datavalue: value
        }
      }, () => {
        this.computeDisplayValue();
        resolve();
      });
    });
  }
  onValueChange(value) {
    if (this.state.props.datafield === 'All Fields') {
      const selectedItem = find(this.state.dataItems, item => isEqual(item.key, value));
      value = selectedItem && selectedItem.dataObject;
    }
    this.onChange(value);
  }
  getItemKey(value) {
    const selectedItem = find(this.state.dataItems, item => isEqual(item.dataObject, value));
    return selectedItem && selectedItem.key;
  }
  onChange(value) {
    const oldValue = this.state.props.datavalue;
    this.validate(value);
    this.updateDatavalue(value).then(() => {
      if (value !== oldValue) {
        if (this.props.onFieldChange) {
          this.props.onFieldChange('datavalue', value, oldValue);
        } else {
          this.invokeEventCallback('onChange', [undefined, this.proxy, value, oldValue]);
        }
      }
    });
  }
  computeDisplayValue() {
    this.updateState({
      props: {
        displayValue: (this.state.dataItems || []).filter(item => item.selected).map(item => item.displayexp || item.displayfield)[0] || ''
      }
    });
  }
  onDataItemsUpdate() {
    this.computeDisplayValue();
  }
  getUniqObjsByDataField(data) {
    let allowEmptyFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let uniqData;
    const isAllFields = this.state.props.datafield === 'All Fields';
    uniqData = isAllFields ? uniqWith(data, isEqual) : uniqBy(data, 'datafield');
    if (!this.state.props.displayfield || allowEmptyFields) {
      return uniqData;
    }

    // return objects having non empty datafield and display field values.
    return filter(uniqData, obj => {
      if (isAllFields) {
        return trim(obj.displayfield);
      }
      return trim(obj.datafield) && trim(obj.displayfield);
    });
  }
  setDataItems(dataset, propsObj) {
    let allowEmpty = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    const name = this.props.name;
    const props = this.state.props;
    const datavalue = propsObj ? propsObj['dataValue'] : props.datavalue;
    let dataItems = [];
    let datavalueItems = [];
    if (typeof datavalue === 'string') {
      datavalueItems = datavalue.split(',');
      datavalueItems = allowEmpty ? datavalueItems : datavalueItems.map(item => item.trim());
    } else if (isArray(datavalue)) {
      datavalueItems = datavalue;
    } else {
      if (isDefined(datavalue)) {
        datavalueItems = [datavalue];
      }
    }
    if (typeof dataset === 'string') {
      dataset = dataset.split(',');
    }
    if (isArray(dataset) && !isObject(dataset[0])) {
      dataItems = dataset.map((s, i) => {
        s = s.trim();
        return {
          key: `${name}_item${i}`,
          dataObject: s,
          displayfield: s.toString(),
          datafield: s,
          selected: includes(datavalueItems, s) || includes(datavalueItems, s.toString()) || datavalue === s ? true : false
        };
      });
    } else if (dataset) {
      if (isObject(dataset) && !isArray(dataset)) {
        forEach(dataset, (value, key) => {
          if (isDefined(key) && key !== null) {
            dataItems.push({
              key: `${name}_item${key}`,
              displayfield: value,
              datafield: key,
              dataObject: dataset
            });
          }
        });
      } else {
        const isSelected = item => {
          if (datavalueItems.length) {
            let datafield = this.state.props.datafield;
            if (!datafield) {
              datafield = 'All Fields';
            }
            if (datafield === 'All Fields') {
              return includes(datavalueItems, item);
            }
            let df = get(item, datafield);
            if (isDefined(df) && df !== null) {
              return includes(datavalueItems, df) || includes(datavalueItems, df.toString());
            }
          }
          return false;
        };
        forEach(dataset, (d, i) => {
          let datafieldValue = this.state.props.datafield === 'All Fields' ? d : get(d, this.state.props.datafield);
          if (isDefined(datafieldValue) && datafieldValue !== null) {
            var _get, _get2;
            dataItems.push({
              key: `${name}_item${i}`,
              dataObject: d,
              displayfield: ((_get = get(d, this.state.props.displayfield)) === null || _get === void 0 ? void 0 : _get.toString()) || ((_get2 = get(d, this.state.props.displaylabel)) === null || _get2 === void 0 ? void 0 : _get2.toString()),
              datafield: datafieldValue,
              displayexp: this.state.props.getDisplayExpression ? this.state.props.getDisplayExpression(d) : get(d, this.state.props.displayfield),
              selected: isSelected(d),
              imgSrc: isFunction(this.state.props.displayimagesrc) ? this.state.props.displayimagesrc(d) : get(d, this.state.props.displayimagesrc),
              icon: d[this.props.iconclass]
            });
          }
        });
      }
    }
    if (dataItems.length) {
      dataItems = this.getUniqObjsByDataField(dataItems, allowEmpty);
    }
    const isUpdated = !isEqual(dataItems, this.state.dataItems);
    if (props.groupby) {
      this.setGroupData(dataItems);
      this.updateState({
        dataItems: dataItems
      }, () => isUpdated && this.onDataItemsUpdate());
    } else if (props.orderby) {
      this.updateState({
        dataItems: getOrderedDataset(dataItems, props.orderby, 'dataObject')
      }, () => isUpdated && this.onDataItemsUpdate());
    } else {
      this.updateState({
        dataItems: dataItems
      }, () => isUpdated && this.onDataItemsUpdate());
    }
  }
}
//# sourceMappingURL=basedataset.component.js.map