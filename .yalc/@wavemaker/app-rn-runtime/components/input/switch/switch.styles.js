import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
import { Platform } from 'react-native';
export const DEFAULT_CLASS = 'app-switch';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      minHeight: 24,
      padding: 4,
      flexDirection: 'row'
    },
    text: {
      fontWeight: '500',
      fontSize: 16,
      textTransform: 'capitalize'
    },
    loadingIcon: {
      root: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 16
      },
      text: {
        color: themeVariables.listSubTitleColor
      }
    },
    button: {
      backgroundColor: themeVariables.switchBgColor,
      color: themeVariables.switchTextColor,
      fontSize: 14,
      minWidth: 64,
      minHeight: 40,
      paddingLeft: 16,
      paddingRight: 16,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      borderColor: themeVariables.switchBorderColor,
      borderWidth: 1,
      borderRightWidth: 0,
      fontWeight: '500',
      fontFamily: themeVariables.baseFont,
      justifyContent: 'center',
      alignItems: 'center'
    },
    selectedButton: {
      color: themeVariables.switchActiveTextColor,
      backgroundColor: themeVariables.switchActiveBgColor,
      borderColor: themeVariables.switchBorderColor
    },
    firstButton: {
      borderTopLeftRadius: 18,
      borderBottomLeftRadius: 18,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    },
    lastButton: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 18,
      borderBottomRightRadius: 18,
      borderRightWidth: 1
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle(DEFAULT_CLASS + '-disabled', '', {
    root: {}
  });
  addStyle(DEFAULT_CLASS + '-rtl', '', Platform.OS == "web" ? {
    firstButton: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
      borderRightWidth: 1,
      borderLeftWidth: 0
    },
    lastButton: {
      borderTopLeftRadius: 6,
      borderBottomLeftRadius: 6,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderRightWidth: 0
    }
  } : {});
  addStyle(DEFAULT_CLASS + '1-rtl', '', Platform.OS == "web" ? {
    firstButton: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 500,
      borderBottomRightRadius: 500,
      borderRightWidth: 0,
      borderLeftWidth: 1
    },
    lastButton: {
      flex: 1,
      borderTopLeftRadius: 500,
      borderBottomLeftRadius: 500,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderRightWidth: 1
    }
  } : {});
  addStyle(DEFAULT_CLASS + '1', '', {
    firstButton: {
      borderTopLeftRadius: 500,
      borderBottomLeftRadius: 500,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    },
    lastButton: {
      flex: 1,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 500,
      borderBottomRightRadius: 500
    }
  });
});
//# sourceMappingURL=switch.styles.js.map