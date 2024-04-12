import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmCarousel from '@wavemaker/app-rn-runtime/components/advanced/carousel/carousel.component';
import WmCarouselContent from '@wavemaker/app-rn-runtime/components/advanced/carousel/carousel-content/carousel-content.component';
import WmCarouselTemplate from '@wavemaker/app-rn-runtime/components/advanced/carousel/carousel-template/carousel-template.component';
import WmContent from '@wavemaker/app-rn-runtime/components/page/content/content.component';
import WmLeftPanel from '@wavemaker/app-rn-runtime/components/page/left-panel/left-panel.component';
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import WmPicture from '@wavemaker/app-rn-runtime/components/basic/picture/picture.component';
import WmTabbar from '@wavemaker/app-rn-runtime/components/page/tabbar/tabbar.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './WMS23986.script';
import styles from './WMS23986.style';
import getVariables from './WMS23986.variables';

const FragmentContext = React.createContext();

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
            height: 480,
            textAlign: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
          },
          text: { textAlign: 'center' },
        }}
        listener={listener}
      >
        <WmPicture
          name="picture6"
          picturesource={$item.picurl}
          resizemode="contain"
          id={'repeat_item_' + $index + '_picture6'}
          pictureplaceholder="resources/images/imagelists/default-image.png"
          styles={{ root: { height: 400, width: 400 }, text: {} }}
          listener={listener}
        ></WmPicture>
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
      <WmCarousel
        name="carousel3"
        styles={{ root: { height: 480 }, text: {} }}
        listener={fragment}
      >
        <WmCarouselContent name="carousel_content1" listener={fragment}>
          <WmPicture
            name="picture3"
            picturesource="resources/images/logos/Other/download.jpeg"
            resizemode="contain"
            pictureplaceholder="resources/images/imagelists/default-image.png"
            styles={{ root: { height: 400, width: 400 }, text: {} }}
            listener={fragment}
          ></WmPicture>
        </WmCarouselContent>
        <WmCarouselContent name="carousel_content2" listener={fragment}>
          <WmPicture
            name="picture4"
            picturesource="resources/images/imagelists/mrbean2.jpeg"
            resizemode="contain"
            pictureplaceholder="resources/images/imagelists/default-image.png"
            styles={{ root: { height: 400, width: 400 }, text: {} }}
            listener={fragment}
          ></WmPicture>
        </WmCarouselContent>
        <WmCarouselContent name="carousel_content3" listener={fragment}>
          <WmPicture
            name="picture5"
            picturesource="resources/images/imagelists/mrbean3.jpeg"
            resizemode="contain"
            pictureplaceholder="resources/images/imagelists/default-image.png"
            styles={{ root: { height: 400, width: 400 }, text: {} }}
            listener={fragment}
          ></WmPicture>
        </WmCarouselContent>
      </WmCarousel>
      <WmCarousel
        type="dynamic"
        name="carousel4"
        dataset={fragment.Variables.findEmployees.dataSet}
        styles={{ root: { height: 480 }, text: {} }}
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

export default class WMS23986Page extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('WMS23986-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('WMS23986-styleOverrides', styleOverrides);
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
