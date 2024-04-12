function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ThemeVariables from '@wavemaker/app-rn-runtime/styles/theme.variables';
const Stack = createStackNavigator();
const pages = {};
class Screen extends React.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "cleanUp", []);
    this.state = {
      renew: false,
      page: this.createPage()
    };
    const navigation = this.props.navigation;
    this.cleanUp.push(navigation.addListener('focus', () => {
      const state = this.state;
      if (state.renew) {
        state.page = this.createPage();
        this.setState(() => ({
          renew: false,
          page: state.page
        }));
      }
    }));
  }
  createPage() {
    const props = this.props;
    return /*#__PURE__*/React.createElement(pages[props.route.name].component, {
      ...props,
      destroyMe: () => {
        setTimeout(() => {
          this.setState(() => ({
            renew: true,
            page: null
          }));
        }, 100);
      }
    });
  }
  componentWillUnmount() {
    this.cleanUp.forEach(fn => fn && fn());
  }
  render() {
    return this.state.page || /*#__PURE__*/React.createElement(View, null);
  }
}
const getPageId = (pageName, pageParams) => {
  const pageParamsStr = pageParams ? Object.keys(pageParams).sort().map(k => `${k}=${pageParams[k]}`).join('&') : '';
  return `${pageName}?${pageParamsStr}`;
};
const AppStackNavigator = props => {
  return /*#__PURE__*/React.createElement(Stack.Navigator, {
    initialRouteName: props.landingPage
  }, props.pages.map(p => {
    pages[p.name] = p;
    return /*#__PURE__*/React.createElement(Stack.Screen, {
      key: p.name,
      name: p.name,
      component: Screen,
      getId: _ref => {
        let {
          params
        } = _ref;
        return getPageId(p.name, params);
      },
      options: {
        headerShown: false,
        cardStyle: {
          backgroundColor: ThemeVariables.INSTANCE.pageContentBgColor
        }
      }
    });
  }));
};
export default AppStackNavigator;
//# sourceMappingURL=stack.navigator.js.map