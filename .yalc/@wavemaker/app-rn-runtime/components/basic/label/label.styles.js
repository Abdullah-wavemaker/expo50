import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { deepCopy } from '@wavemaker/app-rn-runtime/core/utils';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-label';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      alignSelf: 'flex-start'
    },
    text: {
      fontSize: 16,
      color: themeVariables.labelDefaultColor
    },
    asterisk: {
      color: themeVariables.labelAsteriskColor,
      marginLeft: 2
    },
    skeleton: {
      root: {
        width: '100%',
        height: 16,
        borderRadius: 4
      }
    },
    link: {
      text: {
        textDecorationLine: 'underline'
      }
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle(DEFAULT_CLASS + '-rtl', '', {
    root: {
      flexDirection: 'row',
      textAlign: 'right'
    }
  });
  const getLabelStyles = (color, textColor) => {
    return {
      root: {
        backgroundColor: color,
        paddingLeft: 32,
        paddingTop: 16,
        paddingRight: 32,
        paddingBottom: 16,
        borderRadius: 6
      },
      text: {
        color: textColor,
        fontWeight: 'bold'
      }
    };
  };
  addStyle('label-danger', '', getLabelStyles(themeVariables.labelDangerColor, themeVariables.labelDangerContrastColor));
  addStyle('label-default', '', getLabelStyles(themeVariables.labelDefaultColor, themeVariables.labelDefaultContrastColor));
  addStyle('label-info', '', getLabelStyles(themeVariables.labelInfoColor, themeVariables.labelInfoContrastColor));
  addStyle('label-primary', '', getLabelStyles(themeVariables.labelPrimaryColor, themeVariables.labelPrimaryContrastColor));
  addStyle('label-success', '', getLabelStyles(themeVariables.labelSuccessColor, themeVariables.labelSuccessContrastColor));
  addStyle('label-warning', '', getLabelStyles(themeVariables.labelWarningColor, themeVariables.labelWarningContrastColor));
  addStyle('label-test', '', getLabelStyles('yellow', 'red'));
  addStyle('label-test1', '', getLabelStyles('blue', 'orange'));
  const getTextStyles = color => {
    return {
      text: {
        color: color
      }
    };
  };
  addStyle('text-danger', '', getTextStyles(themeVariables.labelTextDangerColor));
  addStyle('text-info', '', getTextStyles(themeVariables.labelTextInfoColor));
  addStyle('text-primary', '', getTextStyles(themeVariables.labelTextPrimaryColor));
  addStyle('text-success', '', getTextStyles(themeVariables.labelTextSuccessColor));
  addStyle('text-warning', '', getTextStyles(themeVariables.labelTextWarningColor));
  addStyle('text-center', '', {
    root: {
      textAlign: 'center'
    }
  });
  addStyle('text-left', '', {
    root: {
      textAlign: 'left'
    }
  });
  addStyle('text-right', '', {
    root: {
      textAlign: 'right'
    }
  });
  const getHeadingStyles = (fontSize, overrides) => {
    return deepCopy({
      text: {
        fontWeight: '400',
        fontSize: fontSize,
        margin: 4,
        color: themeVariables.labelHeaderColor
      }
    }, overrides);
  };
  addStyle('h1', '', getHeadingStyles(themeVariables.heading1FontSize, {
    text: {
      fontWeight: 'bold'
    }
  }));
  addStyle('h2', '', getHeadingStyles(themeVariables.heading2FontSize, {
    text: {
      fontWeight: '500'
    }
  }));
  addStyle('h3', '', getHeadingStyles(themeVariables.heading3FontSize));
  addStyle('h4', '', getHeadingStyles(themeVariables.heading4FontSize));
  addStyle('h5', '', getHeadingStyles(themeVariables.heading5FontSize));
  addStyle('h6', '', getHeadingStyles(themeVariables.heading6FontSize));
  addStyle('media-heading', '', {
    text: {
      fontSize: 16
    }
  });
  addStyle('text-muted', '', {
    text: {
      color: themeVariables.labelTextMutedColor
    }
  });
  addStyle('p', '', {
    text: {
      fontSize: 12
    }
  });
});
//# sourceMappingURL=label.styles.js.map