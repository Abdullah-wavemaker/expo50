import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmAreaChart from '@wavemaker/app-rn-runtime/components/chart/area-chart/area-chart.component';
import WmBarChart from '@wavemaker/app-rn-runtime/components/chart/bar-chart/bar-chart.component';
import WmBubbleChart from '@wavemaker/app-rn-runtime/components/chart/bubble-chart/bubble-chart.component';
import WmColumnChart from '@wavemaker/app-rn-runtime/components/chart/column-chart/column-chart.component';
import WmContent from '@wavemaker/app-rn-runtime/components/page/content/content.component';
import WmLabel from '@wavemaker/app-rn-runtime/components/basic/label/label.component';
import WmLeftPanel from '@wavemaker/app-rn-runtime/components/page/left-panel/left-panel.component';
import WmLineChart from '@wavemaker/app-rn-runtime/components/chart/line-chart/line-chart.component';
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import WmPieChart from '@wavemaker/app-rn-runtime/components/chart/pie-chart/pie-chart.component';
import WmSpinner from '@wavemaker/app-rn-runtime/components/basic/spinner/spinner.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './WMS24937.script';
import styles from './WMS24937.style';
import getVariables from './WMS24937.variables';

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
      <WmLabel name="label1" classname="h1" listener={fragment}></WmLabel>
      <WmLineChart
        type="Line"
        title="Line Chart"
        iconclass="wi wi-line-chart"
        name="chart2"
        dataset={fragment.Variables.chartData.dataSet}
        xaxisdatakey="date"
        yaxisdatakey="value"
        onSelect={($event, widget, selectedItem, selectedChartItem) => {
          fragment.chart2Select(
            $event,
            widget,
            selectedItem,
            selectedChartItem
          );
        }}
        onTransform={($event, widget) => {
          fragment.chart2Transform($event, widget);
        }}
        highlightpoints={false}
        styles={{ root: { height: 250 }, text: {} }}
        listener={fragment}
      ></WmLineChart>
      <WmAreaChart
        type="Area"
        title="Area Chart"
        iconclass="fa fa-area-chart"
        name="chart2_1"
        dataset={fragment.Variables.chartData.dataSet}
        xaxisdatakey="date"
        yaxisdatakey="value"
        highlightpoints={true}
        onSelect={($event, widget, selectedItem, selectedChartItem) => {
          fragment.chart2_1Select(
            $event,
            widget,
            selectedItem,
            selectedChartItem
          );
        }}
        styles={{ root: { height: 250 }, text: {} }}
        listener={fragment}
      ></WmAreaChart>
      <WmBarChart
        horizontal={true}
        type="Bar"
        title="Bar Chart"
        iconclass="wi wi-bar-chart"
        name="chart3"
        dataset={fragment.Variables.chartdata2.dataSet}
        xaxisdatakey="name"
        yaxisdatakey="value"
        onSelect={($event, widget, selectedItem, selectedChartItem) => {
          fragment.chart3Select(
            $event,
            widget,
            selectedItem,
            selectedChartItem
          );
        }}
        customcolors="pink,blue,orange"
        viewtype="Stacked"
        styles={{ root: { height: 250 }, text: {} }}
        listener={fragment}
      ></WmBarChart>
      <WmColumnChart
        horizontal={false}
        type="Column"
        title="Column Chart"
        iconclass="wi wi-bar-chart"
        name="chart4"
        dataset={fragment.Variables.chartdata2.dataSet}
        xaxisdatakey="name"
        yaxisdatakey="value"
        onSelect={($event, widget, selectedItem, selectedChartItem) => {
          fragment.chart4Select(
            $event,
            widget,
            selectedItem,
            selectedChartItem
          );
        }}
        customcolors="red,blue,green"
        styles={{ root: { height: 250 }, text: {} }}
        classname="app-column-chart "
        listener={fragment}
      ></WmColumnChart>
      <WmSpinner show={true} name="spinner1" listener={fragment}></WmSpinner>
      <WmPieChart
        type="Pie"
        title="Pie Chart"
        iconclass="wi wi-pie-chart"
        name="chart6"
        dataset={fragment.Variables.chartdata2.dataSet}
        xaxisdatakey="name"
        yaxisdatakey="value"
        styles={{ root: { height: 250 }, text: {} }}
        listener={fragment}
      ></WmPieChart>
      <WmBubbleChart
        type="Bubble"
        title="Bubble Chart"
        iconclass="wi wi-bubble-chart"
        name="chart5"
        dataset={fragment.Variables.chartdata2.dataSet}
        xaxisdatakey="name"
        yaxisdatakey="value"
        onSelect={($event, widget, selectedItem, selectedChartItem) => {
          fragment.chart5Select(
            $event,
            widget,
            selectedItem,
            selectedChartItem
          );
        }}
        styles={{ root: { height: 250 }, text: {} }}
        listener={fragment}
      ></WmBubbleChart>
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

export default class WMS24937Page extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('WMS24937-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('WMS24937-styleOverrides', styleOverrides);
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
