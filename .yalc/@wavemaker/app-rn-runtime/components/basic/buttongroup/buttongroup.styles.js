import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-buttongroup';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      alignItems: 'center',
      borderRadius: 100,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: themeVariables.buttonGrpBorderColor,
      backgroundColor: themeVariables.buttonGrpBgColor,
      overflow: 'hidden'
    },
    text: {},
    skeleton: {
      root: {
        width: '100%',
        height: 48,
        borderRadius: 4,
        borderColor: themeVariables.buttonGrpBorderColor
      }
    }
  });
  addStyle('btn-group-child', '', {
    root: {
      borderTopWidth: 0,
      borderBottomWidth: 0,
      borderLeftWidth: 1,
      borderRightWidth: 0,
      borderRadius: 0,
      backgroundColor: 'transparent',
      flex: 1,
      borderColor: themeVariables.buttonGrpBorderColor
    }
  });
  addStyle('btn-group-first-child', '', {
    root: {
      borderLeftWidth: 0,
      borderTopLeftRadius: 28,
      borderBottomLeftRadius: 28,
      backgroundColor: 'transparent',
      borderColor: themeVariables.buttonGrpBorderColor
    }
  });
  addStyle('btn-group-last-child', '', {
    root: {
      borderRightWidth: 0,
      borderTopRightRadius: 28,
      borderBottomRightRadius: 28,
      backgroundColor: 'transparent',
      borderColor: themeVariables.buttonGrpBorderColor
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
});
//# sourceMappingURL=buttongroup.styles.js.map