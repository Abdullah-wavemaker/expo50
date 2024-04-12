import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmContent from '@wavemaker/app-rn-runtime/components/page/content/content.component';
import WmLabel from '@wavemaker/app-rn-runtime/components/basic/label/label.component';
import WmLeftPanel from '@wavemaker/app-rn-runtime/components/page/left-panel/left-panel.component';
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import WmTabbar from '@wavemaker/app-rn-runtime/components/page/tabbar/tabbar.component';
import WmTabpane from '@wavemaker/app-rn-runtime/components/container/tabs/tabpane/tabpane.component';
import WmTabs from '@wavemaker/app-rn-runtime/components/container/tabs/tabs.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './WMS22987.script';
import styles from './WMS22987.style';
import getVariables from './WMS22987.variables';

const FragmentContext = React.createContext();

const PC_Tabpane4content = ({ fragment }) => {
  return (
    <ScrollView nestedScrollEnabled={true}>
      <WmLabel
        name="label4"
        caption="Label1"
        classname="h1"
        listener={fragment}
      ></WmLabel>
    </ScrollView>
  );
};

const PC_Tabpane5content = ({ fragment }) => {
  return (
    <ScrollView nestedScrollEnabled={true}>
      <WmLabel
        caption="Label2"
        name="label5"
        classname="h1"
        listener={fragment}
      ></WmLabel>
    </ScrollView>
  );
};

const PC_Tabpane6content = ({ fragment }) => {
  return (
    <ScrollView nestedScrollEnabled={true}>
      <WmLabel
        caption="Label3"
        name="label6"
        classname="h1"
        listener={fragment}
      ></WmLabel>
    </ScrollView>
  );
};

const PC_Tabs2 = ({ fragment }) => {
  return (
    <WmTabs type="static" statehandler="URL" name="tabs2" listener={fragment}>
      <WmTabpane
        memoize="false"
        name="tabpane4"
        showindevice={['xs']}
        listener={fragment}
      >
        <PC_Tabpane4content fragment={fragment} />
      </WmTabpane>
      <WmTabpane memoize="false" name="tabpane5" listener={fragment}>
        <PC_Tabpane5content fragment={fragment} />
      </WmTabpane>
      <WmTabpane
        memoize="false"
        name="tabpane6"
        showindevice={['xs', 'sm']}
        listener={fragment}
      >
        <PC_Tabpane6content fragment={fragment} />
      </WmTabpane>
    </WmTabs>
  );
};

const PC_Page_content1 = ({ fragment }) => {
  return (
    <WmPageContent
      columnwidth={12}
      name="page_content1"
      listener={fragment}
      showskeleton={
        fragment.App.isSkeletonEnabled() && !fragment.startUpVariablesLoaded
      }
    >
      <PC_Tabs2 fragment={fragment} />
    </WmPageContent>
  );
};

const PC_Page1 = ({ fragment }) => {
  return (
    <WmPage name="page1" listener={fragment}>
      <>
        {fragment.setDrawerContent(
          <ThemeProvider value={fragment.theme}>
            <WmLeftPanel
              content="leftnav"
              name="left_panel1"
              listener={fragment}
              renderPartial={(props, onLoad) => (
                <WmPartialContainer
                  onLoad={onLoad}
                  listener={fragment}
                  name={props.name + '_partial_container'}
                  partial_name={props.name + '_partial'}
                  content={props.content}
                  serviceDefinitions={fragment.serviceDefinitions}
                  parentWatcher={fragment.watcher}
                  themeToUse={fragment.theme}
                />
              )}
            ></WmLeftPanel>
          </ThemeProvider>,
          'slide-in'
        )}
      </>
      <WmContent name="content1" listener={fragment}>
        <PC_Page_content1 fragment={fragment} />
      </WmContent>
      <WmTabbar
        name="mobile_tabbar1"
        listener={fragment}
        getDisplayExpression={label =>
          label && (fragment.appLocale[label.trim()] || label)
        }
        isActive={item =>
          fragment.appConfig.currentPage?.isActiveTabbarItem({
            label: item.label,
            link: item.link,
            links: [
              ...(item.childnavigation
                ? item.childnavigation.map(i => i.link)
                : []),
              item.link,
            ],
          })
        }
        activePage={fragment.appConfig.currentPage.pageName}
      ></WmTabbar>
    </WmPage>
  );
};

export default class WMS22987Page extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('WMS22987-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('WMS22987-styleOverrides', styleOverrides);
    }
  }

  init() {
    const data = getVariables(this.proxy);
    this.fragmentVariables = data.Variables;
    this.fragmentActions = data.Actions;
    this.Variables = Object.assign(this.Variables, data.Variables);
    this.Actions = Object.assign(this.Actions, data.Actions);
    this.startUpVariables = [];
    this.startUpActions = [];
    this.autoUpdateVariables = [];
    addPageScript(this.App, this.proxy);
  }

  provideAsset = path => this.handleUrl(path);

  componentDidMount() {
    this.init();
    super.componentDidMount();
    super.onFragmentReady();
  }

  handleUrl(url) {
    return (
      this.App.handleUrl(url) ||
      ResourceResolver.resolve(url, this.resourceBaseUrl) ||
      super.handleUrl(url)
    );
  }

  renderPage() {
    const fragment = this.proxy;
    return (
      <FragmentContext.Provider value={this.proxy}>
        <AssetProvider value={this.provideAsset}>
          <PC_Page1 fragment={fragment} />
        </AssetProvider>
      </FragmentContext.Provider>
    );
  }
}
