import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
export const DEFAULT_CLASS = 'app-spinner';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 16,
      paddingLeft: 8
    },
    icon: {
      text: {
        fontSize: 48,
        width: 4,
        color: themeVariables.spinnerIconColor
      }
    },
    image: {},
    lottie: {
      width: 100,
      height: 100,
      alignSelf: 'center',
      justifyContent: 'center'
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle(DEFAULT_CLASS + '-rtl', '', {
    root: {
      textAlign: 'right'
    },
    text: {
      paddingRight: 8
    }
  });
});
//# sourceMappingURL=spinner.styles.js.map