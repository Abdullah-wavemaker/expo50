import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmAnchor from '@wavemaker/app-rn-runtime/components/basic/anchor/anchor.component';
import WmAppNavbar from '@wavemaker/app-rn-runtime/components/navigation/appnavbar/appnavbar.component';
import WmButton from '@wavemaker/app-rn-runtime/components/basic/button/button.component';
import WmContent from '@wavemaker/app-rn-runtime/components/page/content/content.component';
import WmGridcolumn from '@wavemaker/app-rn-runtime/components/container/layoutgrid/gridcolumn/gridcolumn.component';
import WmGridrow from '@wavemaker/app-rn-runtime/components/container/layoutgrid/gridrow/gridrow.component';
import WmLayoutgrid from '@wavemaker/app-rn-runtime/components/container/layoutgrid/layoutgrid.component';
import WmLeftPanel from '@wavemaker/app-rn-runtime/components/page/left-panel/left-panel.component';
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import WmTabbar from '@wavemaker/app-rn-runtime/components/page/tabbar/tabbar.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './Main.script';
import styles from './Main.style';
import getVariables from './Main.variables';

const FragmentContext = React.createContext();

const PC_Mobile_navbar1 = ({ fragment }) => {
  return (
    <WmAppNavbar
      name="mobile_navbar1"
      title="Title"
      backbutton={false}
      onBackbtnclick={() => {
        fragment.goBack();
      }}
      onDrawerbuttonpress={() => {
        fragment.toggleDrawer();
      }}
      listener={fragment}
      showDrawerButton={fragment.hasDrawer}
    >
      <WmAnchor
        caption=""
        name="AddLink"
        iconclass="wi wi-gear"
        classname="navbarAnchorItem"
        listener={fragment}
      ></WmAnchor>
    </WmAppNavbar>
  );
};

