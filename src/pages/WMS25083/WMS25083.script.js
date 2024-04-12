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
    Page.Widgets.label1.caption = 'tap event triggered';
    Page.Widgets.label1.backgroundcolor = '#00BFFF';
  };

  Page.button1Longtap = function ($event, widget) {
    Page.Widgets.label1.caption = 'long tap event triggered';
    Page.Widgets.label1.backgroundcolor = '#556B2F';
  };

  Page.button1Pressout = function ($event, widget) {
    Page.Widgets.label1.caption = 'release event triggered';
    Page.Widgets.label1.backgroundcolor = '#2F4F4F';
  };
}
