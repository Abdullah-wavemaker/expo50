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
    // Page.Widgets.wizard1.enableskip = true;
    // Page.Widgets.wizardstep1.enableskip = true;
    // Page.Widgets.wizardstep1.enableskip = true;
    console.log(App);
  };

  // Page.wizardstep2Prev = function(widget, currentStep, stepIndex) {
  //     return false;
  // };

  // Page.wizardstep2Next = function(widget, currentStep, stepIndex) {
  //     return false;
  // };

  Page.button1Tap = function ($event, widget) {
    Page.Widgets.wizardstep2.disableprev = false;
  };

  Page.button2Tap = function ($event, widget) {
    Page.Widgets.wizardstep2.disableprev = true;
  };

  Page.button3Tap = function ($event, widget) {
    Page.Widgets.wizardstep2.showprev = false;
  };

  Page.button4Tap = function ($event, widget) {
    Page.Widgets.wizardstep1.shownext = true;
  };
}
