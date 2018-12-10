/**
 * Created by lilang on 2018-09-30.
 */

import React, {Component} from 'react';
import {
  View, Image, TextInput, StyleSheet, TouchableOpacity, Modal,
  ScrollView, ImageBackground,
} from 'react-native';
import GQUtils, {ScaleValue} from '../../../utils/GQUtils';
import LCCountDownButton from '../../../common/LCCountDownButton';
import KeyboardManager from 'react-native-keyboard-manager';
import GQCustomText from '../../../common/customText/GQCustomText';
import LoginRegisterStores from "../stores/LoginRegisterStores";
import LoginRegisterConstants from "../constants/LoginRegisterConstants";
import {Navigation} from 'react-native-navigation';
import LoginRegisterActions from "../actions/LoginRegisterActions";
import {GQScreenNames} from "../../screens/GQScreenNames";
import GQBaseComponent from "../../../common/GQBaseComponent";
import RNProgressHUD from "../../../common/RNProgressHUD";
import MessageAuthCodeDialog from "./MessageAuthCodeDialog";
import {GQHTMLConfig} from "../../../config/GQHTMLConfig";
import {GQAppMananger} from "../../../utils/GQAppManager";

export default class RegisterComponent extends GQBaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      pwdStr: '',
      msgCodeStr: '',
      invitationStr: '',
      isAgree: false,
      modalVisible: false,
    };
  }

  componentWillMount() {
    LoginRegisterStores.addCustomListener(LoginRegisterConstants.register, this._registerListenerCallback)
    LoginRegisterStores.addCustomListener(LoginRegisterConstants.sendMessage, this._sendMessageListenerCallback)
  }

  componentWillUnmount() {
    LoginRegisterStores.removeCustomListener(LoginRegisterConstants.register, this._registerListenerCallback)
    LoginRegisterStores.removeCustomListener(LoginRegisterConstants.sendMessage, this._sendMessageListenerCallback)
  }

  static options(passProps) {
    return {topBar: {title: {text: '注册'}}};
  }

  _registerListenerCallback = () => {
    let {data} = LoginRegisterStores.getTempResponse();
    if (data.token.length > 0) {
      RNProgressHUD.showText('注册成功');
      Navigation.push(this.props.componentId, {
        component: {
          name: GQScreenNames.realNameAuth,
          passProps: {
            hideBack: true,
            skipAction: this.props.authSuccess
          },
          options: {
            popGesture: false,
            bottomTabs: {
              visible: false,
              animate: true,
            },
          }
        },
      });
    }
  }

  _sendMessageListenerCallback = () => {
    this.countDownButton.startCountDown();
  }

  sendCodeAction() {
    LoginRegisterActions.sendMessageWithPhone(this.props.phone, 1)
  }

  agreeAction() {
    this.setState(prevProps => {
      return {isAgree: !prevProps.isAgree}
    })
  }

  nextAction() {
    // Navigation.push(this.props.componentId, {
    //   component: {
    //     name: GQScreenNames.realNameAuth,
    //     passProps:{
    //       hideBack:true,
    //     },
    //     options: {
    //       bottomTabs: {
    //         visible: false,
    //         animate: true,
    //       },
    //     }
    //   },
    // });
    // return;
    //验证密码是否有效
    //
    if (!GQUtils.checkPassword(this.state.pwdStr)) {
      RNProgressHUD.showText('密码为字母+数字8~20位组合');
      return;
    }
    if (this.state.msgCodeStr.length === 0) {
      RNProgressHUD.showText('请填写短信验证码');
      return;
    }

    if (!this.state.isAgree) {
      RNProgressHUD.showText('请先阅读并同意协议');
    } else {
      LoginRegisterActions.register({
        userName: this.props.phone,
        password: this.state.pwdStr,
        invitatCode: this.state.invitationStr,
        code: this.state.msgCodeStr,
      }, true);
    }
  }

  forgetAction() {
    Navigation.push(this.props.componentId, {
      component: {
        name: GQScreenNames.resetPassword,
        passProps: {
          phone: this.props.phone
        }
      }
    })
  }

  _noMessageAction = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: GQScreenNames.webview,
        passProps: {
          url: GQAppMananger.getHTMLUrl() + GQHTMLConfig.helpcenter,
          title: '帮助',
        },
        options: {
          bottomTabs: {
            visible: false,
          }
        }
      }
    })
  }

  render() {
    let agreeImageName = this.state.isAgree ? 'checkbox1' : 'checkbox';
    return (
      <ScrollView
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='handled'>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <MessageAuthCodeDialog cancelAction={() => this.setState({modalVisible: false})}/>
        </Modal>
        <View style={styles.container}>
          <Image style={styles.logo} source={{uri: 'Family'}}/>
          <View style={{alignItems: 'flex-start'}}>
            <TextInput
              keyboardType={'name-phone-pad'}
              placeholder={'设置登录密码，8-20位数字及字母组合'}
              placeholderTextColor={'#999999'}
              autoCapitalize={'none'}
              autoCorrect={false}
              secureTextEntry={true}
              value={this.state.pwdStr}
              fontSize={ScaleValue(32)}
              maxLength={20}
              onChangeText={(text) => this.setState({pwdStr: text})}
              style={[styles.textInput, {marginTop: 50}]}
            />
          </View>
          <View style={styles.line}/>
          <View style={styles.msgCodeInputContentView}>
            <TextInput
              keyboardType={'number-pad'}
              placeholder={'短信验证码'}
              placeholderTextColor={'#999999'}
              fontSize={ScaleValue(32)}
              maxLength={6}
              onChangeText={(text) => this.setState({msgCodeStr: text})}
              style={{height: 40, flex: 1}}
            />
            <LCCountDownButton frameStyle={{height: 36}}
                               activeTextStyle={{fontSize: ScaleValue(24)}}
                               disableTextStyle={{fontSize: ScaleValue(24)}}
                               beginText='获取验证码'
                               endText='重新获取'
                               count={30}
                               pressAction={() => {
                                 this.sendCodeAction()
                               }}
                               changeWithCount={(count) => count + 's'}
                               id='register'
                               ref={(e) => {
                                 this.countDownButton = e
                               }}
            />
          </View>
          <View style={styles.line}/>
          <TextInput
            keyboardType={'number-pad'}
            placeholder={'邀请码（选填）'}
            placeholderTextColor={'#999999'}
            fontSize={ScaleValue(32)}
            // maxLength={20}
            onChangeText={(text) => this.setState({invitationStr: text})}
            style={styles.textInput}
          />
          <View style={styles.line}/>
          <TouchableOpacity
            style={{alignItems: 'flex-end', marginTop: ScaleValue(30), marginRight: ScaleValue(30)}}
            onPress={this._noMessageAction}
          >
            <GQCustomText style={[styles.font11, {color: '#4AA8FD'}]}>收不到验证码?</GQCustomText>
          </TouchableOpacity>
          <View style={{marginTop: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => this.agreeAction()}>
              <Image resizeMode={'center'} source={{uri: agreeImageName}} style={{width: 30, height: 30}}/>
            </TouchableOpacity>
            <GQCustomText style={[styles.font11, {color: '#666666'}]}>阅读并同意</GQCustomText>
            <TouchableOpacity>
              <GQCustomText style={[styles.font11, {color: '#4AA8FD'}]}>《平台服务协议》</GQCustomText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.nextButton} onPress={() => this.nextAction()}>
            <ImageBackground source={{uri:'buttonbg'}} style={styles.nextButtonBg}>
              <GQCustomText style={styles.nextButtonText}>下一步</GQCustomText>
            </ImageBackground>
          </TouchableOpacity>
          {/*<TouchableOpacity style={styles.forgetButton} onPress={() => this.forgetAction()}>*/}
          {/*<GQCustomText style={{fontSize: 12, color: '#666666'}}>忘记密码?</GQCustomText>*/}
          {/*</TouchableOpacity>*/}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  font11: {
    fontSize: ScaleValue(22),
  },
  logo: {
    alignSelf: 'center',
    marginTop: 21,
    // marginTop:150,
    width: 79,
    height: 59,
  },
  msgCodeInputContentView: {
    marginLeft: 15,
    marginRight: 15,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    marginLeft: 15,
    marginRight: 15,
    height: 50,
    width: GQUtils.getScreenWidth() - 30,
  },
  line: {
    marginLeft: 15,
    marginRight: 15,
    height: 0.5,
    backgroundColor: '#e7e7e7',
  },
  // nextButton: {
  //   marginTop: 15,
  //   marginLeft: 15,
  //   marginRight: 15,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: ScaleValue(90),
  //   backgroundColor: '#ff401f',
  // },
  nextButton: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    // justifyContent: 'center',
    // alignItems: 'center',
    height: ScaleValue(90),
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
  forgetButton: {
    alignSelf: 'flex-end',
    marginTop: 15,
    marginBottom: 15,
    marginRight: 15,
  },
});
