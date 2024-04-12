import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmButton from '@wavemaker/app-rn-runtime/components/basic/button/button.component';
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
import WmPicture from '@wavemaker/app-rn-runtime/components/basic/picture/picture.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './listMethods.script';
import styles from './listMethods.style';
import getVariables from './listMethods.variables';

const FragmentContext = React.createContext();

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
        name="linearlayout5"
        id={'repeat_item_' + $index + '_linearlayout5'}
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
          name="linearlayoutitem12"
          id={'repeat_item_' + $index + '_linearlayoutitem12'}
          listener={listener}
        >
          <WmPicture
            name="Picture"
            picturesource={$item.imgSrc}
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
          name="linearlayoutitem13"
          id={'repeat_item_' + $index + '_linearlayoutitem13'}
          marginLeft="12"
          styles={{ root: { marginLeft: 12 }, text: {} }}
          listener={listener}
        >
          <WmLinearlayout
            direction="column"
            name="linearlayout6"
            id={'repeat_item_' + $index + '_linearlayout6'}
            listener={listener}
          >
            <WmLinearlayoutitem
              name="linearlayoutitem14"
              id={'repeat_item_' + $index + '_linearlayoutitem14'}
              styles={{ root: { width: '100%' }, text: {} }}
              listener={listener}
            >
              <WmLabel
                name="Title"
                caption={$item.name}
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
              name="linearlayoutitem15"
              id={'repeat_item_' + $index + '_linearlayoutitem15'}
              marginTop="12"
              styles={{ root: { marginTop: 12, width: '100%' }, text: {} }}
              listener={listener}
            >
              <WmLabel
                name="SubTitle"
                caption={$item.Designation}
                id={'repeat_item_' + $index + '_SubTitle'}
                classname="h5"
                listener={listener}
              ></WmLabel>
            </WmLinearlayoutitem>
          </WmLinearlayout>
        </WmLinearlayoutitem>
        <WmLinearlayoutitem
          name="linearlayoutitem16"
          id={'repeat_item_' + $index + '_linearlayoutitem16'}
          marginLeft="12"
          styles={{ root: { marginLeft: 12, width: 25 }, text: {} }}
          listener={listener}
        >
          <WmIcon
            iconclass="wi wi-more-vert"
            iconsize={22}
            name="icon1"
            id={'repeat_item_' + $index + '_icon1'}
            listener={listener}
          ></WmIcon>
        </WmLinearlayoutitem>
      </WmLinearlayout>
    </WmListTemplate>
  );
});

