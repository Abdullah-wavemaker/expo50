import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-form-field';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      marginBottom: 24
    },
    text: {},
    errorMsg: {
      color: 'red',
      fontSize: 13,
      paddingTop: 6,
      fontFamily: themeVariables.baseFont
    }
  });
  addStyle('form-label', '', {
    root: {
      paddingBottom: 5
    },
    text: {
      color: themeVariables.defaultTextColor,
      fontSize: themeVariables.heading5FontSize
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
});
//# sourceMappingURL=form-field.styles.js.map