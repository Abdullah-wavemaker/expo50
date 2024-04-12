import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-tabs';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      minHeight: 240,
      elevation: 0,
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderColor: themeVariables.tabBorderColor
    },
    text: {},
    tabContent: {},
    tabHeader: {}
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle('tabs-with-arrow-indicator', '', {
    tabHeader: {
      root: {
        backgroundColor: themeVariables.transparent
      },
      header: {
        marginBottom: 16
      },
      activeIndicator: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
        height: 0
      },
      arrowIndicator: {
        display: 'flex',
        backgroundColor: themeVariables.tabArrowIndicatorBgColor,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{
          rotateZ: '45deg'
        }]
      },
      arrowIndicatorDot: {
        display: 'flex',
        backgroundColor: themeVariables.tabArrowIndicatorDotColor,
        width: 4,
        height: 4,
        borderRadius: 8,
        transform: [{
          translateX: -2
        }, {
          translateY: -2
        }]
      }
    }
  });
});
//# sourceMappingURL=tabs.styles.js.map