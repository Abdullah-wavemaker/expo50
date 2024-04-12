import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-panel-footer';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: themeVariables.panelFooterColor,
      minHeight: 64,
      marginTop: 8,
      padding: 8,
      borderRadius: 6
    },
    text: {}
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
});
//# sourceMappingURL=panel-footer.styles.js.map