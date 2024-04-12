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
import WmList from '@wavemaker/app-rn-runtime/components/data/list/list.component';
import WmListTemplate from '@wavemaker/app-rn-runtime/components/data/list/list-template/list-template.component';
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import WmPicture from '@wavemaker/app-rn-runtime/components/basic/picture/picture.component';
import WmTabbar from '@wavemaker/app-rn-runtime/components/page/tabbar/tabbar.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './WMS23776.script';
import styles from './WMS23776.style';
import getVariables from './WMS23776.variables';

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
      <WmLinearlayout
        direction="row"
        horizontalalign="left"
        spacing="12"
        verticalalign="top"
        name="linearlayout8"
        id={'repeat_item_' + $index + '_linearlayout8'}
        styles={{
          root: {
            paddingTop: 12,
            paddingRight: 12,
            paddingBottom: 12,
            paddingLeft: 12,
          },
          text: {},
        }}
        listener={listener}
      >
        <WmLinearlayoutitem
          name="linearlayoutitem18"
          id={'repeat_item_' + $index + '_linearlayoutitem18'}
          listener={listener}
        >
          <WmPicture
            picturesource={$item.picurl}
            shape="circle"
            resizemode="cover"
            name="picture4"
            id={'repeat_item_' + $index + '_picture4'}
            pictureplaceholder="resources/images/imagelists/default-image.png"
            styles={{ root: { height: 58, width: 58 }, text: {} }}
            classname="media-object"
            listener={listener}
          ></WmPicture>
        </WmLinearlayoutitem>
        <WmLinearlayoutitem
          flexgrow={1}
          name="linearlayoutitem19"
          id={'repeat_item_' + $index + '_linearlayoutitem19'}
          marginLeft="12"
          styles={{ root: { marginLeft: 12 }, text: {} }}
          listener={listener}
        >
          <WmLinearlayout
            direction="column"
            spacing="4"
            name="linearlayout9"
            id={'repeat_item_' + $index + '_linearlayout9'}
            listener={listener}
          >
            <WmLinearlayoutitem
              name="linearlayoutitem20"
              id={'repeat_item_' + $index + '_linearlayoutitem20'}
              styles={{ root: { width: '100%' }, text: {} }}
              listener={listener}
            >
              <WmLabel
                caption={$item.firstname}
                name="label11"
                id={'repeat_item_' + $index + '_label11'}
                styles={{
                  root: { fontWeight: 'bold' },
                  text: { fontWeight: 'bold' },
                }}
                classname="h4"
                listener={listener}
              ></WmLabel>
            </WmLinearlayoutitem>
            <WmLinearlayoutitem
              name="linearlayoutitem21"
              id={'repeat_item_' + $index + '_linearlayoutitem21'}
              marginTop="4"
              styles={{ root: { marginTop: 4, width: '100%' }, text: {} }}
              listener={listener}
            >
              <WmLabel
                caption={$item.empId}
                name="label12"
                id={'repeat_item_' + $index + '_label12'}
                styles={{ root: { marginRight: 4, marginLeft: 4 }, text: {} }}
                listener={listener}
              ></WmLabel>
            </WmLinearlayoutitem>
            <WmLinearlayoutitem
              name="linearlayoutitem22"
              id={'repeat_item_' + $index + '_linearlayoutitem22'}
              marginTop="4"
              styles={{ root: { marginTop: 4, width: '100%' }, text: {} }}
              listener={listener}
            >
              <WmLabel
                caption={$item.street}
                name="label13"
                id={'repeat_item_' + $index + '_label13'}
                classname="h5"
                listener={listener}
              ></WmLabel>
            </WmLinearlayoutitem>
          </WmLinearlayout>
        </WmLinearlayoutitem>
      </WmLinearlayout>
    </WmListTemplate>
  );
});

