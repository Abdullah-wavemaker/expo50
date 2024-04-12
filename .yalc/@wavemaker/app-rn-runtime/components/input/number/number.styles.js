import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-number';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      minHeight: 42,
      paddingTop: 8,
      paddingBottom: 8,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: themeVariables.inputBorderColor,
      backgroundColor: themeVariables.inputBackgroundColor,
      borderRadius: 6,
      paddingLeft: 16,
      paddingRight: 16
    },
    text: {
      fontSize: 16,
      textAlign: 'left'
    },
    invalid: {
      borderBottomColor: themeVariables.inputInvalidBorderColor
    },
    placeholderText: {
      color: themeVariables.inputPlaceholderColor
    },
    floatingLabel: {},
    activeFloatingLabel: {},
    skeleton: {}
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle(DEFAULT_CLASS + '-disabled', '', {
    root: {
      backgroundColor: themeVariables.inputDisabledBgColor
    }
  });
  addStyle(DEFAULT_CLASS + '-rtl', '', {
    root: {
      textAlign: 'right'
    }
  });
  addStyle(DEFAULT_CLASS + '-with-label', '', {
    root: {
      minHeight: 48
    },
    floatingLabel: {
      position: 'absolute',
      top: 12,
      left: 16,
      fontSize: 14,
      color: themeVariables.floatingLabelColor
    },
    activeFloatingLabel: {
      color: themeVariables.activeFloatingLabelColor
    }
  });
});
//# sourceMappingURL=number.styles.js.map