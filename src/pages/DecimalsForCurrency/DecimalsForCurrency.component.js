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
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import WmTabbar from '@wavemaker/app-rn-runtime/components/page/tabbar/tabbar.component';
import WmWizard from '@wavemaker/app-rn-runtime/components/container/wizard/wizard.component';
import WmWizardstep from '@wavemaker/app-rn-runtime/components/container/wizard/wizardstep/wizardstep.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './DecimalsForCurrency.script';
import styles from './DecimalsForCurrency.style';
import getVariables from './DecimalsForCurrency.variables';

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

const PC_Wizardstep1content = ({ fragment }) => {
  return <ScrollView nestedScrollEnabled={true}></ScrollView>;
};

const PC_Wizardstep2content = ({ fragment }) => {
  return <ScrollView nestedScrollEnabled={true}></ScrollView>;
};

const PC_Wizardstep3content = ({ fragment }) => {
  return <ScrollView nestedScrollEnabled={true}></ScrollView>;
};

const PC_Wizard1 = ({ fragment }) => {
  return (
    <WmWizard
      stepstyle="justified"
      defaultstep={fragment.Variables.wizard.dataSet.dataValue}
      name="wizard1"
      classname="number-text-inline"
      listener={fragment}
    >
      <WmWizardstep
        title="Authentication"
        name="wizardstep1"
        index={0}
        listener={fragment}
      >
        <PC_Wizardstep1content fragment={fragment} />
      </WmWizardstep>
      <WmWizardstep
        title="Verification"
        name="wizardstep2"
        index={1}
        listener={fragment}
      >
        <PC_Wizardstep2content fragment={fragment} />
      </WmWizardstep>
      <WmWizardstep
        title="submission"
        name="wizardstep3"
        index={2}
        listener={fragment}
      >
        <PC_Wizardstep3content fragment={fragment} />
      </WmWizardstep>
    </WmWizard>
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
      <WmLabel
        name="label7"
        caption={fragment.formatters
          .get('toCurrency')
          .format(123344212322, '$', '2')}
        show={false}
        listener={fragment}
      ></WmLabel>
      <WmLabel
        name="label8"
        caption={fragment.formatters.get('toCurrency').format(12312312, '$')}
        show={false}
        listener={fragment}
      ></WmLabel>
      <WmLabel
        caption={fragment.formatters.get('numberToString').format(12312312)}
        name="label10_1"
        show={false}
        listener={fragment}
      ></WmLabel>
      <WmLabel
        name="label5"
        caption={fragment.formatters.get('numberToString').format(100292029)}
        classname="h1"
        listener={fragment}
      ></WmLabel>
      <WmLabel
        caption={fragment.formatters.get('toCurrency').format(100292029, '$')}
        name="label7_1"
        classname="h1"
        listener={fragment}
      ></WmLabel>
      <PC_Wizard1 fragment={fragment} />
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

export default class DecimalsForCurrencyPage extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('DecimalsForCurrency-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new(
        'DecimalsForCurrency-styleOverrides',
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
