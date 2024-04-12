import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmAppNavbar from '@wavemaker/app-rn-runtime/components/navigation/appnavbar/appnavbar.component';
import WmCheckboxset from '@wavemaker/app-rn-runtime/components/input/checkboxset/checkboxset.component';
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
import WmLinearlayout from '@wavemaker/app-rn-runtime/components/container/linearlayout/linearlayout.component';
import WmLinearlayoutitem from '@wavemaker/app-rn-runtime/components/container/linearlayout/linearlayoutitem/linearlayoutitem.component';
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import WmRadioset from '@wavemaker/app-rn-runtime/components/input/radioset/radioset.component';
import WmSearch from '@wavemaker/app-rn-runtime/components/basic/search/search.component';
import WmSwitch from '@wavemaker/app-rn-runtime/components/input/switch/switch.component';
import WmTabbar from '@wavemaker/app-rn-runtime/components/page/tabbar/tabbar.component';
import WmText from '@wavemaker/app-rn-runtime/components/input/text/text.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './WMS21781.script';
import styles from './WMS21781.style';
import getVariables from './WMS21781.variables';

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
      readonly={false}
      name="name"
      displayname="Name"
      type="string"
      show={true}
      widget="text"
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

const PC_Country = ({ fragment }) => {
  return (
    <WmFormField
      readonly={false}
      name="country"
      displayname="Country"
      type="string"
      show={true}
      widget="autocomplete"
      validationmessage="you missed 4"
      required={true}
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
          <WmSearch
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
            type="autocomplete"
            limit={fragment.toNumber($formField.limit)}
            displayimagesrc={$formField.displayimagesrc}
            searchkey={$formField.searchkey}
            showclear={$formField.showclear || false}
            dataset={$formField.dataset}
            displayfield={$formField.displaylabel}
            datafield={$formField.datafield}
            classname="app-autocomplete form-input form-autocomplete form-country-input"
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
          ></WmSearch>
        </>
      )}
    ></WmFormField>
  );
};

const PC_Email = ({ fragment }) => {
  return (
    <WmFormField
      readonly={false}
      name="email"
      displayname="Email"
      type="string"
      show={true}
      widget="switch"
      required={true}
      validationmessage="you missed 1"
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
          <WmSwitch
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
            dataset={$formField.dataset || 'yes, no, maybe'}
            displayfield={$formField.displayfield}
            datafield={$formField.datafield}
            classname="form-input form-switch form-email-input"
            listener={fragment}
          ></WmSwitch>
        </>
      )}
    ></WmFormField>
  );
};

const PC_Q1 = ({ fragment }) => {
  return (
    <WmFormField
      readonly={false}
      name="Q1"
      displayname="Q1"
      type="string"
      show={true}
      widget="checkboxset"
      required={true}
      validationmessage="you missed 2"
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
          <WmCheckboxset
            name="Q1"
            formfieldname="Q1"
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
            classname="form-input form-checkboxset form-Q1-input"
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
          ></WmCheckboxset>
        </>
      )}
    ></WmFormField>
  );
};

const PC_Q2 = ({ fragment }) => {
  return (
    <WmFormField
      readonly={false}
      name="Q2"
      displayname="Q2"
      type="string"
      show={true}
      widget="radioset"
      validationmessage="you missed 3"
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
          <WmRadioset
            name="Q2"
            formfieldname="Q2"
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
            classname="form-input form-radioset form-Q2-input"
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
        <WmFormBody name="wm_form_body_12ji3ch4be" listener={fragment}>
          <WmLayoutgrid columns="1" name="layoutgrid1" listener={fragment}>
            <WmGridrow name="gridrow1" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn1"
                listener={fragment}
              >
                <PC_Name fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
            <WmGridrow name="gridrow2" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn2"
                listener={fragment}
              >
                <PC_Country fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
            <WmGridrow name="gridrow3" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn3"
                listener={fragment}
              >
                <PC_Email fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
            <WmGridrow name="gridrow4" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn4"
                listener={fragment}
              >
                <PC_Q1 fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
            <WmGridrow name="gridrow5" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn5"
                listener={fragment}
              >
                <PC_Q2 fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
          </WmLayoutgrid>
        </WmFormBody>
        <WmFormFooter name="wm_form_footer_51149fj8g0" listener={fragment}>
          <WmFormAction
            iconclass="wi wi-refresh"
            formKey="staticVariable1Form1"
            name="staticVariable1Form1_reset_formAction"
            displayName="Reset"
            action="()=&gt; fragment.Widgets.staticVariable1Form1.formreset()"
            btnClass="btn-default"
            classname="form-reset btn-default"
            listener={fragment}
            formAction={$event => {
              fragment.Widgets.staticVariable1Form1.formreset();
            }}
          ></WmFormAction>
          <WmFormAction
            iconclass="wi wi-save"
            formKey="staticVariable1Form1"
            name="staticVariable1Form1_submit_formAction"
            displayName="Save"
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
      <WmLinearlayout
        direction="row"
        spacing="4"
        name="linearlayout1"
        styles={{
          root: {
            paddingTop: 4,
            paddingRight: 4,
            paddingBottom: 4,
            paddingLeft: 4,
          },
          text: {},
        }}
        listener={fragment}
      >
        <WmLinearlayoutitem
          flexgrow={1}
          name="linearlayoutitem2"
          listener={fragment}
        >
          <WmComposite name="composite1" required={true} listener={fragment}>
            <WmLabel
              name="label1"
              classname="col-xs-4 control-label"
              listener={fragment}
            ></WmLabel>
            <WmContainer
              name="container1"
              classname="col-xs-8"
              listener={fragment}
            >
              <WmRadioset
                name="radioset1"
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
        </WmLinearlayoutitem>
      </WmLinearlayout>
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

export default class WMS21781Page extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('WMS21781-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('WMS21781-styleOverrides', styleOverrides);
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
