import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmAppNavbar from '@wavemaker/app-rn-runtime/components/navigation/appnavbar/appnavbar.component';
import WmButton from '@wavemaker/app-rn-runtime/components/basic/button/button.component';
import WmCheckbox from '@wavemaker/app-rn-runtime/components/input/checkbox/checkbox.component';
import WmCheckboxset from '@wavemaker/app-rn-runtime/components/input/checkboxset/checkboxset.component';
import WmComposite from '@wavemaker/app-rn-runtime/components/input/composite/composite.component';
import WmContainer from '@wavemaker/app-rn-runtime/components/container/container.component';
import WmContent from '@wavemaker/app-rn-runtime/components/page/content/content.component';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import WmLabel from '@wavemaker/app-rn-runtime/components/basic/label/label.component';
import WmLeftPanel from '@wavemaker/app-rn-runtime/components/page/left-panel/left-panel.component';
import WmLinearlayout from '@wavemaker/app-rn-runtime/components/container/linearlayout/linearlayout.component';
import WmLinearlayoutitem from '@wavemaker/app-rn-runtime/components/container/linearlayout/linearlayoutitem/linearlayoutitem.component';
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import WmRadioset from '@wavemaker/app-rn-runtime/components/input/radioset/radioset.component';
import WmTabbar from '@wavemaker/app-rn-runtime/components/page/tabbar/tabbar.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './WMS25138.script';
import styles from './WMS25138.style';
import getVariables from './WMS25138.variables';

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
        listener={fragment}
      >
        <WmLinearlayoutitem
          flexgrow={1}
          name="linearlayoutitem2"
          styles={{
            root: {
              height: 200,
              paddingTop: 20,
              paddingRight: 20,
              paddingBottom: 20,
              paddingLeft: 20,
            },
            text: {},
          }}
          listener={fragment}
        >
          <WmComposite name="composite7_2" listener={fragment}>
            <WmCheckbox
              caption="check 1"
              name="checkbox6_1"
              classname="custom3"
              listener={fragment}
            ></WmCheckbox>
          </WmComposite>
          <WmComposite
            name="composite9"
            styles={{ root: { marginTop: 20, marginBottom: 20 }, text: {} }}
            listener={fragment}
          >
            <WmCheckbox
              caption="check 2"
              name="checkbox7_1"
              classname="custom3"
              listener={fragment}
            ></WmCheckbox>
          </WmComposite>
        </WmLinearlayoutitem>
      </WmLinearlayout>
      <WmComposite
        name="composite1"
        styles={{ root: { marginTop: 10, marginBottom: 10 }, text: {} }}
        listener={fragment}
      >
        <WmCheckbox
          caption="Label"
          name="checkbox1"
          listener={fragment}
        ></WmCheckbox>
      </WmComposite>
      <WmComposite name="composite2" listener={fragment}>
        <WmCheckbox
          caption="Label"
          name="checkbox2"
          readonly={true}
          disabled={true}
          listener={fragment}
        ></WmCheckbox>
      </WmComposite>
      <WmComposite
        name="composite6"
        styles={{ root: { marginTop: 10, marginBottom: 10 }, text: {} }}
        listener={fragment}
      >
        <WmCheckbox
          caption="Label"
          name="checkbox6"
          classname="custom"
          listener={fragment}
        ></WmCheckbox>
      </WmComposite>
      <WmComposite
        name="composite7"
        styles={{ root: { marginTop: 10, marginBottom: 10 }, text: {} }}
        listener={fragment}
      >
        <WmCheckbox
          caption="Label"
          name="checkbox7"
          classname="custom2"
          listener={fragment}
        ></WmCheckbox>
      </WmComposite>
      <WmComposite
        name="composite8"
        styles={{ root: { marginTop: 10, marginBottom: 10 }, text: {} }}
        listener={fragment}
      >
        <WmCheckbox
          caption="Label"
          name="checkbox8"
          classname="custom3"
          listener={fragment}
        ></WmCheckbox>
      </WmComposite>
      <WmIcon
        name="icon1"
        iconclass="wi wi-check-box"
        listener={fragment}
      ></WmIcon>
      <WmComposite name="composite7_1" listener={fragment}>
        <WmComposite name="composite9_1" listener={fragment}>
          <WmLabel
            name="label2_1"
            classname="col-xs-4 control-label"
            listener={fragment}
          ></WmLabel>
          <WmContainer
            name="container2_1"
            classname="col-xs-8"
            listener={fragment}
          >
            <WmRadioset
              name="radioset1"
              listener={fragment}
              renderitempartial={(item, index, partialName) => {
                return (
                  <WmPartialContainer
                    parentWatcher={fragment.watcher}
                    themeToUse={fragment.theme}
                    content={partialName}
                    item={item}
                    listener={fragment}
                  />
                );
              }}
            ></WmRadioset>
          </WmContainer>
        </WmComposite>
        <WmButton
          caption="Button"
          type="button"
          name="button1"
          onTap={($event, widget) => {
            fragment.button1Tap($event, widget);
          }}
          classname="btn-default"
          listener={fragment}
        ></WmButton>
        <WmLabel
          name="label2"
          classname="col-xs-4 control-label"
          listener={fragment}
        ></WmLabel>
      </WmComposite>
      <WmContainer
        name="container2"
        styles={{ root: { backgroundColor: '#ff0000' }, text: {} }}
        classname="col-xs-8"
        listener={fragment}
      >
        <WmCheckboxset
          name="checkboxset2"
          onChange={($event, widget, newVal, oldVal) => {
            fragment.checkboxset2Change($event, widget, newVal, oldVal);
          }}
          listener={fragment}
          renderitempartial={(item, index, partialName) => {
            return (
              <WmPartialContainer
                parentWatcher={fragment.watcher}
                themeToUse={fragment.theme}
                content={partialName}
                item={item}
                listener={fragment}
              />
            );
          }}
        ></WmCheckboxset>
      </WmContainer>
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

export default class WMS25138Page extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('WMS25138-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('WMS25138-styleOverrides', styleOverrides);
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
