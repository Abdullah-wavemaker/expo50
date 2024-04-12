import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
export const DEFAULT_CLASS = 'app-tabheader';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = {
    root: {
      flexDirection: 'row',
      minWidth: '100%',
      overflow: 'visible',
      backgroundColor: themeVariables.tabHeaderBgColor
    },
    text: {},
    header: {
      backgroundColor: themeVariables.tabHeaderBgColor,
      paddingTop: 16,
      paddingBottom: 16,
      paddingVertical: 12,
      minWidth: 80,
      minHeight: 48,
      flexDirection: 'row',
      justifyContent: 'center',
      flexGrow: 1
    },
    headerIcon: {
      text: {
        color: themeVariables.tabHeaderIconColor
      },
      icon: {
        fontSize: 24
      }
    },
    headerText: {
      color: themeVariables.tabHeaderTextColor,
      overflow: 'visible',
      fontFamily: themeVariables.baseFont,
      fontWeight: '500',
      fontSize: 14
    },
    activeHeader: {
      backgroundColor: themeVariables.tabActiveHeaderBgColor
    },
    activeIndicator: {
      backgroundColor: themeVariables.tabActiveIndicatorBgColor,
      width: 100,
      height: 2,
      marginTop: -2
    },
    activeHeaderIcon: {
      text: {
        color: themeVariables.tabActiveHeaderIconColor
      }
    },
    activeHeaderText: {
      color: themeVariables.tabActiveHeaderTextColor
    },
    arrowIndicator: {
      display: 'none',
      backgroundImage: '',
      backgroundSize: '100% 100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    },
    arrowIndicatorDot: {
      display: 'none'
    },
    skeleton: {}
  };
  addStyle(DEFAULT_CLASS, '', defaultStyles);
});
//# sourceMappingURL=tabheader.styles.js.map