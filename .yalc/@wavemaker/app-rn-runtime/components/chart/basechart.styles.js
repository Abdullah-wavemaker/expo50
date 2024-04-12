import Color from "color";
import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-chart';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {},
    text: {},
    icon: {
      icon: {
        fontSize: 20
      }
    },
    line: {
      color: themeVariables.chartLineColor
    },
    title: {
      color: themeVariables.chartTitleColor,
      fontSize: 20,
      lineHeight: 24,
      paddingLeft: 10
    },
    subHeading: {
      fontSize: 12,
      lineHeight: 16,
      color: themeVariables.chartSubTitleColor
    },
    legendText: {},
    legenedDot: {},
    axis: {
      stroke: Color(themeVariables.chartAxisColor).fade(0.3).rgb().toString()
    },
    xAxis: {},
    yAxis: {},
    axisLabel: {},
    xAxisLabel: {},
    yAxisLabel: {},
    grid: {
      stroke: Color(themeVariables.chartAxisColor).fade(0.8).rgb().toString(),
      strokeDasharray: '16 4'
    },
    xGrid: {},
    yGrid: {},
    ticks: {
      stroke: Color(themeVariables.chartAxisColor).fade(0.8).rgb().toString()
    },
    xTicks: {},
    yTicks: {},
    tickLabels: {
      stroke: Color(themeVariables.chartAxisColor).fade(0.8).rgb().toString()
    },
    xTickLabels: {},
    yTickLabels: {},
    barChart: {},
    tooltipContainer: {
      backgroundColor: themeVariables.tooltipBgColor,
      borderColor: themeVariables.tooltipBorderColor,
      borderWidth: 1,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 6,
      paddingRight: 6,
      borderRadius: 5
    },
    tooltipXText: {},
    tooltipYText: {},
    bar: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
});
//# sourceMappingURL=basechart.styles.js.map