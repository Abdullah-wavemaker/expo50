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
import WmList from '@wavemaker/app-rn-runtime/components/data/list/list.component';
import WmListTemplate from '@wavemaker/app-rn-runtime/components/data/list/list-template/list-template.component';
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import WmWizard from '@wavemaker/app-rn-runtime/components/container/wizard/wizard.component';
import WmWizardstep from '@wavemaker/app-rn-runtime/components/container/wizard/wizardstep/wizardstep.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './WMS24032.script';
import styles from './WMS24032.style';
import getVariables from './WMS24032.variables';

const FragmentContext = React.createContext();

const Listtemplate5_1 = React.memo(({ $item, $index, list, fragment }) => {
  const item = $item;
  const [currentItemWidgets] = React.useState({});
  list.itemWidgets = list.itemWidgets || [];
  list.itemWidgets[$index] = currentItemWidgets;
  const [listener] = React.useState({
    onComponentInit: c => {
      currentItemWidgets[c.name] = c;
      fragment.onComponentInit(c);
    },
    onComponentDestroy: c => {
      fragment.onComponentDestroy(c);
      delete currentItemWidgets[c.name];
    },
  });
  const { watch } = useWatcher(fragment.watcher);
  return (
    <WmListTemplate
      layout="inline"
      name="listtemplate5_1"
      id={'list_item_' + $index + '_listtemplate5_1'}
      listener={listener}
    >
      <WmLabel
        caption={$item.name}
        name="label5_1"
        id={'repeat_item_' + $index + '_label5_1'}
        styles={{
          root: {
            paddingTop: 12,
            paddingRight: 12,
            paddingBottom: 12,
            paddingLeft: 12,
          },
          text: {},
        }}
        classname="text-danger"
        listener={listener}
      ></WmLabel>
    </WmListTemplate>
  );
});

const PC_List5_1 = ({ fragment }) => {
  return (
    <WmList
      listclass="list-group"
      itemclass={(item, index) => 'list-group-item'}
      template="true"
      template-name="Text List"
      itemsperrow={{ xs: 1, sm: 1, md: 1, lg: 1 }}
      statehandler="URL"
      dataset={fragment.Variables.serviceVariable2.dataSet}
      navigation="Pager"
      name="list5_1"
      loadingdata={fragment.Variables.serviceVariable2.isExecuting}
      classname="media-list"
      listener={fragment}
      getNextPageData={($event, $list, page) => {
        return new Promise((resolve, reject) => {
          return (
            fragment.Variables.serviceVariable2.invoke &&
            fragment.Variables.serviceVariable2.invoke(
              {
                page: page,
              },
              response => {
                resolve(response);
              },
              reject
            )
          );
        });
      }}
      renderItem={($item, $index, list) => {
        return (
          <Listtemplate5_1
            $item={$item}
            $index={$index}
            list={list}
            fragment={fragment}
          />
        );
      }}
    ></WmList>
  );
};

const PC_Wizardstep2content = ({ fragment }) => {
  return (
    <ScrollView nestedScrollEnabled={true}>
      <PC_List5_1 fragment={fragment} />
    </ScrollView>
  );
};

const PC_Wizardstep3content = ({ fragment }) => {
  return <ScrollView nestedScrollEnabled={true}></ScrollView>;
};

const PC_Wizardstep1content = ({ fragment }) => {
  return <ScrollView nestedScrollEnabled={true}></ScrollView>;
};

const PC_Wizard1 = ({ fragment }) => {
  return (
    <WmWizard
      stepstyle="justified"
      name="wizard1"
      classname="number"
      listener={fragment}
    >
      <WmWizardstep name="wizardstep2" index={0} listener={fragment}>
        <PC_Wizardstep2content fragment={fragment} />
      </WmWizardstep>
      <WmWizardstep name="wizardstep3" index={1} listener={fragment}>
        <PC_Wizardstep3content fragment={fragment} />
      </WmWizardstep>
      <WmWizardstep name="wizardstep1" index={2} listener={fragment}>
        <PC_Wizardstep1content fragment={fragment} />
      </WmWizardstep>
    </WmWizard>
  );
};

const Listtemplate3 = React.memo(({ $item, $index, list, fragment }) => {
  const item = $item;
  const [currentItemWidgets] = React.useState({});
  list.itemWidgets = list.itemWidgets || [];
  list.itemWidgets[$index] = currentItemWidgets;
  const [listener] = React.useState({
    onComponentInit: c => {
      currentItemWidgets[c.name] = c;
      fragment.onComponentInit(c);
    },
    onComponentDestroy: c => {
      fragment.onComponentDestroy(c);
      delete currentItemWidgets[c.name];
    },
  });
  const { watch } = useWatcher(fragment.watcher);
  return (
    <WmListTemplate
      layout="inline"
      name="listtemplate3"
      id={'list_item_' + $index + '_listtemplate3'}
      listener={listener}
    >
      <WmLabel
        name="Text"
        caption={$item.name}
        id={'repeat_item_' + $index + '_Text'}
        styles={{
          root: {
            paddingTop: 12,
            paddingRight: 12,
            paddingBottom: 12,
            paddingLeft: 12,
          },
          text: {},
        }}
        classname="h4"
        listener={listener}
      ></WmLabel>
    </WmListTemplate>
  );
});