const PC_List4 = ({ fragment }) => {
  return (
    <WmList
      listclass="list-group"
      itemclass={(item, index) => 'list-group-item'}
      template="true"
      template-name="Text with Description List"
      itemsperrow={{ xs: 1, sm: 1, md: 1, lg: 1 }}
      statehandler="URL"
      dataset={fragment.Variables.findEmployees.dataSet}
      navigation="Pager"
      direction="vertical"
      title="set1"
      name="list4"
      loadingdata={fragment.Variables.findEmployees.isExecuting}
      classname="media-list"
      listener={fragment}
      itemkey={($item, $index) => fragment.eval(() => $item.picurl)}
      getNextPageData={($event, $list, page) => {
        return new Promise((resolve, reject) => {
          return (
            fragment.Variables.findEmployees.invoke &&
            fragment.Variables.findEmployees.invoke(
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
      <WmLinearlayout
        direction="row"
        horizontalalign="left"
        spacing="12"
        verticalalign="top"
        name="linearlayout6"
        id={'repeat_item_' + $index + '_linearlayout6'}
        styles={{
          root: {
            paddingTop: 12,
            paddingRight: 12,
            paddingBottom: 12,
            paddingLeft: 12,
          },
          text: {},
        }}
        listener={listener}
      >
        <WmLinearlayoutitem
          name="linearlayoutitem13"
          id={'repeat_item_' + $index + '_linearlayoutitem13'}
          listener={listener}
        >
          <WmPicture
            picturesource={$item.picurl}
            shape="circle"
            resizemode="cover"
            name="picture3"
            id={'repeat_item_' + $index + '_picture3'}
            pictureplaceholder="resources/images/imagelists/default-image.png"
            styles={{ root: { height: 58, width: 58 }, text: {} }}
            classname="media-object"
            listener={listener}
          ></WmPicture>
        </WmLinearlayoutitem>
        <WmLinearlayoutitem
          flexgrow={1}
          name="linearlayoutitem14"
          id={'repeat_item_' + $index + '_linearlayoutitem14'}
          marginLeft="12"
          styles={{ root: { marginLeft: 12 }, text: {} }}
          listener={listener}
        >
          <WmLinearlayout
            direction="column"
            spacing="4"
            name="linearlayout7"
            id={'repeat_item_' + $index + '_linearlayout7'}
            listener={listener}
          >
            <WmLinearlayoutitem
              name="linearlayoutitem15"
              id={'repeat_item_' + $index + '_linearlayoutitem15'}
              styles={{ root: { width: '100%' }, text: {} }}
              listener={listener}
            >
              <WmLabel
                caption={$item.firstname}
                name="label8"
                id={'repeat_item_' + $index + '_label8'}
                styles={{
                  root: { fontWeight: 'bold' },
                  text: { fontWeight: 'bold' },
                }}
                classname="h4"
                listener={listener}
              ></WmLabel>
            </WmLinearlayoutitem>
            <WmLinearlayoutitem
              name="linearlayoutitem16"
              id={'repeat_item_' + $index + '_linearlayoutitem16'}
              marginTop="4"
              styles={{ root: { marginTop: 4, width: '100%' }, text: {} }}
              listener={listener}
            >
              <WmLabel
                caption={$item.empId}
                name="label9"
                id={'repeat_item_' + $index + '_label9'}
                styles={{ root: { marginRight: 4, marginLeft: 4 }, text: {} }}
                listener={listener}
              ></WmLabel>
            </WmLinearlayoutitem>
            <WmLinearlayoutitem
              name="linearlayoutitem17"
              id={'repeat_item_' + $index + '_linearlayoutitem17'}
              marginTop="4"
              styles={{ root: { marginTop: 4, width: '100%' }, text: {} }}
              listener={listener}
            >
              <WmLabel
                caption={$item.street}
                name="label10"
                id={'repeat_item_' + $index + '_label10'}
                classname="h5"
                listener={listener}
              ></WmLabel>
            </WmLinearlayoutitem>
          </WmLinearlayout>
        </WmLinearlayoutitem>
      </WmLinearlayout>
    </WmListTemplate>
  );
});

const PC_List3 = ({ fragment }) => {
  return (
    <WmList
      listclass="list-group"
      itemclass={(item, index) => 'list-group-item'}
      template="true"
      template-name="Text with Description List"
      itemsperrow={{ xs: 1, sm: 1, md: 1, lg: 1 }}
      statehandler="URL"
      dataset={fragment.Variables.findEmployees.dataSet}
      navigation="Pager"
      direction="horizontal"
      name="list3"
      title="set2"
      loadingdata={fragment.Variables.findEmployees.isExecuting}
      classname="media-list"
      listener={fragment}
      itemkey={($item, $index) => fragment.eval(() => $item.firstname)}
      getNextPageData={($event, $list, page) => {
        return new Promise((resolve, reject) => {
          return (
            fragment.Variables.findEmployees.invoke &&
            fragment.Variables.findEmployees.invoke(
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
      <PC_List4 fragment={fragment} />
      <PC_List3 fragment={fragment} />
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

export default class WMS23776Page extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('WMS23776-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('WMS23776-styleOverrides', styleOverrides);
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
