function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from "react";
import { ImageBackground, Platform, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import { Camera, CameraType } from "expo-camera";
import * as FileSystem from "expo-file-system";
import permissionManager from '@wavemaker/app-rn-runtime/runtime/services/device/permissions';
import appDisplayManagerService from "@wavemaker/app-rn-runtime/runtime/services/app-display-manager.service";
const styles = {
  preview: {
    top: 0,
    left: 0,
    right: 0,
    flexGrow: 1,
    backgroundColor: 'black'
  },
  actionBtn: {
    flex: 0,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
  actionBar: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20
  },
  leftWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  midWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  circle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  outerCircle: {
    borderWidth: 3,
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: 'white'
  },
  innerCircle: {
    borderRadius: 2,
    height: 20,
    width: 20,
    backgroundColor: 'red'
  }
};
export class CameraService {
  constructor(displayManager) {
    this.displayManager = displayManager;
    _defineProperty(this, "type", CameraType.back);
  }
  captureVideo(options) {
    return new Promise((resolve, reject) => {
      permissionManager.requestPermissions('video').then(() => {
        const destroy = this.displayManager.show({
          content: /*#__PURE__*/React.createElement(CameraView, {
            testID: "camera_view",
            type: this.type,
            captureType: 'video',
            onSuccess: o => {
              destroy.call(this.displayManager);
              /*o.content().catch(() => {}).then(base64 => {
                resolve({videoPath: o.uri, content: base64 || ''});
              });*/
              resolve({
                videoPath: o.uri,
                content: ''
              });
            },
            onCancel: () => {
              destroy.call(this.displayManager);
            }
          })
        });
      }, reject);
    });
  }
  captureImage(params) {
    return new Promise((resolve, reject) => {
      permissionManager.requestPermissions('image').then(() => {
        const destroy = this.displayManager.show({
          content: /*#__PURE__*/React.createElement(CameraView, {
            testID: "camera_view",
            type: this.type,
            captureType: 'image',
            onSuccess: o => {
              destroy.call(this.displayManager);
              o.content().catch(() => {}).then(base64 => {
                resolve({
                  imagePath: o.uri,
                  content: base64 || ''
                });
              });
            },
            onCancel: () => {
              destroy.call(this.displayManager);
            }
          })
        });
      }, reject);
    });
  }
}
class CameraViewProps {
  constructor() {
    _defineProperty(this, "testID", 'camera_view');
    _defineProperty(this, "type", 'back');
    _defineProperty(this, "captureType", 'image');
    _defineProperty(this, "onSuccess", () => {});
    _defineProperty(this, "onCancel", () => {});
  }
}
class CameraViewState {
  constructor() {
    _defineProperty(this, "recording", false);
    _defineProperty(this, "showActionBtns", false);
    _defineProperty(this, "cameraType", CameraType.back);
    _defineProperty(this, "isCaptured", false);
    _defineProperty(this, "closeView", false);
    _defineProperty(this, "cameraContent", {});
  }
}
export class CameraView extends React.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "camera", {});
    // start recording
    _defineProperty(this, "startRecord", async () => {
      this.camera.recordAsync().then(response => {
        response.content = async () => {
          return await FileSystem.readAsStringAsync(response.uri, {
            encoding: 'base64'
          });
        };
        this.setState({
          cameraContent: response,
          isCaptured: true
        });
      });
      if (this.state.showActionBtns) {
        this.setState({
          showActionBtns: false
        });
      }
      this.setState({
        recording: true
      });
    });
    // stop recording
    _defineProperty(this, "stopRecord", async () => {
      this.camera.stopRecording();
      this.setState({
        recording: false
      });
      this.setState({
        showActionBtns: true
      });
    });
    this.state = new CameraViewState();
  }
  toggleCapture() {
    if (this.props.captureType === 'image') {
      this.takePicture();
    } else {
      if (!this.state.recording) {
        this.startRecord();
      } else {
        this.stopRecord();
        this.setState({
          showActionBtns: true
        });
      }
    }
  }
  getTestProps(suffix) {
    const id = this.props.testID + (suffix ? '_' + suffix : '');
    if (Platform.OS === 'android' || Platform.OS === 'web') {
      return {
        accessibilityLabel: id,
        testID: id
      };
    }
    return {
      accessible: false,
      testID: id
    };
  }
  async takePicture() {
    const options = {
      quality: 0.5,
      base64: false,
      skipProcessing: true,
      onPictureSaved: response => {
        response.content = async () => {
          return await FileSystem.readAsStringAsync(response.uri, {
            encoding: 'base64'
          });
        };
        this.setState({
          cameraContent: response,
          isCaptured: true,
          showActionBtns: true
        });
      }
    };
    await this.camera.takePictureAsync(options);
    if (this.state.showActionBtns) {
      this.setState({
        showActionBtns: false
      });
    }
    this.setState({
      showActionBtns: true
    });
  }
  getActionsTemplate() {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.actionBar
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.leftWrapper
    }, /*#__PURE__*/React.createElement(TouchableOpacity, _extends({}, this.getTestProps('close'), {
      onPress: () => {
        this.setState({
          cameraContent: {
            uri: ''
          },
          isCaptured: false,
          closeView: true
        });
        this.props.onCancel();
      }
    }), /*#__PURE__*/React.createElement(Ionicons, {
      name: "close-circle",
      size: 32,
      color: "white"
    }))), /*#__PURE__*/React.createElement(View, {
      style: styles.midWrapper
    }, !this.state.isCaptured ? /*#__PURE__*/React.createElement(TouchableOpacity, _extends({
      style: [styles.circle, styles.outerCircle, this.props.captureType === 'video' && !this.state.recording ? {
        backgroundColor: "red"
      } : {}, this.props.captureType === 'image' ? {
        backgroundColor: "white"
      } : {}],
      onPress: this.toggleCapture.bind(this)
    }, this.getTestProps('capture')), /*#__PURE__*/React.createElement(View, {
      style: [styles.circle, this.props.captureType === 'image' ? {} : styles.innerCircle, this.props.captureType === 'image' ? {
        backgroundColor: "white"
      } : {}]
    })) : null), /*#__PURE__*/React.createElement(View, {
      style: styles.rightWrapper
    }, this.state.showActionBtns ? /*#__PURE__*/React.createElement(TouchableOpacity, _extends({
      onPress: () => {
        this.setState({
          isCaptured: false,
          closeView: true
        });
        this.props.onSuccess(this.state.cameraContent);
        this.setState({
          cameraContent: {
            uri: ''
          }
        });
      }
    }, this.getTestProps('ok')), /*#__PURE__*/React.createElement(Ionicons, {
      name: "checkmark-circle",
      size: 32,
      color: "white"
    })) : /*#__PURE__*/React.createElement(TouchableOpacity, _extends({}, this.getTestProps('toggle'), {
      onPress: () => {
        this.setState({
          cameraType: this.state.cameraType === 'back' ? 'front' : 'back'
        });
      }
    }), /*#__PURE__*/React.createElement(Ionicons, {
      name: "camera-reverse",
      size: 32,
      color: "white"
    }))));
  }
  getPreviewTemplate(actions) {
    return this.props.captureType === 'image' ? /*#__PURE__*/React.createElement(ImageBackground, {
      source: {
        uri: this.state.cameraContent.uri
      },
      resizeMode: ResizeMode.CONTAIN,
      style: {
        flex: 1
      }
    }) : /*#__PURE__*/React.createElement(Video, {
      style: {
        flex: 1
      },
      source: {
        uri: this.state.cameraContent.uri
      },
      shouldPlay: true,
      useNativeControls: true,
      isLooping: true,
      resizeMode: ResizeMode.CONTAIN
    });
  }
  render() {
    if (this.state.closeView) {
      return null;
    }
    const actions = this.getActionsTemplate();
    return /*#__PURE__*/React.createElement(View, {
      style: styles.preview
    }, this.state.isCaptured ? this.getPreviewTemplate(actions) : /*#__PURE__*/React.createElement(Camera, {
      type: CameraType[this.state.cameraType],
      ref: ref => {
        this.camera = ref;
      },
      style: {
        flex: 1
      },
      onCameraReady: () => {}
    }), actions);
  }
}
const cameraService = new CameraService(appDisplayManagerService);
export default cameraService;
//# sourceMappingURL=camera-service.js.map