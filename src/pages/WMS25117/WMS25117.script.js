import moment from 'moment';
import * as _ from 'lodash';

export default function addPageScript(App, Page) {
  //auto refresh functions
  const setTimeout = App.lib.setTimeout;
  const setInterval = App.lib.setInterval;

  Page.amountTextBoxChange = function (
    $event,
    widget,
    item,
    currentItemWidgets,
    newVal,
    oldVal
  ) {
    if (
      (!_.isUndefined(oldVal) && !_.isUndefined(newVal)) ||
      (_.isUndefined(oldVal) && !_.isUndefined(newVal))
    ) {
      if (typeof newVal === 'string') {
        newVal = Number(newVal);
      }
      // validateAmountAndPercentage(newVal, currentItemWidgets.errorLabel, widget.name, item);
      calculateTotals();
    }
  };

  Page.amountTextBoxBlur = function (
    $event,
    widget,
    item,
    currentItemWidgets,
    newVal,
    oldVal
  ) {
    // not getting called in RN
    if (
      (!_.isUndefined(oldVal) && !_.isUndefined(newVal)) ||
      (_.isUndefined(oldVal) && !_.isUndefined(newVal))
    ) {
      if (typeof newVal === 'string') {
        newVal = Number(newVal);
      }
      // validateAmountAndPercentage(newVal, currentItemWidgets.errorLabel, widget.name, item);
    }
  };

  Page.percentageTextBoxChange = function (
    $event,
    widget,
    item,
    currentItemWidgets,
    newVal,
    oldVal
  ) {
    if (
      (!_.isUndefined(oldVal) && !_.isUndefined(newVal)) ||
      (_.isUndefined(oldVal) && !_.isUndefined(newVal))
    ) {
      if (typeof newVal === 'string') {
        newVal = Number(newVal);
      }
      // validateAmountAndPercentage(newVal, currentItemWidgets.errorLabel, widget.name, item);
      calculateTotals();
    }
  };

  Page.percentageTextBoxBlur = function (
    $event,
    widget,
    item,
    currentItemWidgets,
    newVal,
    oldVal
  ) {
    // not getting called in RN
    if (
      (!_.isUndefined(oldVal) && !_.isUndefined(newVal)) ||
      (_.isUndefined(oldVal) && !_.isUndefined(newVal))
    ) {
      if (typeof newVal === 'string') {
        newVal = Number(newVal);
      }
      // validateAmountAndPercentage(newVal, currentItemWidgets.errorLabel, widget.name, item);
    }
  };

  function calculateTotals() {
    Page.Variables.stvTotalData.dataSet.percentageTotal = 0;
    Page.Variables.stvTotalData.dataSet.amountTotal = 0;
    let paycheckContributions =
      Page.Variables.stvPaycheckContributions.dataSet.paycheckContributions;

    _.forEach(paycheckContributions, function (value, i) {
      if (value.currentContributionMethodType.key == 'P') {
        Page.Variables.stvTotalData.dataSet.percentageTotal =
          Page.Variables.stvTotalData.dataSet.percentageTotal +
          Number(paycheckContributions[i].newContributionRate);
      } else {
        Page.Variables.stvTotalData.dataSet.amountTotal =
          Page.Variables.stvTotalData.dataSet.amountTotal +
          Number(paycheckContributions[i].newContributionAmount);
      }
    });
  }

  Page.button1Tap = function ($event, widget) {
    _.forEach(
      Page.Variables.stvPaycheckContributions.dataSet.paycheckContributions,
      function (value, i) {
        if (value.currentContributionMethodType.key == 'P') {
          Page.Variables.stvPaycheckContributions.dataSet.paycheckContributions[
            i
          ].newContributionRate = 0;
        } else {
          Page.Variables.stvPaycheckContributions.dataSet.paycheckContributions[
            i
          ].newContributionAmount = 0;
        }
      }
    );
    calculateTotals();
  };

  Page.number4Change = function ($event, widget, newVal, oldVal) {};

  Page.amountTextBox1Change = function (
    $event,
    widget,
    item,
    currentItemWidgets,
    newVal,
    oldVal
  ) {
    if (
      (!_.isUndefined(oldVal) && !_.isUndefined(newVal)) ||
      (_.isUndefined(oldVal) && !_.isUndefined(newVal))
    ) {
      if (typeof newVal === 'string') {
        newVal = Number(newVal);
      }
      // validateAmountAndPercentage(newVal, currentItemWidgets.errorLabel, widget.name, item);
      calculateTotals();
    }
  };

  Page.amountTextBox1Blur = function (
    $event,
    widget,
    item,
    currentItemWidgets,
    newVal,
    oldVal
  ) {
    // not getting called in RN
    if (
      (!_.isUndefined(oldVal) && !_.isUndefined(newVal)) ||
      (_.isUndefined(oldVal) && !_.isUndefined(newVal))
    ) {
      if (typeof newVal === 'string') {
        newVal = Number(newVal);
      }
      // validateAmountAndPercentage(newVal, currentItemWidgets.errorLabel, widget.name, item);
    }
  };

  Page.percentageTextBox1Change = function (
    $event,
    widget,
    item,
    currentItemWidgets,
    newVal,
    oldVal
  ) {
    if (
      (!_.isUndefined(oldVal) && !_.isUndefined(newVal)) ||
      (_.isUndefined(oldVal) && !_.isUndefined(newVal))
    ) {
      if (typeof newVal === 'string') {
        newVal = Number(newVal);
      }
      // validateAmountAndPercentage(newVal, currentItemWidgets.errorLabel, widget.name, item);
      calculateTotals1();
    }
  };

  Page.percentageTextBox1Blur = function (
    $event,
    widget,
    item,
    currentItemWidgets,
    newVal,
    oldVal
  ) {
    // not getting called in RN
    if (
      (!_.isUndefined(oldVal) && !_.isUndefined(newVal)) ||
      (_.isUndefined(oldVal) && !_.isUndefined(newVal))
    ) {
      if (typeof newVal === 'string') {
        newVal = Number(newVal);
      }
      // validateAmountAndPercentage(newVal, currentItemWidgets.errorLabel, widget.name, item);
    }
  };

  function calculateTotals1() {
    Page.Variables.stvTotalData1.dataSet.percentageTotal = 0;
    Page.Variables.stvTotalData1.dataSet.amountTotal = 0;
    let paycheckContributions =
      Page.Variables.stvPaycheckContributions1.dataSet.paycheckContributions;

    _.forEach(paycheckContributions, function (value, i) {
      if (value.currentContributionMethodType.key == 'P') {
        Page.Variables.stvTotalData1.dataSet.percentageTotal =
          Page.Variables.stvTotalData1.dataSet.percentageTotal +
          Number(paycheckContributions[i].newContributionRate);
      } else {
        Page.Variables.stvTotalData1.dataSet.amountTotal =
          Page.Variables.stvTotalData1.dataSet.amountTotal +
          Number(paycheckContributions[i].newContributionAmount);
      }
    });
  }
}
