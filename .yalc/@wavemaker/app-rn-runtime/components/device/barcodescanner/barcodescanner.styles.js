import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-barcodescanner';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {},
    text: {},
    button: {
      root: {
        minHeight: 30,
        minWidth: 40,
        paddingRight: 0,
        paddingTop: 10,
        paddingLeft: 8,
        paddingBottom: 8,
        borderWidth: 1,
        borderColor: themeVariables.defaultColor2,
        borderStyle: 'solid',
        backgroundColor: themeVariables.primaryColor,
        borderRadius: 20
      },
      text: {
        color: themeVariables.barcodeScannerTextColor,
        paddingRight: 0
      },
      icon: {
        text: {
          color: themeVariables.defaultColorF
        },
        icon: {
          fontSize: 21
        }
      }
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
});
//# sourceMappingURL=barcodescanner.styles.js.map