const PC_Testmenulist1 = ({ fragment }) => {
  return (
    <WmList
      listclass="list-group"
      itemclass={(item, index) => 'list-group-item'}
      template="true"
      template-name="Text with Avatar List"
      itemsperrow={{ xs: 1, sm: 1, md: 1, lg: 1 }}
      statehandler="URL"
      name="testMenuList1"
      dataset={fragment.Variables.chips.dataSet}
      navigation="Pager"
      selectfirstitem={true}
      loadingdata={fragment.Variables.chips.isExecuting}
      classname="media-list"
      listener={fragment}
      getNextPageData={($event, $list, page) => {
        return new Promise((resolve, reject) => {
          return (
            fragment.Variables.chips.invoke &&
            fragment.Variables.chips.invoke(
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
      <PC_Testmenulist1 fragment={fragment} />
      <WmLinearlayout
        direction="row"
        spacing="4"
        name="linearlayout1"
        styles={{
          root: {
            paddingTop: 4,
            paddingRight: 4,
            paddingBottom: 4,
            paddingLeft: 4,
          },
          text: {},
        }}
        listener={fragment}
      >
        <WmLinearlayoutitem
          flexgrow={1}
          name="linearlayoutitem2"
          listener={fragment}
        >
          <WmLinearlayout
            direction="column"
            name="linearlayout2"
            listener={fragment}
          >
            <WmLinearlayoutitem
              flexgrow={1}
              name="linearlayoutitem4"
              styles={{ root: { width: '100%' }, text: {} }}
              listener={fragment}
            >
              <WmButton
                caption="select item"
                type="button"
                name="button1"
                onTap={($event, widget) => {
                  fragment.button1Tap($event, widget);
                }}
                classname="btn-primary"
                listener={fragment}
              ></WmButton>
            </WmLinearlayoutitem>
            <WmLinearlayoutitem
              flexgrow={1}
              name="linearlayoutitem5"
              marginTop="4"
              styles={{ root: { marginTop: 4, width: '100%' }, text: {} }}
              listener={fragment}
            >
              <WmButton
                caption="get item"
                type="button"
                onTap={($event, widget) => {
                  fragment.button2Tap($event, widget);
                }}
                name="button2"
                classname="btn-primary"
                listener={fragment}
              ></WmButton>
            </WmLinearlayoutitem>
            <WmLinearlayoutitem
              name="linearlayoutitem6"
              flexgrow={1}
              marginTop="4"
              styles={{ root: { marginTop: 4, width: '100%' }, text: {} }}
              listener={fragment}
            >
              <WmButton
                caption="deselect item"
                type="button"
                onTap={($event, widget) => {
                  fragment.button3Tap($event, widget);
                }}
                name="button3"
                classname="btn-primary"
                listener={fragment}
              ></WmButton>
            </WmLinearlayoutitem>
            <WmLinearlayoutitem
              name="linearlayoutitem5_1"
              flexgrow={1}
              marginTop="4"
              styles={{ root: { marginTop: 4, width: '100%' }, text: {} }}
              listener={fragment}
            >
              <WmButton
                caption="get widgets with index"
                type="button"
                onTap={($event, widget) => {
                  fragment.button4Tap($event, widget);
                }}
                name="button4"
                classname="btn-primary"
                listener={fragment}
              ></WmButton>
            </WmLinearlayoutitem>
            <WmLinearlayoutitem
              name="linearlayoutitem11"
              flexgrow={1}
              marginTop="4"
              styles={{ root: { marginTop: 4, width: '100%' }, text: {} }}
              listener={fragment}
            >
              <WmButton
                caption="get widgets without index"
                type="button"
                onTap={($event, widget) => {
                  fragment.button5Tap($event, widget);
                }}
                name="button5"
                classname="btn-primary"
                listener={fragment}
              ></WmButton>
            </WmLinearlayoutitem>
            <WmLinearlayoutitem
              name="linearlayoutitem12_1"
              flexgrow={1}
              marginTop="4"
              styles={{ root: { marginTop: 4, width: '100%' }, text: {} }}
              listener={fragment}
            >
              <WmButton
                caption="clear"
                type="button"
                onTap={($event, widget) => {
                  fragment.button6Tap($event, widget);
                }}
                name="button6"
                classname="btn-primary"
                listener={fragment}
              ></WmButton>
            </WmLinearlayoutitem>
            <WmLinearlayoutitem
              name="linearlayoutitem13_1"
              flexgrow={1}
              marginTop="4"
              styles={{ root: { marginTop: 4, width: '100%' }, text: {} }}
              listener={fragment}
            >
              <WmLinearlayout
                direction="row"
                name="linearlayout5_1"
                listener={fragment}
              >
                <WmLinearlayoutitem
                  flexgrow={1}
                  name="linearlayoutitem14_1"
                  listener={fragment}
                >
                  <WmButton
                    caption="select item = 1"
                    type="button"
                    onTap={($event, widget) => {
                      fragment.button7Tap($event, widget);
                    }}
                    name="button7"
                    classname="btn-primary"
                    listener={fragment}
                  ></WmButton>
                </WmLinearlayoutitem>
                <WmLinearlayoutitem
                  flexgrow={1}
                  name="linearlayoutitem15_1"
                  marginLeft="4"
                  styles={{ root: { marginLeft: 4 }, text: {} }}
                  listener={fragment}
                >
                  <WmButton
                    caption="change caption"
                    type="button"
                    onTap={($event, widget) => {
                      fragment.button8Tap($event, widget);
                    }}
                    name="button8"
                    classname="btn-primary"
                    listener={fragment}
                  ></WmButton>
                </WmLinearlayoutitem>
              </WmLinearlayout>
            </WmLinearlayoutitem>
          </WmLinearlayout>
        </WmLinearlayoutitem>
      </WmLinearlayout>
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

export default class listMethodsPage extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('listMethods-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new(
        'listMethods-styleOverrides',
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
    this.startUpVariables = ['EmployeesList'];
    this.startUpActions = [];
    this.autoUpdateVariables = ['EmployeesList'];
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
