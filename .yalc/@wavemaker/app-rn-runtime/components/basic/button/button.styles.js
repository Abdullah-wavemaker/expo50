import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-button';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      minHeight: 40,
      borderRadius: 32,
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 24,
      paddingRight: 24,
      alignSelf: 'flex-start',
      rippleColor: themeVariables.rippleColor
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      fontSize: 14,
      fontFamily: themeVariables.baseFont,
      fontWeight: '500',
      textAlign: 'center',
      textTransform: 'capitalize'
    },
    badge: {
      backgroundColor: themeVariables.buttonBadgeBackgroundColor,
      color: themeVariables.buttonBadgeTextColor,
      alignSelf: 'flex-end',
      position: 'relative',
      bottom: 60,
      marginRight: 18,
      borderWidth: 1,
      borderStyle: 'solid'
    },
    icon: {
      root: {
        alignSelf: 'auto',
        paddingLeft: -8,
        paddingRight: -8
      },
      text: {
        paddingRight: themeVariables.buttonTextPadding,
        fontSize: 16
      }
    },
    skeleton: {
      root: {
        width: 96,
        height: 48,
        borderRadius: 4
      }
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle(DEFAULT_CLASS + '-disabled', '', {
    root: {
      opacity: 0.5
    }
  });
  const getButtonStyles = function (bgColor, color) {
    let borderColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : bgColor;
    return {
      root: {
        borderWidth: 1,
        borderColor: borderColor,
        borderStyle: 'solid',
        backgroundColor: bgColor
      },
      text: {
        color: color
      },
      badge: {
        backgroundColor: color,
        color: bgColor,
        borderColor: bgColor
      },
      icon: {
        text: {
          color: color
        }
      }
    };
  };
  const linkBtnStyle = getButtonStyles(themeVariables.buttonLinkColor, themeVariables.buttonLinkTextColor);
  const buttonWithOnlyLabel = getButtonStyles(themeVariables.buttonLinkColor, themeVariables.buttonLinkTextColor);
  linkBtnStyle.root.paddingVertical = 4;
  linkBtnStyle.text.textDecorationColor = themeVariables.buttonLinkTextColor;
  linkBtnStyle.text.textDecorationLine = 'underline';
  linkBtnStyle.text.textDecorationStyle = 'solid';
  addStyle('btn-default', '', getButtonStyles(themeVariables.buttonDefaultColor, themeVariables.buttonDefaultTextColor, themeVariables.buttonBorderColor));
  addStyle('btn-info', '', getButtonStyles(themeVariables.buttonInfoColor, themeVariables.buttonInfoTextColor));
  addStyle('btn-primary', '', getButtonStyles(themeVariables.buttonPrimaryColor, themeVariables.buttonPrimaryTextColor));
  addStyle('btn-secondary', '', getButtonStyles(themeVariables.buttonSecondaryColor, themeVariables.buttonSecondaryTextColor, themeVariables.buttonSecondaryTextColor));
  addStyle('btn-danger', '', getButtonStyles(themeVariables.buttonDangerColor, themeVariables.buttonDangerTextColor));
  addStyle('btn-success', '', getButtonStyles(themeVariables.buttonSuccessColor, themeVariables.buttonSuccessTextColor));
  addStyle('btn-warning', '', getButtonStyles(themeVariables.buttonWarningColor, themeVariables.buttonWarningTextColor));
  addStyle('btn-link', '', linkBtnStyle);
  addStyle('btn-only-label', '', buttonWithOnlyLabel);
  addStyle('btn-dark', '', getButtonStyles(themeVariables.buttonDarkColor, themeVariables.buttonDarkTextColor));
  addStyle('btn-light', '', getButtonStyles(themeVariables.buttonLightColor, themeVariables.buttonLightTextColor));
  addStyle('fab-btn', 'btn-primary', {
    root: {
      ...BASE_THEME.getStyle('elevate2').root,
      position: 'fixed',
      bottom: 160,
      right: 48,
      width: 56,
      height: 56,
      borderRadius: 56,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      marginLeft: 0,
      marginRight: 0
    },
    icon: {
      icon: {
        fontSize: 24
      }
    }
  });
  addStyle('mini-fab-btn', 'fab-btn', {
    root: {
      width: 40,
      height: 40
    }
  });
});
//# sourceMappingURL=button.styles.js.map