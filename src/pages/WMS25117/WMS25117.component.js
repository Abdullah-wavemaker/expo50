import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmButton from '@wavemaker/app-rn-runtime/components/basic/button/button.component';
import WmComposite from '@wavemaker/app-rn-runtime/components/input/composite/composite.component';
import WmContainer from '@wavemaker/app-rn-runtime/components/container/container.component';
import WmContent from '@wavemaker/app-rn-runtime/components/page/content/content.component';
import WmGridcolumn from '@wavemaker/app-rn-runtime/components/container/layoutgrid/gridcolumn/gridcolumn.component';
import WmGridrow from '@wavemaker/app-rn-runtime/components/container/layoutgrid/gridrow/gridrow.component';
import WmLabel from '@wavemaker/app-rn-runtime/components/basic/label/label.component';
import WmLayoutgrid from '@wavemaker/app-rn-runtime/components/container/layoutgrid/layoutgrid.component';
import WmList from '@wavemaker/app-rn-runtime/components/data/list/list.component';
import WmListTemplate from '@wavemaker/app-rn-runtime/components/data/list/list-template/list-template.component';
import WmNumber from '@wavemaker/app-rn-runtime/components/input/number/number.component';
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import WmPopover from '@wavemaker/app-rn-runtime/components/navigation/popover/popover.component';
import WmSelect from '@wavemaker/app-rn-runtime/components/input/select/select.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './WMS25117.script';
import styles from './WMS25117.style';
import getVariables from './WMS25117.variables';

