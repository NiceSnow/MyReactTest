import * as helper from './helper'
import React, {Component} from 'react'
import {
  StyleSheet,
  PanResponder,
  View,
  Text,
  Image,
  Dimensions, TouchableOpacity
} from 'react-native'
import Line from './line'
import Circle from './circle'
import PropTypes from 'prop-types';
import {ScaleValue} from "../../utils/GQUtils";
import GQCustomText from "../customText/GQCustomText";
import TouchID from "react-native-touch-id";
import GQUserInfo from "../../utils/GQUserInfo";

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const isVertical = Height > Width;
const Top = isVertical ? (Height - Width) / 1.8 * 1.8 : 10;
const Radius = isVertical ? Width / 11 : Width / 25;

// const Width = 200;
// const Height = 200;
// const isVertical = 1;
// const Top = isVertical ? (Height - Width) / 2.0 * 1.25 : 10;
// const Radius = isVertical ? Width / 10 : Width / 25;

const optionalConfigObject = {
  title: "Authentication Required", // Android
  color: "#e00606", // Android
  sensorDescription: "Touch sensor", // Android
  cancelText: "Cancel", // Android
  fallbackLabel: "", // iOS (if empty, then label is hidden)
  unifiedErrors: false // use unified error messages (default false)
}

export default class GesturePassword extends Component {
  constructor(props) {
    super(props);

    this.timer = null;
    this.lastIndex = -1;
    this.sequence = '';   // 手势结果
    this.isMoving = false;

    // getInitialState
    let circles = [];
    let Margin = Radius - 5;
    for (let i = 0; i < 9; i++) {
      let p = i % 3;
      let q = parseInt(i / 3);
      circles.push({
        isActive: false,
        x: p * (Radius * 2 + Margin) + Margin + Radius + 32,
        y: q * (Radius * 2 + Margin) + Margin + Radius + 40,
      });
    }

    this.state = {
      circles: circles,
      lines: [],
      isOpenTouchID: this.props.isOpenTouchID,
      isOpenGesturePassword: this.props.gesturePassword.length > 0,
      // 1是指纹，2是手势
      currentStyle: 0,
      //切换验证方式的文字
      switchText:'',
      //点击开始验证的文字
      startText:''
    }
  }

  static defaultProps = {
    isOpenTouchID: false,
    gesturePassword: ''
  }

  componentDidMount() {
    if (this.props.isOpenTouchID) {
      this.setState({currentStyle: 1})
      this._onPressTouchAction();
    }
    if (!this.props.isOpenTouchID && this.props.gesturePassword.length > 0) {
      this.setState({currentStyle: 2})
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => true,

      // 开始手势操作
      onPanResponderGrant: (event, gestureState) => {
        this.onStart(event, gestureState);
      },
      // 移动操作
      onPanResponderMove: (event, gestureState) => {
        this.onMove(event, gestureState);
      },
      // 释放手势
      onPanResponderRelease: (event, gestureState) => {
        this.onEnd(event, gestureState);
      }
    })

