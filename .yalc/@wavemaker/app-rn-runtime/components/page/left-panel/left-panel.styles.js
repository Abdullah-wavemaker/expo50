import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-left-panel';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      minHeight: '100%',
      backgroundColor: themeVariables.navbarBackgroundColor,
      elevation: 1,
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
      maxWidth: 360
    },
    text: {}
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
});
//# sourceMappingURL=left-panel.styles.js.map