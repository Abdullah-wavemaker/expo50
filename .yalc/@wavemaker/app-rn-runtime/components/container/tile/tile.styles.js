import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-tile';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      borderRadius: 6,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: themeVariables.transparent,
      padding: 12
    },
    text: {}
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle('tile-template-text', '', {
    text: {
      color: themeVariables.tilePrimaryTextColor
    }
  });
  addStyle('well', '', {
    root: {
      padding: 20,
      marginBottom: 20,
      borderWidth: 1,
      backgroundColor: themeVariables.tileWellbgColor,
      borderColor: themeVariables.tileWellBorderColor,
      borderStyle: 'solid',
      borderRadius: 2
    }
  });
});
//# sourceMappingURL=tile.styles.js.map