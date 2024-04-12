import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ThemeVariables from '@wavemaker/app-rn-runtime/styles/theme.variables';
const Drawer = createDrawerNavigator();
class AppDrawerNavigator extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/React.createElement(Drawer.Navigator, {
      initialRouteName: "pages",
      drawerContent: this.props.content,
      screenOptions: {
        drawerType: this.props.type,
        headerShown: false,
        gestureHandlerProps: {
          enabled: !this.props.hide
        },
        drawerStyle: {
          backgroundColor: ThemeVariables.INSTANCE.pageContentBgColor
        }
      }
    }, /*#__PURE__*/React.createElement(Drawer.Screen, {
      name: "pages"
    }, _props => this.props.rootComponent));
  }
}
export default AppDrawerNavigator;
//# sourceMappingURL=drawer.navigator.js.map