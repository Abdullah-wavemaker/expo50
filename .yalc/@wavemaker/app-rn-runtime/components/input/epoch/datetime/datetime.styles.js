import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
import { Platform } from 'react-native';
export const DEFAULT_CLASS = 'app-datetime';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 16,
      paddingRight: 16,
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 6,
      backgroundColor: themeVariables.inputBackgroundColor,
      borderColor: themeVariables.inputBorderColor,
      justifyContent: 'center',
      width: '100%'
    },
    focused: {},
    invalid: {
      borderBottomColor: themeVariables.inputInvalidBorderColor
    },
    placeholderText: {
      color: themeVariables.inputPlaceholderColor
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    text: {
      fontSize: 16,
      color: themeVariables.inputTextColor
    },
    calendarIcon: {
      root: {
        alignSelf: 'center'
      },
      icon: {
        fontSize: 24
      }
    },
    clearIcon: {
      root: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginRight: 4,
        height: 24,
        width: 24,
        borderRadius: 16,
        backgroundColor: themeVariables.inputDisabledBgColor
      },
      icon: {
        fontSize: 16,
        paddingRight: 0,
        fontWeight: 'bold'
      }
    },
    dialog: {
      minWidth: 320,
      paddingTop: 24,
      paddingBottom: 24,
      paddingLeft: 24,
      paddingRight: 24,
      elevation: 6,
      width: '90%',
      maxHeight: themeVariables.maxModalHeight,
      backgroundColor: themeVariables.dialogBackgroundColor,
      borderRadius: 28
    },
    actionWrapper: {
      flexDirection: 'row-reverse',
      marginRight: 20
    },
    selectBtn: {
      root: {
        paddingLeft: 12,
        paddingRight: 12
      }
    },
    cancelBtn: {
      root: {
        paddingLeft: 12,
        paddingRight: 12
      }
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle(DEFAULT_CLASS + '-disabled', '', {
    root: {
      backgroundColor: themeVariables.inputDisabledBgColor
    }
  });
  addStyle(DEFAULT_CLASS + '-rtl', '', Platform.OS == "web" ? {
    clearIcon: {
      root: {
        marginLeft: 4,
        marginRight: 0
      }
    }
  } : {});
  addStyle(DEFAULT_CLASS + '-with-label', '', {
    root: {
      minHeight: 48,
      paddingVertical: 16
    },
    floatingLabel: {
      position: 'absolute',
      top: 12,
      left: 16,
      fontSize: 14,
      color: themeVariables.floatingLabelColor
    },
    activeFloatingLabel: {
      color: themeVariables.activeFloatingLabelColor
    }
  });
});
//# sourceMappingURL=datetime.styles.js.map