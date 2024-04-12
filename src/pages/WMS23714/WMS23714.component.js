import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmAppNavbar from '@wavemaker/app-rn-runtime/components/navigation/appnavbar/appnavbar.component';
import WmButton from '@wavemaker/app-rn-runtime/components/basic/button/button.component';
import WmContent from '@wavemaker/app-rn-runtime/components/page/content/content.component';
import WmFileupload from '@wavemaker/app-rn-runtime/components/input/fileupload/fileupload.component';
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
import WmPicture from '@wavemaker/app-rn-runtime/components/basic/picture/picture.component';
import WmTabbar from '@wavemaker/app-rn-runtime/components/page/tabbar/tabbar.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './WMS23714.script';
import styles from './WMS23714.style';
import getVariables from './WMS23714.variables';

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

const Listtemplate2 = React.memo(({ $item, $index, list, fragment }) => {
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
      name="listtemplate2"
      id={'list_item_' + $index + '_listtemplate2'}
      listener={listener}
    >
      <WmLinearlayout
        direction="row"
        horizontalalign="left"
        spacing="12"
        verticalalign="center"
        name="linearlayout3"
        id={'repeat_item_' + $index + '_linearlayout3'}
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
          name="linearlayoutitem6"
          id={'repeat_item_' + $index + '_linearlayoutitem6'}
          listener={listener}
        >
          <WmPicture
            name="Picture"
            picturesource={$item.inlinePath}
            shape="circle"
            resizemode="cover"
            id={'repeat_item_' + $index + '_Picture'}
            pictureplaceholder="resources/images/imagelists/default-image.png"
            styles={{ root: { height: 58, width: 58 }, text: {} }}
            classname="media-object"
            listener={listener}
          ></WmPicture>
        </WmLinearlayoutitem>
        <WmLinearlayoutitem
          flexgrow={1}
          name="linearlayoutitem7"
          id={'repeat_item_' + $index + '_linearlayoutitem7'}
          marginLeft="12"
          styles={{ root: { marginLeft: 12 }, text: {} }}
          listener={listener}
        >
          <WmLinearlayout
            direction="column"
            name="linearlayout4"
            id={'repeat_item_' + $index + '_linearlayout4'}
            listener={listener}
          >
            <WmLinearlayoutitem
              name="linearlayoutitem8"
              id={'repeat_item_' + $index + '_linearlayoutitem8'}
              styles={{ root: { width: '100%' }, text: {} }}
              listener={listener}
            >
              <WmLabel
                name="Title"
                caption={$item.path}
                id={'repeat_item_' + $index + '_Title'}
                styles={{
                  root: { fontWeight: 'bold' },
                  text: { fontWeight: 'bold' },
                }}
                classname="h4"
                listener={listener}
              ></WmLabel>
            </WmLinearlayoutitem>
            <WmLinearlayoutitem
              name="linearlayoutitem9"
              id={'repeat_item_' + $index + '_linearlayoutitem9'}
              marginTop="12"
              styles={{ root: { marginTop: 12, width: '100%' }, text: {} }}
              listener={listener}
            >
              <WmLabel
                name="SubTitle"
                caption={$item.name}
                id={'repeat_item_' + $index + '_SubTitle'}
                classname="h5"
                listener={listener}
              ></WmLabel>
            </WmLinearlayoutitem>
          </WmLinearlayout>
        </WmLinearlayoutitem>
        <WmLinearlayoutitem
          name="linearlayoutitem10"
          id={'repeat_item_' + $index + '_linearlayoutitem10'}
          marginLeft="12"
          styles={{ root: { marginLeft: 12, width: 25 }, text: {} }}
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
    </WmListTemplate>
  );
});

const PC_Listfileslist1 = ({ fragment }) => {
  return (
    <WmList
      listclass="list-group"
      itemclass={(item, index) => 'list-group-item'}
      template="true"
      template-name="Text with Avatar List"
      itemsperrow={{ xs: 1, sm: 1, md: 1, lg: 1 }}
      statehandler="URL"
      name="listFilesList1"
      dataset={fragment.Variables.listFiles.dataSet}
      navigation="Pager"
      loadingdata={fragment.Variables.listFiles.isExecuting}
      classname="media-list"
      listener={fragment}
      getNextPageData={($event, $list, page) => {
        return new Promise((resolve, reject) => {
          return (
            fragment.Variables.listFiles.invoke &&
            fragment.Variables.listFiles.invoke(
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
          <Listtemplate2
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
      <WmFileupload
        cleariconclass="wi wi-clear"
        cleariconhint="Clear"
        name="fileupload1"
        contenttype="image"
        onSelect={() => {
          fragment.Variables.FileServiceUploadFile.invoke();
        }}
        listener={fragment}
      ></WmFileupload>
      <WmButton
        caption="Button"
        type="button"
        name="button1"
        onTap={() => {
          fragment.Variables.getDownloadFile.invoke();
        }}
        classname="btn-default"
        listener={fragment}
      ></WmButton>
      <WmButton
        caption="Button"
        type="button"
        name="button2"
        onTap={() => {
          fragment.Variables.deleteFile.invoke();
        }}
        classname="btn-default"
        listener={fragment}
      ></WmButton>
      <PC_Listfileslist1 fragment={fragment} />
      <WmFileupload
        cleariconclass="wi wi-clear"
        cleariconhint="Clear"
        name="fileupload2"
        contenttype="image"
        onSelect={() => {
          fragment.Variables.FileServiceUploadFile1.invoke();
        }}
        listener={fragment}
      ></WmFileupload>
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

export default class WMS23714Page extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('WMS23714-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('WMS23714-styleOverrides', styleOverrides);
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
    this.autoUpdateVariables = ['deleteFile', 'getDownloadFile', 'listFiles'];
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
