import WmTimeProps from './time.props';
import { DEFAULT_CLASS } from './time.styles';
import BaseDatetime from '../base-datetime.component';
export default class WmTime extends BaseDatetime {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmTimeProps());
  }
  getStyleClassName() {
    const classes = [];
    if (this.state.props.floatinglabel) {
      classes.push('app-time-with-label');
    }
    classes.push(super.getStyleClassName());
    return classes.join(' ');
  }
  onDateChange($event, date) {
    super.onDateChange($event, date);
  }
  get timestamp() {
    return this.state.dateValue;
  }
  renderWidget(props) {
    return super.renderWidget(props);
  }
}
//# sourceMappingURL=time.component.js.map