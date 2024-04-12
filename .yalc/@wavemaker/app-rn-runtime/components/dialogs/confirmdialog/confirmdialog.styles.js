import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
import { Platform } from 'react-native';
export const DEFAULT_CLASS = 'app-confirmdialog';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {},
    text: {},
    dialog: {
      icon: {
        icon: {
          fontSize: 16
        }
      }
    },
    dialogContent: {
      root: {}
    },
    dialogActions: {
      root: {
        padding: 0,
        flexDirection: 'row'
      }
    },
    okButton: {
      root: {},
      text: {
        textTransform: 'capitalize',
        fontSize: 16
      }
    },
    cancelButton: {
      root: {},
      text: {
        textTransform: 'capitalize',
        fontSize: 16
      }
    },
    message: {
      text: {
        fontFamily: themeVariables.baseFont,
        fontSize: 14,
        fontWeight: '400',
        color: themeVariables.dialogSupportingTextColor
      }
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle(DEFAULT_CLASS + '-rtl', '', Platform.OS == "web" ? {
    cancelButton: {
      root: {
        marginLeft: 8,
        marginRight: 0
      }
    }
  } : {});
});
//# sourceMappingURL=confirmdialog.styles.js.map