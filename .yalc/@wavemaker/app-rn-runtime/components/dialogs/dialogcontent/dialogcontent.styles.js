import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-dialogcontent';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      padding: 16,
      minHeight: 80,
      maxHeight: 0.9 * themeVariables.maxModalHeight
    },
    text: {}
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
});
//# sourceMappingURL=dialogcontent.styles.js.map