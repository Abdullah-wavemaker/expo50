import React from 'react';
import { Platform, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';
import injector from '@wavemaker/app-rn-runtime/core/injector';
import AppDrawerNavigator from './navigator/drawer.navigator';
import AppStackNavigator from './navigator/stack.navigator';
import { isEmpty, keys, last } from 'lodash';
import ThemeVariables from '../styles/theme.variables';
const getNavigationState = (pageName, params) => {
  return {
    routes: [{
      name: 'pages',
      state: {
        index: 0,
        routes: [{
          name: pageName,
          params: params
        }]
      }
    }]
  };
};
const getStateFromPath = (path, options) => {
  let hash = window.location.hash;
  hash = hash.substring(1);
  if (hash && hash.startsWith('/')) {
    hash = hash.substring(1);
  }
  if (!hash) {
    return;
  }
  let [pageName, paramstr] = hash.split('?');
  let params = {};
  if (paramstr) {
    paramstr.split('&').forEach(p => {
      const [k, v] = p.split('=');
      params[k] = v;
    });
  }
  return getNavigationState(pageName, params);
};
const getPathFromState = (state, options) => {
  const pagesRoute = state === null || state === void 0 ? void 0 : state.routes[0];
  const pageRoute = last(pagesRoute === null || pagesRoute === void 0 ? void 0 : pagesRoute.state.routes);
  let path = '';
  if (pageRoute) {
    path = window.location.href.split('#')[0] + '#/' + pageRoute.name;
    if (!isEmpty(pageRoute.params)) {
      path += '?' + keys(pageRoute.params).map(k => {
        return `${k}=${pageRoute.params[k]}`;
      }).join('&');
    }
  }
  setTimeout(() => {
    var _window$history$state;
    const id = (_window$history$state = window.history.state) === null || _window$history$state === void 0 ? void 0 : _window$history$state.id;
    window.history.replaceState({
      id
    }, null, path);
  });
  return path;
};
export const AppNavigator = props => {
  var _appConfig$pages;
  const appConfig = injector.get('APP_CONFIG');
  const pages = {};
  const linking = {
    prefixes: [`${appConfig.appId}://`],
    config: {
      screens: {
        "pages": {
          path: "pages",
          screens: pages
        }
      }
    },
    getStateFromPath: isWebPreviewMode() ? getStateFromPath : undefined,
    getPathFromState: isWebPreviewMode() ? getPathFromState : undefined
  };
  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: ThemeVariables.INSTANCE.pageContentBgColor
    }
  };
  (_appConfig$pages = appConfig.pages) === null || _appConfig$pages === void 0 ? void 0 : _appConfig$pages.forEach(p => {
    //@ts-ignore
    pages[p.name] = p.name;
  });
  const stack = /*#__PURE__*/React.createElement(AppStackNavigator, {
    pages: appConfig.pages || [],
    landingPage: appConfig.landingPage
  });
  const leftNav = /*#__PURE__*/React.createElement(AppDrawerNavigator, {
    type: props.drawerAnimation === 'slide-over' ? 'front' : 'slide',
    hide: props.hideDrawer,
    content: () => props.drawerContent && props.drawerContent() || /*#__PURE__*/React.createElement(View, null),
    rootComponent: stack
  });
  const initialState = props.landingPage && Platform.OS !== 'web' ? getNavigationState(props.landingPage, props.landingPageParams) : undefined;
  return /*#__PURE__*/React.createElement(NavigationContainer, {
    initialState: initialState,
    linking: linking,
    theme: navigationTheme
  }, leftNav);
};
//# sourceMappingURL=App.navigator.js.map