const PC_Page_content1 = ({ fragment }) => {
  return (
    <WmPageContent
      columnwidth={12}
      name="page_content1"
      styles={{ root: { backgroundColor: '#39e1fd' }, text: {} }}
      listener={fragment}
      showskeleton={
        fragment.App.isSkeletonEnabled() && !fragment.startUpVariablesLoaded
      }
    >
      <WmLayoutgrid name="layoutgrid2" listener={fragment}>
        <WmGridrow name="gridrow1" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn1"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS21425"
              type="button"
              name="button7"
              onTap={() => {
                fragment.Actions.goToPage_WMS21425.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn2"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS22550"
              type="button"
              name="button10"
              onTap={() => {
                fragment.Actions.goToPage_WMS22550.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow3" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn5"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS22706"
              type="button"
              name="button8"
              onTap={() => {
                fragment.Actions.goToPage_WMS22706WMS22042.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn6"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS22042"
              type="button"
              name="button11"
              onTap={() => {
                fragment.Actions.goToPage_WMS22706WMS22042.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow4" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn7"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS22823"
              type="button"
              name="button9"
              onTap={() => {
                fragment.Actions.goToPage_WMS22823.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn8"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS22999"
              type="button"
              name="button12"
              onTap={() => {
                fragment.Actions.goToPage_WMS22999WMS23781.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow5" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn9"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS23781"
              type="button"
              name="button6"
              onTap={() => {
                fragment.Actions.goToPage_WMS22999WMS23781.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn10"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS23269"
              type="button"
              name="button13"
              onTap={() => {
                fragment.Actions.goToPage_WMS23269WMS23196.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow2" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn3"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS23196"
              type="button"
              name="button14"
              onTap={() => {
                fragment.Actions.goToPage_WMS23269WMS23196.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn4"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS23597"
              type="button"
              name="button15"
              onTap={() => {
                fragment.Actions.goToPage_WMS23597.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow6" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn11"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS23736"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS23736.invoke();
              }}
              name="button16"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn12"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS23765"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS23765.invoke();
              }}
              name="button17"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow7" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn13"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS23776"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS23776.invoke();
              }}
              name="button18"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn14"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS23695"
              type="button"
              name="button19"
              onTap={() => {
                fragment.Actions.goToPage_WMS23695.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow8" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn15"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS22687"
              type="button"
              name="button20"
              onTap={() => {
                fragment.Actions.goToPage_WMS22687.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn16"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS22670"
              type="button"
              name="button21"
              onTap={() => {
                fragment.Actions.goToPage_WMS22670WMS23987.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow9" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn17"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS22860"
              type="button"
              name="button22"
              onTap={() => {
                fragment.Actions.goToPage_WMS22860.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn18"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS22987"
              type="button"
              name="button23"
              onTap={() => {
                fragment.Actions.goToPage_WMS22987.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow10" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn19"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS23986"
              type="button"
              name="button24"
              onTap={() => {
                fragment.Actions.goToPage_WMS23986.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn20"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS22916"
              type="button"
              name="button25"
              onTap={() => {
                fragment.Actions.goToPage_WMS22916.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow11" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn21"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS22337"
              type="button"
              name="button26"
              onTap={() => {
                fragment.Actions.goToPage_WMS22337.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn22"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS22288"
              type="button"
              name="button27"
              onTap={() => {
                fragment.Actions.goToPage_WMS22288.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow12" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn23"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS23809"
              type="button"
              name="button28"
              onTap={() => {
                fragment.Actions.goToPage_WMS23809.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn24"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS23714"
              type="button"
              name="button29"
              onTap={() => {
                fragment.Actions.goToPage_WMS23714.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow13" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn25"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS21922"
              type="button"
              name="button30"
              onTap={() => {
                fragment.Actions.goToPage_WMS21922WMS22688.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn26"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS22575"
              type="button"
              name="button31"
              onTap={() => {
                fragment.Actions.goToPage_WMS22575.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow14" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn27"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS22682"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS22682WMS22124.invoke();
              }}
              name="button27_1"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn28"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS22124"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS22682WMS22124.invoke();
              }}
              name="button28_1"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow15" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn29"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS24032"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS24032.invoke();
              }}
              name="button29_1"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn30"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS23195"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS23195.invoke();
              }}
              name="button30_1"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow16" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn31"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS23794"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS23794.invoke();
              }}
              name="button31_1"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn32"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS24579"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS24579.invoke();
              }}
              name="button32"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow17" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn33"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="number"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_DecimalsForCurrency.invoke();
              }}
              name="button33"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn34"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="Dates"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_Dates.invoke();
              }}
              name="button34"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow18" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn35"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS22045"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS22045.invoke();
              }}
              name="button35"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn36"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS24931"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS24931.invoke();
              }}
              name="button36"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow19" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn37"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS24937"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS24937.invoke();
              }}
              name="button37"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn38"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS24973"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS24973.invoke();
              }}
              name="button38"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow20" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn39"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS24974"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS24974.invoke();
              }}
              name="button39"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn40"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS24937part2"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS24937part2.invoke();
              }}
              name="button40"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow21" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn41"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="list methods"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_listMethods.invoke();
              }}
              name="button41"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn42"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS25100"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS25100.invoke();
              }}
              name="button42"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow22" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn43"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS25101"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS25101.invoke();
              }}
              name="button43"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn44"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS25083"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS25083.invoke();
              }}
              name="button44"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow23" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn45"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS25115"
              type="button"
              name="button45"
              onTap={() => {
                fragment.Actions.goToPage_WMS25115.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn46"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS25117"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS25117.invoke();
              }}
              name="button46"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow24" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn47"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS25138"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS25138.invoke();
              }}
              name="button47"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn48"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS25139"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS25139.invoke();
              }}
              name="button48"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow25" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn49"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="FIS test"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_FIS_Test.invoke();
              }}
              name="button49"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn50"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS25161"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS25161.invoke();
              }}
              name="button50"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow26" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn51"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS25170"
              type="button"
              name="button51"
              onTap={() => {
                fragment.Actions.goToPage_WMS25170.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn52"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS25160"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS25160.invoke();
              }}
              name="button52"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow27" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn53"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS25174 + 75"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS25174WMS25175.invoke();
              }}
              name="button53"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn54"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS25176"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS25176.invoke();
              }}
              name="button54"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow29" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn57"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS25229"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS25229.invoke();
              }}
              name="button55"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn58"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="EV test"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_EV_test.invoke();
              }}
              name="button56"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow29_1" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn57_1"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS25351"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS25351.invoke();
              }}
              name="button57"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn58_1"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS25352"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS25352.invoke();
              }}
              name="button58"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow30" listener={fragment}>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn59"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS25370"
              type="button"
              name="button59"
              onTap={() => {
                fragment.Actions.goToPage_WMS25370.invoke();
              }}
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
          <WmGridcolumn
            columnwidth={6}
            name="gridcolumn60"
            xscolumnwidth={6}
            listener={fragment}
          >
            <WmButton
              caption="WMS-25421"
              type="button"
              onTap={() => {
                fragment.Actions.goToPage_WMS25421.invoke();
              }}
              name="button60"
              styles={{ root: { width: '100%' }, text: {} }}
              classname="btn-default"
              listener={fragment}
            ></WmButton>
          </WmGridcolumn>
        </WmGridrow>
      </WmLayoutgrid>
    </WmPageContent>
  );
};

const PC_Mainpage = ({ fragment }) => {
  return (
    <WmPage name="mainpage" cache={false} listener={fragment}>
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

export default class MainPage extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('Main-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('Main-styleOverrides', styleOverrides);
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
          <PC_Mainpage fragment={fragment} />
        </AssetProvider>
      </FragmentContext.Provider>
    );
  }
}
