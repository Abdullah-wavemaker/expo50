import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-list-template';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      backgroundColor: themeVariables.listHeaderBgColor
    },
    text: {}
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle('list-card-template', '', {
    root: {
      borderBottomWidth: 0
      // marginLeft: 35,
    }
  });

  addStyle('horizontal-list-template', '', {
    root: {}
  });
  addStyle('vertical-list-template', '', {
    root: {}
  });
});
//# sourceMappingURL=list-template.styles.js.map