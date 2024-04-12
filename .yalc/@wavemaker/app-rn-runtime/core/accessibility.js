import { AccessibilityInfo } from 'react-native';
import { isAndroid, isWebPreviewMode, removeUndefinedKeys } from './utils';
let _isScreenReaderEnabled = false;
AccessibilityInfo.addEventListener('screenReaderChanged', flag => {
  _isScreenReaderEnabled = flag;
});
export const isScreenReaderEnabled = () => _isScreenReaderEnabled;
async function getScreenReaderStatus() {
  _isScreenReaderEnabled = !isWebPreviewMode() && (await AccessibilityInfo.isScreenReaderEnabled());
}
getScreenReaderStatus();
export let AccessibilityWidgetType = /*#__PURE__*/function (AccessibilityWidgetType) {
  AccessibilityWidgetType["BUTTON"] = "button";
  AccessibilityWidgetType["PICTURE"] = "picture";
  AccessibilityWidgetType["TEXT"] = "text";
  AccessibilityWidgetType["NUMBER"] = "number";
  AccessibilityWidgetType["TEXTAREA"] = "textarea";
  AccessibilityWidgetType["SELECT"] = "select";
  AccessibilityWidgetType["CHIPS"] = "chips";
  AccessibilityWidgetType["CURRENCY"] = "currency";
  AccessibilityWidgetType["RADIOSET"] = "radioset";
  AccessibilityWidgetType["CHECKBOX"] = "checkbox";
  AccessibilityWidgetType["TOGGLE"] = "toggle";
  AccessibilityWidgetType["SWITCH"] = "switch";
  AccessibilityWidgetType["DATE"] = "date";
  AccessibilityWidgetType["VIDEO"] = "video";
  AccessibilityWidgetType["PROGRESSBAR"] = "progressbar";
  AccessibilityWidgetType["PROGRESSCIRCLE"] = "progresscircle";
  AccessibilityWidgetType["LABEL"] = "label";
  AccessibilityWidgetType["ANCHOR"] = "anchor";
  AccessibilityWidgetType["MESSAGE"] = "message";
  AccessibilityWidgetType["SEARCH"] = "search";
  AccessibilityWidgetType["ICON"] = "icon";
  AccessibilityWidgetType["NAV"] = "nav";
  AccessibilityWidgetType["POVOVER"] = "popover";
  AccessibilityWidgetType["WEBVIEW"] = "webview";
  AccessibilityWidgetType["LINECHART"] = "linechart";
  return AccessibilityWidgetType;
}({});
;
export const getAccessibilityProps = (widgetType, accessibilityProps) => {
  let props = {
    accessible: true
  };
  if (!_isScreenReaderEnabled) {
    return {};
  }
  switch (widgetType) {
    case AccessibilityWidgetType.BUTTON:
    case AccessibilityWidgetType.TEXT:
    case AccessibilityWidgetType.NUMBER:
    case AccessibilityWidgetType.TEXTAREA:
    case AccessibilityWidgetType.SELECT:
    case AccessibilityWidgetType.CURRENCY:
    case AccessibilityWidgetType.TOGGLE:
    case AccessibilityWidgetType.DATE:
    case AccessibilityWidgetType.LABEL:
    case AccessibilityWidgetType.ANCHOR:
    case AccessibilityWidgetType.MESSAGE:
    case AccessibilityWidgetType.SEARCH:
    case AccessibilityWidgetType.PICTURE:
    case AccessibilityWidgetType.ICON:
    case AccessibilityWidgetType.NAV:
    case AccessibilityWidgetType.POVOVER:
    case AccessibilityWidgetType.WEBVIEW:
    case AccessibilityWidgetType.LINECHART:
    case AccessibilityWidgetType.VIDEO:
      {
        props.accessibilityLabel = accessibilityProps.accessibilitylabel || accessibilityProps.caption;
        props.accessibilityHint = accessibilityProps.hint;
        props.accessibilityRole = accessibilityProps.accessibilityrole;
        if (widgetType === AccessibilityWidgetType.BUTTON || widgetType === AccessibilityWidgetType.TEXT || widgetType === AccessibilityWidgetType.NUMBER || widgetType === AccessibilityWidgetType.TEXTAREA || widgetType === AccessibilityWidgetType.SELECT || widgetType === AccessibilityWidgetType.TOGGLE || widgetType === AccessibilityWidgetType.DATE) {
          props.accessibilityState = {
            disabled: accessibilityProps.disabled
          };
        }
        if ((widgetType === AccessibilityWidgetType.TEXT || widgetType === AccessibilityWidgetType.NUMBER || widgetType === AccessibilityWidgetType.TEXTAREA || widgetType === AccessibilityWidgetType.SELECT || widgetType === AccessibilityWidgetType.CURRENCY || widgetType === AccessibilityWidgetType.TOGGLE) && isAndroid()) {
          props.accessibilityLabelledBy = accessibilityProps.accessibilitylabelledby;
        }
        if (widgetType === AccessibilityWidgetType.NUMBER || widgetType === AccessibilityWidgetType.CURRENCY) {
          props.accessibilityValue = {
            min: accessibilityProps.minvalue,
            max: accessibilityProps.maxvalue
          };
        }
        if (widgetType === AccessibilityWidgetType.SELECT) {
          props.accessibilityState = {
            ...props.accessibilityState,
            expanded: accessibilityProps.expanded
          };
        }
        if (widgetType === AccessibilityWidgetType.TOGGLE) {
          props.accessibilityState = {
            ...props.accessibilityState,
            selected: accessibilityProps.selected
          };
        }
        break;
      }
    case AccessibilityWidgetType.CHIPS:
      {
        props.accessibilityLabel = accessibilityProps.accessibilitylabel || accessibilityProps.caption;
        props.accessibilityHint = accessibilityProps.hint;
        props.accessibilityState = {
          disabled: accessibilityProps.disabled,
          selected: accessibilityProps.selected
        };
        break;
      }
    case AccessibilityWidgetType.RADIOSET:
      {
        props.accessibilityState = {
          disabled: accessibilityProps.readonly || accessibilityProps.disabled,
          selected: accessibilityProps.selected
        };
        break;
      }
    case AccessibilityWidgetType.CHECKBOX:
      {
        props.accessibilityState = {
          disabled: accessibilityProps.readonly || accessibilityProps.disabled,
          checked: accessibilityProps.checked
        };
        break;
      }
    case AccessibilityWidgetType.SWITCH:
      {
        props.accessibilityState = {
          disabled: accessibilityProps.disabled,
          selected: accessibilityProps.selected
        };
        break;
      }
    case AccessibilityWidgetType.PROGRESSBAR:
    case AccessibilityWidgetType.PROGRESSCIRCLE:
      {
        props.accessibilityLabel = accessibilityProps.accessibilitylabel || accessibilityProps.caption;
        props.accessibilityRole = accessibilityProps.accessibilityrole;
        break;
      }
    default:
      break;
  }
  const finalProps = removeUndefinedKeys(props);
  // console.log('finalProps', finalProps)

  return finalProps;
};
//# sourceMappingURL=accessibility.js.map