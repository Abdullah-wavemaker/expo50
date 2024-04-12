import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-radioset';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      color: themeVariables.checkedColor
    },
    text: {},
    group: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    groupHeaderTitle: {
      backgroundColor: themeVariables.groupHeadingBgColor,
      fontSize: 16,
      paddingLeft: 8,
      paddingRight: 8,
      lineHeight: 40,
      fontFamily: themeVariables.baseFont
    },
    item: {
      flexDirection: 'row',
      alignContent: 'center',
      marginTop: 8
    },
    selectedItem: {},
    radioLabel: {
      alignSelf: 'center',
      fontFamily: themeVariables.baseFont,
      fontSize: 16,
      color: themeVariables.labelDefaultColor,
      marginLeft: 8
    },
    skeleton: {
      root: {
        width: '100%',
        height: 16,
        borderRadius: 4
      }
    },
    uncheckedRadio: {
      root: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: themeVariables.checkedBorderColor
      },
      text: {},
      icon: {
        opacity: 0
      }
    },
    checkedRadio: {
      root: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: themeVariables.checkedBorderColor
      },
      text: {
        fontSize: 16
      },
      icon: {
        color: themeVariables.checkedColor,
        padding: 0
      }
    }
  });
  addStyle(DEFAULT_CLASS + '-disabled', '', {
    root: {
      color: themeVariables.checkedDisabledColor,
      opacity: 0.8
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
});
//# sourceMappingURL=radioset.styles.js.map