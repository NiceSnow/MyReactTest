/**
 * Created by lilang on 2018/10/17.
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

export default class VerifyIDCardComponent extends GQBaseComponent {

  constructor(props) {
    super(props);
    this.state = {idCard: ''};
  }

  static options(passProps) {
    return {
      topBar: {
        title: {
          text: '重置登录密码',
        },
      }
    }
  }

  componentDidMount() {
    LoginRegisterStores.addCustomListener(LoginRegisterConstants.getCustIsEmpty,this._getCustIsEmptyListenerCallback);
  }

  componentWillUnmount() {
    LoginRegisterStores.removeCustomListener(LoginRegisterConstants.getCustIsEmpty,this._getCustIsEmptyListenerCallback);
  }

  _getCustIsEmptyListenerCallback = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: GQScreenNames.resetPassword,
        passProps:{
          phone:this.props.phone,
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

  _clearAction = () => {
    this.setState({idCard: ''})
  }

  nextAction() {
    let idCard = this.state.idCard;
    if (!(idCard && idCard.length > 0 && GQUtils.checkIDCard(idCard))){
      RNProgressHUD.showText('您请输入身份证号有误');
      // RNProgressHUD.showText('您请输入的身份证号与注册时的不一致');
      return;
    }
    let params = {
      certNo:this.state.idCard,
      custPhone:this.props.phone};
    LoginRegisterActions.requestIDCardIsTrue(params);
  }


  render() {

    let topTipsView = (
      <View style={styles.topTipsViewStyle}>
        <GQCustomText style={styles.topTipsText}>为保护您的账户安全，请先验证身份</GQCustomText>
      </View>
    )

    let idCardInput = (
      <View style={styles.contentView}>
        <GQCustomText style={styles.titleText}>身份证号</GQCustomText>
        <View style={{flexDirection: 'row', marginTop: ScaleValue(36), alignItems: 'center'}}>
          <TextInput
            keyboardType={'name-phone-pad'}
            placeholder={'请输入您的身份证号'}
            placeholderTextColor={'#999999'}
            autoCapitalize={'none'}
            autoCorrect={false}
            value={this.state.idCard}
            fontSize={ScaleValue(30)}
            maxLength={18}
            onChangeText={(text) => this.setState({idCard: text})}
            style={[styles.textInput]}
          />
          <TouchableOpacity onPress={this._clearAction}>
            <ImageBackground source={{uri: 'close'}} style={{width: 20, height: 20}} resizeMode={'center'}/>
          </TouchableOpacity>
        </View>
        <View style={[styles.line]}/>
      </View>
    )

    let lineView = (<View style={styles.line}/>)

    return (
      <ScrollView
        contentContainerStyle={{flex: 1}}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='handled'>
        <View style={styles.container}>
          {topTipsView}
          {idCardInput}
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
  line: {
    marginLeft: 15,
    marginRight: 15,
    height: 0.5,
    backgroundColor: '#e5e5e5',
  },
  contentView: {
    marginLeft: ScaleValue(30),
    marginTop: ScaleValue(40),
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
});
