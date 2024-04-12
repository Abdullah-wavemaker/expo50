import moment from 'moment';
import * as _ from 'lodash';

export default function addPageScript(App, Prefab) {
  //auto refresh functions
  const setTimeout = App.lib.setTimeout;
  const setInterval = App.lib.setInterval;

  /*
   * Use App.getDependency for Dependency Injection
   * eg: var DialogService = App.getDependency('DialogService');
   */

  /*
   * This function will be invoked when any of this prefab's property is changed
   * @key: property name
   * @newVal: new value of the property
   * @oldVal: old value of the property
   */
  Prefab.onPropertyChange = function (key, newVal, oldVal) {
    // //debugger
    // switch (key) {
    //     case "customdataset":
    //         Prefab.Variables.staticVariable1;
    //         // //debugger
    //         // Prefab.Variables.staticVariable1.dataSet = Prefab.customdataset;
    //         break;
    //         // case "prop2":
    //         //     // do something with newVal for property 'prop2'
    //         //     break;
    // }
  };

  Prefab.onReady = function () {
    Prefab.Variables;
    //debugger
    // Prefab.Variables.staticVariable1.dataSet.push(Prefab.customdataset);
    // this method will be triggered post initialization of the prefab.
    // //debugger
  };
}
