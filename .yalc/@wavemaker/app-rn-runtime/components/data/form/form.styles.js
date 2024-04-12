import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-form';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {},
    text: {},
    heading: {
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 0,
      paddingRight: 0,
      borderBottomWidth: 0,
      borderStyle: 'solid',
      borderColor: themeVariables.formBorderColor
    },
    title: {
      text: {
        fontSize: themeVariables.heading4FontSize,
        color: themeVariables.formTitleColor,
        fontWeight: 'bold'
      }
    },
    subheading: {
      text: {
        fontSize: 12,
        lineHeight: 18,
        color: themeVariables.formSubTitleColor
      }
    },
    listIcon: {
      root: {
        fontSize: themeVariables.heading4FontSize,
        marginRight: 8
      }
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle('form-action', '', {
    root: {
      marginLeft: 12
    }
  });
});
//# sourceMappingURL=form.styles.js.map