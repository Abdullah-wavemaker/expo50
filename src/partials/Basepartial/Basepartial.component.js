import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePartial from '@wavemaker/app-rn-runtime/runtime/base-partial.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmPartial from '@wavemaker/app-rn-runtime/components/page/partial/partial.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPartialScript from './Basepartial.script';
import styles from './Basepartial.style';
import getVariables from './Basepartial.variables';

const FragmentContext = React.createContext();

const PC_Wm_partial_e365egfe16 = ({ fragment }) => {
  return (
    <WmPartial
      name="wm_partial_e365egfe16"
      listener={fragment}
      showskeleton={
        fragment.App.isSkeletonEnabled() && !fragment.startUpVariablesLoaded
      }
    ></WmPartial>
  );
};

export default class BasepartialPartial extends BasePartial {
  components;

  constructor(props) {
    super(props);
    this.pageParams = this.state.props;
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('Basepartial-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new(
        'Basepartial-styleOverrides',
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
    this.startUpVariables = [];
    this.startUpActions = [];
    this.autoUpdateVariables = [];
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
          <PC_Wm_partial_e365egfe16 fragment={fragment} />
        </AssetProvider>
      </FragmentContext.Provider>
    );
  }
}
