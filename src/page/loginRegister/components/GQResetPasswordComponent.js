/**
 * Created by lilang on 2018/10/18.
 */

import React, {Component} from 'react';
import {Image, ImageBackground, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import GQBaseComponent from "../../../common/GQBaseComponent";
import {Navigation} from "react-native-navigation";
import GQUtils, {ScaleValue} from "../../../utils/GQUtils";
import RNProgressHUD from "../../../common/RNProgressHUD";
import GQCustomText from "../../../common/customText/GQCustomText";
import LCCountDownButton from "../../../common/LCCountDownButton";
import LoginRegisterActions from "../actions/LoginRegisterActions";
import LoginRegisterStores from "../stores/LoginRegisterStores";
import LoginRegisterConstants from "../constants/LoginRegisterConstants";


export default class GQResetPasswordComponent extends GQBaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      msgCode: '',
      pwdStr: '',
      secureText: true,
    };
  }

  static options(passProps) {
    return {topBar: {title: {text: '重置登录密码'}}};
  }

  componentWillMount() {
    LoginRegisterStores.addCustomListener(LoginRegisterConstants.sendMessage, this._sendMessageListenerCallback)
    LoginRegisterStores.addCustomListener(LoginRegisterConstants.revserPwd, this._submitNewPwdCallback)
  }

  componentWillUnmount() {
    LoginRegisterStores.removeCustomListener(LoginRegisterConstants.sendMessage, this._sendMessageListenerCallback)
    LoginRegisterStores.removeCustomListener(LoginRegisterConstants.revserPwd, this._submitNewPwdCallback)
  }

  render() {

    let inputViewImageName = this.state.secureText ? 'bi' : 'kai';

    let topTipsView = (
      <View style={styles.topTipsViewStyle}>
        <GQCustomText style={styles.topTipsText}>您的信息将全程加密传输</GQCustomText>
      </View>
    )

    let msgCodeView = (
      <View>
        <GQCustomText style={styles.titleText}>手机验证码</GQCustomText>
        <View style={{flexDirection: 'row', marginTop: ScaleValue(28), alignItems: 'center'}}>
          <TextInput
            keyboardType={'number-pad'}
            placeholder={'请输入手机验证码'}
            placeholderTextColor={'#999999'}
            autoCapitalize={'none'}
            autoCorrect={false}
            value={this.state.msgCode}
            fontSize={ScaleValue(30)}
            maxLength={6}
            onChangeText={(text) => this.setState({msgCode: text})}
            style={[styles.textInput]}
          />
          <TouchableOpacity onPress={this._clearMsgCodeAction}>
            <ImageBackground source={{uri: 'close'}} style={{width: 20, height: 20}} resizeMode={'center'}/>
          </TouchableOpacity>
          <LCCountDownButton
            frameStyle={{width: ScaleValue(170), height: ScaleValue(72)}}
            activeTextStyle={{fontSize: ScaleValue(24)}}
            disableTextStyle={{fontSize: ScaleValue(24)}}
            beginText='获取验证码'
            endText='重新获取'
            count={30}
            pressAction={this._sendCodeAction}
            changeWithCount={(count) => count + 's'}
            id='register'
            ref={(e) => {
              this.countDownButton = e
            }}
          />
        </View>
        <View style={styles.line}/>
      </View>
    )

    let newPasswordView = (
      <View>
        <GQCustomText style={styles.titleText}>新的登录密码</GQCustomText>
        <View style={{flexDirection: 'row', marginTop: ScaleValue(36), alignItems: 'center'}}>
          <TextInput
            keyboardType={'name-phone-pad'}
            placeholder={'请输入新的密码，8-20位数字及字母组合'}
            placeholderTextColor={'#999999'}
            autoCapitalize={'none'}
            autoCorrect={false}
            secureTextEntry={this.state.secureText}
            value={this.state.pwdStr}
            fontSize={ScaleValue(30)}
            maxLength={20}
            onChangeText={(text) => this.setState({pwdStr: text})}
            style={[styles.textInput]}
          />
          <TouchableOpacity onPress={() => this._secureAction()}>
            <ImageBackground source={{uri: inputViewImageName}} style={{width: 25, height: 25}}
                             resizeMode={'center'}/>
          </TouchableOpacity>
        </View>
        <View style={[styles.line]}/>
      </View>
    )

    return (
      <View style={styles.container}>
        {topTipsView}
        <View style={styles.contentView}>
          {msgCodeView}
          {newPasswordView}
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={this._nextStepAction}>
          <ImageBackground source={{uri:'buttonbg'}} style={styles.nextButtonBg}>
            <GQCustomText style={styles.nextButtonText}>下一步</GQCustomText>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    )
  }


  _sendMessageListenerCallback = () => {
    this.countDownButton.startCountDown();
  }

  _submitNewPwdCallback = () => {
    Navigation.pop(this.props.componentId)
  }

  _sendCodeAction = () => {
    LoginRegisterActions.sendMessageWithPhone(this.props.phone, 2)
  }

  _clearMsgCodeAction = () => {
    this.setState({msgCode: ''})
  }
  _clearPwdAction = () => {
    this.setState({pwdStr: ''})
  }

  _secureAction() {
    this.setState(prevProps => {
      return {secureText: !prevProps.secureText}
    });
  }

  _nextStepAction = () => {
    let {msgCode, pwdStr} = this.state
    if (msgCode.length === 0) {
      RNProgressHUD.showText('请输入手机验证码')
      return;
    }
    if (!GQUtils.checkPassword(pwdStr)) {
      RNProgressHUD.showText('请输入字母+数字8~20位组合的密码');
      return;
    }
    LoginRegisterActions.submitNewPwd({mobile: this.props.phone, code: this.state.msgCode, pwd: this.state.pwdStr})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topTipsViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: ScaleValue(64),
    backgroundColor: '#fff8ea'
  },
  topTipsText: {
    color: "#ffae3a",
    fontSize: ScaleValue(24),
  },
  contentView: {
    marginLeft: ScaleValue(30),
    marginTop: ScaleValue(20),
    marginRight: ScaleValue(30),
  },
  titleText: {
    color: '#999999',
    fontSize: ScaleValue(24),
    marginTop: ScaleValue(40),
  },
  textInputContentView: {
    // height: ScaleValue(40),
    marginTop: ScaleValue(20),
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    marginRight: 15,
    flex: 1,
    height: ScaleValue(60),
  },
  line: {
    height: ScaleValue(1),
    backgroundColor: '#e7e7e7',
  },
  nextButton: {
    marginTop: 50,
    marginLeft: 15,
    marginRight: 15,
    // justifyContent: 'center',
    // alignItems: 'center',
    height: ScaleValue(90),
    // backgroundColor: '#ff401f',
  },
  nextButtonBg: {
    width:'100%',
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 17,
    color: '#FFFFFF',
  },
})