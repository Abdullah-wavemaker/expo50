import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-alertdialog';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {},
    text: {},
    dialog: {},
    dialogContent: {
      root: {}
    },
    dialogActions: {},
    okButton: {
      root: {
        border: 'none',
        marginLeft: 4
      },
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
});
//# sourceMappingURL=alertdialog.styles.js.map