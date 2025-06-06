import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-camera';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {},
    text: {},
    button: {
      root: {
        minHeight: 30,
        minWidth: 40,
        paddingRight: 0,
        paddingLeft: 7,
        paddingBottom: 4,
        paddingTop: 4,
        borderWidth: 1,
        borderColor: themeVariables.defaultColor2,
        borderStyle: 'solid',
        backgroundColor: themeVariables.primaryColor,
        borderRadius: 20,
        rippleColor: themeVariables.rippleColor
      },
      text: {
        color: themeVariables.cameraTextColor
      },
      icon: {
        text: {
          color: themeVariables.defaultColorF,
          paddingRight: 0
        },
        icon: {
          fontSize: 24
        }
      }
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
});
//# sourceMappingURL=camera.styles.js.map