    this._checkBiometryType();
  }

  // 检测生物识别类型 TouchID,FaceID
  async _checkBiometryType() {
    let biometryType = 'TouchID'
    try {
      biometryType = await TouchID.isSupported();
    } catch (e) {
    }
    this.setState({
      startText: biometryType == 'TouchID' ? '点击进行指纹登录' : '点击进行面容登录',
      switchText: biometryType == 'TouchID' ? '指纹密码登录' : '面容登录',
    })
  }

  render() {

    return (
      <View style={[styles.frame, this.props.style, {flex: 1}]}>
        <Image source={{uri: 'tx'}} style={styles.logo}/>
        {this.renderSwitchView()}
        {this.renderAuthView()}
        {this.props.children}
      </View>
    )
  }

  renderAuthView() {
    if (this.state.currentStyle === 1) {
      return (
        <View style={styles.board}>
          <View style={{alignItems: 'center', flex: 1}}>
            <TouchableOpacity onPress={this._onPressTouchAction}>
              <Image source={{uri: 'zhiwen'}} style={styles.logo}/>
            </TouchableOpacity>
            <GQCustomText style={styles.tipText}>{this.state.startText}</GQCustomText>
          </View>
        </View>)
    } else {
      let wrong = this.props.status === 'wrong';
      let color = wrong ? this.props.wrongColor : this.props.rightColor;
      return (
        <View style={styles.board} {...this._panResponder.panHandlers}>
          <View style={styles.message}>
            <Text style={[styles.msgText, this.props.textStyle, wrong && {color: color}]}>
              {this.state.message || this.props.message}
            </Text>
            {/*<Text style={[styles.msgText, this.props.textStyle, {color: color}]}>*/}
            {/*{this.state.message || this.props.message}*/}
            {/*</Text>*/}
          </View>
          {this.renderCircles()}
          {this.renderLines()}
          <Line ref='line' color={color}/>
        </View>
      )
    }
  }

  renderSwitchView() {

    let leftText = this.state.currentStyle == 1 ? '手势密码登录' : this.state.switchText;
    let isDisplayLeftText = this.state.isOpenTouchID && this.state.isOpenGesturePassword;

    return (
      <View style={styles.switchView}>
        {isDisplayLeftText &&
        <TouchableOpacity onPress={this._onPressGestureLogin}>
          <GQCustomText style={styles.switchViewText}>{leftText}</GQCustomText>
        </TouchableOpacity>}
        {isDisplayLeftText && <View style={styles.switchViewLine}/>}
        <TouchableOpacity onPress={this.props.passwordLogin}>
          <GQCustomText style={styles.switchViewText}>账号密码登录</GQCustomText>
        </TouchableOpacity>
      </View>
    )
  }

  renderCircles() {
    let array = [], fill, color, inner, outer;
    let {status, normalColor, wrongColor, rightColor, innerCircle, outerCircle, circleBackgroundColor} = this.props;

    this.state.circles.forEach(function (c, i) {
      fill = c.isActive;
      color = status === 'wrong' ? wrongColor : rightColor;
      inner = !!innerCircle;
      outer = !!outerCircle;

      array.push(
        <Circle key={'c_' + i} fill={fill} normalColor={normalColor} color={color} x={c.x} y={c.y} r={Radius}
                inner={inner} outer={outer} backgroundColor={circleBackgroundColor}/>
      )
    });

    return array;
  }

  renderLines() {
    let array = [], color;
    let {status, wrongColor, rightColor} = this.props;

    this.state.lines.forEach(function (l, i) {
      color = status === 'wrong' ? wrongColor : rightColor;

      array.push(
        <Line key={'l_' + i} color={color} start={l.start} end={l.end}/>
      )
    });

    return array;
  }

  setActive(index) {
    this.state.circles[index].isActive = true;

    let circles = this.state.circles;
    this.setState({circles});
  }

  resetActive() {
    this.state.lines = [];
    for (let i = 0; i < 9; i++) {
      this.state.circles[i].isActive = false;
    }

    let circles = this.state.circles;
    this.setState({circles});
    this.props.onReset && this.props.onReset();
  }

  getTouchChar(touch) {
    let x = touch.x;
    let y = touch.y;

    for (let i = 0; i < 9; i++) {
      if (helper.isPointInCircle({x, y}, this.state.circles[i], Radius)) {
        return String(i);
      }
    }

    return false;
  }

  getCrossChar(char) {
    let middles = '13457', last = String(this.lastIndex);

    if (middles.indexOf(char) > -1 || middles.indexOf(last) > -1) return false;

    let point = helper.getMiddlePoint(this.state.circles[last], this.state.circles[char]);

    for (let i = 0; i < middles.length; i++) {
      let index = middles[i];
      if (helper.isEquals(point, this.state.circles[index])) {
        return String(index);
      }
    }

    return false;
  }

  onStart(e, g) {
    let x = isVertical ? e.nativeEvent.pageX : e.nativeEvent.pageX - Width / 3.4;
    let y = isVertical ? e.nativeEvent.pageY - Top / 1.8 : e.nativeEvent.pageY - 30;

    let lastChar = this.getTouchChar({x, y});
    if (lastChar) {
      this.isMoving = true;
      this.lastIndex = Number(lastChar);
      this.sequence = lastChar;
      this.resetActive();
      this.setActive(this.lastIndex);

      let point = {
        x: this.state.circles[this.lastIndex].x,
        y: this.state.circles[this.lastIndex].y
      };

      this.refs.line.setNativeProps({start: point, end: point});

      this.props.onStart && this.props.onStart();

      if (this.props.interval > 0) {
        clearTimeout(this.timer);
      }
    }
  }

  onMove(e, g) {
    let x = isVertical ? e.nativeEvent.pageX : e.nativeEvent.pageX - Width / 3.4;
    let y = isVertical ? e.nativeEvent.pageY - Top / 1.8 : e.nativeEvent.pageY - 30;
    // let y = isVertical ? e.nativeEvent.pageY : e.nativeEvent.pageY - 30;
    if (this.isMoving) {
      this.refs.line.setNativeProps({end: {x, y}});

      let lastChar = null;

      if (!helper.isPointInCircle({x, y}, this.state.circles[this.lastIndex], Radius)) {
        lastChar = this.getTouchChar({x, y});
      }

      if (lastChar && this.sequence.indexOf(lastChar) === -1) {
        if (!this.props.allowCross) {
          let crossChar = this.getCrossChar(lastChar);

          if (crossChar && this.sequence.indexOf(crossChar) === -1) {
            this.sequence += crossChar;
            this.setActive(Number(crossChar));
          }
        }

        let lastIndex = this.lastIndex;
        let thisIndex = Number(lastChar);

        this.state.lines.push({
          start: {
            x: this.state.circles[lastIndex].x,
            y: this.state.circles[lastIndex].y
          },
          end: {
            x: this.state.circles[thisIndex].x,
            y: this.state.circles[thisIndex].y
          }
        });

        this.lastIndex = Number(lastChar);
        this.sequence += lastChar;

        this.setActive(this.lastIndex);

        let point = {
          x: this.state.circles[this.lastIndex].x,
          y: this.state.circles[this.lastIndex].y
        };

        this.refs.line.setNativeProps({start: point});
      }
    }

    if (this.sequence.length === 9) this.onEnd();
  }

  onEnd(e, g) {
    if (this.isMoving) {
      let password = helper.getRealPassword(this.sequence);
      this.sequence = '';
      this.lastIndex = -1;
      this.isMoving = false;

      let origin = {x: 0, y: 0};
      this.refs.line.setNativeProps({start: origin, end: origin});

      this.props.onEnd && this.props.onEnd(password);

      if (this.props.interval > 0) {
        this.timer = setTimeout(() => this.resetActive(), this.props.interval);
      }
    }
  }

  _onPressTouchAction = () => {
    TouchID.authenticate('请验证指纹', optionalConfigObject).then(success => {
      //验证成功后进行的操作
      if (this.props.authSuccess) {
        this.props.authSuccess();
      }
    }).catch(error => {
      //验证失败后进行的操作
      // RNProgressHUD.showText('Authentication Failed')
    });
  }

  _onPressGestureLogin = () => {

    if (this.state.currentStyle == 1) {
      this.setState({currentStyle: 2})
    } else {
      this.setState({currentStyle: 1})
      this._onPressTouchAction();
    }
  }

}

