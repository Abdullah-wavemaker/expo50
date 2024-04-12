import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmButton from '@wavemaker/app-rn-runtime/components/basic/button/button.component';
import WmButtongroup from '@wavemaker/app-rn-runtime/components/basic/buttongroup/buttongroup.component';
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
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmText from '@wavemaker/app-rn-runtime/components/input/text/text.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './WMS22999WMS23781.script';
import styles from './WMS22999WMS23781.style';
import getVariables from './WMS22999WMS23781.variables';

const FragmentContext = React.createContext();

const PC_Nameless = ({ fragment }) => {
  return (
    <WmFormField
      name="nameless"
      readonly={false}
      displayname="Name"
      type="string"
      show={true}
      widget="text"
      inputtype="text"
      formRef="staticVariable1Form1"
      primaryKey="undefined"
      isRelated="undefined"
      onChange={($event, widget, newVal, oldVal) => {
        fragment.Widgets.staticVariable1Form1 &&
          fragment.Widgets.staticVariable1Form1.props.onChange &&
          fragment.Widgets.staticVariable1Form1.props.onChange(
            $event,
            widget,
            newVal,
            oldVal
          );
      }}
      onValidate={widget => {
        widget.validateFormField.call(widget);
      }}
      formKey="name2"
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="name2_formLabel"
            classname="form-label name2_formLabel"
            listener={fragment}
          ></WmLabel>
          <WmText
            type="text"
            name="name2"
            formfieldname="nameless"
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
            classname="form-input form-text form-name2-input"
            listener={fragment}
          ></WmText>
        </>
      )}
    ></WmFormField>
  );
};

const PC_Emailchanged = ({ fragment }) => {
  return (
    <WmFormField
      name="emailChanged"
      readonly={false}
      displayname="Email"
      type="string"
      show={true}
      widget="text"
      inputtype="text"
      formRef="staticVariable1Form1"
      primaryKey="undefined"
      isRelated="undefined"
      onChange={($event, widget, newVal, oldVal) => {
        fragment.Widgets.staticVariable1Form1 &&
          fragment.Widgets.staticVariable1Form1.props.onChange &&
          fragment.Widgets.staticVariable1Form1.props.onChange(
            $event,
            widget,
            newVal,
            oldVal
          );
      }}
      onValidate={widget => {
        widget.validateFormField.call(widget);
      }}
      formKey="Q2"
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="Q2_formLabel"
            classname="form-label Q2_formLabel"
            listener={fragment}
          ></WmLabel>
          <WmText
            type="text"
            name="Q2"
            formfieldname="emailChanged"
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
            classname="form-input form-text form-Q2-input"
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
      <WmButtongroup name="buttongroup1" listener={fragment}>
        <WmButton
          type="button"
          caption="left"
          name="button1"
          onTap={() => {
            fragment.Actions.goToPage_WMS22550.invoke();
          }}
          classname="btn-default btn-group-child btn-group-first-child "
          listener={fragment}
        ></WmButton>
        <WmButton
          type="button"
          caption="center"
          name="button2"
          onTap={() => {
            fragment.Actions.goToPage_WMS22706WMS22042.invoke();
          }}
          classname="btn-default btn-group-child "
          listener={fragment}
        ></WmButton>
        <WmButton
          type="button"
          caption="right"
          name="button3"
          onTap={() => {
            fragment.Actions.goToPage_WMS23597.invoke();
          }}
          classname="btn-default btn-group-child  btn-group-last-child"
          listener={fragment}
        ></WmButton>
      </WmButtongroup>
      <WmButton
        caption="Button"
        type="button"
        name="button4"
        onTap={() => {
          fragment.Actions.goToPage_WMS23597.invoke();
        }}
        classname="btn-default"
        listener={fragment}
      ></WmButton>
      <WmButton
        caption="Button"
        type="button"
        name="button5"
        onTap={() => {
          fragment.Actions.goToPage_WMS22706WMS22042.invoke();
        }}
        classname="btn-default"
        listener={fragment}
      ></WmButton>
      <WmForm
        errormessage=""
        captionposition="top"
        title="Form"
        enctype="application/x-www-form-urlencoded"
        method="post"
        dataset={fragment.Variables.staticVariable1.dataSet}
        captionalign="left"
        name="staticVariable1Form1"
        listener={fragment}
        onChange={($event, widget, newVal, oldVal) => {
          if (
            fragment.Variables.staticVariable1?.twoWayBinding &&
            newVal !== oldVal
          ) {
            fragment.Variables.staticVariable1.dataSet[widget.props.name] =
              newVal;
          }
        }}
        formSubmit={(formData, success, error) => {
          fragment.Variables.staticVariable1 &&
            fragment.Variables.staticVariable1.invoke(formData, success, error);
        }}
      >
        <WmFormBody name="wm_form_body_g1c1a4j5cf" listener={fragment}>
          <WmLayoutgrid columns="1" name="layoutgrid1" listener={fragment}>
            <WmGridrow name="gridrow1" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn1"
                xscolumnwidth={12}
                listener={fragment}
              >
                <PC_Nameless fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
            <WmGridrow name="gridrow7" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn7"
                xscolumnwidth={12}
                listener={fragment}
              >
                <PC_Emailchanged fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
          </WmLayoutgrid>
        </WmFormBody>
        <WmFormFooter name="wm_form_footer_d338052375" listener={fragment}>
          <WmFormAction
            show={true}
            iconclass="wi wi-refresh"
            title="Reset"
            disabled={false}
            widget-type="button"
            formKey="staticVariable1Form1"
            name="staticVariable1Form1_reset_formAction"
            displayName="Reset"
            updateMode={true}
            action="()=&gt; fragment.Widgets.staticVariable1Form1.formreset()"
            btnClass="btn-default"
            classname="form-reset btn-default"
            listener={fragment}
            formAction={$event => {
              fragment.Widgets.staticVariable1Form1.formreset();
            }}
          ></WmFormAction>
          <WmFormAction
            show={true}
            iconclass="wi wi-save"
            title="Save"
            disabled={false}
            widget-type="button"
            formKey="staticVariable1Form1"
            name="staticVariable1Form1_submit_formAction"
            displayName="Save"
            updateMode={true}
            action="()=&gt; fragment.Widgets.staticVariable1Form1.submit()"
            btnClass="btn-primary"
            classname="form-save btn-success"
            listener={fragment}
            formAction={$event => {
              fragment.Widgets.staticVariable1Form1.submit();
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
      <WmContent name="content1" listener={fragment}>
        <PC_Page_content1 fragment={fragment} />
      </WmContent>
    </WmPage>
  );
};

export default class WMS22999WMS23781Page extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('WMS22999WMS23781-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new(
        'WMS22999WMS23781-styleOverrides',
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
