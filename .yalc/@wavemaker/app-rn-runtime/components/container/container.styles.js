import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-container';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {},
    text: {},
    content: {
      flexDirection: 'column'
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle('media-body', '', {
    root: {
      flex: 1,
      paddingLeft: 8,
      paddingRight: 8,
      justifyContent: 'center'
    }
  });
  addStyle('media-right', '', {
    root: {
      justifyContent: 'center'
    }
  });
  addStyle('app-elevated-container', '', {
    root: {
      shadowColor: 'rgba(0, 0, 0, 0.2)',
      shadowOffset: {
        width: 2,
        height: 2
      },
      shadowRadius: 2,
      borderRadius: 8
    }
  });
  addStyle('app-outlined-container', '', {
    root: {
      borderWidth: 1,
      borderColor: themeVariables.containerOutlineColor,
      borderStyle: 'solid'
    }
  });
});
//# sourceMappingURL=container.styles.js.map