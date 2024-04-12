import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmAppNavbar from '@wavemaker/app-rn-runtime/components/navigation/appnavbar/appnavbar.component';
import WmButton from '@wavemaker/app-rn-runtime/components/basic/button/button.component';
import WmCheckbox from '@wavemaker/app-rn-runtime/components/input/checkbox/checkbox.component';
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
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import WmPicture from '@wavemaker/app-rn-runtime/components/basic/picture/picture.component';
import WmTabbar from '@wavemaker/app-rn-runtime/components/page/tabbar/tabbar.component';
import WmText from '@wavemaker/app-rn-runtime/components/input/text/text.component';
import WmToggle from '@wavemaker/app-rn-runtime/components/input/toggle/toggle.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './EV_test.script';
import styles from './EV_test.style';
import getVariables from './EV_test.variables';

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
      formRef="chartdata2Form1"
      primaryKey="undefined"
      isRelated="undefined"
      onChange={($event, widget, newVal, oldVal) => {
        fragment.Widgets.chartdata2Form1 &&
          fragment.Widgets.chartdata2Form1.props.onChange &&
          fragment.Widgets.chartdata2Form1.props.onChange(
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

const PC_Value = ({ fragment }) => {
  return (
    <WmFormField
      name="value"
      readonly={false}
      displayname="Value"
      type="string"
      show={true}
      widget="text"
      inputtype="text"
      formRef="chartdata2Form1"
      primaryKey="undefined"
      isRelated="undefined"
      onChange={($event, widget, newVal, oldVal) => {
        fragment.Widgets.chartdata2Form1 &&
          fragment.Widgets.chartdata2Form1.props.onChange &&
          fragment.Widgets.chartdata2Form1.props.onChange(
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
          <WmText
            type="text"
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
            placeholder="Enter value"
            updateon={$formField.updateon || 'blur'}
            maxchars={fragment.toNumber($formField.maxchars)}
            classname="form-input form-text form-value-input"
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
        dataset={fragment.Variables.chartdata2.dataSet}
        captionalign="left"
        name="chartdata2Form1"
        listener={fragment}
        onChange={($event, widget, newVal, oldVal) => {
          if (
            fragment.Variables.chartdata2?.twoWayBinding &&
            newVal !== oldVal
          ) {
            fragment.Variables.chartdata2.dataSet[widget.props.name] = newVal;
          }
        }}
        formSubmit={(formData, success, error) => {
          fragment.Variables.chartdata2 &&
            fragment.Variables.chartdata2.invoke(formData, success, error);
        }}
      >
        <WmFormBody name="wm_form_body_4e5ia63j7h" listener={fragment}>
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
                <PC_Value fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
          </WmLayoutgrid>
        </WmFormBody>
        <WmFormFooter name="wm_form_footer_9d6172di4h" listener={fragment}>
          <WmFormAction
            show={true}
            iconclass="wi wi-refresh"
            title="Reset"
            disabled={false}
            widget-type="button"
            formKey="chartdata2Form1"
            name="chartdata2Form1_reset_formAction"
            displayName="Reset"
            updateMode={true}
            action="()=&gt; fragment.Widgets.chartdata2Form1.formreset()"
            btnClass="btn-default"
            classname="form-reset btn-default"
            listener={fragment}
            formAction={$event => {
              fragment.Widgets.chartdata2Form1.formreset();
            }}
          ></WmFormAction>
          <WmFormAction
            show={true}
            iconclass="wi wi-save"
            title="Save"
            disabled={false}
            widget-type="button"
            formKey="chartdata2Form1"
            name="chartdata2Form1_submit_formAction"
            displayName="Save"
            updateMode={true}
            action="()=&gt; fragment.Widgets.chartdata2Form1.submit()"
            btnClass="btn-primary"
            classname="form-save btn-success"
            listener={fragment}
            formAction={$event => {
              fragment.Widgets.chartdata2Form1.submit();
            }}
          ></WmFormAction>
          <WmFormAction
            show={true}
            shortcutkey=""
            widget-type="button"
            iconclass="wm-sl-l sl-keyboard-arrow-right"
            iconposition="right"
            formKey="chartdata2Form1"
            name="chartdata2Form1_button_formAction"
            displayName="Next"
            updateMode={true}
            btnClass="btn-default"
            classname="btn-secondary"
            listener={fragment}
          ></WmFormAction>
        </WmFormFooter>
      </WmForm>
      <WmPicture
        resizemode="cover"
        name="picture1"
        pictureplaceholder="resources/images/imagelists/default-image.png"
        listener={fragment}
      ></WmPicture>
      <WmComposite name="composite3" listener={fragment}>
        <WmLabel
          name="label2"
          classname="col-xs-8 control-label"
          listener={fragment}
        ></WmLabel>
        <WmContainer name="container2" classname="col-xs-4" listener={fragment}>
          <WmToggle
            caption="Toggle"
            type="toggle"
            name="toggle1"
            datavalue="hey"
            checkedvalue="hey"
            uncheckedvalue="hello"
            onChange={($event, widget, newVal, oldVal) => {
              fragment.toggle1Change($event, widget, newVal, oldVal);
            }}
            classname="pull-right"
            listener={fragment}
          ></WmToggle>
        </WmContainer>
      </WmComposite>
      <WmButton
        caption="Button"
        type="button"
        name="button1"
        iconclass="wm-sl-l sl-keyboard-arrow-right"
        iconposition="right"
        onTap={($event, widget) => {
          fragment.button1Tap($event, widget);
        }}
        classname="btn-default"
        listener={fragment}
      ></WmButton>
      <WmComposite name="composite1" listener={fragment}>
        <WmCheckbox
          caption="Label"
          name="checkbox1"
          listener={fragment}
        ></WmCheckbox>
        <WmComposite name="composite4" listener={fragment}>
          <WmLabel
            name="label3"
            classname="col-xs-4 control-label"
            listener={fragment}
          ></WmLabel>
          <WmContainer
            name="container3"
            classname="col-xs-8"
            listener={fragment}
          >
            <WmText
              name="text1"
              onChange={($event, widget, newVal, oldVal) => {
                fragment.text1Change($event, widget, newVal, oldVal);
              }}
              listener={fragment}
            ></WmText>
          </WmContainer>
        </WmComposite>
      </WmComposite>
      <WmComposite name="composite2" listener={fragment}>
        <WmLabel
          name="label1"
          classname="col-xs-4 control-label"
          listener={fragment}
        ></WmLabel>
        <WmContainer name="container1" classname="col-xs-8" listener={fragment}>
          <WmCheckboxset
            name="checkboxset1"
            dataset={fragment.Variables.radiosetData.dataSet}
            datafield="All Fields"
            displayfield="displayvalue"
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
        </WmContainer>
      </WmComposite>
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

export default class EV_testPage extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('EV_test-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('EV_test-styleOverrides', styleOverrides);
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
