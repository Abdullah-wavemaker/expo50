function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { clone, findIndex, get, isUndefined, pull, forEach, filter, find, isEqual, merge } from 'lodash';
import WmChipsProps from './chips.props';
import { DEFAULT_CLASS } from './chips.styles';
import WmSearch from '@wavemaker/app-rn-runtime/components/basic/search/search.component';
import { BaseDatasetComponent, BaseDatasetState } from '@wavemaker/app-rn-runtime/components/input/basedataset/basedataset.component';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import WmPicture from '@wavemaker/app-rn-runtime/components/basic/picture/picture.component';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
export class WmChipsState extends BaseDatasetState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "chipsList", []);
    _defineProperty(this, "saturate", void 0);
  }
}
export default class WmChips extends BaseDatasetComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmChipsProps(), new WmChipsState());
    _defineProperty(this, "searchRef", null);
    _defineProperty(this, "maxSizeReached", 'Max size reached');
    _defineProperty(this, "isDefaultQuery", true);
    _defineProperty(this, "prevDatavalue", void 0);
    _defineProperty(this, "listener", {
      onComponentInit: c => {
        if (c instanceof WmSearch) {
          this.searchRef = c;
        }
      }
    });
    _defineProperty(this, "toBoolean", val => val && val !== 'false' ? true : false);
  }
  onPropertyChange(name, $new, $old) {
    super.onPropertyChange(name, $new, $old);
    switch (name) {
      case 'datavalue':
        if (!$new || $new.length === 0) {
          this.updateState({
            chipsList: []
          });
        }
    }
  }
  reset() {
    var _this$searchRef;
    if ((_this$searchRef = this.searchRef) !== null && _this$searchRef !== void 0 && _this$searchRef.state.props.query) {
      this.searchRef.reset();
    }
  }
  onDataItemsUpdate() {
    super.onDataItemsUpdate();
    this.isDefaultQuery = true;
    this.updateDefaultQueryModel();
  }
  addItem($event, widget) {
    var _this$props, _this$props2;
    let newChipList = clone(this.state.chipsList),
      allowAdd;
    newChipList.push(widget.queryModel);
    const isFormFieldWidget = get(this.props, 'formfield');
    if (this.isDuplicate(widget.queryModel)) {
      this.resetSearchModel();
      return;
    }

    // @ts-ignore
    allowAdd = isFormFieldWidget ? (_this$props = this.props) === null || _this$props === void 0 ? void 0 : _this$props.invokeEvent('onBeforeadd', [null, this, widget.queryModel]) : this.invokeEventCallback('onBeforeadd', [null, this, widget.queryModel]);
    if (!isUndefined(allowAdd) && !this.toBoolean(allowAdd)) {
      return;
    }
    this.updateState({
      chipsList: newChipList
    });
    this.setDatavalue(newChipList);

    // @ts-ignore
    isFormFieldWidget ? (_this$props2 = this.props) === null || _this$props2 === void 0 ? void 0 : _this$props2.invokeEvent('onAdd', [null, this, widget.queryModel]) : this.invokeEventCallback('onAdd', [null, this, widget.queryModel]);
    this.resetSearchModel();
  }
  computeDisplayValue() {
    this.updateState({
      props: {
        displayValue: (this.state.dataItems || []).filter(item => item.selected).map(item => item.displayexp || item.displayfield) || ''
      }
    });
  }
  selectChip(chipItem) {
    if (!chipItem.selected && this.state.props.maxsize > 0 && this.state.chipsList.length === this.state.props.maxsize) {
      return;
    }
    chipItem.selected = !chipItem.selected;
    const newChipList = [];
    const selectedItem = find(this.state.dataItems, d => isEqual(d.key, chipItem.key));
    selectedItem.selected = chipItem.selected;
    forEach(this.state.dataItems, item => {
      if (item.selected) {
        newChipList.push(item);
      }
    });
    this.updateState({
      chipsList: newChipList
    });
    this.setDatavalue(newChipList);
  }
  setDatavalue(newChipList) {
    const dataValue = newChipList.map(item => item.datafield);
    this.updateDatavalue(dataValue);
    this.updateMaxSize(newChipList.length);
    if (!this.props.invokeEvent) {
      this.invokeEventCallback('onChange', [null, this, dataValue, this.prevDatavalue]);
    }
    this.prevDatavalue = dataValue;
  }
  // Prepare datavalue object from a string(junk) value when datafield is allFields.
  createCustomDataModel(val) {
    return {
      key: `${this.state.props.name}_item${this.state.chipsList.length}`,
      dataObject: val,
      displayfield: val,
      datafield: val,
      isCustom: true
    };
  }
  resetSearchModel() {
    this.searchRef.isDefaultQuery = false;
    this.searchRef.clearSearch();
  }
  isDuplicate(item) {
    return findIndex(this.state.chipsList, {
      datafield: item.datafield
    }) > -1;
  }

  // Check if max size is reached
  updateMaxSize(chipListLength) {
    const saturate = this.state.props.maxsize > 0 && (chipListLength || this.state.chipsList.length) === this.state.props.maxsize;
    this.updateState({
      saturate: saturate
    });
  }
  removeItem(item, index) {
    let newChipList = clone(this.state.chipsList);
    const isFormFieldWidget = get(this.props, 'formfield');
    newChipList = pull(newChipList, item);
    // prevent deletion if the before-remove event callback returns false
    // @ts-ignore
    const allowRemove = isFormFieldWidget ? this.props.invokeEvent('onBeforeremove', [null, this, item]) : this.invokeEventCallback('onBeforeremove', [null, this, item]);
    if (!isUndefined(allowRemove) && !this.toBoolean(allowRemove)) {
      return;
    }
    this.updateState({
      chipsList: newChipList
    });
    this.setDatavalue(newChipList);
    // @ts-ignore
    isFormFieldWidget ? this.props.invokeEvent('onRemove', [null, this, item]) : this.invokeEventCallback('onRemove', [null, this, item]);
  }
  isDefaultView() {
    var _this$state$dataItems;
    return !this.state.props.searchable && ((_this$state$dataItems = this.state.dataItems) === null || _this$state$dataItems === void 0 ? void 0 : _this$state$dataItems.length) <= 10;
  }
  renderChip(item, index) {
    const isSelected = this.isDefaultView() ? item.selected : true;
    return /*#__PURE__*/React.createElement(TouchableOpacity, _extends({}, this.getTestPropsForAction('chip' + index), getAccessibilityProps(AccessibilityWidgetType.CHIPS, {
      ...this.state.props,
      selected: isSelected
    }), {
      style: [this.styles.chip, isSelected ? this.styles.activeChip : null],
      key: 'chipitem_' + index,
      onPress: () => {
        if (this.state.props.disabled) {
          return;
        }
        if (this.isDefaultView()) {
          this.selectChip(item);
        }
        if (get(this.props, 'formfield')) {
          // @ts-ignore
          this.props.invokeEvent('onChipclick', [null, this, item]);
          // @ts-ignore
          this.props.invokeEvent('onChipselect', [null, this, item]);
        } else {
          this.invokeEventCallback('onChipclick', [null, this, item]);
          this.invokeEventCallback('onChipselect', [null, this, item]);
        }
      }
    }), isSelected && this.isDefaultView() ? /*#__PURE__*/React.createElement(WmIcon, {
      iconclass: 'wm-sl-l sl-check',
      iconsize: 16,
      styles: merge({}, this.styles.doneIcon, {
        icon: {
          color: isSelected ? this.styles.activeChipLabel.color : null
        }
      })
    }) : null, /*#__PURE__*/React.createElement(WmPicture, {
      id: this.getTestId('picture'),
      styles: this.styles.imageStyles,
      picturesource: item.imgSrc,
      shape: "circle"
    }), /*#__PURE__*/React.createElement(Text, _extends({}, this.getTestPropsForAction('chip' + index + 'label'), {
      style: [this.styles.chipLabel, isSelected ? this.styles.activeChipLabel : null]
    }), item.displayexp || item.displayfield), !this.isDefaultView() && !this.state.props.disabled ? /*#__PURE__*/React.createElement(WmIcon, {
      id: this.getTestId('clearbtn'),
      iconclass: 'wi wi-clear',
      iconsize: 16,
      styles: this.styles.clearIcon,
      onTap: () => this.removeItem(item, index)
    }) : null);
  }
  updateDefaultQueryModel() {
    if (this.state.dataItems && this.state.dataItems.length && this.isDefaultQuery) {
      const selectedItems = filter(this.state.dataItems, item => item.selected);
      if (selectedItems.length) {
        this.updateState({
          chipsList: selectedItems
        });
      }
      this.isDefaultQuery = false;
    }
  }
  componentDidMount() {
    super.componentDidMount();
    this.updateDefaultQueryModel();
  }
  componentDidUpdate(prevProps, prevState) {
    super.componentDidUpdate(prevProps, prevState);
    if (prevState.chipsList !== this.state.chipsList) {
      var _this$searchRef2;
      (_this$searchRef2 = this.searchRef) === null || _this$searchRef2 === void 0 ? void 0 : _this$searchRef2.computePosition();
    }
  }
  renderWidget(props) {
    const chips = this.state.chipsList;
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, /*#__PURE__*/React.createElement(View, {
      style: this.styles.chipsWrapper
    }, this.isDefaultView() ? this.state.dataItems.map((item, index) => this.renderChip(item, index)) : null, props.searchable || !this.isDefaultView() ? /*#__PURE__*/React.createElement(View, {
      style: [this.styles.searchContainer, {
        flexDirection: props.inputposition === 'first' ? 'column' : 'column-reverse'
      }]
    }, /*#__PURE__*/React.createElement(WmSearch, {
      id: this.getTestId('search'),
      name: "app-chip-search",
      styles: this.styles.search,
      placeholder: this.state.saturate ? this.maxSizeReached : props.placeholder,
      listener: this.listener,
      dataset: props.dataset,
      searchkey: props.searchkey,
      minchars: props.minchars,
      autofocus: props.autofocus,
      disabled: props.disabled || props.readonly || this.state.saturate,
      readonly: props.readonly,
      displayexpression: props.displayexpression,
      getDisplayExpression: props.getDisplayExpression,
      displayimagesrc: props.displayimagesrc,
      displayfield: props.displayfield,
      datafield: props.datafield,
      onSubmit: this.addItem.bind(this),
      onChange: () => {
        var _this$props$listener, _this$props$listener2;
        this.isDefaultQuery = false;
        ((_this$props$listener = this.props.listener) === null || _this$props$listener === void 0 ? void 0 : _this$props$listener.onComponentChange) && ((_this$props$listener2 = this.props.listener) === null || _this$props$listener2 === void 0 ? void 0 : _this$props$listener2.onComponentChange(this));
      },
      showSearchIcon: false,
      showclear: false,
      type: props.minchars === 0 ? 'autocomplete' : 'search'
    }), /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'row',
        flexWrap: 'wrap'
      }
    }, chips && chips.length ? chips.map((item, index) => this.renderChip(item, index)) : null)) : null));
  }
}
//# sourceMappingURL=chips.component.js.map