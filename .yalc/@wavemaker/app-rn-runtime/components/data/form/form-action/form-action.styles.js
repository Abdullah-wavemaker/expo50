import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-form-action';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      marginTop: 0,
      marginLeft: 4,
      marginRight: 4,
      marginBottom: 0,
      flex: 1,
      rippleColor: themeVariables.rippleColor
    },
    text: {},
    icon: {
      icon: {
        fontSize: 20
      }
    },
    skeleton: {
      root: {
        width: 96,
        height: 48
      }
    }
  });
  addStyle(DEFAULT_CLASS + '-disabled', '', {
    root: {
      opacity: 0.5
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
});
//# sourceMappingURL=form-action.styles.js.map