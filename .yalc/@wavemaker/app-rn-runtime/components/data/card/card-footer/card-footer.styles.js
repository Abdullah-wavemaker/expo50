import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-card-footer';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      width: '100%',
      backgroundColor: themeVariables.cardFooterBgColor,
      padding: 8,
      borderTopWidth: 1,
      borderStyle: 'solid',
      borderColor: themeVariables.cardFooterBorderColor
    },
    text: {}
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
});
//# sourceMappingURL=card-footer.styles.js.map