import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-rating';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      flexDirection: 'row',
      alignContent: 'center',
      padding: 8
    },
    icon: {
      text: {
        fontSize: 32,
        color: themeVariables.ratingIconColor
      }
    },
    selectedIcon: {
      text: {
        fontSize: 32,
        color: themeVariables.ratingSelectedIconColor
      }
    },
    text: {
      alignSelf: 'center',
      paddingLeft: 8,
      color: themeVariables.ratingSelectedIconColor
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle(DEFAULT_CLASS + '-disabled', '', {
    root: {
      opacity: 0.5
    }
  });
});
//# sourceMappingURL=rating.styles.js.map