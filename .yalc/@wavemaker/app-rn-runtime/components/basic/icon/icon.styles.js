import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-icon';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      alignItems: 'center'
    },
    icon: {
      paddingLeft: 0,
      paddingRight: 8
    },
    text: {
      paddingLeft: 8
    },
    skeleton: {
      root: {
        width: 32,
        height: 32,
        borderRadius: 4
      }
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle(DEFAULT_CLASS + '-rtl', '', {
    text: {
      paddingRight: 8
    }
  });
});
//# sourceMappingURL=icon.styles.js.map