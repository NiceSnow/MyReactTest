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
  Modal
} from 'react-native';
import GQCustomText from '../../../common/customText/GQCustomText';
import GQUtils, {ScaleValue} from '../../../utils/GQUtils';
import {Navigation} from 'react-native-navigation';
import RootSiblings from 'react-native-root-siblings';
import ToastContainer from "react-native-root-toast/lib/ToastContainer";
import LoginRegisterActions from "../actions/LoginRegisterActions";
import LoginRegisterConstants from "../constants/LoginRegisterConstants";
import LoginRegisterStores from '../stores/LoginRegisterStores';
import {GQScreenNames} from "../../screens/GQScreenNames";
import GQBaseComponent from "../../../common/GQBaseComponent";
import RNProgressHUD from "../../../common/RNProgressHUD";

export default class LoginPhoneComponent extends GQBaseComponent {

  constructor(props) {
    super(props);
    this.state = {inputText: ''};
  }

  static options(passProps) {
    return {
      topBar: {
        title: {
          text: '登录',
        },
      }
    }
  }

  componentDidMount() {
    LoginRegisterStores.addCustomListener(LoginRegisterConstants.isRegister, this._isRegisterListenerCallback);
  }

  componentWillUnmount() {
    LoginRegisterStores.removeCustomListener(LoginRegisterConstants.isRegister, this._isRegisterListenerCallback);
  }

  _isRegisterListenerCallback = () => {
    let response = LoginRegisterStores.getTempResponse();
    let jumpName = response.data === 1 ? GQScreenNames.loginPwd : GQScreenNames.register;
    Navigation.push(this.props.componentId, {
      component: {
        name: jumpName,
        passProps: {
          phone: this.state.inputText,
          authSuccess: this.props.authSuccess
        },
        options: {
          bottomTabs: {
            visible: false,
            animate: true,
          },
        }
      },
    });
  }

  clearAction() {
    this.setState({inputText: ''})
  }

  nextAction() {
    let phone = this.state.inputText;
    if (!(phone && phone.length > 0 && GQUtils.checkPhoneNumber(phone))) {
      RNProgressHUD.showText('请输入正确的手机号');
      return;
    }
    LoginRegisterActions.requestIsRegister({'userName': phone});
  }


  render() {

    let inputView = (
      <View style={styles.textInputContentView}>
        <TextInput
          value={this.state.inputText}
          keyboardType={'number-pad'}
          placeholder={'请输入中国大陆手机号'}
          fontSize={ScaleValue(32)}
          maxLength={11}
          onChangeText={(text) => this.setState({inputText: text})}
          style={styles.textInput}
        />
        <TouchableOpacity onPress={() => this.clearAction()}>
          <ImageBackground source={{uri: 'close'}} style={{width: 20, height: 20}} resizeMode={'center'}/>
        </TouchableOpacity>
      </View>
    )

    let lineView = (<View style={styles.line}/>)

    return (
      <ScrollView
        contentContainerStyle={{flex: 1}}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='handled'>
        <View style={styles.container}>
          <Image style={styles.logo} source={{uri: 'Family'}}/>
          {inputView}
          {lineView}
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
    backgroundColor: 'white',
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

