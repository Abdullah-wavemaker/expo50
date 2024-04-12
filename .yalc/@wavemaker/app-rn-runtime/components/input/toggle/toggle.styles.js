import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-toggle';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      width: 52,
      height: 32,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 18
    },
    text: {},
    handle: {
      width: 16,
      height: 16,
      borderRadius: 18,
      marginLeft: 8,
      marginRight: 0,
      backgroundSize: '100% 100%',
      backgroundPosition: 'center'
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle(DEFAULT_CLASS + '-on', '', {
    root: {
      backgroundColor: themeVariables.toggleOnColor
    },
    handle: {
      backgroundColor: themeVariables.toggleHandleColor
    }
  });
  addStyle(DEFAULT_CLASS + '-off', '', {
    root: {
      backgroundColor: themeVariables.toggleOffColor,
      borderColor: themeVariables.toggleOffBorderColor,
      borderWidth: 2
    },
    handle: {
      backgroundColor: themeVariables.toggleHandleDisableColor
    }
  });
  addStyle(DEFAULT_CLASS + '-rtl', '', {});
  addStyle(DEFAULT_CLASS + '-disabled', '', {
    root: {}
  });
});
//# sourceMappingURL=toggle.styles.js.map