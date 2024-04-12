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
import WmMenu from '@wavemaker/app-rn-runtime/components/navigation/menu/menu.component';
import WmPartial from '@wavemaker/app-rn-runtime/components/page/partial/partial.component';
import WmPicture from '@wavemaker/app-rn-runtime/components/basic/picture/picture.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPartialScript from './webpartial.script';
import styles from './webpartial.style';
import getVariables from './webpartial.variables';

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
      layout="media"
      name="listtemplate1"
      id={'list_item_' + $index + '_listtemplate1'}
      listener={listener}
    >
      <WmContainer
        name="container1"
        id={'repeat_item_' + $index + '_container1'}
        classname="media-left media-top"
        listener={listener}
      >
        <WmPicture
          name="Picture"
          picturesource={$item.picture.thumbnail}
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
        styles={{ root: { paddingRight: 12, paddingLeft: 10 }, text: {} }}
        classname="media-body"
        listener={listener}
      >
        <WmLabel
          caption={$item.name.first}
          name="Name"
          fontunit="em"
          id={'repeat_item_' + $index + '_Name'}
          styles={{
            root: { fontSize: 1.143, marginTop: 0, marginBottom: 4 },
            text: { fontSize: 1.143 },
          }}
          classname="pull-left"
          listener={listener}
        ></WmLabel>
        <WmLabel
          name="Time"
          caption={$item.dob.date}
          id={'repeat_item_' + $index + '_Time'}
          classname="pull-right text-muted"
          listener={listener}
        ></WmLabel>
        <WmLabel
          caption={$item.email}
          name="Description"
          id={'repeat_item_' + $index + '_Description'}
          classname="p text-muted"
          listener={listener}
        ></WmLabel>
      </WmContainer>
      <WmContainer
        name="container3"
        id={'repeat_item_' + $index + '_container3'}
        styles={{
          root: {
            textAlign: 'right',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            paddingRight: 8,
          },
          text: { textAlign: 'right' },
        }}
        classname="media-right"
        listener={listener}
      >
        <WmMenu
          getDisplayExpression={label =>
            label && (fragment.appLocale[label.trim()] || label)
          }
          autoclose="outsideClick"
          caption=""
          type="anchor"
          iconclass="wi wi-more-vert"
          menuposition="down,left"
          name="menu1"
          id={'repeat_item_' + $index + '_menu1'}
          listener={listener}
        ></WmMenu>
      </WmContainer>
    </WmListTemplate>
  );
});

const PC_Randomuserlist1 = ({ fragment }) => {
  return (
    <WmList
      listclass="list-group"
      itemclass={(item, index) => 'list-group-item'}
      template="true"
      template-name="Media List"
      itemsperrow={{ xs: 1, sm: 1, md: 1, lg: 1 }}
      statehandler="URL"
      name="randomuserList1"
      dataset={fragment.Variables.RandomuserInvoke.dataSet.results}
      navigation="Basic"
      title="Laptop\Tablet Landscape\LargeScreen"
      loadingdata={fragment.Variables.RandomuserInvoke.isExecuting}
      classname="media-list"
      listener={fragment}
      getNextPageData={($event, $list, page) => {
        return new Promise((resolve, reject) => {
          return (
            fragment.Variables.RandomuserInvoke.invoke &&
            fragment.Variables.RandomuserInvoke.invoke(
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
      <PC_Randomuserlist1 fragment={fragment} />
    </WmPartial>
  );
};

export default class webpartialPartial extends BasePartial {
  components;

  constructor(props) {
    super(props);
    this.pageParams = this.state.props;
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('webpartial-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('webpartial-styleOverrides', styleOverrides);
    }
  }

  init() {
    const data = getVariables(this.proxy);
    this.fragmentVariables = data.Variables;
    this.fragmentActions = data.Actions;
    this.Variables = Object.assign(this.Variables, data.Variables);
    this.Actions = Object.assign(this.Actions, data.Actions);
    this.startUpVariables = ['RandomuserInvoke'];
    this.startUpActions = [];
    this.autoUpdateVariables = ['RandomuserInvoke'];
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
