import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-layoutgrid';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      flexDirection: 'column',
      width: '100%'
    },
    text: {}
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle('table', '', {
    root: {
      backgroundColor: themeVariables.layoutGridBgColor,
      borderWidth: 1,
      borderLeftWidth: 1,
      borderTopWidth: 1,
      borderStyle: 'solid',
      borderColor: themeVariables.layoutGridBorderColor,
      borderRadius: 2
    }
  });
  addStyle('table-header-label', '', {
    text: {
      color: themeVariables.layoutGridHeaderTextColor,
      fontWeight: 'bold'
    }
  });
});
//# sourceMappingURL=layoutgrid.styles.js.map