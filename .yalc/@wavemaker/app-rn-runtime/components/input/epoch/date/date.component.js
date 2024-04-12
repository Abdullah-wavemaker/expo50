import WmDateProps from './date.props';
import { DEFAULT_CLASS } from './date.styles';
import BaseDatetime from '../base-datetime.component';
export default class WmDate extends BaseDatetime {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmDateProps());
  }
  getStyleClassName() {
    const classes = [];
    if (this.state.props.floatinglabel) {
      classes.push('app-date-with-label');
    }
    classes.push(super.getStyleClassName());
    return classes.join(' ');
  }
  renderWidget(props) {
    return super.renderWidget(props);
  }
}
//# sourceMappingURL=date.component.js.map