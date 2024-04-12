import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
import { Platform } from 'react-native';
export const DEFAULT_CLASS = 'app-select';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      flexDirection: 'row',
      padding: 12,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: themeVariables.inputBorderColor,
      backgroundColor: themeVariables.inputBackgroundColor,
      borderRadius: 6,
      minWidth: 160,
      alignItems: 'center'
    },
    invalid: {
      borderBottomColor: themeVariables.inputInvalidBorderColor
    },
    text: {
      fontSize: 16,
      fontFamily: themeVariables.baseFont,
      flex: 1,
      color: themeVariables.inputTextColor
    },
    checkIcon: {
      text: {
        fontSize: 24,
        color: themeVariables.primaryColor
      }
    },
    disabledText: {
      backgroundColor: themeVariables.inputDisabledBgColor
    },
    modal: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      height: '100%'
    },
    modalContent: {
      backgroundColor: themeVariables.inputBackgroundColor,
      borderRadius: 6,
      position: 'absolute',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: themeVariables.inputBorderColor,
      width: '90%'
    },
    selectItem: {
      width: '100%',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: themeVariables.selecttemBorderColor,
      flexDirection: 'row',
      alignItems: 'center'
    },
    lastSelectItem: {
      borderBottomWidth: 0
    },
    selectItemText: {
      fontSize: 16,
      fontFamily: themeVariables.baseFont,
      color: themeVariables.selectItemTextColor,
      flex: 1
    },
    selectedItem: {},
    selectedItemText: {},
    placeholderText: {
      color: themeVariables.inputPlaceholderColor
    },
    dropDownContent: {},
    arrowButton: {
      root: {
        borderRadius: 0,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 6,
        paddingRight: 0,
        minHeight: 0,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
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
    text: {
      textAlign: 'right'
    }
  } : {
    text: {
      textAlign: 'left'
    }
  });
});
//# sourceMappingURL=select.styles.js.map