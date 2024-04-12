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
    Page.Widgets.regFormForm1.formfields.confirmpassword.setAsyncValidators([
      confirmPasswordEval,
    ]);
    Page.Widgets.regFormForm1.formfields.confirmpassword.observeOn([
      'password',
    ]);
  };

  // function confirmPasswordEval(field, form) {
  //     console.log(field.props.datavalue);
  //     console.log(field.props.datavalue);
  //     console.log(form.formdataoutput.password);
  //     return new Promise(function(resolve, reject) {
  //         if (field.props.datavalue && form.formdataoutput.password != field.props.datavalue) {
  //             reject({
  //                 errorMessage: "The email address is already registered."
  //             });
  //         }
  //         resolve();
  //     });
  // }
  // Assume this function is part of an asynchronous form validation process.

  function confirmPasswordEval(field, form) {
    if (field.props.datavalue && form.formdataoutput.password) {
      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          if (form.formdataoutput.password === field.props.datavalue) {
            return true;
          }
          if (form.formdataoutput.password != field.props.datavalue) {
            reject({
              errorMessage: 'password and confirm password must be same.',
            });
          }
          resolve();
        }, 500);
      });
    }
  }

  // function confirmPasswordEval(field, form) {
  //     if (field.props.datavalue && form.formdataoutput.password) {
  //         return new Promise(function(resolve, reject) {
  //             var passwordmismatch = Page.Variables.EmailData.dataSet.filter(function(data) {
  //                 if (data.dataValue === field.value) {
  //                     return true;
  //                 }
  //             });
  //             if (emailExists.length != 0) {
  //                 reject({
  //                     errorMessage: "The email address is already registered."
  //                 });
  //             }
  //             resolve();
  //         });
  //     }
  // }
}
