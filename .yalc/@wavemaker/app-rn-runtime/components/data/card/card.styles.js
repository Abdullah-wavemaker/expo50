import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-card';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      width: '100%'
    },
    text: {},
    cardIcon: {
      root: {
        marginTop: 4,
        marginRight: 8
      }
    },
    heading: {
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 8,
      paddingRight: 8,
      backgroundColor: themeVariables.cardHeaderBgColor,
      flexDirection: 'row',
      alignContent: 'center',
      width: '100%'
    },
    title: {
      text: {
        fontSize: 16,
        lineHeight: 24,
        color: themeVariables.cardTitleColor
      }
    },
    subheading: {
      text: {
        fontSize: 12,
        lineHeight: 18,
        color: themeVariables.cardSubTitleColor
      }
    },
    picture: {
      root: {
        width: '100%'
      }
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
});
//# sourceMappingURL=card.styles.js.map