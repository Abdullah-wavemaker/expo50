import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmAppNavbar from '@wavemaker/app-rn-runtime/components/navigation/appnavbar/appnavbar.component';
import WmComposite from '@wavemaker/app-rn-runtime/components/input/composite/composite.component';
import WmContainer from '@wavemaker/app-rn-runtime/components/container/container.component';
import WmContent from '@wavemaker/app-rn-runtime/components/page/content/content.component';
import WmForm from '@wavemaker/app-rn-runtime/components/data/form/form.component';
import WmFormAction from '@wavemaker/app-rn-runtime/components/data/form/form-action/form-action.component';
import WmFormBody from '@wavemaker/app-rn-runtime/components/data/form/form-body/form-body.component';
import WmFormField from '@wavemaker/app-rn-runtime/components/data/form/form-field/form-field.component';
import WmFormFooter from '@wavemaker/app-rn-runtime/components/data/form/form-footer/form-footer.component';
import WmGridcolumn from '@wavemaker/app-rn-runtime/components/container/layoutgrid/gridcolumn/gridcolumn.component';
import WmGridrow from '@wavemaker/app-rn-runtime/components/container/layoutgrid/gridrow/gridrow.component';
import WmLabel from '@wavemaker/app-rn-runtime/components/basic/label/label.component';
import WmLayoutgrid from '@wavemaker/app-rn-runtime/components/container/layoutgrid/layoutgrid.component';
import WmLeftPanel from '@wavemaker/app-rn-runtime/components/page/left-panel/left-panel.component';
import WmNumber from '@wavemaker/app-rn-runtime/components/input/number/number.component';
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import WmRadioset from '@wavemaker/app-rn-runtime/components/input/radioset/radioset.component';
import WmTabbar from '@wavemaker/app-rn-runtime/components/page/tabbar/tabbar.component';
import WmText from '@wavemaker/app-rn-runtime/components/input/text/text.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './WMS22977.script';
import styles from './WMS22977.style';
import getVariables from './WMS22977.variables';

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

const PC_Employee_city = ({ fragment }) => {
  return (
    <WmFormField
      name="Employee_city"
      readonly={false}
      displayname="City"
      type="string"
      show={true}
      widget="text"
      inputtype="text"
      formRef="createEmployeeForm1"
      primaryKey="undefined"
      isRelated="undefined"
      onChange={($event, widget, newVal, oldVal) => {
        fragment.Widgets.createEmployeeForm1 &&
          fragment.Widgets.createEmployeeForm1.props.onChange &&
          fragment.Widgets.createEmployeeForm1.props.onChange(
            $event,
            widget,
            newVal,
            oldVal
          );
      }}
      onValidate={widget => {
        widget.validateFormField.call(widget);
      }}
      formKey="Employee.city"
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="Employee_city_formLabel"
            classname="form-label Employee_city_formLabel"
            listener={fragment}
          ></WmLabel>
          <WmText
            type="text"
            name="Employee_city"
            formfieldname="Employee_city"
            formfield="true"
            memoize="false"
            required={$formField.required}
            regexp={$formField.regexp}
            validationmessage={$formField.validationmessage}
            datavalue={$formField.defaultvalue}
            disabled={$formField.disabled}
            readonly={$formField.readonly}
            placeholder="Enter value"
            updateon={$formField.updateon || 'blur'}
            maxchars={fragment.toNumber($formField.maxchars)}
            classname="form-input form-text form-Employee_city-input"
            listener={fragment}
          ></WmText>
        </>
      )}
    ></WmFormField>
  );
};

const PC_Employee_deptid = ({ fragment }) => {
  return (
    <WmFormField
      name="Employee_deptId"
      readonly={false}
      displayname="Dept Id"
      type="integer"
      show={true}
      widget="number"
      inputtype="number"
      formRef="createEmployeeForm1"
      primaryKey="undefined"
      isRelated="undefined"
      onChange={($event, widget, newVal, oldVal) => {
        fragment.Widgets.createEmployeeForm1 &&
          fragment.Widgets.createEmployeeForm1.props.onChange &&
          fragment.Widgets.createEmployeeForm1.props.onChange(
            $event,
            widget,
            newVal,
            oldVal
          );
      }}
      onValidate={widget => {
        widget.validateFormField.call(widget);
      }}
      formKey="Employee.deptId"
      styles={{ root: { textAlign: 'right' }, text: { textAlign: 'right' } }}
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="Employee_deptId_formLabel"
            classname="form-label Employee_deptId_formLabel"
            listener={fragment}
          ></WmLabel>
          <WmNumber
            name="Employee_deptId"
            formfieldname="Employee_deptId"
            formfield="true"
            memoize="false"
            required={$formField.required}
            regexp={$formField.regexp}
            validationmessage={$formField.validationmessage}
            datavalue={fragment.toNumber($formField.defaultvalue)}
            disabled={$formField.disabled}
            readonly={$formField.readonly}
            placeholder="Enter value"
            updateon={$formField.updateon || 'blur'}
            minvalue={fragment.toNumber($formField.minvalue)}
            maxvalue={fragment.toNumber($formField.maxvalue)}
            classname="form-input form-number form-Employee_deptId-input"
            listener={fragment}
          ></WmNumber>
        </>
      )}
    ></WmFormField>
  );
};

