function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { Keyboard, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { find, isNull } from 'lodash';
import WmSearchProps from './search.props';
import { DEFAULT_CLASS } from './search.styles';
import { ModalConsumer } from "@wavemaker/app-rn-runtime/core/modal.service";
import { DataProvider } from '@wavemaker/app-rn-runtime/components/basic/search/local-data-provider';
import { AccessibilityWidgetType, getAccessibilityProps } from '@wavemaker/app-rn-runtime/core/accessibility';
import { BaseDatasetComponent, BaseDatasetState } from '@wavemaker/app-rn-runtime/components/input/basedataset/basedataset.component';
import WmAnchor from '@wavemaker/app-rn-runtime/components/basic/anchor/anchor.component';
import WmPicture from '@wavemaker/app-rn-runtime/components/basic/picture/picture.component';
import { Tappable } from '@wavemaker/app-rn-runtime/core/tappable.component';
import WmButton from '@wavemaker/app-rn-runtime/components/basic/button/button.component';
import { get, isArray, isEmpty, isObject } from "lodash-es";
import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
export class WmSearchState extends BaseDatasetState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "isOpened", false);
    _defineProperty(this, "modalOptions", {});
    _defineProperty(this, "template", "");
    _defineProperty(this, "position", {
      top: 0,
      left: 0
    });
    _defineProperty(this, "data", []);
  }
}
export default class WmSearch extends BaseDatasetComponent {
  constructor(props) {
    var _this;
    super(props, DEFAULT_CLASS, new WmSearchProps(), new WmSearchState());
    _this = this;
    _defineProperty(this, "view", null);
    _defineProperty(this, "prevDatavalue", void 0);
    _defineProperty(this, "queryModel", void 0);
    _defineProperty(this, "searchInputWidth", void 0);
    _defineProperty(this, "isDefaultQuery", true);
    _defineProperty(this, "dataProvider", void 0);
    _defineProperty(this, "widgetRef", null);
    _defineProperty(this, "cursor", 0);
    _defineProperty(this, "isFocused", false);
    _defineProperty(this, "updateRequired", void 0);
    _defineProperty(this, "computePosition", () => {
      return new Promise(resolve => {
        const position = {};
        this.view.measure(function () {
          let x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          let y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          let width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          let height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
          let px = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
          let py = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
          position.left = px;
          position.top = py + height;
          _this.updateState({
            position: position
          }, resolve);
        });
      });
    });
    _defineProperty(this, "showPopover", () => {
      this.computePosition().then(() => {
        this.updateState({
          isOpened: true
        });
      });
    });
    _defineProperty(this, "hide", () => {});
    this.dataProvider = new DataProvider();
    if (this.props.datavalue) {
      this.updateState({
        props: {
          query: this.props.datavalue
        }
      });
    }
  }
  clearSearch() {
    this.invokeEventCallback('onClear', [null, this]);
    this.hide();
    this.updateState({
      props: {
        query: ''
      },
      dataItems: this.state.dataItems ? this.state.dataItems.map(item => {
        item.selected = false;
        return item;
      }) : []
    }, () => {
      if (this.state.props.type === 'autocomplete') {
        this.updateFilteredData('');
      }
    });
  }
  updateFilteredData() {
    var _filteredData;
    let queryText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    const props = this.state.props;
    const filterOptions = {
      query: queryText,
      props: props,
      entries: this.state.dataItems
    };
    let filteredData = [];
    if (props.minchars && queryText.length < props.minchars) {
      filteredData = [];
    } else if (props.type === 'search' && !queryText) {
      filteredData = [];
    } else {
      var _this$dataProvider;
      if (this.props.searchkey && this.updateRequired === undefined) {
        this.updateRequired = this.dataProvider.init(this);
      }
      // for service variables invoke the variable with params.
      if (this.props.searchkey && this.updateRequired && this.state.props.query !== queryText) {
        this.dataProvider.invokeVariable(this, queryText).then(response => {
          if (response) {
            response = response.dataSet;
            if (isEmpty(response)) {
              filteredData = [];
            } else {
              if (isObject(response) && !isArray(response)) {
                response = [response];
              }
              this.setDataItems(response);
            }
          }
        }, () => {});
        return;
      }
      filteredData = (_this$dataProvider = this.dataProvider) === null || _this$dataProvider === void 0 ? void 0 : _this$dataProvider.filter(filterOptions);
    }
    this.updateState({
      props: {
        result: (_filteredData = filteredData) === null || _filteredData === void 0 ? void 0 : _filteredData.map(item => item.dataObject),
        query: queryText
      },
      data: filteredData
    });
    if (!this.state.isOpened && this.isFocused) {
      this.showPopover && this.showPopover();
    }
  }
  focus() {
    var _this$widgetRef;
    this === null || this === void 0 || (_this$widgetRef = this.widgetRef) === null || _this$widgetRef === void 0 ? void 0 : _this$widgetRef.focus();
  }
  onChange(value) {
    this.isDefaultQuery = false;
    const prevQuery = this.state.props.query;
    if (this.state.props.searchon === 'onsearchiconclick') {
      this.updateState({
        props: {
          result: [],
          query: value
        },
        data: []
      });
    } else {
      this.updateFilteredData(value);
    }
    if (value === '') {
      this.validate(value);
      this.updateState({
        props: {
          datavalue: ''
        }
      });
      if (value === prevQuery) {
        return;
      }
    }
    if (this.props.invokeEvent) {
      this.props.invokeEvent('onChange', [undefined, this.proxy, value, prevQuery]);
    }
    this.invokeEventCallback('onChange', [undefined, this.proxy, value, prevQuery]);
  }
  invokeChange(e) {
    if (Platform.OS === 'web') {
      this.cursor = e.target.selectionStart;
      this.updateState({
        props: {
          query: e.target.value
        }
      });
    }
  }
  onFocus() {
    this.isFocused = true;
    if (!this.state.props.disabled && this.state.props.type === 'autocomplete') {
      var _this$state$props$que;
      this.cursor = ((_this$state$props$que = this.state.props.query) === null || _this$state$props$que === void 0 ? void 0 : _this$state$props$que.length) || 0;
      this.updateFilteredData(this.state.props.query || '');
    }
    this.invokeEventCallback('onFocus', [null, this]);
  }
  onBlur() {
    this.isFocused = false;
    this.validate(this.state.props.datavalue);
    if (!this.state.props.datavalue) {
      setTimeout(() => {
        this.props.triggerValidation && this.props.triggerValidation();
      });
    }
    this.invokeEventCallback('onBlur', [null, this]);
  }
  prepareModalOptions(content, styles, modalService) {
    const o = this.state.modalOptions;
    const modalContentSTyles = {
      width: this.searchInputWidth - 2 * (styles.modalContent.borderWidth || 0),
      left: (this.state.position.left || 0) + 2 * (styles.modalContent.borderWidth || 0)
    };
    o.modalStyle = {
      ...styles.modal
    };
    o.contentStyle = {
      ...styles.modalContent,
      ...this.state.position,
      ...modalContentSTyles
    };
    o.content = content;
    o.isModal = true;
    o.onClose = () => {
      this.hide = () => {};
      Keyboard.dismiss();
      if (this.state.isOpened) {
        this.setState({
          isOpened: false,
          modalOptions: {}
        });
      }
    };
    this.hide = () => {
      modalService.hideModal(this.state.modalOptions);
      if (this.state.isOpened) {
        this.setState({
          isOpened: false,
          modalOptions: {}
        });
      }
    };
    return o;
  }
  searchIconPress() {
    this.isFocused = false;
    if (this.state.props.searchon === 'onsearchiconclick') {
      this.updateFilteredData(this.state.props.query);
    } else {
      this.onItemSelect(this.state.data[0]);
    }
  }
  onItemSelect(item) {
    this.isFocused = false;
    this.updateState({
      props: {
        query: item.displayexp || item.displayfield
      }
    });
    this.validate(item.datafield);
    this.updateDatavalue(item.datafield);
    this.prevDatavalue = item.datafield;
    this.queryModel = item;
    if (get(this.props, 'formfield')) {
      // @ts-ignore
      this.props.invokeEvent('onSelect', [null, this, item.datafield]);
      // @ts-ignore
      this.props.invokeEvent('onSubmit', [null, this]);
    } else {
      this.invokeEventCallback('onSelect', [null, this, item.datafield]);
      this.invokeEventCallback('onSubmit', [null, this]);
    }
    this.hide();
  }
  renderSearchBar() {
    var _this$state$dataItems;
    const props = this.state.props;
    let opts = {};
    const valueExpr = Platform.OS === 'web' ? 'value' : 'defaultValue';
    opts[valueExpr] = this.state.props.query || '';
    return (
      /*#__PURE__*/
      /*
       * onLayout function is required.
       * https://github.com/naoufal/react-native-accordion/pull/19/files
       */
      React.createElement(View, {
        style: this.styles.root,
        ref: ref => {
          this.view = ref;
        },
        onLayout: () => {}
      }, /*#__PURE__*/React.createElement(View, {
        style: this.styles.searchInputWrapper
      }, /*#__PURE__*/React.createElement(TextInput, _extends({
        style: [this.styles.text, this.state.isValid ? {} : this.styles.invalid, this.state.isOpened && ((_this$state$dataItems = this.state.dataItems) === null || _this$state$dataItems === void 0 ? void 0 : _this$state$dataItems.length) > 0 ? this.styles.focusedText : null],
        ref: ref => {
          this.widgetRef = ref;
          // @ts-ignore
          if (ref && !isNull(ref.selectionStart) && !isNull(ref.selectionEnd)) {
            // @ts-ignore
            ref.selectionStart = ref.selectionEnd = this.cursor;
          }
        }
      }, this.getTestPropsForInput(), getAccessibilityProps(AccessibilityWidgetType.SEARCH, props), {
        placeholderTextColor: this.styles.placeholderText.color,
        placeholder: props.placeholder || 'Search',
        autoFocus: props.autofocus,
        editable: props.disabled || props.readonly ? false : true,
        onChangeText: this.onChange.bind(this),
        onChange: this.invokeChange.bind(this),
        onFocus: this.onFocus.bind(this),
        onLayout: e => {
          this.searchInputWidth = e.nativeEvent.layout.width;
        },
        onBlur: this.onBlur.bind(this)
      }, opts)), props.showclear && this.state.props.query ? /*#__PURE__*/React.createElement(WmButton, {
        onTap: this.clearSearch.bind(this),
        id: this.getTestId('clear'),
        styles: this.styles.clearButton,
        iconclass: 'wi wi-clear'
      }) : null), props.showSearchIcon && props.type === 'search' ? /*#__PURE__*/React.createElement(WmButton, {
        styles: this.styles.searchButton,
        id: this.getTestId('search'),
        iconclass: 'wm-sl-l sl-search',
        onTap: this.searchIconPress.bind(this)
      }) : null)
    );
  }
  reset() {
    if (this.state.props.query) {
      this.updateState({
        props: {
          query: ''
        }
      });
    }
  }
  renderSearchItem(item, index) {
    const props = this.state.props;
    const imageStyles = {
      root: {
        height: props.imagewidth,
        width: props.imagewidth
      }
    };
    return /*#__PURE__*/React.createElement(Tappable, _extends({
      onTap: this.onItemSelect.bind(this, item)
    }, this.getTestProps(`action${index}`)), /*#__PURE__*/React.createElement(View, {
      style: this.styles.searchItem
    }, !isEmpty(this.state.template) && this.props.renderitempartial ? this.props.renderitempartial(item.dataObject, index, this.state.template) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WmPicture, {
      id: this.getTestId(`picture${index}`),
      styles: imageStyles,
      name: props.name + '_image',
      picturesource: item.imgSrc
    }), /*#__PURE__*/React.createElement(Text, _extends({}, this.getTestPropsForLabel(index + ''), {
      style: this.styles.searchItemText
    }), item.displayexp || item.displayfield))));
  }
  updateDefaultQueryModel() {
    if (this.state.dataItems && this.state.dataItems.length && this.isDefaultQuery) {
      const selectedItem = find(this.state.dataItems, item => item.selected);
      this.updateState({
        props: {
          query: selectedItem ? selectedItem.displayexp || selectedItem.displayfield : ''
        }
      });
    }
  }
  onDataItemsUpdate() {
    super.onDataItemsUpdate();
    this.isFocused && this.state.dataItems.length && this.updateFilteredData(this.state.props.query);
    this.updateDefaultQueryModel();
  }
  componentDidMount() {
    super.componentDidMount();
    this.updateDefaultQueryModel();
  }
  onPropertyChange(name, $new, $old) {
    switch (name) {
      case 'dataset':
        if (!isEmpty($new) && isObject($new) && !isArray($new)) {
          $new = [$new];
          this.updateState({
            props: {
              dataset: $new
            }
          });
        }
        break;
    }
    super.onPropertyChange(name, $new, $old);
  }
  setTemplate(partialName) {
    this.updateState({
      template: partialName
    });
  }
  renderWidget(props) {
    const result = this.state.data;
    return /*#__PURE__*/React.createElement(View, null, this.renderSearchBar(), this.state.isOpened ? /*#__PURE__*/React.createElement(ModalConsumer, null, modalService => {
      modalService.showModal(this.prepareModalOptions( /*#__PURE__*/React.createElement(ScrollView, {
        style: {
          width: '100%',
          maxHeight: 200
        },
        contentContainerStyle: this.styles.dropDownContent
      }, /*#__PURE__*/React.createElement(AssetProvider, {
        value: this.loadAsset
      }, result && result.map((item, index) => /*#__PURE__*/React.createElement(View, {
        key: item.key
      }, !props.limit || props.limit && index + 1 <= props.limit ? this.renderSearchItem(item, index) : null, index === result.length - 1 ? /*#__PURE__*/React.createElement(WmAnchor, {
        caption: props.datacompletemsg,
        styles: this.styles.dataCompleteItem
      }) : null)))), this.styles, modalService));
      return null;
    }) : null);
  }
}
//# sourceMappingURL=search.component.js.map