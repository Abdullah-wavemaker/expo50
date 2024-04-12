import moment from 'moment';
import * as _ from 'lodash';

export default function addPageScript(App, Page) {
  //auto refresh functions
  const setTimeout = App.lib.setTimeout;
  const setInterval = App.lib.setInterval;

  /*
   * Use App.getDependency for Dependency Injection
   * eg: var DialogService = App.getDependency('DialogService');
   */

  /* perform any action on widgets/variables within this block */
  Page.onReady = function () {
    /*
     * variables can be accessed through 'Page.Variables' property here
     * e.g. to get dataSet in a staticVariable named 'loggedInUser' use following script
     * Page.Variables.loggedInUser.getData()
     *
     * widgets can be accessed through 'Page.Widgets' property here
     * e.g. to get value of text widget named 'username' use following script
     * 'Page.Widgets.username.datavalue'
     */
  };

  Page.dateChange = function ($event, widget, newVal, oldVal) {};

  Page.valueChange = function ($event, widget, newVal, oldVal) {
    var VALIDATOR = App.getDependency('CONSTANTS').VALIDATOR;
    Page.Widgets.chartDataForm1.formfields.value.setValidators([
      {
        type: VALIDATOR.MAXVALUE,
        validator: 100,
        errorMessage: 'Invalid Value',
      },
    ]);
  };

  function checkSSN(field, form) {
    const errorObj = {
      errorMessage: 'Invalid SSN',
    };
    if (field.value !== undefined && String(field.value).length > 0) {
      const emailregex = /^[0-9]{9}$/;
      if (!emailregex.test(String(field.value))) {
        return errorObj;
      }
    }
  }

  Page.date2Change = function ($event, widget, newVal, oldVal) {
    VALIDATOR = App.getDependency('CONSTANTS').VALIDATOR;
    Page.Widgets.form2.formfields.date2.setValidators([checkSSN]);
  };
}
