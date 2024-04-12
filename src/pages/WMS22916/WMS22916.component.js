import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmAppNavbar from '@wavemaker/app-rn-runtime/components/navigation/appnavbar/appnavbar.component';
import WmCard from '@wavemaker/app-rn-runtime/components/data/card/card.component';
import WmCardContent from '@wavemaker/app-rn-runtime/components/data/card/card-content/card-content.component';
import WmContent from '@wavemaker/app-rn-runtime/components/page/content/content.component';
import WmIcon from '@wavemaker/app-rn-runtime/components/basic/icon/icon.component';
import WmLabel from '@wavemaker/app-rn-runtime/components/basic/label/label.component';
import WmLeftPanel from '@wavemaker/app-rn-runtime/components/page/left-panel/left-panel.component';
import WmLinearlayout from '@wavemaker/app-rn-runtime/components/container/linearlayout/linearlayout.component';
import WmLinearlayoutitem from '@wavemaker/app-rn-runtime/components/container/linearlayout/linearlayoutitem/linearlayoutitem.component';
import WmList from '@wavemaker/app-rn-runtime/components/data/list/list.component';
import WmListTemplate from '@wavemaker/app-rn-runtime/components/data/list/list-template/list-template.component';
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import WmTabbar from '@wavemaker/app-rn-runtime/components/page/tabbar/tabbar.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './WMS22916.script';
import styles from './WMS22916.style';
import getVariables from './WMS22916.variables';

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
      layout="media"
      name="listtemplate4"
      id={'list_item_' + $index + '_listtemplate4'}
      classname="list-card-template "
      listener={listener}
    >
      <WmCard
        name="card2"
        id={'repeat_item_' + $index + '_card2'}
        listener={listener}
      >
        <WmCardContent
          name="card_content2"
          id={'repeat_item_' + $index + '_card_content2'}
          styles={{
            root: {
              paddingTop: 24,
              paddingRight: 24,
              paddingBottom: 24,
              paddingLeft: 24,
            },
            text: {},
          }}
          listener={listener}
        >
          <WmLinearlayout
            direction="column"
            horizontalalign="left"
            verticalalign="center"
            name="linearlayout3"
            id={'repeat_item_' + $index + '_linearlayout3'}
            listener={listener}
          >
            <WmLinearlayoutitem
              name="linearlayoutitem7"
              id={'repeat_item_' + $index + '_linearlayoutitem7'}
              styles={{ root: { width: '100%' }, text: {} }}
              listener={listener}
            >
              <WmLinearlayout
                direction="row"
                spacing="15"
                verticalalign="center"
                name="linearlayout4"
                id={'repeat_item_' + $index + '_linearlayout4'}
                listener={listener}
              >
                <WmLinearlayoutitem
                  flexgrow={1}
                  name="linearlayoutitem8"
                  id={'repeat_item_' + $index + '_linearlayoutitem8'}
                  listener={listener}
                >
                  <WmLabel
                    name="Title"
                    caption={$item.name}
                    id={'repeat_item_' + $index + '_Title'}
                    styles={{
                      root: {
                        fontWeight: 'bold',
                        marginTop: 0,
                        marginRight: 0,
                        marginBottom: 0,
                        marginLeft: 0,
                      },
                      text: { fontWeight: 'bold' },
                    }}
                    classname="h4"
                    listener={listener}
                  ></WmLabel>
                </WmLinearlayoutitem>
                <WmLinearlayoutitem
                  name="linearlayoutitem9"
                  id={'repeat_item_' + $index + '_linearlayoutitem9'}
                  marginLeft="15"
                  styles={{ root: { marginLeft: 15, width: 25 }, text: {} }}
                  listener={listener}
                >
                  <WmIcon
                    iconclass="wi wi-more-vert"
                    iconsize={22}
                    name="icon2"
                    id={'repeat_item_' + $index + '_icon2'}
                    listener={listener}
                  ></WmIcon>
                </WmLinearlayoutitem>
              </WmLinearlayout>
            </WmLinearlayoutitem>
            <WmLinearlayoutitem
              name="linearlayoutitem10"
              id={'repeat_item_' + $index + '_linearlayoutitem10'}
              styles={{ root: { width: '100%' }, text: {} }}
              listener={listener}
            >
              <WmLabel
                name="SubTitle"
                caption={$item.budget}
                id={'repeat_item_' + $index + '_SubTitle'}
                styles={{
                  root: {
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0,
                    marginLeft: 0,
                  },
                  text: {},
                }}
                classname="h5"
                listener={listener}
              ></WmLabel>
            </WmLinearlayoutitem>
            <WmLinearlayoutitem
              name="linearlayoutitem11"
              id={'repeat_item_' + $index + '_linearlayoutitem11'}
              styles={{ root: { paddingTop: 18, width: '100%' }, text: {} }}
              listener={listener}
            >
              <WmLabel
                name="Description_Heading"
                caption="Description:"
                id={'repeat_item_' + $index + '_Description_Heading'}
                styles={{
                  root: {
                    fontWeight: 'bold',
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0,
                    marginLeft: 0,
                  },
                  text: { fontWeight: 'bold' },
                }}
                classname="h5"
                listener={listener}
              ></WmLabel>
            </WmLinearlayoutitem>
            <WmLinearlayoutitem
              name="linearlayoutitem12"
              id={'repeat_item_' + $index + '_linearlayoutitem12'}
              styles={{ root: { paddingTop: 4, width: '100%' }, text: {} }}
              listener={listener}
            >
              <WmLabel
                name="Description"
                caption={$item.location}
                id={'repeat_item_' + $index + '_Description'}
                styles={{
                  root: {
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0,
                    marginLeft: 0,
                  },
                  text: {},
                }}
                classname="h5"
                listener={listener}
              ></WmLabel>
            </WmLinearlayoutitem>
          </WmLinearlayout>
        </WmCardContent>
      </WmCard>
    </WmListTemplate>
  );
});

