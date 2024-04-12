import Color from 'color';
import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-progress-bar';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {},
    text: {},
    progressBar: {
      height: 4
    },
    progressValue: {}
  });
  const getStyle = color => ({
    progressBar: {
      backgroundColor: Color(color).alpha(0.2).rgb().toString()
    },
    progressValue: {
      color: color
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle('app-default-progress-bar', '', getStyle(themeVariables.progressBarDefaultColor));
  addStyle('app-success-progress-bar', '', getStyle(themeVariables.progressBarSuccessColor));
  addStyle('app-info-progress-bar', '', getStyle(themeVariables.progressBarInfoColor));
  addStyle('app-danger-progress-bar', '', getStyle(themeVariables.progressBarDangerColor));
  addStyle('app-warning-progress-bar', '', getStyle(themeVariables.progressBarWarningColor));
});
//# sourceMappingURL=progress-bar.styles.js.map