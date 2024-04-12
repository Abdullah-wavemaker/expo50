import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-navbar';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {},
    text: {},
    nav: {
      flexDirection: 'row'
    },
    navitem: {},
    childNav: {}
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle('stackedNav', '', {
    root: {},
    nav: {
      flexDirection: 'column'
    },
    text: {
      textDecorationLine: 'none'
    },
    navitem: {},
    childNav: {
      paddingLeft: 12
    }
  });
  addStyle('childNav', '', {
    navitem: {}
  });
  addStyle('justifiedNav', '', {
    root: {},
    nav: {
      justifyContent: 'space-around',
      flexDirection: 'row',
      alignItems: 'center'
    },
    navitem: {}
  });
});
//# sourceMappingURL=navbar.styles.js.map