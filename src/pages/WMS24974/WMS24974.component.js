import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmContent from '@wavemaker/app-rn-runtime/components/page/content/content.component';
import WmLeftPanel from '@wavemaker/app-rn-runtime/components/page/left-panel/left-panel.component';
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import WmWizard from '@wavemaker/app-rn-runtime/components/container/wizard/wizard.component';
import WmWizardstep from '@wavemaker/app-rn-runtime/components/container/wizard/wizardstep/wizardstep.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './WMS24974.script';
import styles from './WMS24974.style';
import getVariables from './WMS24974.variables';

const FragmentContext = React.createContext();

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
      name="wizard1"
      onDone={(widget, steps) => {
        fragment.wizard1Done(widget, steps);
      }}
      classname="number"
      listener={fragment}
    >
      <WmWizardstep
        name="wizardstep1"
        index={0}
        listener={fragment}
        onNext={(widget, currentStep, stepIndex) => {
          return fragment.wizardstep1Next(widget, currentStep, stepIndex);
        }}
      >
        <PC_Wizardstep1content fragment={fragment} />
      </WmWizardstep>
      <WmWizardstep
        name="wizardstep2"
        index={1}
        listener={fragment}
        onNext={(widget, currentStep, stepIndex) => {
          return fragment.wizardstep2Next(widget, currentStep, stepIndex);
        }}
      >
        <PC_Wizardstep2content fragment={fragment} />
      </WmWizardstep>
      <WmWizardstep name="wizardstep3" index={2} listener={fragment}>
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
      <WmContent name="content1" listener={fragment}>
        <PC_Page_content1 fragment={fragment} />
      </WmContent>
    </WmPage>
  );
};

export default class WMS24974Page extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('WMS24974-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('WMS24974-styleOverrides', styleOverrides);
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
