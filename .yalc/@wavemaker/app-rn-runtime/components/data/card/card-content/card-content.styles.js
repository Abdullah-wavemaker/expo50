import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-card-content';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      backgroundColor: themeVariables.cardContentBgColor,
      padding: 8
    },
    text: {}
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
});
//# sourceMappingURL=card-content.styles.js.map