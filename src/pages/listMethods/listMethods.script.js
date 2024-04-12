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
    Page.Widgets.testMenuList1.selectItem(1);
  };

  Page.button2Tap = function ($event, widget) {
    Page.Widgets.testMenuList1.getItem(1);
  };

  Page.button3Tap = function ($event, widget) {
    Page.Widgets.testMenuList1.deselect(0);
  };

  Page.button4Tap = function ($event, widget) {
    Page.Widgets.testMenuList1.getWidgets('Title', 0);
  };

  Page.button5Tap = function ($event, widget) {
    Page.Widgets.testMenuList1.getWidgets('Title');
  };

  Page.button6Tap = function ($event, widget) {
    Page.Widgets.testMenuList1.clear();
  };

  Page.button7Tap = function ($event, widget) {
    Page.Widgets.testMenuList1.selecteditem = 3;
  };

  Page.button8Tap = function ($event, widget) {
    Page.Widgets.testMenuList1.selectedItemWidgets.Title.caption = 'Eric';
    console.log(Page.Widgets.testMenuList1);
  };
}
