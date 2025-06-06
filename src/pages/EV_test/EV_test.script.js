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

  Page.button1Tap = function ($event, widget) {
    Page.Widgets.toggle1.datavalue = 'hello';
    Page.Widgets.text1.datavalue = 'hyy';
    Page.Widgets.chartdata2Form1.r;
  };

  Page.toggle1Change = function ($event, widget, newVal, oldVal) {
    console.log(newVal);
  };

  Page.text1Change = function ($event, widget, newVal, oldVal) {
    console.log(newVal);
  };
}