const PC_List4 = ({ fragment }) => {
  return (
    <WmList
      listclass="list-group"
      template="true"
      template-name="Text Card"
      itemsperrow={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      statehandler="URL"
      navigation="Basic"
      dataset={fragment.Variables.findDepartments.firstRecord}
      name="list4"
      loadingdata={fragment.Variables.findDepartments.isExecuting}
      classname="list-card"
      listener={fragment}
      getNextPageData={($event, $list, page) => {
        return new Promise((resolve, reject) => {
          return (
            fragment.Variables.findDepartments.invoke &&
            fragment.Variables.findDepartments.invoke(
              {
                page: page,
              },
              response => {
                resolve(fragment.Variables.findDepartments.firstRecord);
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
        name="label1"
        caption={fragment.Variables.serviceVariable2.lastRecord.name}
        classname="text-success"
        listener={fragment}
      ></WmLabel>
      <WmLabel
        name="label2"
        caption={fragment.Variables.serviceVariable2.firstRecord.location}
        classname="text-danger"
        listener={fragment}
      ></WmLabel>
      <WmLabel
        caption={fragment.Variables.serviceVariable2.lastRecord.name}
        name="label3"
        classname="text-warning"
        listener={fragment}
      ></WmLabel>
      <WmLabel
        caption={fragment.Variables.serviceVariable2.firstRecord.location}
        name="label4 "
        classname="text-info"
        listener={fragment}
      ></WmLabel>
      <WmLabel
        caption={fragment.Variables.findDepartments.firstRecord.name}
        name="label11"
        classname="text-info"
        listener={fragment}
      ></WmLabel>
      <PC_List4 fragment={fragment} />
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
        name="mobile_tabbar1 "
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

export default class WMS22916Page extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('WMS22916-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('WMS22916-styleOverrides', styleOverrides);
    }
  }

  init() {
    const data = getVariables(this.proxy);
    this.fragmentVariables = data.Variables;
    this.fragmentActions = data.Actions;
    this.Variables = Object.assign(this.Variables, data.Variables);
    this.Actions = Object.assign(this.Actions, data.Actions);
    this.startUpVariables = ['findDepartments'];
    this.startUpActions = [];
    this.autoUpdateVariables = ['findDepartments'];
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
