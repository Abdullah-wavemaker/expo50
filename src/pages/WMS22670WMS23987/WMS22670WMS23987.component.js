import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmAppNavbar from '@wavemaker/app-rn-runtime/components/navigation/appnavbar/appnavbar.component';
import WmButton from '@wavemaker/app-rn-runtime/components/basic/button/button.component';
import WmButtongroup from '@wavemaker/app-rn-runtime/components/basic/buttongroup/buttongroup.component';
import WmContent from '@wavemaker/app-rn-runtime/components/page/content/content.component';
import WmLeftPanel from '@wavemaker/app-rn-runtime/components/page/left-panel/left-panel.component';
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import WmTabbar from '@wavemaker/app-rn-runtime/components/page/tabbar/tabbar.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './WMS22670WMS23987.script';
import styles from './WMS22670WMS23987.style';
import getVariables from './WMS22670WMS23987.variables';

const FragmentContext = React.createContext();

const PC_Mobile_navbar1 = ({ fragment }) => {
  return (
    <WmAppNavbar
      name="mobile_navbar1"
      onBackbtnclick={() => {
        fragment.goBack();
      }}
      onDrawerbuttonpress={() => {
        fragment.toggleDrawer();
      }}
      listener={fragment}
      showDrawerButton={fragment.hasDrawer}
    ></WmAppNavbar>
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
      <WmButtongroup name="buttongroup1" listener={fragment}>
        <WmButton
          type="button"
          caption="left"
          name="button1"
          classname="btn-danger btn-group-child btn-group-first-child "
          listener={fragment}
        ></WmButton>
        <WmButton
          type="button"
          caption="center"
          name="button2"
          classname="btn-default btn-group-child "
          listener={fragment}
        ></WmButton>
        <WmButton
          type="button"
          caption="right"
          name="button3"
          classname="btn-warning btn-group-child  btn-group-last-child"
          listener={fragment}
        ></WmButton>
      </WmButtongroup>
      <WmButton
        caption="Button"
        type="button"
        name="button4"
        classname="fab-btn"
        listener={fragment}
      ></WmButton>
      <WmButtongroup name="buttongroup2" listener={fragment}>
        <WmButton
          type="button"
          caption="left"
          name="button5"
          classname="btn-primary btn-group-child btn-group-first-child "
          listener={fragment}
        ></WmButton>
        <WmButton
          type="button"
          caption="center"
          name="button6"
          classname="btn-secondary btn-group-child "
          listener={fragment}
        ></WmButton>
        <WmButton
          type="button"
          caption="right"
          name="button7"
          classname="btn-success btn-group-child "
          listener={fragment}
        ></WmButton>
        <WmButton
          caption="Button"
          type="button"
          name="button8"
          classname="btn-danger btn-group-child "
          listener={fragment}
        ></WmButton>
        <WmButton
          caption="Button"
          type="button"
          name="button9"
          classname="btn-info btn-group-child "
          listener={fragment}
        ></WmButton>
        <WmButton
          caption="Button"
          type="button"
          name="button10"
          classname="btn-link btn-group-child "
          listener={fragment}
        ></WmButton>
        <WmButton
          caption="Button"
          type="button"
          name="button11"
          classname="btn-default btn-group-child  btn-group-last-child"
          listener={fragment}
        ></WmButton>
      </WmButtongroup>
      <WmButtongroup name="buttongroup3" listener={fragment}>
        <WmButton
          type="button"
          caption="left"
          name="button12"
          classname="btn-default btn-group-child btn-group-first-child "
          listener={fragment}
        ></WmButton>
        <WmButton
          type="button"
          caption="center"
          name="button13"
          classname="btn-default btn-group-child "
          listener={fragment}
        ></WmButton>
        <WmButton
          type="button"
          caption="right"
          name="button14"
          classname="btn-default btn-group-child  btn-group-last-child"
          listener={fragment}
        ></WmButton>
      </WmButtongroup>
      <WmButtongroup name="buttongroup4" listener={fragment}>
        <WmButton
          type="button"
          caption="left"
          name="button15"
          classname="btn-default btn-group-child btn-group-first-child "
          listener={fragment}
        ></WmButton>
        <WmButton
          type="button"
          caption="center"
          name="button16"
          classname="btn-default btn-group-child "
          listener={fragment}
        ></WmButton>
        <WmButton
          type="button"
          caption="right"
          name="button17"
          classname="btn-default btn-group-child "
          listener={fragment}
        ></WmButton>
        <WmButton
          caption="Button"
          type="button"
          name="button18"
          classname="btn-default btn-group-child "
          listener={fragment}
        ></WmButton>
        <WmButton
          caption="Button"
          type="button"
          name="button19"
          classname="btn-default btn-group-child "
          listener={fragment}
        ></WmButton>
        <WmButton
          caption="Button"
          type="button"
          name="button20"
          classname="btn-default btn-group-child  btn-group-last-child"
          listener={fragment}
        ></WmButton>
      </WmButtongroup>
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
      <PC_Mobile_navbar1 fragment={fragment} />
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

export default class WMS22670WMS23987Page extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('WMS22670WMS23987-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new(
        'WMS22670WMS23987-styleOverrides',
        styleOverrides
      );
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