GesturePassword.propTypes = {
  message: PropTypes.string,
  circleBackgroundColor: PropTypes.string,
  normalColor: PropTypes.string,
  rightColor: PropTypes.string,
  wrongColor: PropTypes.string,
  status: PropTypes.oneOf(['right', 'wrong', 'normal']),
  onStart: PropTypes.func,
  onEnd: PropTypes.func,
  onReset: PropTypes.func,
  interval: PropTypes.number,
  allowCross: PropTypes.bool,
  innerCircle: PropTypes.bool,
  outerCircle: PropTypes.bool
};

GesturePassword.defaultProps = {
  message: '',
  circleBackgroundColor: '#fff5f3',
  normalColor: '#5FA8FC',
  rightColor: '#5FA8FC',
  wrongColor: '#D93609',
  status: 'normal',
  interval: 0,
  allowCross: false,
  innerCircle: true,
  outerCircle: true
};

const styles = StyleSheet.create({
  frame: {
    // backgroundColor: '#292B38'
  },
  board: {
    position: 'absolute',
    left: isVertical ? 0 : Width / 3.4,
    top: isVertical ? Top / 1.8 : 30,
    width: Width,
    height: Height - 300,
    // backgroundColor: 'skyblue'
  },
  message: {
    // position: 'absolute',
    left: 0,
    top: -30,
    width: Width,
    height: Top / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  msgText: {
    fontSize: 14
  },
  logo: {
    alignSelf: 'center',
    marginTop: ScaleValue(148),
    width: ScaleValue(130),
    height: ScaleValue(130),
  },
  touch: {
    marginTop: ScaleValue(186),
  },
  tipText: {
    fontSize: ScaleValue(30),
    color: '#333333',
    marginTop: ScaleValue(60),
  },
  switchView: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    alignSelf: 'center',
    bottom: ScaleValue(140),
  },
  switchViewLine: {
    backgroundColor: '#567df2',
    marginLeft: ScaleValue(30),
    marginRight: ScaleValue(30),
    width: ScaleValue(2),
    height: ScaleValue(30),
  },
  switchViewText: {
    color: '#567df2'
  },
});

module.exports = GesturePassword;
