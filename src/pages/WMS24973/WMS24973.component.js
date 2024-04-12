import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmButton from '@wavemaker/app-rn-runtime/components/basic/button/button.component';
import WmContent from '@wavemaker/app-rn-runtime/components/page/content/content.component';
import WmDialog from '@wavemaker/app-rn-runtime/components/dialogs/dialog/dialog.component';
import WmDialogactions from '@wavemaker/app-rn-runtime/components/dialogs/dialogactions/dialogactions.component';
import WmDialogcontent from '@wavemaker/app-rn-runtime/components/dialogs/dialogcontent/dialogcontent.component';
import WmGridcolumn from '@wavemaker/app-rn-runtime/components/container/layoutgrid/gridcolumn/gridcolumn.component';
import WmGridrow from '@wavemaker/app-rn-runtime/components/container/layoutgrid/gridrow/gridrow.component';
import WmLabel from '@wavemaker/app-rn-runtime/components/basic/label/label.component';
import WmLayoutgrid from '@wavemaker/app-rn-runtime/components/container/layoutgrid/layoutgrid.component';
import WmLeftPanel from '@wavemaker/app-rn-runtime/components/page/left-panel/left-panel.component';
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './WMS24973.script';
import styles from './WMS24973.style';
import getVariables from './WMS24973.variables';

const FragmentContext = React.createContext();

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
      <WmButton
        caption="Button"
        type="button"
        name="button2"
        onTap={() => {
          fragment.Widgets.dialog1.open();
        }}
        classname="btn-default"
        listener={fragment}
      ></WmButton>
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
      <WmDialog
        dialogtype="design-dialog"
        type="page"
        modal={true}
        title="Information"
        iconclass="wi wi-file-text"
        name="dialog1"
        onOpened={($event, widget) => {
          fragment.dialog1Opened($event, widget);
        }}
        listener={fragment}
      >
        <WmDialogcontent name="wm_dialogcontent_7a017h4800" listener={fragment}>
          <WmButton
            caption="Button"
            type="button"
            name="button5"
            classname="btn-default"
            listener={fragment}
          ></WmButton>
          <WmButton
            caption="Button"
            type="button"
            name="button3"
            classname="btn-default"
            listener={fragment}
          ></WmButton>
          <WmLayoutgrid name="layoutgrid1" listener={fragment}>
            <WmGridrow name="gridrow1" listener={fragment}>
              <WmGridcolumn
                columnwidth={6}
                name="gridcolumn1"
                xscolumnwidth={6}
                classname="col-xs-6"
                listener={fragment}
              >
                <WmLabel
                  caption="Name"
                  name="label2"
                  styles={{
                    root: { paddingRight: 4, paddingLeft: 4 },
                    text: {},
                  }}
                  listener={fragment}
                ></WmLabel>
                <WmButton
                  caption="Button"
                  type="button"
                  name="button4"
                  classname="btn-default"
                  listener={fragment}
                ></WmButton>
              </WmGridcolumn>
              <WmGridcolumn
                columnwidth={6}
                name="gridcolumn2"
                xscolumnwidth={6}
                classname="col-xs-6"
                listener={fragment}
              >
                <WmLabel
                  caption="Eric"
                  name="label3"
                  styles={{
                    root: { paddingRight: 4, paddingLeft: 4 },
                    text: {},
                  }}
                  listener={fragment}
                ></WmLabel>
              </WmGridcolumn>
            </WmGridrow>
            <WmGridrow name="gridrow2" listener={fragment}>
              <WmGridcolumn
                columnwidth={6}
                name="gridcolumn3"
                xscolumnwidth={6}
                classname="col-xs-6"
                listener={fragment}
              >
                <WmLabel
                  caption="Title"
                  name="label4"
                  styles={{
                    root: { paddingRight: 4, paddingLeft: 4 },
                    text: {},
                  }}
                  listener={fragment}
                ></WmLabel>
              </WmGridcolumn>
              <WmGridcolumn
                columnwidth={6}
                name="gridcolumn4"
                xscolumnwidth={6}
                classname="col-xs-6"
                listener={fragment}
              >
                <WmLabel
                  caption="Engineer"
                  name="label5"
                  styles={{
                    root: { paddingRight: 4, paddingLeft: 4 },
                    text: {},
                  }}
                  listener={fragment}
                ></WmLabel>
              </WmGridcolumn>
            </WmGridrow>
          </WmLayoutgrid>
        </WmDialogcontent>
        <WmDialogactions name="dialogactions1" listener={fragment}>
          <WmButton
            caption="Close"
            name="button1"
            onTap={() => {
              fragment.Widgets.dialog1.close();
            }}
            classname="btn-primary"
            listener={fragment}
          ></WmButton>
        </WmDialogactions>
      </WmDialog>
    </WmPage>
  );
};

export default class WMS24973Page extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('WMS24973-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('WMS24973-styleOverrides', styleOverrides);
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
