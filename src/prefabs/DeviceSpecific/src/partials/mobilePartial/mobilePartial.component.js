import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePartial from '@wavemaker/app-rn-runtime/runtime/base-partial.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmContainer from '@wavemaker/app-rn-runtime/components/container/container.component';
import WmLabel from '@wavemaker/app-rn-runtime/components/basic/label/label.component';
import WmList from '@wavemaker/app-rn-runtime/components/data/list/list.component';
import WmListTemplate from '@wavemaker/app-rn-runtime/components/data/list/list-template/list-template.component';
import WmPartial from '@wavemaker/app-rn-runtime/components/page/partial/partial.component';
import WmPicture from '@wavemaker/app-rn-runtime/components/basic/picture/picture.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPartialScript from './mobilePartial.script';
import styles from './mobilePartial.style';
import getVariables from './mobilePartial.variables';

const FragmentContext = React.createContext();

const Listtemplate1 = React.memo(({ $item, $index, list, fragment }) => {
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
      name="listtemplate1"
      id={'list_item_' + $index + '_listtemplate1'}
      listener={listener}
    >
      <WmContainer
        name="container1"
        id={'repeat_item_' + $index + '_container1'}
        classname="media-left"
        listener={listener}
      >
        <WmPicture
          name="Picture"
          shape="circle"
          picturesource={fragment.Variables.FdaInvoke.dataSet.meta.last_updated}
          id={'repeat_item_' + $index + '_Picture'}
          pictureplaceholder="resources/images/imagelists/default-image.png"
          styles={{ root: { height: 32, width: 32 }, text: {} }}
          classname="media-object"
          listener={listener}
        ></WmPicture>
      </WmContainer>
      <WmContainer
        name="container2"
        id={'repeat_item_' + $index + '_container2'}
        classname="media-body"
        listener={listener}
      >
        <WmLabel
          name="Name"
          caption={$item.term}
          fontunit="em"
          id={'repeat_item_' + $index + '_Name'}
          styles={{ root: { paddingLeft: 10 }, text: {} }}
          classname="p media-heading"
          listener={listener}
        ></WmLabel>
      </WmContainer>
    </WmListTemplate>
  );
});

const PC_Fdalist1 = ({ fragment }) => {
  return (
    <WmList
      listclass="list-group"
      itemclass={(item, index) => 'list-group-item'}
      template="true"
      template-name="Contact List"
      itemsperrow={{ xs: 1, sm: 1, md: 1, lg: 1 }}
      datafield="All Fields"
      statehandler="URL"
      name="fdaList1"
      dataset={fragment.Variables.FdaInvoke.dataSet.results}
      navigation="Basic"
      title="Mobile"
      loadingdata={fragment.Variables.FdaInvoke.isExecuting}
      classname="media-list"
      listener={fragment}
      getNextPageData={($event, $list, page) => {
        return new Promise((resolve, reject) => {
          return (
            fragment.Variables.FdaInvoke.invoke &&
            fragment.Variables.FdaInvoke.invoke(
              {
                page: page,
              },
              response => {
                resolve(response.results);
              },
              reject
            )
          );
        });
      }}
      renderItem={($item, $index, list) => {
        return (
          <Listtemplate1
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

const PC_Partial1 = ({ fragment }) => {
  return (
    <WmPartial
      name="partial1"
      listener={fragment}
      showskeleton={
        fragment.App.isSkeletonEnabled() && !fragment.startUpVariablesLoaded
      }
    >
      <PC_Fdalist1 fragment={fragment} />
    </WmPartial>
  );
};

export default class mobilePartialPartial extends BasePartial {
  components;

  constructor(props) {
    super(props);
    this.pageParams = this.state.props;
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('mobilePartial-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new(
        'mobilePartial-styleOverrides',
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
    this.startUpVariables = ['FdaInvoke'];
    this.startUpActions = [];
    this.autoUpdateVariables = ['FdaInvoke'];
    addPartialScript(this.App, this.proxy);
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

  renderPartial() {
    const fragment = this.proxy;
    return (
      <FragmentContext.Provider value={this.proxy}>
        <AssetProvider value={this.provideAsset}>
          <PC_Partial1 fragment={fragment} />
        </AssetProvider>
      </FragmentContext.Provider>
    );
  }
}
