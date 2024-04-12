function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { BaseProps } from '@wavemaker/app-rn-runtime/core/base.component';
import { View } from 'react-native';
export default class WmListProps extends BaseProps {
  constructor() {
    super(...arguments);
    _defineProperty(this, "formRef", void 0);
    _defineProperty(this, "iconclass", null);
    _defineProperty(this, "deferload", false);
    _defineProperty(this, "ondemandmessage", 'Load More');
    _defineProperty(this, "title", null);
    _defineProperty(this, "subheading", null);
    _defineProperty(this, "dataset", []);
    _defineProperty(this, "maxnumberofitems", 50);
    _defineProperty(this, "renderItem", () => /*#__PURE__*/React.createElement(View, null));
    _defineProperty(this, "loadingicon", null);
    _defineProperty(this, "loadingdatamsg", 'Loading...');
    _defineProperty(this, "multiselect", false);
    _defineProperty(this, "nodatamessage", 'No data found');
    _defineProperty(this, "loadingdata", false);
    _defineProperty(this, "selectfirstitem", false);
    _defineProperty(this, "selectionlimit", -1);
    _defineProperty(this, "disableitem", ($item, $index) => false);
    _defineProperty(this, "itemkey", null);
    _defineProperty(this, "direction", 'vertical');
    _defineProperty(this, "groupby", null);
    _defineProperty(this, "match", null);
    _defineProperty(this, "orderby", null);
    _defineProperty(this, "dateformat", null);
    _defineProperty(this, "selecteditem", null);
    _defineProperty(this, "navigation", 'None');
    _defineProperty(this, "itemclass", null);
    _defineProperty(this, "getNextPageData", null);
    _defineProperty(this, "pagesize", 20);
    _defineProperty(this, "itemsperrow", {
      xs: 1,
      sm: 1,
      md: 1,
      lg: 1
    });
  }
}
//# sourceMappingURL=list.props.js.map