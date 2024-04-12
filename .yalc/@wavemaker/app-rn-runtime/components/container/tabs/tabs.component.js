function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker/app-rn-runtime/core/base.component';
import * as SwipeAnimation from '@wavemaker/app-rn-runtime/gestures/swipe.animation';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';
import WmTabsProps from './tabs.props';
import { DEFAULT_CLASS } from './tabs.styles';
import WmTabheader from './tabheader/tabheader.component';
export class WmTabsState extends BaseComponentState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "tabsShown", []);
    _defineProperty(this, "selectedTabIndex", 0);
  }
}
export default class WmTabs extends BaseComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmTabsProps(), new WmTabsState());
    _defineProperty(this, "tabPanes", []);
    _defineProperty(this, "newIndex", 0);
    _defineProperty(this, "tabLayout", null);
    _defineProperty(this, "tabPaneHeights", []);
    _defineProperty(this, "animationView", null);
    _defineProperty(this, "animationHandlers", {
      bounds: e => {
        var _this$tabLayout;
        const activeTabIndex = this.state.selectedTabIndex,
          w = ((_this$tabLayout = this.tabLayout) === null || _this$tabLayout === void 0 ? void 0 : _this$tabLayout.width) || 0,
          noOfTabs = this.tabPanes.length;
        return {
          lower: -1 * (activeTabIndex - (activeTabIndex === 0 ? 0 : 1)) * w,
          center: -1 * activeTabIndex * w,
          upper: -1 * (activeTabIndex + (activeTabIndex === noOfTabs - 1 ? 0 : 1)) * w
        };
      },
      onLower: e => {
        this.onChange(this.state.selectedTabIndex - 1);
      },
      onUpper: e => {
        this.onChange(this.state.selectedTabIndex + 1);
      }
    });
  }
  setTabLayout(event) {
    this.tabLayout = event.nativeEvent.layout;
    this.forceUpdate(() => {
      this.goToTab();
    });
  }
  setTabPaneHeights(index, nativeEvent) {
    var _nativeEvent$nativeEv;
    this.tabPaneHeights[index] = (_nativeEvent$nativeEv = nativeEvent.nativeEvent.layout) === null || _nativeEvent$nativeEv === void 0 ? void 0 : _nativeEvent$nativeEv.height;
    if (index === this.state.selectedTabIndex) {
      this.forceUpdate();
    }
  }
  setTabShown(tabIndex, callback) {
    if (!this.state.tabsShown[tabIndex]) {
      const tabsShown = [...this.state.tabsShown];
      tabsShown[tabIndex] = true;
      setTimeout(() => {
        this.updateState({
          tabsShown: tabsShown
        }, callback);
      }, 300);
    } else {
      callback && callback();
    }
  }
  addTabPane(tabPane) {
    const i = this.tabPanes.findIndex(t => t.props.name === tabPane.props.name);
    if (i >= 0) {
      this.tabPanes[i] = tabPane;
    } else {
      this.tabPanes[this.newIndex++] = tabPane;
    }
  }
  selectTabPane(tabPane) {
    this.goToTab(this.tabPanes.indexOf(tabPane));
  }
  get selectedTabPane() {
    return this.tabPanes[this.state.selectedTabIndex];
  }
  goToTab() {
    var _this$tabLayout2, _this$animationView;
    let index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.selectedTabIndex;
    const position = -1 * index * (((_this$tabLayout2 = this.tabLayout) === null || _this$tabLayout2 === void 0 ? void 0 : _this$tabLayout2.width) || 0);
    (_this$animationView = this.animationView) === null || _this$animationView === void 0 ? void 0 : _this$animationView.setPosition(position).then(() => this.onChange(index));
  }
  prev() {
    var _this$animationView2;
    (_this$animationView2 = this.animationView) === null || _this$animationView2 === void 0 ? void 0 : _this$animationView2.goToLower();
  }
  next() {
    var _this$animationView3;
    (_this$animationView3 = this.animationView) === null || _this$animationView3 === void 0 ? void 0 : _this$animationView3.goToLower();
  }
  onChange(newIndex) {
    if (newIndex < 0 || newIndex >= this.tabPanes.length) {
      return;
    }
    const oldIndex = this.state.selectedTabIndex;
    const deselectedTab = this.tabPanes[this.state.selectedTabIndex];
    this.newIndex = newIndex;
    deselectedTab === null || deselectedTab === void 0 ? void 0 : deselectedTab._onDeselect();
    this.updateState({
      selectedTabIndex: newIndex
    }, () => {
      this.setTabShown(newIndex, () => {
        const selectedTab = this.tabPanes[newIndex];
        selectedTab === null || selectedTab === void 0 ? void 0 : selectedTab._onSelect();
        this.invokeEventCallback('onChange', [{}, this.proxy, newIndex, oldIndex]);
      });
    });
  }
  renderSkeleton(props) {
    const tabPanes = React.Children.toArray(this.props.children).filter((item, index) => item.props.show != false);
    const headerData = tabPanes.map((p, i) => ({
      title: p.props.title || 'Tab Title',
      icon: '',
      key: `tab-${p.props.title}-${i}`
    }));
    return /*#__PURE__*/React.createElement(View, {
      style: [this.styles.root, {
        borderBottomWidth: 0
      }]
    }, /*#__PURE__*/React.createElement(View, {
      onLayout: this.setTabLayout.bind(this),
      style: {
        width: '100%'
      }
    }), /*#__PURE__*/React.createElement(WmTabheader, {
      styles: this.styles.tabHeader,
      data: headerData,
      showskeleton: this.props.showskeleton,
      selectedTabIndex: this.state.selectedTabIndex
    }), /*#__PURE__*/React.createElement(View
    //{...this.panResponder.panHandlers}
    , {
      style: {
        width: '100%',
        //height: this.tabPaneHeights[this.state.selectedTabIndex],
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement(View, {
      style: {
        flexDirection: 'row',
        flexWrap: 'nowrap'
      }
    }, tabPanes.map((p, i) => {
      return /*#__PURE__*/React.createElement(View, {
        key: `tab-${p.props.title}-${i}`,
        style: {
          width: '100%',
          alignSelf: 'flex-start'
        },
        onLayout: this.setTabPaneHeights.bind(this, i)
      }, p);
    }))));
  }
  onPropertyChange(name, $new, $old) {
    super.onPropertyChange(name, $new, $old);
    switch (name) {
      case "defaultpaneindex":
        const selectedIndex = $new || 0;
        const tabsShown = [];
        tabsShown[selectedIndex] = true;
        this.updateState({
          selectedTabIndex: selectedIndex,
          tabsShown: tabsShown
        });
    }
  }
  renderWidget(props) {
    const tabPanes = React.Children.toArray(props.children).filter((item, index) => item.props.show != false);
    const headerData = tabPanes.map((p, i) => ({
      title: p.props.title || 'Tab Title',
      icon: '',
      key: `tab-${p.props.title}-${i}`
    }));
    return /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, this._background, /*#__PURE__*/React.createElement(View, {
      onLayout: this.setTabLayout.bind(this),
      style: {
        width: '100%'
      }
    }), /*#__PURE__*/React.createElement(WmTabheader, {
      id: this.getTestId('headers'),
      styles: this.styles.tabHeader,
      data: headerData,
      selectedTabIndex: this.state.selectedTabIndex,
      onIndexChange: this.goToTab.bind(this)
    }), /*#__PURE__*/React.createElement(View, {
      style: [{
        width: '100%',
        flex: 1
      }, this.styles.root.height ? isWebPreviewMode() ? {
        'overflow-x': 'hidden',
        'overflow-y': 'auto'
      } : {
        overflow: 'scroll'
      } : {
        overflow: 'hidden',
        maxHeight: this.tabPaneHeights[this.state.selectedTabIndex]
      }, this.styles.tabContent]
    }, /*#__PURE__*/React.createElement(SwipeAnimation.View, {
      enableGestures: props.enablegestures,
      style: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'flex-start'
      },
      direction: "horizontal",
      ref: r => {
        this.animationView = r;
      },
      handlers: this.animationHandlers
    }, tabPanes.map((p, i) => {
      return /*#__PURE__*/React.createElement(View, {
        key: `tab-${p.props.title}-${i}`,
        style: {
          width: '100%',
          height: this.styles.root.height ? undefined : 1000000,
          alignSelf: 'flex-start'
        }
      }, /*#__PURE__*/React.createElement(View, {
        style: {
          width: '100%',
          alignSelf: 'flex-start'
        },
        onLayout: this.setTabPaneHeights.bind(this, i)
      }, p));
    }))));
  }
}
//# sourceMappingURL=tabs.component.js.map