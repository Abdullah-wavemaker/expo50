import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmAppNavbar from '@wavemaker/app-rn-runtime/components/navigation/appnavbar/appnavbar.component';
import WmContent from '@wavemaker/app-rn-runtime/components/page/content/content.component';
import WmLabel from '@wavemaker/app-rn-runtime/components/basic/label/label.component';
import WmLeftPanel from '@wavemaker/app-rn-runtime/components/page/left-panel/left-panel.component';
import WmLinearlayout from '@wavemaker/app-rn-runtime/components/container/linearlayout/linearlayout.component';
import WmLinearlayoutitem from '@wavemaker/app-rn-runtime/components/container/linearlayout/linearlayoutitem/linearlayoutitem.component';
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import WmSelect from '@wavemaker/app-rn-runtime/components/input/select/select.component';
import WmTabbar from '@wavemaker/app-rn-runtime/components/page/tabbar/tabbar.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './WMS22687.script';
import styles from './WMS22687.style';
import getVariables from './WMS22687.variables';

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
      <WmLinearlayout
        direction="row"
        spacing="4"
        name="linearlayout1"
        styles={{
          root: {
            paddingTop: 4,
            paddingRight: 4,
            paddingBottom: 4,
            paddingLeft: 4,
          },
          text: {},
        }}
        listener={fragment}
      >
        <WmLinearlayoutitem
          flexgrow={0}
          name="linearlayoutitem2"
          styles={{
            root: {
              backgroundColor: '#ff0000',
              textAlign: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              flexWrap: 'wrap',
              width: 50,
            },
            text: { textAlign: 'center' },
          }}
          listener={fragment}
        >
          <WmLabel
            name="label2"
            styles={{ root: { color: '#ffffff' }, text: { color: '#ffffff' } }}
            listener={fragment}
          ></WmLabel>
        </WmLinearlayoutitem>
        <WmLinearlayoutitem
          name="linearlayoutitem3"
          marginLeft="4"
          styles={{
            root: {
              backgroundColor: '#05e1fc',
              color: '#ffffff',
              textAlign: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginLeft: 4,
              width: 50,
            },
            text: { color: '#ffffff', textAlign: 'center' },
          }}
          listener={fragment}
        >
          <WmLabel name="label3" listener={fragment}></WmLabel>
        </WmLinearlayoutitem>
        <WmLinearlayoutitem
          name="linearlayoutitem1"
          marginLeft="4"
          styles={{
            root: {
              backgroundColor: '#ff0000',
              textAlign: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginLeft: 4,
              width: 50,
            },
            text: { textAlign: 'center' },
          }}
          listener={fragment}
        >
          <WmLabel
            name="label1"
            styles={{ root: { color: '#ffffff' }, text: { color: '#ffffff' } }}
            listener={fragment}
          ></WmLabel>
        </WmLinearlayoutitem>
      </WmLinearlayout>
      <WmLinearlayout
        direction="row"
        spacing="4"
        name="linearlayout2"
        horizontalalign="center"
        styles={{
          root: {
            paddingTop: 4,
            paddingRight: 4,
            paddingBottom: 4,
            paddingLeft: 4,
          },
          text: {},
        }}
        listener={fragment}
      >
        <WmLinearlayoutitem
          name="linearlayoutitem4"
          styles={{
            root: { backgroundColor: '#ff0000', color: '#ffffff', width: 50 },
            text: { color: '#ffffff' },
          }}
          listener={fragment}
        >
          <WmLabel
            name="label4"
            styles={{ root: { color: '#ffffff' }, text: { color: '#ffffff' } }}
            listener={fragment}
          ></WmLabel>
        </WmLinearlayoutitem>
        <WmLinearlayoutitem
          flexgrow={0}
          name="linearlayoutitem5"
          marginLeft="4"
          styles={{
            root: { backgroundColor: '#02e0fc', marginLeft: 4, width: 50 },
            text: {},
          }}
          listener={fragment}
        >
          <WmLabel name="label5" listener={fragment}></WmLabel>
        </WmLinearlayoutitem>
        <WmLinearlayoutitem
          name="linearlayoutitem6"
          marginLeft="4"
          styles={{
            root: { backgroundColor: '#ff0000', marginLeft: 4, width: 50 },
            text: {},
          }}
          listener={fragment}
        >
          <WmLabel
            name="label6"
            styles={{ root: { color: '#ffffff' }, text: { color: '#ffffff' } }}
            listener={fragment}
          ></WmLabel>
        </WmLinearlayoutitem>
      </WmLinearlayout>
      <WmLinearlayout
        direction="row"
        spacing="4"
        name="linearlayout4"
        styles={{
          root: {
            paddingTop: 4,
            paddingRight: 4,
            paddingBottom: 4,
            paddingLeft: 4,
          },
          text: {},
        }}
        listener={fragment}
      >
        <WmLinearlayoutitem
          name="linearlayoutitem10"
          styles={{ root: { backgroundColor: '#ff0000' }, text: {} }}
          listener={fragment}
        >
          <WmLabel
            name="label7"
            styles={{ root: { color: '#ffffff' }, text: { color: '#ffffff' } }}
            listener={fragment}
          ></WmLabel>
        </WmLinearlayoutitem>
        <WmLinearlayoutitem
          flexgrow={1}
          name="linearlayoutitem11"
          marginLeft="4"
          styles={{
            root: {
              backgroundColor: '#00e2ff',
              textAlign: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginLeft: 4,
            },
            text: { textAlign: 'center' },
          }}
          listener={fragment}
        >
          <WmLabel
            name="label8"
            caption={fragment.appLocale.personaltext}
            listener={fragment}
          ></WmLabel>
        </WmLinearlayoutitem>
        <WmLinearlayoutitem
          name="linearlayoutitem12"
          marginLeft="4"
          styles={{
            root: { backgroundColor: '#ff0000', marginLeft: 4 },
            text: {},
          }}
          listener={fragment}
        >
          <WmLabel
            name="label9"
            styles={{ root: { color: '#ffffff' }, text: { color: '#ffffff' } }}
            listener={fragment}
          ></WmLabel>
        </WmLinearlayoutitem>
      </WmLinearlayout>
      <WmLinearlayout
        direction="row"
        spacing="4"
        name="linearlayout5"
        styles={{
          root: {
            paddingTop: 4,
            paddingRight: 4,
            paddingBottom: 4,
            paddingLeft: 4,
          },
          text: {},
        }}
        listener={fragment}
      >
        <WmLinearlayoutitem
          name="linearlayoutitem13"
          styles={{
            root: {
              backgroundColor: '#ff0000',
              textAlign: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              flexWrap: 'wrap',
              width: 100,
            },
            text: { textAlign: 'center' },
          }}
          listener={fragment}
        >
          <WmLabel
            name="label10"
            styles={{ root: { color: '#ffffff' }, text: { color: '#ffffff' } }}
            listener={fragment}
          ></WmLabel>
        </WmLinearlayoutitem>
        <WmLinearlayoutitem
          flexgrow={1}
          name="linearlayoutitem14"
          marginLeft="4"
          styles={{
            root: {
              backgroundColor: '#00dbf7',
              textAlign: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginLeft: 4,
              width: 100,
            },
            text: { textAlign: 'center' },
          }}
          listener={fragment}
        >
          <WmLabel name="label11" listener={fragment}></WmLabel>
        </WmLinearlayoutitem>
        <WmLinearlayoutitem
          name="linearlayoutitem15"
          marginLeft="4"
          styles={{
            root: {
              backgroundColor: '#ff0000',
              textAlign: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginLeft: 4,
              width: 100,
            },
            text: { textAlign: 'center' },
          }}
          listener={fragment}
        >
          <WmLabel
            name="label12"
            styles={{ root: { color: '#ffffff' }, text: { color: '#ffffff' } }}
            listener={fragment}
          ></WmLabel>
        </WmLinearlayoutitem>
      </WmLinearlayout>
      <WmLinearlayout
        direction="row"
        spacing="4"
        name="linearlayout8"
        styles={{
          root: {
            paddingTop: 4,
            paddingRight: 4,
            paddingBottom: 4,
            paddingLeft: 4,
          },
          text: {},
        }}
        listener={fragment}
      >
        <WmLinearlayoutitem name="linearlayoutitem22" listener={fragment}>
          <WmLabel name="label19" listener={fragment}></WmLabel>
        </WmLinearlayoutitem>
        <WmLinearlayoutitem
          flexgrow={1}
          name="linearlayoutitem23"
          marginLeft="4"
          styles={{
            root: {
              textAlign: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginLeft: 4,
            },
            text: { textAlign: 'center' },
          }}
          listener={fragment}
        >
          <WmLabel name="label20" listener={fragment}></WmLabel>
        </WmLinearlayoutitem>
        <WmLinearlayoutitem
          name="linearlayoutitem24"
          marginLeft="4"
          styles={{ root: { marginLeft: 4 }, text: {} }}
          listener={fragment}
        >
          <WmLabel name="label21" listener={fragment}></WmLabel>
        </WmLinearlayoutitem>
      </WmLinearlayout>
      <WmLinearlayout
        direction="row"
        spacing="4"
        name="linearlayout9"
        horizontalalign="center"
        styles={{
          root: {
            paddingTop: 4,
            paddingRight: 4,
            paddingBottom: 4,
            paddingLeft: 4,
          },
          text: {},
        }}
        listener={fragment}
      >
        <WmLinearlayoutitem name="linearlayoutitem25" listener={fragment}>
          <WmLabel name="label24" listener={fragment}></WmLabel>
        </WmLinearlayoutitem>
        <WmLinearlayoutitem
          flexgrow={1}
          name="linearlayoutitem26"
          marginLeft="4"
          styles={{ root: { marginLeft: 4 }, text: {} }}
          listener={fragment}
        >
          <WmLabel name="label23" listener={fragment}></WmLabel>
        </WmLinearlayoutitem>
        <WmLinearlayoutitem
          name="linearlayoutitem27"
          marginLeft="4"
          styles={{ root: { marginLeft: 4 }, text: {} }}
          listener={fragment}
        >
          <WmLabel name="label22" listener={fragment}></WmLabel>
        </WmLinearlayoutitem>
      </WmLinearlayout>
      <WmSelect
        dataset={fragment.Variables.supportedLocale.dataSet}
        placeholder="Select Language"
        name="select1"
        datafield="dataValue"
        displayfield="displayValue"
        datavalue={fragment.appConfig.selectedLocale}
        classname="select-locale"
        listener={fragment}
        onChange={($event, widget, newVal, oldVal) => {
          fragment.App.changeLocale(newVal);
          fragment.App.reload();
        }}
      ></WmSelect>
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

export default class WMS22687Page extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('WMS22687-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('WMS22687-styleOverrides', styleOverrides);
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
