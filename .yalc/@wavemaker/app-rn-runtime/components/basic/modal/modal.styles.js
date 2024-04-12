import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-modal';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    text: {},
    content: {
      borderColor: 'rgba(0, 0, 0, 0)',
      borderWidth: 0
    }
  });
  addStyle('centered-modal', '', {
    root: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: 'center'
    },
    text: {},
    content: {
      alignSelf: 'center'
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
});
//# sourceMappingURL=modal.styles.js.map