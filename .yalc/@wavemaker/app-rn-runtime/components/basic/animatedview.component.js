function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { initializeRegistryWithDefinitions } from 'react-native-animatable';
import { View } from 'react-native';
export default class AnimatedviewProps {
  constructor() {
    _defineProperty(this, "entryanimation", null);
    _defineProperty(this, "children", void 0);
    _defineProperty(this, "duration", null);
    _defineProperty(this, "iterationCount", void 0);
    _defineProperty(this, "style", void 0);
    _defineProperty(this, "exitanimation", null);
    _defineProperty(this, "accessibilityProps", void 0);
  }
}
const AnimationMap = {
  bounce: 'bounce',
  flash: 'flash',
  pulse: 'pulse',
  rotate: 'rotate',
  rubberBand: 'rubberBand',
  shake: 'shake',
  swing: 'swing',
  tada: 'tada',
  wobble: 'wobble',
  bounceIn: 'bounceOut',
  bounceInDown: 'bounceOutUp',
  bounceInLeft: 'bounceOutRight',
  bounceInRight: 'bounceOutLeft',
  bounceInUp: 'bounceOutDown',
  fadeIn: 'fadeOut',
  fadeInDown: 'fadeOutUp',
  fadeInDownBig: 'fadeOutUpBig',
  fadeInLeft: 'fadeOutRight',
  fadeInLeftBig: 'fadeOutRightBig',
  fadeInRight: 'fadeOutLeft',
  fadeInRightBig: 'fadeOutLeftBig',
  fadeInUp: 'fadeOutDown',
  fadeInUpBig: 'fadeOutDownBig',
  flipInX: 'flipOutX',
  flipInY: 'flipOutY',
  lightSpeedIn: 'lightSpeedOut',
  slideInDown: 'slideOutUp',
  slideInLeft: 'slideOutRight',
  slideInRight: 'slideOutLeft',
  slideInUp: 'slideOutDown',
  zoomIn: 'zoomOut',
  zoomInDown: 'zoomOutUp',
  zoomInLeft: 'zoomOutRight',
  zoomInRight: 'zoomOutLeft',
  zoomInUp: 'zoomOutDown'
};
const CustomAnimationMap = {
  flipInY: {
    0: {
      transform: [{
        rotateY: "0deg"
      }]
    },
    1: {
      transform: [{
        rotateY: "360deg"
      }]
    }
  },
  flipInX: {
    0: {
      transform: [{
        rotateX: "0deg"
      }]
    },
    1: {
      transform: [{
        rotateX: "360deg"
      }]
    }
  },
  flipOutY: {
    0: {
      transform: [{
        rotateY: "3600deg"
      }]
    },
    1: {
      transform: [{
        rotateY: "0deg"
      }]
    }
  },
  flipOutX: {
    0: {
      transform: [{
        rotateX: "360deg"
      }]
    },
    1: {
      transform: [{
        rotateX: "0deg"
      }]
    }
  },
  slideInDown: {
    from: {
      translateY: -20
    },
    to: {
      translateY: 0
    }
  },
  slideInUp: {
    from: {
      translateY: 20
    },
    to: {
      translateY: 0
    }
  },
  slideOutUp: {
    from: {
      translateY: 0
    },
    to: {
      translateY: -20
    }
  },
  slideOutDown: {
    from: {
      translateY: 0
    },
    to: {
      translateY: 20
    }
  },
  fadeInDown: {
    from: {
      opacity: 0,
      translateY: -20
    },
    to: {
      opacity: 1,
      translateY: 0
    }
  },
  fadeInUp: {
    from: {
      opacity: 0,
      translateY: 20
    },
    to: {
      opacity: 1,
      translateY: 0
    }
  },
  fadeOutDown: {
    from: {
      opacity: 1,
      translateY: 0
    },
    to: {
      opacity: 0,
      translateY: 20
    }
  },
  fadeOutUp: {
    from: {
      opacity: 1,
      translateY: 0
    },
    to: {
      opacity: 0,
      translateY: -20
    }
  }
};
export class Animatedview extends React.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "view", null);
    // @ts-ignore
    _defineProperty(this, "handleViewRef", ref => this.view = ref);
    initializeRegistryWithDefinitions(CustomAnimationMap);
  }
  triggerEntry() {
    return this.view.animate(this.props.entryanimation, this.props.duration).then(endState => endState.finished);
  }
  triggerExit() {
    if (!this.view) {
      return;
    }
    if (this.props.exitanimation) {
      return this.view.animate(this.props.exitanimation, this.props.duration, 1).then(endState => endState.finished);
    } else {
      return this.view.animate(AnimationMap[this.props.entryanimation || ''], this.props.duration, 1).then(endState => endState.finished);
    }
  }
  render() {
    return this.props.entryanimation ? /*#__PURE__*/React.createElement(Animatable.View, _extends({
      animation: this.props.entryanimation,
      duration: this.props.duration,
      useNativeDriver: true,
      style: this.props.style,
      iterationCount: this.props.iterationCount,
      ref: this.handleViewRef
    }, this.props.accessibilityProps), this.props.children) : /*#__PURE__*/React.createElement(View, _extends({
      style: this.props.style
    }, this.props.accessibilityProps), this.props.children);
  }
}
_defineProperty(Animatedview, "defaultProps", {
  duration: 200
});
//# sourceMappingURL=animatedview.component.js.map