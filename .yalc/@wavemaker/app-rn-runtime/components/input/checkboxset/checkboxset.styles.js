import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-checkboxset';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {},
    text: {
      alignSelf: 'center',
      fontFamily: themeVariables.baseFont,
      fontSize: 16,
      color: themeVariables.labelDefaultColor,
      marginLeft: 8
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
    skeleton: {
      root: {
        width: '100%',
        height: 16
      }
    },
    checkicon: {
      root: {
        width: 20,
        height: 20,
        borderRadius: 4,
        backgroundColor: themeVariables.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: themeVariables.checkedBorderColor
      },
      text: {
        fontSize: 18
      },
      icon: {
        color: themeVariables.checkedIconColor,
        padding: 0
      }
    },
    uncheckicon: {
      root: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: themeVariables.uncheckedBorderColor
      },
      text: {},
      icon: {
        color: 'transparent'
      }
    }
  });
  addStyle(DEFAULT_CLASS + '-disabled', '', {
    root: {
      opacity: 0.8
    },
    text: {
      color: themeVariables.checkedDisabledColor
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
});
//# sourceMappingURL=checkboxset.styles.js.map