function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import { ModalConsumer } from '@wavemaker/app-rn-runtime/core/modal.service';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import { NavigationServiceConsumer } from '@wavemaker/app-rn-runtime/core/navigation.service';
import { BaseNavComponent, BaseNavState } from '@wavemaker/app-rn-runtime/components/navigation/basenav/basenav.component';
import WmTabbarProps from './tabbar.props';
import { DEFAULT_CLASS } from './tabbar.styles';
import Svg, { Path } from 'react-native-svg';
import { getPathDown } from './curve';
// import { scale } from 'react-native-size-scaling';
import ThemeVariables from '@wavemaker/app-rn-runtime/styles/theme.variables';
const scale = n => n;
class WmTabbarState extends BaseNavState {
  constructor() {
    super(...arguments);
    _defineProperty(this, "showMore", false);
    _defineProperty(this, "modalOptions", {});
    _defineProperty(this, "dataItems", []);
  }
}
export default class WmTabbar extends BaseNavComponent {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmTabbarProps(), new WmTabbarState());
    _defineProperty(this, "tabbarHeight", 0);
    _defineProperty(this, "maxWidth", Dimensions.get("window").width);
    _defineProperty(this, "returnpathDown", void 0);
  }
  renderTabItem(item, testId, props, onSelect) {
    let floating = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    const isActive = props.isActive && props.isActive(item);
    const getDisplayLabel = this.props.getDisplayExpression || (label => label);
    let increasedGap = Number(testId) === (item === null || item === void 0 ? void 0 : item.indexBeforeMid) && this.state.dataItems.length % 2 != 0 && (props.classname || '').indexOf('clipped-tabbar') >= 0 ? [this.styles.tabItem, {
      paddingRight: 70
    }] : [this.styles.tabItem];
    return /*#__PURE__*/React.createElement(View, {
      style: [increasedGap, floating ? this.styles.centerHubItem : {}],
      key: `${item.label}_${testId}`
    }, /*#__PURE__*/React.createElement(TouchableOpacity, _extends({}, this.getTestPropsForAction('item' + testId), {
      onPress: () => onSelect && onSelect(),
      key: item.key
    }), /*#__PURE__*/React.createElement(View, {
      style: [isActive && !floating ? this.styles.activeTabItem : {}]
    }, /*#__PURE__*/React.createElement(WmIcon, {
      styles: this.theme.mergeStyle({}, this.styles.tabIcon, floating ? this.styles.centerHubIcon : {}, isActive ? this.styles.activeTabIcon : {}),
      iconclass: item.icon
    }))), /*#__PURE__*/React.createElement(Text, {
      style: [this.styles.tabLabel, floating ? this.styles.centerHubLabel : {}, isActive ? this.styles.activeTabLabel : {}]
    }, getDisplayLabel(item.label)));
  }
  onItemSelect(item, navigationService) {
    item.link && navigationService.openUrl(item.link);
    this.invokeEventCallback('onSelect', [null, this.proxy, item]);
  }
  prepareModalOptions(content) {
    const o = this.state.modalOptions;
    o.content = content;
    o.modalStyle = {
      bottom: this.tabbarHeight
    };
    o.contentStyle = this.styles.modalContent;
    return o;
  }
  renderWidget(props) {
    let max = 5;
    const tabItems = this.state.dataItems;
    const tabItemsLength = tabItems.length;
    const isClippedTabbar = (props.classname || '').indexOf('clipped-tabbar') >= 0 && tabItemsLength % 2 !== 0;
    if (tabItemsLength % 2 !== 0) {
      const middleIndex = Math.floor(tabItemsLength / 2);
      tabItems[middleIndex]['floating'] = true;
      tabItems[middleIndex - 1]['indexBeforeMid'] = middleIndex - 1;
    }
    this.returnpathDown = getPathDown(this.maxWidth, 65, 60, this.styles.root.height);
    const moreItems = [];
    if (tabItems.length > max) {
      const moreItemsCount = Math.ceil((tabItems.length + 1 - max) / max) * max;
      let j = 0;
      for (let i = max - 1; i < moreItemsCount;) {
        const row = [];
        for (let j = 0; j < max; j++) {
          row[j] = tabItems[i++] || {
            key: 'tabItem' + i
          };
        }
        moreItems.push(row);
      }
      max = max - 1;
    }
    return /*#__PURE__*/React.createElement(NavigationServiceConsumer, null, navigationService => /*#__PURE__*/React.createElement(View, {
      style: this.styles.root
    }, isClippedTabbar ? /*#__PURE__*/React.createElement(Svg, {
      width: this.maxWidth,
      height: scale(this.styles.root.height),
      style: {
        zIndex: -1,
        position: 'absolute',
        backgroundColor: ThemeVariables.INSTANCE.transparent
      }
    }, /*#__PURE__*/React.createElement(Path, {
      fill: ThemeVariables.INSTANCE.tabbarBackgroundColor,
      d: this.returnpathDown
    })) : /*#__PURE__*/React.createElement(React.Fragment, null), /*#__PURE__*/React.createElement(ModalConsumer, null, modalService => {
      if (this.state.showMore) {
        modalService.showModal(this.prepareModalOptions( /*#__PURE__*/React.createElement(ThemeProvider, {
          value: this.theme
        }, /*#__PURE__*/React.createElement(View, {
          style: this.styles.moreMenu
        }, moreItems.map((a, i) => /*#__PURE__*/React.createElement(View, {
          key: i,
          style: this.styles.moreMenuRow
        }, a.map((item, index) => this.renderTabItem(item, i + '', props, () => this.onItemSelect(item, navigationService)))))))));
      } else {
        modalService.hideModal(this.state.modalOptions);
      }
      return null;
    }), /*#__PURE__*/React.createElement(View, {
      style: this.styles.menu,
      onLayout: e => {
        this.tabbarHeight = e.nativeEvent.layout.height;
      }
    }, tabItems.filter((item, i) => i < max).map((item, i) => this.renderTabItem(item, i + '', props, () => this.onItemSelect(item, navigationService), item.floating)), tabItems.length > max && this.renderTabItem({
      label: props.morebuttonlabel,
      icon: props.morebuttoniconclass
    }, 6666 + '', props, () => {
      this.updateState({
        showMore: !this.state.showMore
      });
    }))));
  }
}
//# sourceMappingURL=tabbar.component.js.map