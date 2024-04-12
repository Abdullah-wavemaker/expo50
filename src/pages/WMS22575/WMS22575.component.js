import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
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
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmPanel from '@wavemaker/app-rn-runtime/components/container/panel/panel.component';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import WmText from '@wavemaker/app-rn-runtime/components/input/text/text.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './WMS22575.script';
import styles from './WMS22575.style';
import getVariables from './WMS22575.variables';

const FragmentContext = React.createContext();

const PC_Firstname = ({ fragment }) => {
  return (
    <WmFormField
      readonly={false}
      name="firstname"
      displayname="Firstname"
      type="string"
      show={true}
      widget="text"
      formRef="WMS22575Form1"
      primaryKey="undefined"
      isRelated="undefined"
      onChange={($event, widget, newVal, oldVal) => {
        fragment.Widgets.WMS22575Form1 &&
          fragment.Widgets.WMS22575Form1.props.onChange &&
          fragment.Widgets.WMS22575Form1.props.onChange(
            $event,
            widget,
            newVal,
            oldVal
          );
      }}
      onValidate={widget => {
        widget.validateFormField.call(widget);
      }}
      formKey="firstname"
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="firstname_formLabel"
            classname="form-label firstname_formLabel"
            listener={fragment}
          ></WmLabel>
          <WmText
            name="firstname"
            formfieldname="firstname"
            formfield="true"
            memoize="false"
            required={$formField.required}
            regexp={$formField.regexp}
            validationmessage={$formField.validationmessage}
            datavalue={$formField.defaultvalue}
            disabled={$formField.disabled}
            readonly={$formField.readonly}
            updateon={$formField.updateon || 'blur'}
            maxchars={fragment.toNumber($formField.maxchars)}
            classname="form-input form-text form-firstname-input"
            listener={fragment}
          ></WmText>
        </>
      )}
    ></WmFormField>
  );
};

const PC_Lastname = ({ fragment }) => {
  return (
    <WmFormField
      readonly={false}
      name="lastname"
      displayname="Lastname"
      type="string"
      show={true}
      widget="text"
      formRef="WMS22575Form1"
      primaryKey="undefined"
      isRelated="undefined"
      onChange={($event, widget, newVal, oldVal) => {
        fragment.Widgets.WMS22575Form1 &&
          fragment.Widgets.WMS22575Form1.props.onChange &&
          fragment.Widgets.WMS22575Form1.props.onChange(
            $event,
            widget,
            newVal,
            oldVal
          );
      }}
      onValidate={widget => {
        widget.validateFormField.call(widget);
      }}
      formKey="lastname"
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="lastname_formLabel"
            classname="form-label lastname_formLabel"
            listener={fragment}
          ></WmLabel>
          <WmText
            name="lastname"
            formfieldname="lastname"
            formfield="true"
            memoize="false"
            required={$formField.required}
            regexp={$formField.regexp}
            validationmessage={$formField.validationmessage}
            datavalue={$formField.defaultvalue}
            disabled={$formField.disabled}
            readonly={$formField.readonly}
            updateon={$formField.updateon || 'blur'}
            maxchars={fragment.toNumber($formField.maxchars)}
            classname="form-input form-text form-lastname-input"
            listener={fragment}
          ></WmText>
        </>
      )}
    ></WmFormField>
  );
};

const PC_Certified_in = ({ fragment }) => {
  return (
    <WmFormField
      readonly={false}
      name="Certified In"
      displayname="Certified In"
      type="string"
      show={true}
      widget="text"
      formRef="WMS22575Form1"
      primaryKey="undefined"
      isRelated="undefined"
      onChange={($event, widget, newVal, oldVal) => {
        fragment.Widgets.WMS22575Form1 &&
          fragment.Widgets.WMS22575Form1.props.onChange &&
          fragment.Widgets.WMS22575Form1.props.onChange(
            $event,
            widget,
            newVal,
            oldVal
          );
      }}
      onValidate={widget => {
        widget.validateFormField.call(widget);
      }}
      formKey="Certified In"
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="Certified In_formLabel"
            classname="form-label Certified In_formLabel"
            listener={fragment}
          ></WmLabel>
          <WmText
            name="Certified In"
            formfieldname="Certified In"
            formfield="true"
            memoize="false"
            required={$formField.required}
            regexp={$formField.regexp}
            validationmessage={$formField.validationmessage}
            datavalue={$formField.defaultvalue}
            disabled={$formField.disabled}
            readonly={$formField.readonly}
            updateon={$formField.updateon || 'blur'}
            maxchars={fragment.toNumber($formField.maxchars)}
            classname="form-input form-text form-Certified In-input"
            listener={fragment}
          ></WmText>
        </>
      )}
    ></WmFormField>
  );
};

