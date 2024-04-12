import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmAppNavbar from '@wavemaker/app-rn-runtime/components/navigation/appnavbar/appnavbar.component';
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
import WmSearch from '@wavemaker/app-rn-runtime/components/basic/search/search.component';
import WmTabbar from '@wavemaker/app-rn-runtime/components/page/tabbar/tabbar.component';
import WmText from '@wavemaker/app-rn-runtime/components/input/text/text.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './WMS21425.script';
import styles from './WMS21425.style';
import getVariables from './WMS21425.variables';

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

const PC_Name = ({ fragment }) => {
  return (
    <WmFormField
      name="name"
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
      formKey="name"
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="name_formLabel"
            classname="form-label name_formLabel"
            listener={fragment}
          ></WmLabel>
          <WmText
            type="text"
            name="name"
            formfieldname="name"
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
            classname="form-input form-text form-name-input"
            listener={fragment}
          ></WmText>
        </>
      )}
    ></WmFormField>
  );
};

const PC_Datavalue = ({ fragment }) => {
  return (
    <WmFormField
      name="dataValue"
      displayname="Password"
      type="string"
      show={true}
      widget="password"
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
      formKey="dataValue"
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="dataValue_formLabel"
            classname="form-label dataValue_formLabel"
            listener={fragment}
          ></WmLabel>
          <WmText
            type="password"
            name="dataValue"
            formfieldname="dataValue"
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
            classname="form-input form-password form-dataValue-input"
            listener={fragment}
          ></WmText>
        </>
      )}
    ></WmFormField>
  );
};

const PC_City = ({ fragment }) => {
  return (
    <WmFormField
      name="city"
      readonly={false}
      displayname="City"
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
      formKey="city"
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="city_formLabel"
            classname="form-label city_formLabel"
            listener={fragment}
          ></WmLabel>
          <WmText
            type="text"
            name="city"
            formfieldname="city"
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
            classname="form-input form-text form-city-input"
            listener={fragment}
          ></WmText>
        </>
      )}
    ></WmFormField>
  );
};

const PC_Country = ({ fragment }) => {
  return (
    <WmFormField
      name="country"
      readonly={false}
      displayname="Country"
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
      formKey="country"
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="country_formLabel"
            classname="form-label country_formLabel"
            listener={fragment}
          ></WmLabel>
          <WmText
            type="text"
            name="country"
            formfieldname="country"
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
            classname="form-input form-text form-country-input"
            listener={fragment}
          ></WmText>
        </>
      )}
    ></WmFormField>
  );
};

const PC_Email = ({ fragment }) => {
  return (
    <WmFormField
      name="email"
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
      formKey="email"
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="email_formLabel"
            classname="form-label email_formLabel"
            listener={fragment}
          ></WmLabel>
          <WmText
            type="text"
            name="email"
            formfieldname="email"
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
            classname="form-input form-text form-email-input"
            listener={fragment}
          ></WmText>
        </>
      )}
    ></WmFormField>
  );
};

const PC_Q1 = ({ fragment }) => {
  return (
    <WmFormField
      name="Q1"
      readonly={false}
      displayname="Q1"
      type="string"
      show={true}
      widget="number"
      minvalue={100}
      inputtype="number"
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
      formKey="Q1"
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="Q1_formLabel"
            classname="form-label Q1_formLabel"
            listener={fragment}
          ></WmLabel>
          <WmNumber
            name="Q1"
            formfieldname="Q1"
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
            classname="form-input form-number form-Q1-input"
            listener={fragment}
          ></WmNumber>
        </>
      )}
    ></WmFormField>
  );
};

const PC_Q2 = ({ fragment }) => {
  return (
    <WmFormField
      name="Q2"
      readonly={false}
      displayname="Q2"
      type="string"
      show={true}
      widget="number"
      inputtype="number"
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
          <WmNumber
            name="Q2"
            formfieldname="Q2"
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
            classname="form-input form-number form-Q2-input"
            listener={fragment}
          ></WmNumber>
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
      <WmSearch
        name="search1"
        dataset={fragment.Variables.serviceVariable3.dataSet}
        searchkey="q"
        displaylabel="birthdate"
        datafield="All Fields"
        limit={10}
        searchon="typing"
        displayimagesrc="picurl"
        showclear={true}
        type="search"
        datavalue="1"
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
        onQuerySearch={(params, success, error) => {
          fragment.Variables.serviceVariable3 &&
            fragment.Variables.serviceVariable3.setInput(params);
          return fragment.Variables.serviceVariable3.invoke();
        }}
        isUpdateRequired={() =>
          fragment.Variables.serviceVariable3 &&
          fragment.Variables.serviceVariable3.config?.serviceInfo?.parameters
            .length
        }
      ></WmSearch>
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
        <WmFormBody name="wm_form_body_117h9i37hg" listener={fragment}>
          <WmLayoutgrid columns="1" name="layoutgrid1" listener={fragment}>
            <WmGridrow name="gridrow1" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn1"
                xscolumnwidth={12}
                listener={fragment}
              >
                <PC_Name fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
            <WmGridrow name="gridrow2" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn2"
                xscolumnwidth={12}
                listener={fragment}
              >
                <PC_Datavalue fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
            <WmGridrow name="gridrow3" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn3"
                xscolumnwidth={12}
                listener={fragment}
              >
                <PC_City fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
            <WmGridrow name="gridrow4" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn4"
                xscolumnwidth={12}
                listener={fragment}
              >
                <PC_Country fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
            <WmGridrow name="gridrow5" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn5"
                xscolumnwidth={12}
                listener={fragment}
              >
                <PC_Email fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
            <WmGridrow name="gridrow6" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn6"
                xscolumnwidth={12}
                listener={fragment}
              >
                <PC_Q1 fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
            <WmGridrow name="gridrow7" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn7"
                xscolumnwidth={12}
                listener={fragment}
              >
                <PC_Q2 fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
          </WmLayoutgrid>
        </WmFormBody>
        <WmFormFooter name="wm_form_footer_8j06ibgj7d" listener={fragment}>
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

export default class WMS21425Page extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('WMS21425-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('WMS21425-styleOverrides', styleOverrides);
    }
  }

  init() {
    const data = getVariables(this.proxy);
    this.fragmentVariables = data.Variables;
    this.fragmentActions = data.Actions;
    this.Variables = Object.assign(this.Variables, data.Variables);
    this.Actions = Object.assign(this.Actions, data.Actions);
    this.startUpVariables = ['serviceVariable3'];
    this.startUpActions = [];
    this.autoUpdateVariables = ['serviceVariable3'];
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
