function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { ActivityIndicator, SectionList, Text, View, FlatList } from 'react-native';
import { isArray, isEmpty, isNil, isNumber } from 'lodash-es';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import { getGroupedData, isDefined } from "@wavemaker/app-rn-runtime/core/utils";
import { Tappable } from '@wavemaker/app-rn-runtime/core/tappable.component';
import { DefaultKeyExtractor } from '@wavemaker/app-rn-runtime/core/key.extractor';
import WmLabel from '@wavemaker/app-rn-runtime/components/basic/label/label.component';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import WmListProps from './list.props';
import { DEFAULT_CLASS } from './list.styles';
export class WmListState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "selectedindex", void 0);
    _defineProperty(this, "groupedData", []);
    _defineProperty(this, "currentPage", 1);
    _defineProperty(this, "maxRecordsToShow", 20);
  }
}
export default class WmList extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmListProps(), new WmListState());
    _defineProperty(this, "itemWidgets", []);
    _defineProperty(this, "selectedItemWidgets", {});
    _defineProperty(this, "keyExtractor", new DefaultKeyExtractor());
    _defineProperty(this, "endThreshold", -1);
    _defineProperty(this, "loadingData", false);
    _defineProperty(this, "hasMoreData", true);
    this.updateState({
      maxRecordsToShow: this.state.props.pagesize
    });
  }
  isSelected($item) {
    const selectedItem = this.state.props.selecteditem;
    if (isArray(selectedItem)) {
      return selectedItem.indexOf($item) >= 0;
    }
    return selectedItem === $item;
  }
  onSelect($item, $index, e) {
    let triggerTapEvent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    const props = this.state.props;
    let selectedItem = null;
    if (props.disableitem !== true && (typeof props.disableitem !== 'function' || !props.disableitem($item, $index))) {
      if (props.multiselect) {
        selectedItem = [...(props.selecteditem || [])];
        const index = selectedItem.indexOf($item);
        if (index < 0) {
          if (!props.selectionlimit || props.selectionlimit < 0 || selectedItem.length < props.selectionlimit) {
            selectedItem.push($item);
          } else {
            this.invokeEventCallback('onSelectionlimitexceed', [null, this]);
          }
        } else {
          selectedItem.splice(index, 1);
        }
      } else {
        selectedItem = $item;
      }
      this.selectedItemWidgets = this.itemWidgets[$index];
      this.updateState({
        props: {
          selecteditem: selectedItem
        },
        selectedindex: $index
      }, () => {
        this.invokeEventCallback('onSelect', [this.proxy, $item]);
        triggerTapEvent && this.invokeEventCallback('onTap', [e, this.proxy]);
      });
    }
  }
  get loadDataOnDemand() {
    const navigation = this.state.props.navigation;
    return navigation === 'Scroll' || navigation === 'On-Demand';
  }
  loadData() {
    if (this.loadingData) {
      return;
    }
    if (isArray(this.state.props.dataset) && this.state.props.dataset.length > this.state.maxRecordsToShow) {
      this.updateState({
        maxRecordsToShow: this.state.maxRecordsToShow + this.state.props.pagesize
      });
    } else if (this.loadDataOnDemand) {
      const $list = this.proxy;
      $list.loadingdata = true;
      this.loadingData = true;
      this.props.getNextPageData && this.props.getNextPageData(null, this.proxy, this.state.currentPage + 1).then(data => {
        if (isArray(data) && data.length > 0 && isArray(this.state.props.dataset)) {
          $list.dataset = [...this.state.props.dataset, ...data];
          this.updateState({
            currentPage: this.state.currentPage + 1,
            maxRecordsToShow: this.state.maxRecordsToShow + this.state.props.pagesize
          });
          this.hasMoreData = true;
        } else {
          this.hasMoreData = false;
        }
      }).catch(err => {
        console.error(err);
      }).then(() => {
        setTimeout(() => {
          $list.loadingdata = false;
        }, 1000);
      });
    }
  }
  selectFirstItem() {
    const props = this.state.props;
    if (this.initialized && props.dataset && props.dataset.length) {
      const index = props.groupby ? '00' : 0;
      this.onSelect(props.dataset[0], index, null);
    }
  }
  clear() {
    this.updateState({
      groupedData: {}
    });
  }
  selectItem(item) {
    const dataset = this.state.props.dataset;
    if (isNumber(item)) {
      this.onSelect(dataset[item], item, null);
    } else {
      let index = dataset.indexOf(item);
      this.onSelect(dataset[index], index, null);
    }
  }
  getItem(index) {
    const props = this.state.props;
    return this.props.dataset[index];
  }
  deselect(item) {
    const props = this.state.props;
    let selectedItem = null;
    let index = isNumber(item) ? item : props.dataset.indexOf(item);
    if (props.multiselect && index >= 0) {
      selectedItem = [...(props.selecteditem || [])];
      let selectedItemIndex = selectedItem.indexOf(props.dataset[index]);
      if (selectedItemIndex >= 0) {
        selectedItem.splice(selectedItemIndex, 1);
      }
    } else {
      if (props.selecteditem === props.dataset[index]) {
        selectedItem = null;
      }
    }
    this.updateState({
      props: {
        selecteditem: selectedItem
      }
    });
  }
  getWidgets(widgetname, index) {
    if (index >= 0 && index < this.itemWidgets.length) {
      return this.itemWidgets[index][widgetname];
    } else {
      return this.itemWidgets.map(item => item[widgetname]).filter(widget => widget !== undefined);
    }
  }
  deselectAll() {
    this.updateState({
      props: {
        selecteditem: null
      },
      selectedindex: -1
    });
  }
  setGroupData(items) {
    const dataItems = items;
    const props = this.state.props;
    if (props.groupby) {
      const groupedData = dataItems && getGroupedData(dataItems, props.groupby, props.match, props.orderby, props.dateformat, this);
      this.updateState({
        groupedData: groupedData
      }, () => {
        var _this$keyExtractor;
        (_this$keyExtractor = this.keyExtractor) === null || _this$keyExtractor === void 0 ? void 0 : _this$keyExtractor.clear();
      });
    }
  }
  onPropertyChange(name, $new, $old) {
    super.onPropertyChange(name, $new, $old);
    const props = this.state.props;
    switch (name) {
      case 'selectfirstitem':
        if ($new) {
          this.selectFirstItem();
        }
        break;
      case 'dataset':
        if (this.state.props.groupby) {
          this.setGroupData($new);
        } else {
          if (!($old && $old.length) && $new && $new.length && this.loadDataOnDemand) {
            this.updateState({
              props: {
                dataset: [...$new]
              }
            });
          }
          const data = isArray($new) ? $new : !isEmpty($new) && isDefined($new) ? [$new] : [];
          this.updateState({
            groupedData: data[0] || props.direction === 'horizontal' ? [{
              key: 'key',
              data: data
            }] : []
          }, () => {
            var _this$keyExtractor2;
            (_this$keyExtractor2 = this.keyExtractor) === null || _this$keyExtractor2 === void 0 ? void 0 : _this$keyExtractor2.clear();
          });
        }
        this.itemWidgets = [];
        if (props.selectfirstitem) {
          this.selectFirstItem();
        } else {
          this.deselectAll();
        }
        break;
      case 'groupby':
      case 'match':
        this.setGroupData(this.state.props.dataset);
        break;
      case 'multiselect':
        if ($new) {
          if (!isArray(this.state.props.selecteditem)) {
            this.state.props.selecteditem = this.state.props.selecteditem ? [this.state.props.selecteditem] : [];
          }
        } else if (isArray(this.state.props.selecteditem)) {
          this.state.props.selecteditem = this.state.props.selecteditem.pop();
        }
        break;
      case 'loadingdata':
        this.loadingData = $new && this.loadingData;
        break;
      case 'selecteditem':
        if ($new != $old && isNumber($new)) {
          this.selectItem(this.state.props.dataset[$new]);
        }
        break;
    }
  }
  componentDidMount() {
    var _props$dataset;
    const props = this.state.props;
    if (this.state.props.selectfirstitem && (_props$dataset = props.dataset) !== null && _props$dataset !== void 0 && _props$dataset.length) {
      setTimeout(() => {
        this.onSelect(props.dataset[0], 0, null);
      });
    }
    this.subscribe('scroll', event => {
      const scrollPosition = event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height;
      if (scrollPosition > this.endThreshold && this.state.props.direction === 'vertical') {
        this.loadData();
      }
    });
    super.componentDidMount();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState, snapshot);
    this.invokeEventCallback('onRender', [this, this.state.props.dataset]);
  }
  getDefaultStyles() {
    const isHorizontal = this.state.props.direction === 'horizontal';
    return this.theme.getStyle(`${this.defaultClass} ${isHorizontal ? 'app-horizontal-list' : 'app-vertical-list'}`);
  }
  getIndex(item) {
    return this.state.props.dataset.indexOf(item);
  }
  generateItemKey(item, index, props) {
    if (props.itemkey && item && !this._showSkeleton) {
      return props.itemkey(item, index);
    }
    return 'list_item_' + this.keyExtractor.getKey(item, true);
  }
  renderItem(item, index, props) {
    const cols = this.getNoOfColumns();
    const isHorizontal = props.direction === 'horizontal';
    return index < this.state.maxRecordsToShow || isHorizontal ? /*#__PURE__*/React.createElement(View, {
      style: [this.styles.item, props.itemclass ? this.theme.getStyle(props.itemclass(item, index)) : null, this.isSelected(item) ? this.styles.selectedItem : {}]
    }, /*#__PURE__*/React.createElement(Tappable, _extends({}, this.getTestPropsForAction(`item${index}`), {
      onTap: e => this.onSelect(item, index, e, true),
      onLongTap: () => this.invokeEventCallback('onLongtap', [null, this.proxy]),
      onDoubleTap: () => this.invokeEventCallback('onDoubletap', [null, this.proxy]),
      styles: [{
        display: 'flex',
        flexDirection: 'row'
      }, cols ? {
        width: '100%'
      } : null, cols || isHorizontal ? {
        paddingRight: (isNil(this.styles.item.marginRight) ? this.styles.item.margin : this.styles.item.marginRight) || 4
      } : null]
    }), props.renderItem(item, index, this), this.isSelected(item) ? /*#__PURE__*/React.createElement(WmIcon, {
      id: this.getTestId('icon' + index),
      iconclass: "wi wi-check-circle",
      styles: this.styles.selectedIcon
    }) : null)) : null;
  }
  renderHeader(props, title) {
    return props.groupby ? /*#__PURE__*/React.createElement(Text, {
      style: this.styles.groupHeading
    }, title) : props.iconclass || props.title || props.subheading ? /*#__PURE__*/React.createElement(View, {
      style: this.styles.heading
    }, /*#__PURE__*/React.createElement(View, {
      style: {
        flex: 1,
        flexDirection: 'row'
      }
    }, /*#__PURE__*/React.createElement(WmIcon, {
      id: this.getTestId('icon'),
      styles: this.styles.listIcon,
      iconclass: props.iconclass
    }), /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(WmLabel, {
      id: this.getTestId('title'),
      styles: this.styles.title,
      caption: props.title
    }), /*#__PURE__*/React.createElement(WmLabel, {
      id: this.getTestId('subheading'),
      styles: this.styles.subheading,
      caption: props.subheading
    })))) : null;
  }
  renderEmptyMessage(isHorizontal, item, index, props) {
    return /*#__PURE__*/React.createElement(WmLabel, {
      id: this.getTestId('emptymsg'),
      styles: this.styles.emptyMessage,
      caption: props.nodatamessage
    });
  }
  renderLoadingIcon(props) {
    return props.loadingicon ? /*#__PURE__*/React.createElement(WmIcon, {
      id: this.getTestId('loadingicon'),
      styles: this.styles.loadingIcon,
      iconclass: props.loadingicon,
      caption: props.loadingdatamsg
    }) : /*#__PURE__*/React.createElement(ActivityIndicator, {
      color: this.styles.loadingIcon.text.color
    });
  }
  getNoOfColumns() {
    const props = this.state.props;
    if (props.direction === 'vertical') {
      return props.itemsperrow.xs;
    }
    return 0;
  }
  onLayoutChange(e) {
    const l = e.nativeEvent.layout;
    this.endThreshold = l.height + l.y - 100;
    if (!this.endThreshold) {
      this.endThreshold = -1;
    }
  }
  renderWithFlatList(props) {
    let isHorizontal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root,
      onLayout: e => this.onLayoutChange(e)
    }, !isEmpty(this.state.groupedData) ? this.state.groupedData.map((v, i) => /*#__PURE__*/React.createElement(View, {
      style: this.styles.group,
      key: v.key || this.keyExtractor.getKey(v, true)
    }, this.renderHeader(props, v.key), /*#__PURE__*/React.createElement(FlatList, _extends({
      key: props.name + '_' + (isHorizontal ? 'H' : 'V') + props.itemsperrow.xs,
      keyExtractor: (item, i) => this.generateItemKey(item, i, props),
      scrollEnabled: isHorizontal,
      horizontal: isHorizontal,
      data: isEmpty(v.data[0]) ? [] : v.data,
      ListEmptyComponent: itemInfo => this.renderEmptyMessage(isHorizontal, itemInfo.item, itemInfo.index, props),
      renderItem: itemInfo => this.renderItem(itemInfo.item, itemInfo.index, props)
    }, isHorizontal ? {} : {
      numColumns: this.getNoOfColumns()
    })), this.loadDataOnDemand || v.data.length > this.state.maxRecordsToShow ? this.loadingData ? this.renderLoadingIcon(props) : /*#__PURE__*/React.createElement(WmLabel, {
      id: this.getTestId('ondemandmessage'),
      styles: this.styles.onDemandMessage,
      caption: this.hasMoreData && !isHorizontal ? props.ondemandmessage : props.nodatamessage,
      onTap: () => this.loadData()
    }) : null)) : this.renderEmptyMessage(isHorizontal, null, null, props));
  }
  getSectionListData() {
    if (this._showSkeleton) {
      return [{
        key: '',
        data: [{}, {}, {}]
      }];
    } else if (this.state.groupedData && this.state.groupedData[0] && this.state.groupedData[0]['data'].length) {
      return this.state.groupedData;
    }
    return [];
  }
  renderWithSectionList(props) {
    let isHorizontal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return /*#__PURE__*/React.createElement(SectionList, {
      keyExtractor: (item, i) => this.generateItemKey(item, i, props),
      horizontal: isHorizontal,
      contentContainerStyle: this.styles.root,
      sections: this.getSectionListData(),
      renderSectionHeader: _ref => {
        let {
          section: {
            key,
            data
          }
        } = _ref;
        return this.renderHeader(props, key);
      },
      renderSectionFooter: () => props.loadingdata ? this.renderLoadingIcon(props) : null,
      ListEmptyComponent: itemInfo => this.renderEmptyMessage(isHorizontal, itemInfo.item, itemInfo.index, props),
      renderItem: itemInfo => this.renderItem(itemInfo.item, itemInfo.index, props)
    });
  }
  renderWidget(props) {
    this.invokeEventCallback('onBeforedatarender', [this, this.state.props.dataset]);
    const isHorizontal = props.direction === 'horizontal';
    return /*#__PURE__*/React.createElement(View, {
      style: isHorizontal ? null : {
        width: '100%'
      }
    }, this._background, isHorizontal || !props.groupby ? this.renderWithFlatList(props, isHorizontal) : this.renderWithSectionList(props, isHorizontal));
  }
}
//# sourceMappingURL=list.component.js.map