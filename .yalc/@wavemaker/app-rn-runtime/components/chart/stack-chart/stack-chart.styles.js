import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { DEFAULT_CLASS as BASE_CHART_DEFAULT_CLASS } from '../basechart.styles';
export const DEFAULT_CLASS = 'app-stack-chart';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  addStyle(DEFAULT_CLASS, BASE_CHART_DEFAULT_CLASS, {});
});
//# sourceMappingURL=stack-chart.styles.js.map