const FragmentContext = React.createContext();

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
      classname="m-b-10 m-b-0-rnc p-b-0-rnc border-bottom-0-rnc"
      listener={listener}
    >
      <WmLayoutgrid
        name="contributionsPanelGrid"
        id={'repeat_item_' + $index + '_contributionsPanelGrid'}
        classname="p-6-rnc"
        listener={listener}
      >
        <WmGridrow
          name="gridrow1"
          id={'repeat_item_' + $index + '_gridrow1'}
          classname="p-6-rnc-row"
          listener={listener}
        >
          <WmGridcolumn
            columnwidth={12}
            name="gridcolumn34_2"
            xscolumnwidth={12}
            id={'repeat_item_' + $index + '_gridcolumn34_2'}
            classname="p-6-rnc-cell p-t-5 p-b-5 p-l-10"
            listener={listener}
          >
            <WmLabel
              caption={$item.sourceType}
              name="lblSourceName"
              hint={$item.sourceType}
              id={'repeat_item_' + $index + '_lblSourceName'}
              classname="label-18 f-sans-semibold"
              listener={listener}
            ></WmLabel>
            <WmPopover
              name="popoverResponsive"
              iconclass="wi wi-info m-b-27 text-default m-l-5"
              content="popoverRespPartial"
              caption=""
              popoverplacement="right"
              hint={fragment.Prefab.appLocale.Change_Future_Paycheck_Type_Label}
              interaction="click"
              show={false}
              id={'repeat_item_' + $index + '_popoverResponsive'}
              listener={listener}
              renderPartial={(props, onLoad) => (
                <WmPartialContainer
                  onLoad={onLoad}
                  iconclass="wi wi-info m-b-27 text-default m-l-5"
                  caption=""
                  popoverplacement="right"
                  hint={
                    fragment.Prefab.appLocale.Change_Future_Paycheck_Type_Label
                  }
                  interaction="click"
                  id={'repeat_item_' + $index + '_popoverResponsive'}
                  listener={listener}
                  name={props.name + '_partial_container'}
                  partial_name={props.name + '_partial'}
                  content={props.content}
                  serviceDefinitions={fragment.serviceDefinitions}
                  parentWatcher={fragment.watcher}
                  themeToUse={fragment.theme}
                />
              )}
            ></WmPopover>
          </WmGridcolumn>
        </WmGridrow>
        <WmContainer
          name="container18_1"
          id={'repeat_item_' + $index + '_container18_1'}
          classname="app-panel panel no-shadow p-10 paycheck-contributions-panel light-grey-panel m-b-0-rnc no-shadow-rnc"
          listener={listener}
        >
          <WmGridrow
            name="gridrow15_1"
            id={'repeat_item_' + $index + '_gridrow15_1'}
            listener={listener}
          >
            <WmGridcolumn
              columnwidth={3}
              name="gridcolumn35_1"
              xscolumnwidth={3}
              id={'repeat_item_' + $index + '_gridcolumn35_1'}
              classname="col-xs-3 text-center"
              listener={listener}
            >
              <WmLabel
                name="lblMethodName"
                caption={
                  fragment.Prefab.appLocale.Change_Future_Paycheck_Method_Label
                }
                hint={
                  fragment.Prefab.appLocale.Change_Future_Paycheck_Method_Label
                }
                id={'repeat_item_' + $index + '_lblMethodName'}
                classname="f-sans-bold label-14-rnc"
                listener={listener}
              ></WmLabel>
            </WmGridcolumn>
            <WmGridcolumn
              columnwidth={3}
              name="gridcolumn36_2"
              xscolumnwidth={3}
              id={'repeat_item_' + $index + '_gridcolumn36_2'}
              classname="col-xs-3 text-center"
              listener={listener}
            >
              <WmLabel
                name="lblCurrent"
                caption={
                  fragment.Prefab.appLocale.Change_Future_Paycheck_Current_Label
                }
                hint={
                  fragment.Prefab.appLocale.Change_Future_Paycheck_Current_Label
                }
                id={'repeat_item_' + $index + '_lblCurrent'}
                classname="f-sans-bold label-14-rnc"
                listener={listener}
              ></WmLabel>
            </WmGridcolumn>
            <WmGridcolumn
              columnwidth={6}
              name="gridcolumn37_1"
              xscolumnwidth={6}
              id={'repeat_item_' + $index + '_gridcolumn37_1'}
              classname="app-container contribution-percentage-container col-xs-6 text-right"
              listener={listener}
            >
              <WmLabel
                name="lblNewContribution"
                caption={
                  fragment.Prefab.appLocale
                    .Change_Future_Paycheck_New_Contrib_Label
                }
                hint={
                  fragment.Prefab.appLocale
                    .Change_Future_Paycheck_New_Contrib_Label
                }
                id={'repeat_item_' + $index + '_lblNewContribution'}
                classname="f-sans-bold label-14-rnc"
                listener={listener}
              ></WmLabel>
            </WmGridcolumn>
          </WmGridrow>
          <WmGridrow
            name="gridrow15_2"
            id={'repeat_item_' + $index + '_gridrow15_2'}
            listener={listener}
          >
            <WmGridcolumn
              columnwidth={3}
              name="gridcolumn34_1"
              xscolumnwidth={3}
              id={'repeat_item_' + $index + '_gridcolumn34_1'}
              classname="col-xs-3 text-center"
              listener={listener}
            >
              <WmLabel
                name="methodLabel"
                caption={
                  $item.currentContributionMethodType.key == 'A' ? '$' : '%'
                }
                show={
                  $item.showContributionMethodTypeDropdown === false
                    ? true
                    : false
                }
                hint={
                  $item.currentContributionMethodType.key == 'A' ? '$' : '%'
                }
                id={'repeat_item_' + $index + '_methodLabel'}
                classname="label-14-rnc"
                listener={listener}
              ></WmLabel>
              <WmContainer
                name="container18"
                id={'repeat_item_' + $index + '_container18'}
                classname="paycheck-dropdown-container"
                listener={listener}
              >
                <WmSelect
                  name="mobContributionMethodSelect"
                  datavalue={$item.currentContributionMethodType.value}
                  dataset={
                    fragment.Variables.stvContributionMethodsList.dataSet
                  }
                  datafield="shortDescription"
                  show={$item.showContributionMethodTypeDropdown}
                  displayfield="shortDescription"
                  hint={
                    fragment.Widgets.stvPaycheckContributionsList
                      .currentItemWidgets.contributionMethodSelect.displayValue
                  }
                  id={'repeat_item_' + $index + '_mobContributionMethodSelect'}
                  classname="f-sans-bold bg-white width-62 tax-pay-select"
                  listener={listener}
                  onChange={($event, widget, newVal, oldVal) => {
                    if (!false || fragment.Variables.null.twoWayBinding) {
                      $item.currentContributionMethodType.value = newVal;
                    }
                    fragment.mobContributionMethodSelectChange(
                      $event,
                      widget,
                      item,
                      currentItemWidgets,
                      newVal,
                      oldVal
                    );
                  }}
                ></WmSelect>
              </WmContainer>
            </WmGridcolumn>
            <WmGridcolumn
              columnwidth={3}
              name="gridcolumn35"
              xscolumnwidth={3}
              id={'repeat_item_' + $index + '_gridcolumn35'}
              classname="col-xs-3 text-center"
              listener={listener}
            >
              <WmLabel
                name="lblCurrentContribution"
                caption={
                  $item.currentContributionMethodType.key == 'A'
                    ? fragment.formatters
                        .get('toCurrency')
                        .format(
                          $item.currentContributionAmount,
                          fragment.Prefab.commonparams.currencypattern,
                          '2',
                          $item
                        )
                    : fragment.formatters
                        .get('suffix')
                        .format(
                          fragment.formatters
                            .get('numberToString')
                            .format($item.currentContributionRate, '2', $item),
                          '%',
                          $item
                        )
                }
                hint={
                  $item.currentContributionMethodType.key == 'A'
                    ? fragment.formatters
                        .get('toCurrency')
                        .format(
                          $item.currentContributionAmount,
                          fragment.Prefab.commonparams.currencypattern,
                          '2',
                          $item
                        )
                    : fragment.formatters
                        .get('suffix')
                        .format(
                          fragment.formatters
                            .get('numberToString')
                            .format($item.currentContributionRate, '2', $item),
                          '%',
                          $item
                        )
                }
                id={'repeat_item_' + $index + '_lblCurrentContribution'}
                classname="label-14-rnc"
                listener={listener}
              ></WmLabel>
            </WmGridcolumn>
            <WmGridcolumn
              columnwidth={6}
              name="gridcolumn36_1"
              xscolumnwidth={6}
              id={'repeat_item_' + $index + '_gridcolumn36_1'}
              classname="app-container text-right col-xs-6 d-flex-rnc d-flex-align-end-rnc"
              listener={listener}
            >
              <WmContainer
                name="amountContainer"
                show={$item.currentContributionMethodType.key == 'A'}
                id={'repeat_item_' + $index + '_amountContainer'}
                classname={
                  'text-right ' +
                  (fragment.Widgets.fieldLevelOffErrorContainer.show
                    ? 'amount-error-input-xs '
                    : '')
                }
                listener={listener}
              >
                <WmLabel
                  caption={fragment.Prefab.commonparams.currencySymbol}
                  name="newContributionAmountLabel"
                  hint={fragment.Prefab.commonparams.currencySymbol}
                  id={'repeat_item_' + $index + '_newContributionAmountLabel'}
                  classname="contribution-dollar-label autodollar-label"
                  listener={listener}
                ></WmLabel>
                <WmNumber
                  name="amountTextBox"
                  placeholder=""
                  datavalue={fragment.toNumber($item.newContributionAmount)}
                  updateon="default"
                  onBlur={($event, widget) => {
                    fragment.amountTextBoxBlur(
                      $event,
                      widget,
                      $item,
                      currentItemWidgets
                    );
                  }}
                  hint={
                    fragment.Widgets.stvPaycheckContributionsList
                      .currentItemWidgets.amountTextBox.displayValue
                  }
                  id={'repeat_item_' + $index + '_amountTextBox'}
                  classname="d-inline-block form-control app-textbox ng-pristine ng-untouched ng-valid horizontal-align-right amountnumber width-86px auto-escpercentage-number-input m-b-0 form-control app-textbox width-110"
                  listener={listener}
                  onChange={($event, widget, newVal, oldVal) => {
                    if (!false || fragment.Variables.null.twoWayBinding) {
                      $item.newContributionAmount = newVal;
                    }
                    fragment.amountTextBoxChange(
                      $event,
                      widget,
                      item,
                      currentItemWidgets,
                      newVal,
                      oldVal
                    );
                  }}
                ></WmNumber>
                <WmContainer
                  name="fieldLevelOffErrorContainer"
                  show={
                    fragment.Prefab.Variables.stvfieldleveloffflag.dataSet
                      .dataValue
                  }
                  id={'repeat_item_' + $index + '_fieldLevelOffErrorContainer'}
                  classname="alert-msg-container"
                  listener={listener}
                >
                  <WmLabel
                    name="fieldLeveloffErrorLabel"
                    hint={
                      fragment.Prefab.appLocale
                        .ErrorMessage_PaycheckContributions
                    }
                    caption={
                      fragment.Prefab.appLocale
                        .ErrorMessage_PaycheckContributions
                    }
                    id={'repeat_item_' + $index + '_fieldLeveloffErrorLabel'}
                    classname="p-t-2 p-r-8  text-danger"
                    listener={listener}
                  ></WmLabel>
                </WmContainer>
              </WmContainer>
              <WmContainer
                name="percentageContainer"
                show={$item.currentContributionMethodType.key != 'A'}
                id={'repeat_item_' + $index + '_percentageContainer'}
                classname={
                  'contribution-percentage-container text-right ' +
                  (fragment.Widgets.percentageFieldLevelOffErrorContainer.show
                    ? 'percent-error-input-xs '
                    : '')
                }
                listener={listener}
              >
                <WmContainer
                  name="percentInputContainer"
                  id={'repeat_item_' + $index + '_percentInputContainer'}
                  listener={listener}
                >
                  <WmNumber
                    name="percentageTextBox"
                    placeholder=""
                    updateon="default"
                    datavalue={fragment.toNumber($item.newContributionRate)}
                    onBlur={($event, widget) => {
                      fragment.percentageTextBoxBlur(
                        $event,
                        widget,
                        $item,
                        currentItemWidgets
                      );
                    }}
                    hint={
                      fragment.Widgets.stvPaycheckContributionsList
                        .currentItemWidgets.percentageTextBox.displayValue
                    }
                    id={'repeat_item_' + $index + '_percentageTextBox'}
                    classname="horizontal-align-right percentnumber app-textbox ng-pristine ng-untouched ng-valid width-86px auto-escpercentage-number-input m-b-0 form-control app-textbox width-110 horizontal-align-center"
                    listener={listener}
                    onChange={($event, widget, newVal, oldVal) => {
                      if (!false || fragment.Variables.null.twoWayBinding) {
                        $item.newContributionRate = newVal;
                      }
                      fragment.percentageTextBoxChange(
                        $event,
                        widget,
                        item,
                        currentItemWidgets,
                        newVal,
                        oldVal
                      );
                    }}
                  ></WmNumber>
                </WmContainer>
                <WmContainer
                  name="percentageFieldLevelOffErrorContainer"
                  show={
                    fragment.Prefab.Variables.stvfieldleveloffflag.dataSet
                      .dataValue
                  }
                  id={
                    'repeat_item_' +
                    $index +
                    '_percentageFieldLevelOffErrorContainer'
                  }
                  classname="alert-msg-container"
                  listener={listener}
                >
                  <WmLabel
                    name="percentageFieldLeveloffErrorLabel"
                    hint={
                      fragment.Prefab.appLocale
                        .ErrorMessage_PaycheckContributions
                    }
                    caption={
                      fragment.Prefab.appLocale
                        .ErrorMessage_PaycheckContributions
                    }
                    id={
                      'repeat_item_' +
                      $index +
                      '_percentageFieldLeveloffErrorLabel'
                    }
                    classname="p-t-2 p-r-8  text-danger"
                    listener={listener}
                  ></WmLabel>
                </WmContainer>
                <WmLabel
                  name="newContributionPercentageLabel"
                  caption={fragment.Prefab.appLocale.percentSymbol}
                  hint={fragment.Prefab.appLocale.percentSymbol}
                  id={
                    'repeat_item_' + $index + '_newContributionPercentageLabel'
                  }
                  classname="contribution-percentage-label setauto-percentage-label"
                  listener={listener}
                ></WmLabel>
              </WmContainer>
              <WmLabel
                name="errorLabel"
                caption=""
                show={false}
                hint={fragment.Prefab.appLocale.errorStatusMsg}
                id={'repeat_item_' + $index + '_errorLabel'}
                classname="contr-percent-error-label text-danger"
                listener={listener}
              ></WmLabel>
            </WmGridcolumn>
          </WmGridrow>
        </WmContainer>
      </WmLayoutgrid>
    </WmListTemplate>
  );
});

