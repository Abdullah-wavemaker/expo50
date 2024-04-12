import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmAppNavbar from '@wavemaker/app-rn-runtime/components/navigation/appnavbar/appnavbar.component';
import WmCarousel from '@wavemaker/app-rn-runtime/components/advanced/carousel/carousel.component';
import WmCarouselTemplate from '@wavemaker/app-rn-runtime/components/advanced/carousel/carousel-template/carousel-template.component';
import WmComposite from '@wavemaker/app-rn-runtime/components/input/composite/composite.component';
import WmContainer from '@wavemaker/app-rn-runtime/components/container/container.component';
import WmContent from '@wavemaker/app-rn-runtime/components/page/content/content.component';
import WmLabel from '@wavemaker/app-rn-runtime/components/basic/label/label.component';
import WmLeftPanel from '@wavemaker/app-rn-runtime/components/page/left-panel/left-panel.component';
import WmLinearlayout from '@wavemaker/app-rn-runtime/components/container/linearlayout/linearlayout.component';
import WmLinearlayoutitem from '@wavemaker/app-rn-runtime/components/container/linearlayout/linearlayoutitem/linearlayoutitem.component';
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import WmPicture from '@wavemaker/app-rn-runtime/components/basic/picture/picture.component';
import WmPopover from '@wavemaker/app-rn-runtime/components/navigation/popover/popover.component';
import WmSwitch from '@wavemaker/app-rn-runtime/components/input/switch/switch.component';
import WmTabbar from '@wavemaker/app-rn-runtime/components/page/tabbar/tabbar.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './temp.script';
import styles from './temp.style';
import getVariables from './temp.variables';

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

