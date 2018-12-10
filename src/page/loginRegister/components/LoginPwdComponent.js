/**
 * Created by lilang on 2018-09-30.
 */

import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  BackHandler
} from 'react-native';
import GQUtils, {ScaleValue} from '../../../utils/GQUtils';
import {Navigation} from 'react-native-navigation';
// import KeyboardManager from 'react-native-keyboard-manager';
import GQBaseComponent from '../../../common/GQBaseComponent';
import GQCustomText from '../../../common/customText/GQCustomText';
import LoginRegisterConstants from "../constants/LoginRegisterConstants";
import LoginRegisterStores from '../stores/LoginRegisterStores'
import LoginRegisterActions from "../actions/LoginRegisterActions";
import GQLoading from "../../../utils/GQLoading";
import RNProgressHUD from "../../../common/RNProgressHUD";
import {GQScreenNames} from "../../screens/GQScreenNames";
import GQUserInfo from "../../../utils/GQUserInfo";
import {GQAppMananger} from "../../../utils/GQAppManager";
import {GQHTMLConfig} from "../../../config/GQHTMLConfig";

export default class LoginPwdComponent extends GQBaseComponent {

  constructor(props) {
    super(props);
    this.state = {inputText: '', secureText: true};
  }

  componentDidMount() {
    LoginRegisterStores.addLoginListener(this._loginListenerCallback)
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    LoginRegisterStores.removeLoginListener(this._loginListenerCallback)
  }

  static options(passProps) {
    return {
      topBar: {
        title: {
          text: '密码',
        },
      }
    };
  }

  _loginListenerCallback = () => {

    let {data} = LoginRegisterStores.getTempResponse();
    if (data.token.length > 0){
      if (this.props.authSuccess) {
        this.props.authSuccess();
      }else{
        Navigation.popToRoot(this.props.componentId);
      }
    }
    // GQUserInfo.isLogin().then((isLogin)=>{
    //   if (isLogin){
    //     if (this.props.authSuccess) {
    //       this.props.authSuccess();
    //     }else{
    //       Navigation.popToRoot(this.props.componentId);
    //     }
    //   }
    // })

    // GQStorage.load({
    //   key: UserInfoKeys.loginStatus
    // }).then(ret => {
    //   if (ret.token) {
    //     GQUserInfo.saveCurrentUserPhone(this.props.phone)
    //     if (this.props.authSuccess) {
    //       this.props.authSuccess();
    //     }else{
    //       Navigation.popToRoot(this.props.componentId);
    //     }
    //   }
    // })
  }

  secureAction() {
    this.setState(prevProps => {
      return {secureText: !prevProps.secureText}
    });
  }

  nextAction() {
    // if (!GQUtils.checkPassword(this.state.inputText)) {
    //   RNProgressHUD.showText('密码为字母+数字8~20位组合');
    //   return;
    // }
    LoginRegisterActions.login({'userName': this.props.phone, 'pwd': this.state.inputText});
  }

  _forgetPwdAction = () => {
    // LoginRegisterActions.isRealNameByMobile({mobile:this.props.phone})

    Navigation.push(this.props.componentId,{
      component: {
        // name: GQScreenNames.resetPassword,
        name: GQScreenNames.verifyIDCard,
        passProps:{
          phone:this.props.phone
        }
      }
    })

    return;

    let url = GQAppMananger.getHTMLUrl() + GQHTMLConfig.forgetPassword;

    Navigation.push(this.props.componentId,{
      component:{
        name:GQScreenNames.webview,
        passProps:{
          url: url + `?tel=${this.props.phone}&authentication=0`,
          title: '重置登录密码',
        }
      }
    })
  }

  render() {
    let logoImageName = 'Family';
    let inputViewImageName = this.state.secureText ? 'bi' : 'kai';

    return (
      <ScrollView contentContainerStyle={{flex: 1}}
                  keyboardDismissMode='on-drag'
                  keyboardShouldPersistTaps='handled'>
        <View style={styles.container}>
          <Image style={styles.logo} source={{uri: logoImageName}}/>
          <View style={styles.textInputContentView}>
            <TextInput
              secureTextEntry={this.state.secureText}
              // keyboardType={'default'}
              keyboardType={'name-phone-pad'}
              placeholder={'请输入登录密码'}
              placeholderTextColor={'#999999'}
              fontSize={ScaleValue(32)}
              maxLength={20}
              value={this.state.inputText.toString()}
              onChangeText={(text) => this.setState({inputText: text})}
              style={styles.textInput}
            />
            <TouchableOpacity onPress={() => this.secureAction()}>
              <ImageBackground source={{uri: inputViewImageName}} style={{width: 25, height: 25}}
                               resizeMode={'center'}/>
            </TouchableOpacity>
          </View>
          <View style={styles.line}/>
          <TouchableOpacity style={{alignSelf: 'flex-end', marginTop: ScaleValue(20), marginRight: ScaleValue(30)}}
                            onPress={this._forgetPwdAction}
          >
            <GQCustomText style={{color: '#999999', fontSize: ScaleValue(24)}}>忘记密码？</GQCustomText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={() => this.nextAction()}>
            <ImageBackground source={{uri:'buttonbg'}} style={styles.nextButtonBg}>
              <GQCustomText style={styles.nextButtonText}>下一步</GQCustomText>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    marginTop: 21,
    alignSelf: 'center',
    width: 79,
    height: 59,
  },
  line: {
    marginLeft: 15,
    marginRight: 15,
    height: 0.5,
    backgroundColor: '#e5e5e5',
  },
  textInputContentView: {
    height: 40,
    marginTop: 50,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    marginRight: 15,
    flex: 1,
    height: 50,
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
    fontSize: ScaleValue(34),
    color: '#FFFFFF',
  },
});