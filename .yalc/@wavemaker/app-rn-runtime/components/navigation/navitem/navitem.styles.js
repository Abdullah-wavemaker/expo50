import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-navitem';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      backgroundColor: themeVariables.navbarBackgroundColor
    },
    text: {},
    dropdownNav: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    navAnchorItem: {
      root: {
        padding: 12
      },
      text: {
        color: themeVariables.navbarTextColor,
        fontFamily: themeVariables.baseFont,
        lineHeight: 20,
        fontSize: 14,
        fontWeight: '500'
      },
      icon: {
        text: {
          color: themeVariables.navbarTextColor,
          fontSize: 24
        }
      }
    },
    caretIcon: {
      root: {
        paddingRight: 12
      },
      text: {
        color: themeVariables.navbarCaretColor
      }
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle(DEFAULT_CLASS + '-active', DEFAULT_CLASS, {
    root: {
      backgroundColor: themeVariables.navitemActiveBackgroundColor
    },
    navAnchorItem: {
      text: {
        color: themeVariables.navitemActiveTextColor,
        fontFamily: themeVariables.baseFont,
        lineHeight: 20,
        fontSize: 14,
        fontWeight: '700'
      },
      icon: {
        text: {
          color: themeVariables.navitemActiveIconColor
        }
      }
    }
  });
  addStyle(DEFAULT_CLASS + '-child', DEFAULT_CLASS, {
    root: {
      backgroundColor: themeVariables.navitemChildBackgroundColor
    },
    navAnchorItem: {
      text: {
        color: themeVariables.navitemChildTextColor
      },
      icon: {
        text: {
          color: themeVariables.navitemChildIconColor
        }
      }
    }
  });
  addStyle('navAnchorItem', '', defaultStyles.navAnchorItem);
});
//# sourceMappingURL=navitem.styles.js.map