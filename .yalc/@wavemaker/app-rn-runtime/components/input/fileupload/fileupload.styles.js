import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-fileupload';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      borderRadius: 32,
      alignSelf: 'flex-start',
      borderWidth: 1,
      borderColor: themeVariables.fileuploadBorderColor,
      borderStyle: 'solid',
      backgroundColor: themeVariables.fileuploadBgColor
    },
    text: {},
    button: {
      root: {},
      text: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        textTransform: 'capitalize'
      }
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
});
//# sourceMappingURL=fileupload.styles.js.map