const PC_Value = ({ fragment }) => {
  return (
    <WmFormField
      name="value"
      displayname="Value"
      show={true}
      widget="radioset"
      dataset={fragment.Variables.boolean.dataSet}
      datafield="All Fields"
      displayfield="dataValue"
      formRef="createEmployeeForm1"
      primaryKey="undefined"
      isRelated="undefined"
      isDataSetBound={true}
      onChange={($event, widget, newVal, oldVal) => {
        fragment.Widgets.createEmployeeForm1 &&
          fragment.Widgets.createEmployeeForm1.props.onChange &&
          fragment.Widgets.createEmployeeForm1.props.onChange(
            $event,
            widget,
            newVal,
            oldVal
          );
      }}
      onValidate={widget => {
        widget.validateFormField.call(widget);
      }}
      formKey="value"
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="value_formLabel"
            classname="form-label value_formLabel"
            listener={fragment}
          ></WmLabel>
          <WmRadioset
            name="value"
            formfieldname="value"
            formfield="true"
            memoize="false"
            required={$formField.required}
            regexp={$formField.regexp}
            validationmessage={$formField.validationmessage}
            datavalue={$formField.defaultvalue}
            disabled={$formField.disabled}
            readonly={$formField.readonly}
            dataset={$formField.dataset || 'Option 1, Option 2, Option 3'}
            displayfield={$formField.displayfield}
            datafield={$formField.datafield}
            classname="form-input form-radioset form-value-input"
            listener={fragment}
            renderitempartial={(item, index, partialName) => {
              return (
                <WmPartialContainer
                  parentWatcher={fragment.watcher}
                  themeToUse={fragment.theme}
                  content={partialName}
                  item={item}
                  listener={fragment}
                />
              );
            }}
          ></WmRadioset>
        </>
      )}
    ></WmFormField>
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
      <WmComposite name="composite1" listener={fragment}>
        <WmLabel
          name="label1"
          classname="col-xs-4 control-label"
          listener={fragment}
        ></WmLabel>
        <WmContainer name="container1" classname="col-xs-8" listener={fragment}>
          <WmRadioset
            name="radioset1"
            dataset={fragment.Variables.boolean.dataSet}
            datafield="All Fields"
            displayfield="dataValue"
            listener={fragment}
            renderitempartial={(item, index, partialName) => {
              return (
                <WmPartialContainer
                  parentWatcher={fragment.watcher}
                  themeToUse={fragment.theme}
                  content={partialName}
                  item={item}
                  listener={fragment}
                />
              );
            }}
          ></WmRadioset>
        </WmContainer>
      </WmComposite>
      <WmForm
        errormessage=""
        captionposition="top"
        title="Form"
        enctype="application/x-www-form-urlencoded"
        method="post"
        dataset={fragment.Variables.testVariable.dataSet}
        captionalign="left"
        name="createEmployeeForm1"
        listener={fragment}
        onChange={($event, widget, newVal, oldVal) => {
          if (
            fragment.Variables.testVariable?.twoWayBinding &&
            newVal !== oldVal
          ) {
            fragment.Variables.testVariable.dataSet[widget.props.name] = newVal;
          }
        }}
        formSubmit={(formData, success, error) => {
          fragment.Variables.testVariable &&
            fragment.Variables.testVariable.invoke(formData, success, error);
        }}
      >
        <WmFormBody name="wm_form_body_aha9cif2c0" listener={fragment}>
          <WmLayoutgrid columns="1" name="layoutgrid1" listener={fragment}>
            <WmGridrow name="gridrow2" listener={fragment}>
              <WmComposite name="composite2" listener={fragment}>
                <WmLabel
                  caption="Employee Details"
                  name="label2"
                  classname="h4 control-label"
                  listener={fragment}
                ></WmLabel>
              </WmComposite>
            </WmGridrow>
            <WmGridrow name="gridrow3" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn1"
                xscolumnwidth={12}
                listener={fragment}
              >
                <PC_Employee_city fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
            <WmGridrow name="gridrow4" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn2"
                xscolumnwidth={12}
                listener={fragment}
              >
                <PC_Employee_deptid fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
            <WmGridrow name="gridrow1" listener={fragment}>
              <WmGridcolumn
                name="gridcolumn1"
                columnwidth={12}
                xscolumnwidth={12}
                listener={fragment}
              >
                <PC_Value fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
          </WmLayoutgrid>
        </WmFormBody>
        <WmFormFooter name="wm_form_footer_e3fjb313i8" listener={fragment}>
          <WmFormAction
            show={true}
            iconclass="wi wi-refresh"
            title="Reset"
            disabled={false}
            widget-type="button"
            formKey="createEmployeeForm1"
            name="createEmployeeForm1_reset_formAction"
            displayName="Reset"
            updateMode={true}
            action="()=&gt; fragment.Widgets.createEmployeeForm1.formreset()"
            btnClass="btn-default"
            classname="form-reset btn-default"
            listener={fragment}
            formAction={$event => {
              fragment.Widgets.createEmployeeForm1.formreset();
            }}
          ></WmFormAction>
          <WmFormAction
            show={true}
            iconclass="wi wi-save"
            title="Save"
            disabled={false}
            widget-type="button"
            formKey="createEmployeeForm1"
            name="createEmployeeForm1_submit_formAction"
            displayName="Save"
            updateMode={true}
            action="()=&gt; fragment.Widgets.createEmployeeForm1.submit()"
            btnClass="btn-primary"
            classname="form-save btn-success"
            listener={fragment}
            formAction={$event => {
              fragment.Widgets.createEmployeeForm1.submit();
            }}
          ></WmFormAction>
        </WmFormFooter>
      </WmForm>
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

export default class WMS22977Page extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('WMS22977-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('WMS22977-styleOverrides', styleOverrides);
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