const PC_Mobfuturepaychecklist = ({ fragment }) => {
  return (
    <WmList
      listclass="list-group"
      itemclass={(item, index) => 'list-group-item p-10 r-10 m-b-10 p-0-rnc'}
      template="true"
      template-name="Media List"
      itemsperrow={{ xs: 1, sm: 1, md: 1, lg: 1 }}
      statehandler="URL"
      dataset={
        fragment.Variables.stvPaycheckContributions.dataSet
          .paycheckContributions
      }
      navigation="None"
      name="mobFuturePaycheckList"
      loadingdata={fragment.Variables.stvPaycheckContributions.isExecuting}
      classname="media-list m-t-10 contribution-list"
      listener={fragment}
      getNextPageData={($event, $list, page) => {
        return new Promise((resolve, reject) => {
          return (
            fragment.Variables.stvPaycheckContributions.invoke &&
            fragment.Variables.stvPaycheckContributions.invoke(
              {
                page: page,
              },
              response => {
                resolve(response.paycheckContributions);
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
      <PC_Mobfuturepaychecklist fragment={fragment} />
      <WmButton
        caption="Reset"
        type="button"
        name="button1"
        onTap={($event, widget) => {
          fragment.button1Tap($event, widget);
        }}
        classname="btn-default"
        listener={fragment}
      ></WmButton>
      <WmLabel
        name="label12"
        caption={fragment.formatters
          .get('prefix')
          .format(fragment.Variables.stvTotalData.dataSet.amountTotal, '$')}
        listener={fragment}
      ></WmLabel>
      <WmLabel
        name="label13"
        caption={fragment.formatters
          .get('suffix')
          .format(fragment.Variables.stvTotalData.dataSet.percentageTotal, '%')}
        listener={fragment}
      ></WmLabel>
      <WmContainer
        name="container9"
        styles={{
          root: {
            marginTop: 10,
            marginRight: 10,
            marginBottom: 10,
            marginLeft: 10,
            paddingTop: 10,
            paddingRight: 10,
            paddingBottom: 10,
            paddingLeft: 10,
          },
          text: {},
        }}
        listener={fragment}
      >
        <WmComposite name="composite2" listener={fragment}>
          <WmLabel
            name="label15"
            classname="col-xs-4 control-label"
            listener={fragment}
          ></WmLabel>
          <WmContainer
            name="container10"
            classname="col-xs-8"
            listener={fragment}
          >
            <WmNumber
              name="amountTextBox1"
              updateon="default"
              onChange={($event, widget, newVal, oldVal) => {
                fragment.amountTextBox1Change($event, widget, newVal, oldVal);
              }}
              onBlur={($event, widget) => {
                fragment.amountTextBox1Blur($event, widget);
              }}
              styles={{
                root: { textAlign: 'right' },
                text: { textAlign: 'right' },
              }}
              listener={fragment}
            ></WmNumber>
          </WmContainer>
        </WmComposite>
        <WmComposite name="composite3" listener={fragment}>
          <WmLabel
            name="label16"
            classname="col-xs-4 control-label"
            listener={fragment}
          ></WmLabel>
          <WmContainer
            name="container11"
            classname="col-xs-8"
            listener={fragment}
          >
            <WmNumber
              name="percentageTextBox1"
              updateon="default"
              onChange={($event, widget, newVal, oldVal) => {
                fragment.percentageTextBox1Change(
                  $event,
                  widget,
                  newVal,
                  oldVal
                );
              }}
              onBlur={($event, widget) => {
                fragment.percentageTextBox1Blur($event, widget);
              }}
              styles={{
                root: { textAlign: 'right' },
                text: { textAlign: 'right' },
              }}
              listener={fragment}
            ></WmNumber>
          </WmContainer>
        </WmComposite>
        <WmLabel
          name="label17"
          caption={fragment.formatters
            .get('prefix')
            .format(fragment.Variables.stvTotalData1.dataSet.amountTotal, '$')}
          listener={fragment}
        ></WmLabel>
        <WmLabel
          name="label18"
          caption={fragment.formatters
            .get('suffix')
            .format(
              fragment.Variables.stvTotalData1.dataSet.percentageTotal,
              '%'
            )}
          listener={fragment}
        ></WmLabel>
      </WmContainer>
      <WmLabel name="label18_1" listener={fragment}></WmLabel>
    </WmPageContent>
  );
};

const PC_Page1 = ({ fragment }) => {
  return (
    <WmPage name="page1" listener={fragment}>
      <WmContent name="content1" listener={fragment}>
        <PC_Page_content1 fragment={fragment} />
      </WmContent>
    </WmPage>
  );
};

export default class WMS25117Page extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('WMS25117-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('WMS25117-styleOverrides', styleOverrides);
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
