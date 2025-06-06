import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-login';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {},
    text: {},
    errorMsgStyles: {
      color: themeVariables.loginErrorMsgColor,
      fontSize: 14,
      backgroundColor: themeVariables.loginErrorMsgBgColor,
      borderColor: themeVariables.loginErrorMsgBorderColor,
      padding: 12,
      fontFamily: themeVariables.baseFont
    },
    formStyles: {
      padding: 35
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  const paddingStyle = {
    padding: 5
  };
  addStyle('app-login-username', DEFAULT_CLASS, {
    root: paddingStyle
  });
  addStyle('app-login-password', DEFAULT_CLASS, {
    root: paddingStyle
  });
});
//# sourceMappingURL=login.styles.js.map