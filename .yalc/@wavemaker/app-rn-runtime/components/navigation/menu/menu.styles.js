import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { DEFAULT_CLASS as POPOVER_CLASS } from '../popover/popover.styles';
import { Platform } from 'react-native';
export const DEFAULT_CLASS = 'app-menu';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = {
    root: {
      alignSelf: 'flex-start'
    },
    text: {},
    link: {
      icon: {
        root: {
          color: themeVariables.menuIconColor
        }
      },
      text: {
        textDecorationLine: 'none',
        paddingRight: 12,
        fontWeight: 'bold',
        color: themeVariables.menuTextColor
      }
    },
    popover: {
      backgroundColor: themeVariables.transparent,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    },
    popoverContent: {
      //@ts-ignore
      flex: undefined
    },
    menu: {
      width: 160,
      backgroundColor: themeVariables.menuBackgroundColor,
      borderRadius: 4
    },
    menuItem: {
      root: {
        height: 48,
        borderBottomWidth: 0,
        borderStyle: 'solid',
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexGrow: 1,
        paddingTop: 8,
        justifyContent: 'flex-start',
        borderBottomColor: themeVariables.menuItemBorderColor
      },
      icon: {
        root: {
          fontSize: 24,
          paddingLeft: 22
        },
        icon: {
          color: themeVariables.menuItemIconColor
        }
      },
      text: {
        fontSize: 16,
        paddingTop: 4,
        textDecorationLine: 'none',
        color: themeVariables.menuItemTextColor
      }
    }
  };
  addStyle(DEFAULT_CLASS, POPOVER_CLASS, defaultStyles);
  addStyle(DEFAULT_CLASS + '-rtl', '', Platform.OS == "web" ? {} : {
    root: {
      width: '100%'
    }
  });
});
//# sourceMappingURL=menu.styles.js.map