const Carousel_template3 = React.memo(
  ({ $item, $index, carousel, fragment }) => {
    const item = $item;
    const [currentItemWidgets] = React.useState({});
    carousel.itemWidgets = carousel.itemWidgets || [];
    carousel.itemWidgets[$index] = currentItemWidgets;
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
      <WmCarouselTemplate
        name="carousel_template3"
        id={'carousel_item_' + $index + '_carousel_template3'}
        styles={{
          root: {
            textAlign: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
          },
          text: { textAlign: 'center' },
        }}
        listener={listener}
      >
        <WmContainer
          name="container5"
          id={'repeat_item_' + $index + '_container5'}
          styles={{
            root: {
              backgroundColor: '#fff',
              height: '100%',
              paddingTop: 8,
              paddingRight: 8,
              paddingBottom: 8,
              paddingLeft: 8,
              width: '100%',
            },
            text: {},
          }}
          classname="app-elevated-container slide-container1"
          listener={listener}
        >
          <WmLinearlayout
            direction="column"
            spacing="12"
            name="linearlayout5_1"
            id={'repeat_item_' + $index + '_linearlayout5_1'}
            styles={{
              root: {
                height: '100%',
                paddingTop: 4,
                paddingRight: 4,
                paddingBottom: 4,
                paddingLeft: 4,
              },
              text: {},
            }}
            listener={listener}
          >
            <WmLinearlayoutitem
              name="linearlayoutitem15_1"
              flexgrow={1}
              id={'repeat_item_' + $index + '_linearlayoutitem15_1'}
              styles={{
                root: {
                  textAlign: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  width: '100%',
                },
                text: { textAlign: 'center' },
              }}
              listener={listener}
            >
              <WmPicture
                resizemode="cover"
                shape="circle"
                picturesource={$item.picture.thumbnail}
                name="picture3"
                onTap={($event, widget) => {
                  fragment.picture3Tap($event, widget);
                }}
                id={'repeat_item_' + $index + '_picture3'}
                pictureplaceholder="resources/images/imagelists/default-image.png"
                styles={{ root: { height: 64, width: 64 }, text: {} }}
                listener={listener}
              ></WmPicture>
            </WmLinearlayoutitem>
            <WmLinearlayoutitem
              flexgrow={1}
              name="linearlayoutitem16_1"
              id={'repeat_item_' + $index + '_linearlayoutitem16_1'}
              marginTop="12"
              styles={{ root: { marginTop: 12, width: '100%' }, text: {} }}
              listener={listener}
            >
              <WmLinearlayout
                direction="column"
                spacing="4"
                name="linearlayout6"
                id={'repeat_item_' + $index + '_linearlayout6'}
                listener={listener}
              >
                <WmLinearlayoutitem
                  flexgrow={0}
                  name="linearlayoutitem17_1"
                  id={'repeat_item_' + $index + '_linearlayoutitem17_1'}
                  styles={{
                    root: {
                      textAlign: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                      width: '100%',
                    },
                    text: { textAlign: 'center' },
                  }}
                  listener={listener}
                >
                  <WmLabel
                    caption={$item.name.title}
                    name="label10"
                    onTap={($event, widget) => {
                      fragment.label10Tap($event, widget);
                    }}
                    id={'repeat_item_' + $index + '_label10'}
                    styles={{
                      root: {
                        color: '#4056b1',
                        fontSize: 12,
                        textAlign: 'center',
                        width: '100%',
                      },
                      text: {
                        color: '#4056b1',
                        fontSize: 12,
                        textAlign: 'center',
                      },
                    }}
                    listener={listener}
                  ></WmLabel>
                </WmLinearlayoutitem>
                <WmLinearlayoutitem
                  flexgrow={0}
                  name="linearlayoutitem19"
                  id={'repeat_item_' + $index + '_linearlayoutitem19'}
                  marginTop="4"
                  styles={{
                    root: {
                      textAlign: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                      marginTop: 4,
                      width: '100%',
                    },
                    text: { textAlign: 'center' },
                  }}
                  listener={listener}
                >
                  <WmLabel
                    caption={$item.name.first + ' ' + $item.name.last}
                    name="label11"
                    id={'repeat_item_' + $index + '_label11'}
                    styles={{
                      root: {
                        fontSize: 10,
                        fontStyle: 'italic',
                        textAlign: 'center',
                        width: '100%',
                      },
                      text: {
                        fontSize: 10,
                        fontStyle: 'italic',
                        textAlign: 'center',
                      },
                    }}
                    listener={listener}
                  ></WmLabel>
                </WmLinearlayoutitem>
              </WmLinearlayout>
            </WmLinearlayoutitem>
          </WmLinearlayout>
        </WmContainer>
      </WmCarouselTemplate>
    );
  }
);

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
      <WmContainer
        name="container1"
        onTap={($event, widget) => {
          fragment.container1Tap($event, widget);
        }}
        styles={{
          root: {
            backgroundColor: '#00ffc8',
            height: 40,
            paddingTop: 4,
            paddingRight: 4,
            paddingBottom: 4,
            paddingLeft: 4,
            width: 120,
          },
          text: {},
        }}
        listener={fragment}
      >
        <WmContainer
          name="container2"
          onTap={($event, widget) => {
            fragment.container2Tap($event, widget);
            fragment.$event.stopPropagation();
          }}
          styles={{
            root: { backgroundColor: '#ff0000', height: 20, width: 80 },
            text: {},
          }}
          listener={fragment}
        ></WmContainer>
      </WmContainer>
      <WmCarousel
        type="dynamic"
        dataset={fragment.Variables.people.dataSet}
        controls="indicators"
        name="carousel3"
        animation="none"
        styles={{ root: { height: 200 }, text: {} }}
        classname="new-carousel1"
        listener={fragment}
        renderSlide={($item, $index, carousel) => {
          const item = $item;
          const currentItemWidgets = [];
          return (
            <Carousel_template3
              $item={$item}
              $index={$index}
              carousel={carousel}
              fragment={fragment}
            />
          );
        }}
      ></WmCarousel>
      <WmComposite name="composite1" listener={fragment}>
        <WmLabel
          name="label3"
          classname="col-xs-4 control-label"
          listener={fragment}
        ></WmLabel>
        <WmContainer name="container4" classname="col-xs-8" listener={fragment}>
          <WmSwitch
            datavalue="yes"
            name="switch1"
            classname="pull-right"
            listener={fragment}
          ></WmSwitch>
        </WmContainer>
      </WmComposite>
      <WmPopover
        popoverwidth="240"
        popoverheight="360"
        name="popover1"
        styles={{ root: { marginRight: 4, marginLeft: 4 }, text: {} }}
        listener={fragment}
      ></WmPopover>
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

export default class tempPage extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('temp-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('temp-styleOverrides', styleOverrides);
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