const PC_Address_building_no_ = ({ fragment }) => {
  return (
    <WmFormField
      readonly={false}
      name="Address_Building No_"
      displayname="Building No"
      type="string"
      show={true}
      widget="text"
      formRef="WMS22575Form1"
      primaryKey="undefined"
      isRelated="undefined"
      onChange={($event, widget, newVal, oldVal) => {
        fragment.Widgets.WMS22575Form1 &&
          fragment.Widgets.WMS22575Form1.props.onChange &&
          fragment.Widgets.WMS22575Form1.props.onChange(
            $event,
            widget,
            newVal,
            oldVal
          );
      }}
      onValidate={widget => {
        widget.validateFormField.call(widget);
      }}
      formKey="Address.Building No."
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="Address_Building No._formLabel"
            classname="form-label Address_Building No._formLabel"
            listener={fragment}
          ></WmLabel>
          <WmText
            name="Address_Building No."
            formfieldname="Address_Building No_"
            formfield="true"
            memoize="false"
            required={$formField.required}
            regexp={$formField.regexp}
            validationmessage={$formField.validationmessage}
            datavalue={$formField.defaultvalue}
            disabled={$formField.disabled}
            readonly={$formField.readonly}
            updateon={$formField.updateon || 'blur'}
            maxchars={fragment.toNumber($formField.maxchars)}
            classname="form-input form-text form-Address_Building No.-input"
            listener={fragment}
          ></WmText>
        </>
      )}
    ></WmFormField>
  );
};

const PC_Address_city = ({ fragment }) => {
  return (
    <WmFormField
      readonly={false}
      name="Address_City"
      displayname="City"
      type="string"
      show={true}
      widget="text"
      formRef="WMS22575Form1"
      primaryKey="undefined"
      isRelated="undefined"
      onChange={($event, widget, newVal, oldVal) => {
        fragment.Widgets.WMS22575Form1 &&
          fragment.Widgets.WMS22575Form1.props.onChange &&
          fragment.Widgets.WMS22575Form1.props.onChange(
            $event,
            widget,
            newVal,
            oldVal
          );
      }}
      onValidate={widget => {
        widget.validateFormField.call(widget);
      }}
      formKey="Address.City"
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="Address_City_formLabel"
            classname="form-label Address_City_formLabel"
            listener={fragment}
          ></WmLabel>
          <WmText
            name="Address_City"
            formfieldname="Address_City"
            formfield="true"
            memoize="false"
            required={$formField.required}
            regexp={$formField.regexp}
            validationmessage={$formField.validationmessage}
            datavalue={$formField.defaultvalue}
            disabled={$formField.disabled}
            readonly={$formField.readonly}
            updateon={$formField.updateon || 'blur'}
            maxchars={fragment.toNumber($formField.maxchars)}
            classname="form-input form-text form-Address_City-input"
            listener={fragment}
          ></WmText>
        </>
      )}
    ></WmFormField>
  );
};