const PC_List3 = ({ fragment }) => {
  return (
    <WmList
      listclass="list-group"
      itemclass={(item, index) => 'list-group-item'}
      template="true"
      template-name="Text List"
      itemsperrow={{ xs: 1, sm: 1, md: 1, lg: 1 }}
      statehandler="URL"
      dataset={fragment.Variables.serviceVariable2.dataSet}
      navigation="Pager"
      name="list3"
      loadingdata={fragment.Variables.serviceVariable2.isExecuting}
      classname="media-list"
      listener={fragment}
      getNextPageData={($event, $list, page) => {
        return new Promise((resolve, reject) => {
          return (
            fragment.Variables.serviceVariable2.invoke &&
            fragment.Variables.serviceVariable2.invoke(
              {
                page: page,
              },
              response => {
                resolve(response);
              },
              reject
            )
          );
        });
      }}
      renderItem={($item, $index, list) => {
        return (
          <Listtemplate3
            $item={$item}
            $index={$index}
            list={list}
            fragment={fragment}
          />
        );
      }}
    ></WmList>
  );
};

const Listtemplate4 = React.memo(({ $item, $index, list, fragment }) => {
  const item = $item;
  const [currentItemWidgets] = React.useState({});
  list.itemWidgets = list.itemWidgets || [];
  list.itemWidgets[$index] = currentItemWidgets;
  const [listener] = React.useState({
    onComponentInit: c => {
      currentItemWidgets[c.name] = c;
      fragment.onComponentInit(c);
    },
    onComponentDestroy: c => {
      fragment.onComponentDestroy(c);
      delete currentItemWidgets[c.name];
    },
  });
  const { watch } = useWatcher(fragment.watcher);
  return (
    <WmListTemplate
      layout="inline"
      name="listtemplate4"
      id={'list_item_' + $index + '_listtemplate4'}
      listener={listener}
    >
      <WmLabel
        caption={$item.name}
        name="label4"
        id={'repeat_item_' + $index + '_label4'}
        styles={{
          root: {
            paddingTop: 12,
            paddingRight: 12,
            paddingBottom: 12,
            paddingLeft: 12,
          },
          text: {},
        }}
        classname="text-primary"
        listener={listener}
      ></WmLabel>
    </WmListTemplate>
  );
});

const PC_List4 = ({ fragment }) => {
  return (
    <WmList
      listclass="list-group"
      itemclass={(item, index) => 'list-group-item'}
      template="true"
      template-name="Text List"
      itemsperrow={{ xs: 1, sm: 1, md: 1, lg: 1 }}
      statehandler="URL"
      dataset={fragment.Variables.serviceVariable2.dataSet}
      navigation="Pager"
      name="list4"
      loadingdata={fragment.Variables.serviceVariable2.isExecuting}
      classname="media-list"
      listener={fragment}
      getNextPageData={($event, $list, page) => {
        return new Promise((resolve, reject) => {
          return (
            fragment.Variables.serviceVariable2.invoke &&
            fragment.Variables.serviceVariable2.invoke(
              {
                page: page,
              },
              response => {
                resolve(response);
              },
              reject
            )
          );
        });
      }}
      renderItem={($item, $index, list) => {
        return (
          <Listtemplate4
            $item={$item}
            $index={$index}
            list={list}
            fragment={fragment}
          />
        );
      }}
    ></WmList>
  );
};

const Listtemplate5 = React.memo(({ $item, $index, list, fragment }) => {
  const item = $item;
  const [currentItemWidgets] = React.useState({});
  list.itemWidgets = list.itemWidgets || [];
  list.itemWidgets[$index] = currentItemWidgets;
  const [listener] = React.useState({
    onComponentInit: c => {
      currentItemWidgets[c.name] = c;
      fragment.onComponentInit(c);
    },
    onComponentDestroy: c => {
      fragment.onComponentDestroy(c);
      delete currentItemWidgets[c.name];
    },
  });
  const { watch } = useWatcher(fragment.watcher);
  return (
    <WmListTemplate
      layout="inline"
      name="listtemplate5"
      id={'list_item_' + $index + '_listtemplate5'}
      listener={listener}
    >
      <WmLabel
        caption={$item.name}
        name="label5"
        id={'repeat_item_' + $index + '_label5'}
        styles={{
          root: {
            paddingTop: 12,
            paddingRight: 12,
            paddingBottom: 12,
            paddingLeft: 12,
          },
          text: {},
        }}
        classname="text-success"
        listener={listener}
      ></WmLabel>
    </WmListTemplate>
  );
});

const PC_List5 = ({ fragment }) => {
  return (
    <WmList
      listclass="list-group"
      itemclass={(item, index) => 'list-group-item'}
      template="true"
      template-name="Text List"
      itemsperrow={{ xs: 1, sm: 1, md: 1, lg: 1 }}
      statehandler="URL"
      dataset={fragment.Variables.serviceVariable2.dataSet}
      navigation="Pager"
      name="list5"
      loadingdata={fragment.Variables.serviceVariable2.isExecuting}
      classname="media-list"
      listener={fragment}
      getNextPageData={($event, $list, page) => {
        return new Promise((resolve, reject) => {
          return (
            fragment.Variables.serviceVariable2.invoke &&
            fragment.Variables.serviceVariable2.invoke(
              {
                page: page,
              },
              response => {
                resolve(response);
              },
              reject
            )
          );
        });
      }}
      renderItem={($item, $index, list) => {
        return (
          <Listtemplate5
            $item={$item}
            $index={$index}
            list={list}
            fragment={fragment}
          />
        );
      }}
    ></WmList>
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
      <PC_List3 fragment={fragment} />
      <PC_List4 fragment={fragment} />
      <PC_List5 fragment={fragment} />
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

export default class WMS24032Page extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('WMS24032-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('WMS24032-styleOverrides', styleOverrides);
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
