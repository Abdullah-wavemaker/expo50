import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePrefab from '@wavemaker/app-rn-runtime/runtime/base-prefab.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmComposite from '@wavemaker/app-rn-runtime/components/input/composite/composite.component';
import WmContainer from '@wavemaker/app-rn-runtime/components/container/container.component';
import WmLabel from '@wavemaker/app-rn-runtime/components/basic/label/label.component';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import WmPrefabContainer from '@wavemaker/app-rn-runtime/components/prefab/prefab-container.component';
import WmSelect from '@wavemaker/app-rn-runtime/components/input/select/select.component';
import { PartialServiceImpl } from '@wavemaker/app-rn-runtime/runtime/services/partial.service';

import defaultProps from './Main.props';
import partialConfig from '../../partials/partial-config';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPrefabScript from './Main.script';
import styles from './Main.style';
import getVariables from './Main.variables';

const FragmentContext = React.createContext();

const PC_Prefab_container1 = ({ fragment }) => {
  return (
    <WmPrefabContainer
      name="prefab_container1"
      listener={fragment}
      showskeleton={
        fragment.App.isSkeletonEnabled() && !fragment.startUpVariablesLoaded
      }
    >
      <WmContainer
        name="container1"
        showindevice={['md', 'lg']}
        content="webpartial"
        listener={fragment}
        renderPartial={(props, onLoad) => (
          <WmPartialContainer
            onLoad={onLoad}
            showindevice={['md', 'lg']}
            listener={fragment}
            name={props.name + '_partial_container'}
            partial_name={props.name + '_partial'}
            content={props.content}
            serviceDefinitions={fragment.serviceDefinitions}
            parentWatcher={fragment.watcher}
            prefab={fragment.prefab || fragment}
            themeToUse={fragment.theme}
          />
        )}
      ></WmContainer>
      <WmContainer
        name="container2"
        showindevice={['xs']}
        content="mobilePartial"
        listener={fragment}
        renderPartial={(props, onLoad) => (
          <WmPartialContainer
            onLoad={onLoad}
            showindevice={['xs']}
            listener={fragment}
            name={props.name + '_partial_container'}
            partial_name={props.name + '_partial'}
            content={props.content}
            serviceDefinitions={fragment.serviceDefinitions}
            parentWatcher={fragment.watcher}
            prefab={fragment.prefab || fragment}
            themeToUse={fragment.theme}
          />
        )}
      ></WmContainer>
      <WmComposite name="composite1" listener={fragment}>
        <WmLabel
          name="label1"
          classname="col-md-3 control-label"
          listener={fragment}
        ></WmLabel>
        <WmContainer name="container3" classname="col-md-9" listener={fragment}>
          <WmSelect
            name="select1"
            dataset={fragment.Variables.staticVariable1.dataSet}
            datafield="dataValue"
            displayfield="dataValue"
            listener={fragment}
          ></WmSelect>
        </WmContainer>
      </WmComposite>
    </WmPrefabContainer>
  );
};

export default class MainPrefab extends BasePrefab {
  components;

  constructor(props) {
    super(props, defaultProps, new PartialServiceImpl(partialConfig));
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('Main-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('Main-styleOverrides', styleOverrides);
    }
  }

  evalDynamicProps() {
    const _this = this.proxy;
  }

  init() {
    const data = getVariables(this.proxy);
    this.fragmentVariables = data.Variables;
    this.fragmentActions = data.Actions;
    this.Variables = Object.assign(this.Variables, data.Variables);
    this.Actions = Object.assign(this.Actions, data.Actions);
    this.startUpVariables = ['serviceVariable1'];
    this.startUpActions = [];
    this.autoUpdateVariables = ['serviceVariable1'];
    addPrefabScript(this.App, this.proxy);
  }

  provideAsset = path => this.handleUrl(path);

  componentDidMount() {
    this.getServiceDefinitions().then(defs => {
      this.serviceDefinitions = defs;
      this.init();
      super.componentDidMount();
      super.onFragmentReady();
    });
  }

  handleUrl(url) {
    return (
      this.App.handleUrl(url) ||
      ResourceResolver.resolve(url, this.resourceBaseUrl) ||
      super.handleUrl(url)
    );
  }

  renderPrefab() {
    this.evalDynamicProps();
    const fragment = this.proxy;
    return (
      <FragmentContext.Provider value={this.proxy}>
        <AssetProvider value={this.provideAsset}>
          <PC_Prefab_container1 fragment={fragment} />
        </AssetProvider>
      </FragmentContext.Provider>
    );
  }
}
