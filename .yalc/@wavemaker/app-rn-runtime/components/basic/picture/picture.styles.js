import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-picture';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      overflow: 'hidden',
      width: 270,
      rippleColor: themeVariables.transparent
    },
    text: {},
    picture: {
      width: '100%',
      height: '100%'
    },
    skeleton: {
      root: {
        width: '100%',
        height: 128
      }
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle('rounded-image', '', {
    picture: {
      borderRadius: 6
    }
  });
  addStyle('thumbnail-image', '', {
    root: {
      backgroundColor: themeVariables.pictureThumbBgColor,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: themeVariables.pictureThumbBorderColor,
      borderRadius: 6,
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 8,
      paddingRight: 8
    }
  });
});
//# sourceMappingURL=picture.styles.js.map