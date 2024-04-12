import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-composite';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      flexDirection: 'row',
      alignItems: 'flex-start'
    },
    text: {}
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle('app-composite-left-caption', DEFAULT_CLASS, {
    root: {
      flexDirection: 'row'
    }
  });
  addStyle('app-composite-right-caption', DEFAULT_CLASS, {
    root: {
      flexDirection: 'row-reverse'
    }
  });
  addStyle('app-composite-top-caption', DEFAULT_CLASS, {
    root: {
      flexDirection: 'column'
    }
  });
});
//# sourceMappingURL=composite.styles.js.map