const PC_Address_state = ({ fragment }) => {
  return (
    <WmFormField
      readonly={false}
      name="Address_State"
      displayname="State"
      type="string"
      show={true}
      widget="text"
      formRef="WMS22575Form1"
      primaryKey="undefined"
      isRelated="undefined"
      onChange={($event, widget, newVal, oldVal) => {
        fragment.Widgets.WMS22575Form1 &&
          fragment.Widgets.WMS22575Form1.props.onChange &&
          fragment.Widgets.WMS22575Form1.props.onChange(
            $event,
            widget,
            newVal,
            oldVal
          );
      }}
      onValidate={widget => {
        widget.validateFormField.call(widget);
      }}
      formKey="Address.State"
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="Address_State_formLabel"
            classname="form-label Address_State_formLabel"
            listener={fragment}
          ></WmLabel>
          <WmText
            name="Address_State"
            formfieldname="Address_State"
            formfield="true"
            memoize="false"
            required={$formField.required}
            regexp={$formField.regexp}
            validationmessage={$formField.validationmessage}
            datavalue={$formField.defaultvalue}
            disabled={$formField.disabled}
            readonly={$formField.readonly}
            updateon={$formField.updateon || 'blur'}
            maxchars={fragment.toNumber($formField.maxchars)}
            classname="form-input form-text form-Address_State-input"
            listener={fragment}
          ></WmText>
        </>
      )}
    ></WmFormField>
  );
};

const PC_Panel1 = ({ fragment }) => {
  return (
    <WmPanel title="Address" name="panel1" listener={fragment}>
      <WmLayoutgrid name="layoutgrid2" listener={fragment}>
        <WmGridrow name="gridrow5" listener={fragment}>
          <WmGridcolumn columnwidth={12} name="gridcolumn5" listener={fragment}>
            <PC_Address_building_no_ fragment={fragment} />
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow6" listener={fragment}>
          <WmGridcolumn columnwidth={12} name="gridcolumn6" listener={fragment}>
            <PC_Address_city fragment={fragment} />
          </WmGridcolumn>
        </WmGridrow>
        <WmGridrow name="gridrow7" listener={fragment}>
          <WmGridcolumn columnwidth={12} name="gridcolumn7" listener={fragment}>
            <PC_Address_state fragment={fragment} />
          </WmGridcolumn>
        </WmGridrow>
      </WmLayoutgrid>
    </WmPanel>
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
        dataset={fragment.Variables.WMS22575.dataSet}
        captionalign="left"
        name="WMS22575Form1"
        listener={fragment}
        onChange={($event, widget, newVal, oldVal) => {
          if (fragment.Variables.WMS22575?.twoWayBinding && newVal !== oldVal) {
            fragment.Variables.WMS22575.dataSet[widget.props.name] = newVal;
          }
        }}
        formSubmit={(formData, success, error) => {
          fragment.Variables.WMS22575 &&
            fragment.Variables.WMS22575.invoke(formData, success, error);
        }}
      >
        <WmFormBody name="wm_form_body_9a4fg1id93" listener={fragment}>
          <WmLayoutgrid columns="1" name="layoutgrid1" listener={fragment}>
            <WmGridrow name="gridrow1" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn1"
                listener={fragment}
              >
                <PC_Firstname fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
            <WmGridrow name="gridrow2" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn2"
                listener={fragment}
              >
                <PC_Lastname fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
            <WmGridrow name="gridrow3" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn3"
                listener={fragment}
              >
                <PC_Certified_in fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
            <WmGridrow name="gridrow4" listener={fragment}>
              <WmGridcolumn name="gridcolumn4" listener={fragment}>
                <PC_Panel1 fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
          </WmLayoutgrid>
        </WmFormBody>
        <WmFormFooter name="wm_form_footer_ig2ced9f97" listener={fragment}>
          <WmFormAction
            iconclass="wi wi-refresh"
            formKey="WMS22575Form1"
            name="WMS22575Form1_reset_formAction"
            displayName="Reset"
            action="()=&gt; fragment.Widgets.WMS22575Form1.formreset()"
            btnClass="btn-default"
            classname="form-reset btn-default"
            listener={fragment}
            formAction={$event => {
              fragment.Widgets.WMS22575Form1.formreset();
            }}
          ></WmFormAction>
          <WmFormAction
            iconclass="wi wi-save"
            formKey="WMS22575Form1"
            name="WMS22575Form1_submit_formAction"
            displayName="Save"
            action="()=&gt; fragment.Widgets.WMS22575Form1.submit()"
            btnClass="btn-primary"
            classname="form-save btn-success"
            listener={fragment}
            formAction={$event => {
              fragment.Widgets.WMS22575Form1.submit();
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

export default class WMS22575Page extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('WMS22575-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('WMS22575-styleOverrides', styleOverrides);
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
