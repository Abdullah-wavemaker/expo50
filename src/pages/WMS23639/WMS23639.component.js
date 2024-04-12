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
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import WmTabbar from '@wavemaker/app-rn-runtime/components/page/tabbar/tabbar.component';
import WmText from '@wavemaker/app-rn-runtime/components/input/text/text.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';

import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './WMS23639.script';
import styles from './WMS23639.style';
import getVariables from './WMS23639.variables';

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
            placeholder="Enter email"
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
      <WmForm
        errormessage=""
        captionposition="top"
        title="Form"
        enctype="application/x-www-form-urlencoded"
        method="get"
        dataset={fragment.Variables.googleapis.dataSet}
        captionalign="left"
        name="googleapisForm1"
        listener={fragment}
        onChange={($event, widget, newVal, oldVal) => {
          if (
            fragment.Variables.googleapis?.twoWayBinding &&
            newVal !== oldVal
          ) {
            fragment.Variables.googleapis.dataSet[widget.props.name] = newVal;
          }
        }}
        formSubmit={(formData, success, error) => {
          fragment.Variables.googleapis &&
            fragment.Variables.googleapis.invoke(formData, success, error);
        }}
      >
        <WmFormBody name="wm_form_body_1a8h23eg3c" listener={fragment}>
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
        <WmFormFooter name="wm_form_footer_741ege00ae" listener={fragment}>
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

export default class WMS23639Page extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('WMS23639-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('WMS23639-styleOverrides', styleOverrides);
    }
  }

  init() {
    const data = getVariables(this.proxy);
    this.fragmentVariables = data.Variables;
    this.fragmentActions = data.Actions;
    this.Variables = Object.assign(this.Variables, data.Variables);
    this.Actions = Object.assign(this.Actions, data.Actions);
    this.startUpVariables = ['googleapis'];
    this.startUpActions = [];
    this.autoUpdateVariables = ['googleapis'];
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
