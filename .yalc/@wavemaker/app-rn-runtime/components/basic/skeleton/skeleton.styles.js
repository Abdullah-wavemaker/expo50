import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-skeleton';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      backgroundColor: themeVariables.skeletonBgColor,
      overflow: 'hidden'
    },
    text: {},
    animatedView: {
      flex: 1,
      width: 60,
      backgroundColor: themeVariables.skeletonAnimatedBgColor,
      height: '100%',
      marginTop: -10,
      marginBottom: -10,
      padding: 0
    },
    gradient: {
      width: '100%',
      padding: 0,
      margin: 0,
      height: '100%',
      shadowColor: themeVariables.skeletonGradientShadowColor,
      shadowOffset: {
        width: 0,
        height: 10
      },
      elevation: 5,
      shadowOpacity: 0.4,
      opacity: 0.6,
      backgroundColor: themeVariables.skeletonGradientBgColor
    },
    gradientForeground: {
      backgroundColor: themeVariables.skeletonGradientForegroundColor
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
});
//# sourceMappingURL=skeleton.styles.js.map