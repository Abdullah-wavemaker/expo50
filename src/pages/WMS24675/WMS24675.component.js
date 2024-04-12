import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmComposite from '@wavemaker/app-rn-runtime/components/input/composite/composite.component';
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
import WmText from '@wavemaker/app-rn-runtime/components/input/text/text.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './WMS24675.script';
import styles from './WMS24675.style';
import getVariables from './WMS24675.variables';

const FragmentContext = React.createContext();

const PC_Employee_empid = ({ fragment }) => {
  return (
    <WmFormField
      name="Employee_empId"
      readonly={false}
      displayname="Emp Id"
      type="integer"
      show={true}
      widget="number"
      inputtype="number"
      updateon="default"
      onChange={($event, widget, newVal, oldVal) => {
        fragment.Widgets.createEmployeeForm1 &&
          fragment.Widgets.createEmployeeForm1.props.onChange &&
          fragment.Widgets.createEmployeeForm1.props.onChange(
            $event,
            widget,
            newVal,
            oldVal
          );
        fragment.Employee_empIdChange($event, widget, newVal, oldVal);
      }}
      formRef="createEmployeeForm1"
      primaryKey="undefined"
      isRelated="undefined"
      onValidate={widget => {
        widget.validateFormField.call(widget);
      }}
      formKey="Employee.empId"
      styles={{ root: { textAlign: 'right' }, text: { textAlign: 'right' } }}
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="Employee_empId_formLabel"
            classname="form-label Employee_empId_formLabel"
            listener={fragment}
          ></WmLabel>
          <WmNumber
            name="Employee_empId"
            formfieldname="Employee_empId"
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
            classname="form-input form-number form-Employee_empId-input"
            listener={fragment}
          ></WmNumber>
        </>
      )}
    ></WmFormField>
  );
};

const PC_Employee_firstname = ({ fragment }) => {
  return (
    <WmFormField
      name="Employee_firstname"
      readonly={false}
      displayname="Firstname"
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
      formKey="Employee.firstname"
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="Employee_firstname_formLabel"
            classname="form-label Employee_firstname_formLabel"
            listener={fragment}
          ></WmLabel>
          <WmText
            type="text"
            name="Employee_firstname"
            formfieldname="Employee_firstname"
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
            classname="form-input form-text form-Employee_firstname-input"
            listener={fragment}
          ></WmText>
        </>
      )}
    ></WmFormField>
  );
};

const PC_Employee_lastname = ({ fragment }) => {
  return (
    <WmFormField
      name="Employee_lastname"
      readonly={false}
      displayname="Lastname"
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
      formKey="Employee.lastname"
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="Employee_lastname_formLabel"
            classname="form-label Employee_lastname_formLabel"
            listener={fragment}
          ></WmLabel>
          <WmText
            type="text"
            name="Employee_lastname"
            formfieldname="Employee_lastname"
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
            classname="form-input form-text form-Employee_lastname-input"
            listener={fragment}
          ></WmText>
        </>
      )}
    ></WmFormField>
  );
};

const PC_Employee_password = ({ fragment }) => {
  return (
    <WmFormField
      name="Employee_password"
      readonly={false}
      displayname="Password"
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
      formKey="Employee.password"
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="Employee_password_formLabel"
            classname="form-label Employee_password_formLabel"
            listener={fragment}
          ></WmLabel>
          <WmText
            type="text"
            name="Employee_password"
            formfieldname="Employee_password"
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
            classname="form-input form-text form-Employee_password-input"
            listener={fragment}
          ></WmText>
        </>
      )}
    ></WmFormField>
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
        <WmFormBody name="wm_form_body_91cjb51250" listener={fragment}>
          <WmLayoutgrid columns="1" name="layoutgrid1" listener={fragment}>
            <WmGridrow name="gridrow2" listener={fragment}>
              <WmComposite name="composite1" listener={fragment}>
                <WmLabel
                  caption="Employee Details"
                  name="label1"
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
                <PC_Employee_empid fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
            <WmGridrow name="gridrow4" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn2"
                xscolumnwidth={12}
                listener={fragment}
              >
                <PC_Employee_firstname fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
            <WmGridrow name="gridrow5" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn3"
                xscolumnwidth={12}
                listener={fragment}
              >
                <PC_Employee_lastname fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
            <WmGridrow name="gridrow6" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn4"
                xscolumnwidth={12}
                listener={fragment}
              >
                <PC_Employee_password fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
            <WmGridrow name="gridrow7" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn5"
                xscolumnwidth={12}
                listener={fragment}
              >
                <PC_Employee_city fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
          </WmLayoutgrid>
        </WmFormBody>
        <WmFormFooter name="wm_form_footer_8ig4228def" listener={fragment}>
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
      <WmContent name="content1" listener={fragment}>
        <PC_Page_content1 fragment={fragment} />
      </WmContent>
    </WmPage>
  );
};

export default class WMS24675Page extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('WMS24675-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('WMS24675-styleOverrides', styleOverrides);
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
