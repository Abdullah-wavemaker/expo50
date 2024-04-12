import WmDatetimeProps from './datetime.props';
import { DEFAULT_CLASS } from './datetime.styles';
import BaseDatetime from '../base-datetime.component';
export default class WmDatetime extends BaseDatetime {
  constructor(props) {
    super(props, DEFAULT_CLASS, new WmDatetimeProps());
  }
  getStyleClassName() {
    const classes = [];
    if (this.state.props.floatinglabel) {
      classes.push('app-datetime-with-label');
    }
    classes.push(super.getStyleClassName());
    return classes.join(' ');
  }
  renderWidget(props) {
    return super.renderWidget(props);
  }
}
//# sourceMappingURL=datetime.component.js.map