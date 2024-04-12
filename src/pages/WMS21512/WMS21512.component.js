import React from 'react';

import { ScrollView } from 'react-native';

import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
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
import WmPicture from '@wavemaker/app-rn-runtime/components/basic/picture/picture.component';
import WmRadioset from '@wavemaker/app-rn-runtime/components/input/radioset/radioset.component';
import WmSelect from '@wavemaker/app-rn-runtime/components/input/select/select.component';
import WmText from '@wavemaker/app-rn-runtime/components/input/text/text.component';
import WmWizard from '@wavemaker/app-rn-runtime/components/container/wizard/wizard.component';
import WmWizardstep from '@wavemaker/app-rn-runtime/components/container/wizard/wizardstep/wizardstep.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './WMS21512.script';
import styles from './WMS21512.style';
import getVariables from './WMS21512.variables';

const FragmentContext = React.createContext();

const PC_Wizardstep1content = ({ fragment }) => {
  return <ScrollView nestedScrollEnabled={true}></ScrollView>;
};

const PC_Wizardstep2content = ({ fragment }) => {
  return <ScrollView nestedScrollEnabled={true}></ScrollView>;
};

const PC_Wizardstep3content = ({ fragment }) => {
  return <ScrollView nestedScrollEnabled={true}></ScrollView>;
};

const PC_Wizard1 = ({ fragment }) => {
  return (
    <WmWizard
      stepstyle="justified"
      name="wizard1"
      classname="number"
      listener={fragment}
    >
      <WmWizardstep name="wizardstep1" index={0} listener={fragment}>
        <PC_Wizardstep1content fragment={fragment} />
      </WmWizardstep>
      <WmWizardstep name="wizardstep2" index={1} listener={fragment}>
        <PC_Wizardstep2content fragment={fragment} />
      </WmWizardstep>
      <WmWizardstep name="wizardstep3" index={2} listener={fragment}>
        <PC_Wizardstep3content fragment={fragment} />
      </WmWizardstep>
    </WmWizard>
  );
};

const PC_Q = ({ fragment }) => {
  return (
    <WmFormField
      readonly={false}
      name="q"
      displayname="Q"
      type="string"
      show={true}
      widget="text"
      formRef="googleapisForm1"
      primaryKey="undefined"
      isRelated="undefined"
      onChange={($event, widget, newVal, oldVal) => {
        fragment.Widgets.googleapisForm1 &&
          fragment.Widgets.googleapisForm1.props.onChange &&
          fragment.Widgets.googleapisForm1.props.onChange(
            $event,
            widget,
            newVal,
            oldVal
          );
      }}
      onValidate={widget => {
        widget.validateFormField.call(widget);
      }}
      formKey="q"
      listener={fragment}
      renderFormFields={$formField => (
        <>
          <WmLabel
            caption={$formField.displayname}
            memoize="false"
            required={$formField.required}
            name="q_formLabel"
            classname="form-label q_formLabel"
            listener={fragment}
          ></WmLabel>
          <WmText
            name="q"
            formfieldname="q"
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
            classname="form-input form-text form-q-input"
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
      <PC_Wizard1 fragment={fragment} />
      <WmSelect
        dataset={fragment.Variables.supportedLocale.dataSet}
        placeholder="Select Language"
        name="select1"
        datafield="dataValue"
        displayfield="displayValue"
        datavalue={fragment.appConfig.selectedLocale}
        classname="select-locale"
        listener={fragment}
        onChange={($event, widget, newVal, oldVal) => {
          fragment.App.changeLocale(newVal);
          fragment.App.reload();
        }}
      ></WmSelect>
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
          name="linearlayoutitem1"
          listener={fragment}
        ></WmLinearlayoutitem>
        <WmLinearlayoutitem
          flexgrow={1}
          name="linearlayoutitem2"
          marginLeft="4"
          styles={{ root: { marginLeft: 4 }, text: {} }}
          listener={fragment}
        ></WmLinearlayoutitem>
        <WmLinearlayoutitem
          name="linearlayoutitem3"
          marginLeft="4"
          styles={{ root: { marginLeft: 4 }, text: {} }}
          listener={fragment}
        ></WmLinearlayoutitem>
      </WmLinearlayout>
      <WmPicture
        resizemode="cover"
        name="picture1"
        picturesource="resources/images/imagelists/mrbean21.jpeg"
        pictureplaceholder="resources/images/imagelists/default-image.png"
        listener={fragment}
      ></WmPicture>
      <WmPicture
        resizemode="cover"
        name="picture2"
        picturesource="resources/images/imagelists/istockphoto-857045822-612x612.jpg"
        pictureplaceholder="resources/images/imagelists/default-image.png"
        listener={fragment}
      ></WmPicture>
      <WmPicture
        resizemode="cover"
        picturesource="resources/images/imagelists/istockphoto-857045822-612x612.jpg"
        name="picture3"
        pictureplaceholder="resources/images/imagelists/default-image.png"
        listener={fragment}
      ></WmPicture>
      <WmComposite name="composite1" listener={fragment}>
        <WmLabel
          name="label1"
          caption="boolean"
          classname="col-xs-4 control-label"
          listener={fragment}
        ></WmLabel>
        <WmContainer name="container1" classname="col-xs-8" listener={fragment}>
          <WmRadioset
            name="radioset1"
            dataset={fragment.Variables.boolean.dataSet}
            datafield="All Fields"
            displayfield="dataValue"
            orderby="dataValue:desc"
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
        method="get"
        dataset={fragment.Variables.WMS23639.dataSet}
        captionalign="left"
        name="googleapisForm1"
        listener={fragment}
        onChange={($event, widget, newVal, oldVal) => {
          if (fragment.Variables.WMS23639?.twoWayBinding && newVal !== oldVal) {
            fragment.Variables.WMS23639.dataSet[widget.props.name] = newVal;
          }
        }}
        formSubmit={(formData, success, error) => {
          fragment.Variables.WMS23639 &&
            fragment.Variables.WMS23639.invoke(formData, success, error);
        }}
      >
        <WmFormBody name="wm_form_body_88bi00c4d3" listener={fragment}>
          <WmLayoutgrid columns="1" name="layoutgrid1" listener={fragment}>
            <WmGridrow name="gridrow1" listener={fragment}>
              <WmGridcolumn
                columnwidth={12}
                name="gridcolumn1"
                listener={fragment}
              >
                <PC_Q fragment={fragment} />
              </WmGridcolumn>
            </WmGridrow>
          </WmLayoutgrid>
        </WmFormBody>
        <WmFormFooter name="wm_form_footer_1f61i0bbi2" listener={fragment}>
          <WmFormAction
            iconclass="wi wi-refresh"
            formKey="googleapisForm1"
            name="googleapisForm1_reset_formAction"
            displayName="Reset"
            action="()=&gt; fragment.Widgets.googleapisForm1.formreset()"
            btnClass="btn-default"
            classname="form-reset btn-default"
            listener={fragment}
            formAction={$event => {
              fragment.Widgets.googleapisForm1.formreset();
            }}
          ></WmFormAction>
          <WmFormAction
            iconclass="wi wi-save"
            formKey="googleapisForm1"
            name="googleapisForm1_submit_formAction"
            displayName="Save"
            action="()=&gt; fragment.Widgets.googleapisForm1.submit()"
            btnClass="btn-primary"
            classname="form-save btn-success"
            listener={fragment}
            formAction={$event => {
              fragment.Widgets.googleapisForm1.submit();
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

export default class WMS21512Page extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('WMS21512-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('WMS21512-styleOverrides', styleOverrides);
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
