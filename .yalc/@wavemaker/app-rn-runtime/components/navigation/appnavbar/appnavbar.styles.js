import Color from 'color';
import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-appnavbar';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      flexDirection: 'row',
      backgroundColor: themeVariables.navitemActiveBackgroundColor,
      height: 80,
      padding: 12,
      paddingHorizontal: 12,
      alignItems: 'center'
    },
    text: {},
    action: {},
    leftSection: {
      flex: 1,
      flexDirection: 'row'
    },
    leftnavIcon: {
      root: {
        alignItems: 'flex-start'
      },
      icon: {
        fontSize: themeVariables.navbarIconSize,
        color: themeVariables.navbarTextColor
      }
    },
    backIcon: {
      root: {
        rippleColor: themeVariables.transparent
      },
      text: {
        fontSize: themeVariables.navbarFontSize,
        color: themeVariables.navbarTextColor
      },
      icon: {
        fontSize: themeVariables.navbarIconSize,
        color: themeVariables.navbarTextColor
      }
    },
    image: {
      root: {
        width: themeVariables.navbarImageSize,
        height: themeVariables.navbarImageSize
      },
      picture: {
        resizeMode: 'contain'
      }
    },
    content: {
      textTransform: 'capitalize',
      color: themeVariables.navbarTextColor,
      fontSize: themeVariables.navbarFontSize,
      fontFamily: themeVariables.baseFont,
      fontWeight: '500',
      textAlign: 'center'
    },
    badge: {
      backgroundColor: themeVariables.titleBadgeBackgroundColor,
      color: themeVariables.titleBadgeTextColor,
      alignSelf: 'flex-start',
      marginLeft: 4
    },
    middleSection: {
      alignItems: 'center',
      flexDirection: 'row'
    },
    rightSection: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end'
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle('navbarAnchorItem', '', {
    root: {
      paddingRight: 8,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'visible'
    },
    text: {
      color: themeVariables.navbarTextColor,
      fontSize: themeVariables.navbarFontSize,
      textDecorationStyle: undefined
    },
    badge: {
      backgroundColor: Color(themeVariables.navbarTextColor).fade(0.8).rgb().toString(),
      color: themeVariables.navbarTextColor
    },
    icon: {
      text: {
        color: themeVariables.navbarTextColor,
        fontSize: themeVariables.navbarIconSize
      },
      icon: {
        color: themeVariables.navbarTextColor
      }
    }
  });
  addStyle('navbarButton', '', {
    root: {
      backgroundColor: themeVariables.transparent,
      paddingRight: 8,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
    },
    text: {
      color: themeVariables.navbarTextColor,
      fontSize: themeVariables.navbarFontSize
    },
    icon: {
      root: {
        color: themeVariables.navbarTextColor
      },
      text: {
        color: themeVariables.navbarTextColor,
        fontSize: themeVariables.navbarIconSize
      }
    }
  });
  addStyle('navbarMenu', '', {
    root: {
      paddingRight: 8,
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    link: {
      icon: {
        root: {
          fontSize: themeVariables.navbarIconSize,
          color: themeVariables.navbarTextColor
        }
      },
      text: {
        color: themeVariables.navbarTextColor,
        fontSize: themeVariables.navbarFontSize
      }
    }
  });
  addStyle('navbarPopover', '', {
    root: {
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    link: {
      icon: {
        root: {
          fontSize: themeVariables.navbarIconSize,
          color: themeVariables.navbarTextColor
        }
      },
      text: {
        color: themeVariables.navbarTextColor,
        fontSize: themeVariables.navbarFontSize
      }
    }
  });
});
//# sourceMappingURL=appnavbar.styles.js.map