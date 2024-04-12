import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
import { Platform } from 'react-native';
export const DEFAULT_CLASS = 'app-accordion';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      width: '100%',
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: themeVariables.accordionBorderColor,
      borderRadius: 6,
      backgroundColor: themeVariables.transparent
    },
    text: {
      color: themeVariables.accordionTitleColor,
      fontSize: 18
    },
    firstHeader: {
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6
    },
    pane: {},
    header: {
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderColor: themeVariables.accordionBorderColor,
      backgroundColor: themeVariables.accordionHeaderBgColor,
      padding: 8,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    lastHeader: {
      borderBottomWidth: 0,
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6
    },
    activeHeader: {
      borderColor: themeVariables.accordionActiveHeaderBgColor,
      backgroundColor: themeVariables.accordionActiveHeaderBgColor
    },
    activeHeaderTitle: {
      color: themeVariables.accordionActiveHeaderTextColor
    },
    subheading: {},
    icon: {
      root: {
        alignSelf: 'auto',
        width: 24,
        height: 24,
        borderRadius: 24,
        justifyContent: 'center'
      },
      icon: {
        color: themeVariables.accordionIconColor,
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    leftToggleIcon: {
      root: {}
    },
    rightToggleIcon: {
      root: {}
    },
    activeIcon: {
      root: {
        borderColor: themeVariables.accordionActiveHeaderTextColor
      },
      icon: {
        color: themeVariables.accordionActiveHeaderTextColor
      }
    },
    activeBadge: {
      borderColor: themeVariables.accordionActiveHeaderTextColor,
      color: themeVariables.accordionActiveHeaderTextColor
    },
    badge: {
      color: themeVariables.accordionIconColor,
      fontSize: 14,
      marginRight: 4,
      width: 24,
      height: 24,
      borderRadius: 12,
      alignContent: 'center',
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: themeVariables.accordionIconColor,
      backgroundColor: themeVariables.transparent
    },
    default: {},
    success: {
      backgroundColor: themeVariables.labelSuccessColor
    },
    danger: {
      backgroundColor: themeVariables.labelDangerColor
    },
    warning: {
      backgroundColor: themeVariables.labelWarningColor
    },
    info: {
      backgroundColor: themeVariables.labelInfoColor
    },
    primary: {
      backgroundColor: themeVariables.labelPrimaryColor
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle(DEFAULT_CLASS + '-rtl', '', Platform.OS == "web" ? {
    text: {
      textAlign: 'right'
    }
  } : {
    text: {
      textAlign: 'left'
    }
  });
  addStyle('app-accordion1', '', {
    pane: {
      marginBottom: 0
    },
    leftToggleIcon: {
      root: {
        width: 1
      }
    },
    icon: {
      root: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
      }
    }
  });
});
//# sourceMappingURL=accordion.styles.js.map