import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmAppNavbar from '@wavemaker/app-rn-runtime/components/navigation/appnavbar/appnavbar.component';
import WmAreaChart from '@wavemaker/app-rn-runtime/components/chart/area-chart/area-chart.component';
import WmContent from '@wavemaker/app-rn-runtime/components/page/content/content.component';
import WmDonutChart from '@wavemaker/app-rn-runtime/components/chart/donut-chart/donut-chart.component';
import WmLabel from '@wavemaker/app-rn-runtime/components/basic/label/label.component';
import WmLeftPanel from '@wavemaker/app-rn-runtime/components/page/left-panel/left-panel.component';
import WmLineChart from '@wavemaker/app-rn-runtime/components/chart/line-chart/line-chart.component';
import WmList from '@wavemaker/app-rn-runtime/components/data/list/list.component';
import WmListTemplate from '@wavemaker/app-rn-runtime/components/data/list/list-template/list-template.component';
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import WmTabbar from '@wavemaker/app-rn-runtime/components/page/tabbar/tabbar.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './FIS_Test.script';
import styles from './FIS_Test.style';
import getVariables from './FIS_Test.variables';

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

const PC_Nestedlistdatalist2 = ({
  fragment,
  listener,
  $item,
  $index,
  currentItemWidgets,
  list,
}) => {
  return (
    <WmList
      listclass="list-group"
      itemclass={(item, index) => 'list-group-item'}
      template="true"
      template-name="Text List"
      itemsperrow={{ xs: 1, sm: 1, md: 1, lg: 1 }}
      statehandler="URL"
      name="nestedListDataList2"
      dataset={$item.employees}
      navigation="Pager"
      datasetkey="employees"
      multiselect={false}
      onTap={($event, widget) => {
        fragment.nestedListDataList2Tap(
          $event,
          widget,
          $item,
          currentItemWidgets
        );
      }}
      id={'repeat_item_' + $index + '_nestedListDataList2'}
      classname="media-list"
      listener={listener}
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
        name="Text"
        caption={$item.manager}
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
      <PC_Nestedlistdatalist2
        fragment={fragment}
        listener={listener}
        $item={$item}
        $index={$index}
        currentItemWidgets={currentItemWidgets}
        list={list}
      />
    </WmListTemplate>
  );
});

const PC_Nestedlistdatalist1 = ({
  fragment,
  listener,
  $item,
  $index,
  currentItemWidgets,
  list,
}) => {
  return (
    <WmList
      listclass="list-group"
      itemclass={(item, index) => 'list-group-item'}
      template="true"
      template-name="Text List"
      itemsperrow={{ xs: 1, sm: 1, md: 1, lg: 1 }}
      statehandler="URL"
      name="nestedListDataList1"
      dataset={$item.departments}
      navigation="Pager"
      datasetkey="departments"
      id={'repeat_item_' + $index + '_nestedListDataList1'}
      classname="media-list"
      listener={listener}
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
        caption={$item.company}
        animation="tada"
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
      <PC_Nestedlistdatalist1
        fragment={fragment}
        listener={listener}
        $item={$item}
        $index={$index}
        currentItemWidgets={currentItemWidgets}
        list={list}
      />
    </WmListTemplate>
  );
});

const PC_Nestedlistdatalist3 = ({ fragment }) => {
  return (
    <WmList
      listclass="list-group"
      itemclass={(item, index) => 'list-group-item'}
      template="true"
      template-name="Text List"
      itemsperrow={{ xs: 1, sm: 1, md: 1, lg: 1 }}
      statehandler="URL"
      name="nestedListDataList3"
      dataset={fragment.Variables.nestedListData.dataSet}
      navigation="Pager"
      datasetkey="company"
      multiselect={false}
      loadingdata={fragment.Variables.nestedListData.isExecuting}
      classname="media-list"
      listener={fragment}
      getNextPageData={($event, $list, page) => {
        return new Promise((resolve, reject) => {
          return (
            fragment.Variables.nestedListData.invoke &&
            fragment.Variables.nestedListData.invoke(
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
      <PC_Nestedlistdatalist3 fragment={fragment} />
      <WmDonutChart
        type="Donut"
        title="Donut Chart"
        iconclass="wi wi-donut-large"
        name="chart2"
        dataset={fragment.Variables.areaChartVar.dataSet}
        xaxisdatakey="name"
        yaxisdatakey="value"
        styles={{ root: { height: 250 }, text: {} }}
        listener={fragment}
      ></WmDonutChart>
      <WmLineChart
        type="Line"
        title="Line Chart"
        iconclass="wi wi-line-chart"
        name="chart3"
        dataset={fragment.Variables.areaChartVar.dataSet}
        xaxisdatakey="name"
        yaxisdatakey="value"
        styles={{ root: { height: 250 }, text: {} }}
        listener={fragment}
      ></WmLineChart>
      <WmAreaChart
        type="Area"
        title="Area Chart"
        iconclass="fa fa-area-chart"
        name="chart1"
        dataset={fragment.Variables.areaChartVar.dataSet}
        xaxisdatakey="name"
        yaxisdatakey="value"
        highlightpoints={true}
        styles={{ root: { height: 250 }, text: {} }}
        listener={fragment}
      ></WmAreaChart>
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

export default class FIS_TestPage extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('FIS_Test-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('FIS_Test-styleOverrides', styleOverrides);
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
