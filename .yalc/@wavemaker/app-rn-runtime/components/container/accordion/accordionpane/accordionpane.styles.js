import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-accordionpane';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      minHeight: 120,
      borderStyle: 'solid',
      borderColor: themeVariables.accordionBorderColor,
      backgroundColor: themeVariables.accordionPaneBgColor,
      padding: 4
    },
    text: {}
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
});
//# sourceMappingURL=accordionpane.styles.js.map