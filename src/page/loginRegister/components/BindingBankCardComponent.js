import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TextInput, ImageBackground, TouchableOpacity} from 'react-native';
import GQUtils, {ScaleValue} from '../../../utils/GQUtils';
import Button from 'react-native-button';
import {Navigation} from 'react-native-navigation';
import {GQScreenNames} from "../../screens/GQScreenNames";
import GQCustomText from "../../../common/customText/GQCustomText";
import LCCountDownButton from "../../../common/LCCountDownButton";
import GQBaseComponent from "../../../common/GQBaseComponent";
import {GQHTMLConfig} from "../../../config/GQHTMLConfig";
import GQHttpUtils from "../../../utils/GQHttpUtils";
import LoginRegisterStores from "../stores/LoginRegisterStores";
import LoginRegisterConstants from "../constants/LoginRegisterConstants";
import RNProgressHUD from "../../../common/RNProgressHUD";
import LoginRegisterActions from "../actions/LoginRegisterActions";
import {GQAppMananger} from "../../../utils/GQAppManager";

/**屏幕适配系数*/
let iPhone6sScale = GQUtils.getAutoScaleIPhone6s();
/**屏幕宽*/
let screenWidth = GQUtils.getScreenWidth();

export default class BindingBankCardComponent extends GQBaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      bankCard: '',
      mobile: '',
      msgCode: '',
      bankInfo: '',
    };
    this.onPressNextSubmit = this.onPressNextSubmit.bind(this)
  }

  componentWillMount() {
    LoginRegisterStores.addCustomListener(LoginRegisterConstants.bindingBankCardCode, this.sendBankCodeCallback)
    LoginRegisterStores.addCustomListener(LoginRegisterConstants.bindingBankCard, this.bindingBankCardCallback)
    LoginRegisterStores.addCustomListener(LoginRegisterConstants.getBankInfo, this.getBankInfoCallback)
  }

  componentWillUnmount() {
    LoginRegisterStores.removeCustomListener(LoginRegisterConstants.bindingBankCardCode, this.sendBankCodeCallback)
    LoginRegisterStores.removeCustomListener(LoginRegisterConstants.bindingBankCard, this.bindingBankCardCallback)
    LoginRegisterStores.removeCustomListener(LoginRegisterConstants.getBankInfo, this.getBankInfoCallback)
  }

  static options(passProps) {
    return {
      topBar: {
        rightButtons: [{
          id: 'skip',
          text: '跳过',
          color: '#666666',
          fontSize: 12,
        }],
        title: {
          text: '绑定银行卡',
          // fontSize:16,
          alignment: 'center'
        },
      },
    };
  }

  navigationButtonPressed({buttonId}) {
    super.navigationButtonPressed({buttonId});
    if (buttonId === 'skip') {
      if (this.props.skipAction) {
        this.props.skipAction();
      } else {
        Navigation.popToRoot(this.props.componentId);
      }

    }
  }

  sendBankCodeCallback = () => {
    RNProgressHUD.showText('发送验证码成功');
    this.countDownButton.startCountDown();
  }

  bindingBankCardCallback = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: GQScreenNames.setTransactionPwd,
        passProps: {
          skipAction: this.props.skipAction
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

  getBankInfoCallback = () => {
    // bankOrganizationName  支持银行卡名称
    // singleLimit;//单笔限额
    // singleDayLimit;//单日限额
    // singleMonthLimit;//单月限额
    let response = LoginRegisterStores.getTempResponse();
    this.setState({
      bankInfo: ''
    })
  }

  sendMsgAction = () => {
    let {bankCard, mobile} = this.state;
    if (bankCard.length == 0) {
      RNProgressHUD.showText('请填写银行卡号')
      return;
    }
    if (mobile.length == 0) {
      RNProgressHUD.showText('请填写预留手机号')
      return;
    }
    let {userName, idCard} = this.props.realNameInfo;
    let params = {
      'realName': userName,
      'identityNo': idCard,
      'bankCard': bankCard,
      'mobileNo': mobile
    }
    LoginRegisterActions.sendBankMsgCode(params);

    // this.countDownButton.startCountDown();
  }

  onPressNextSubmit() {

    let {bankCard, mobile, msgCode} = this.state;
    let {userName, idCard, cardValidity, address} = this.props.realNameInfo;
    let realNameInfo = this.props.realNameInfo;
    if (msgCode.length == 0) {
      RNProgressHUD.showText('请填写手机验证码')
      return;
    }
    let params = {
      'realName': userName,
      'identityNo': idCard,
      'bankCard': bankCard,
      'mobileNo': mobile,
      'verifyCode': msgCode,
      'validUntil': cardValidity,
      'address': address
    }
    LoginRegisterActions.requestBindCard(params)
  }

  _bankNumEditing(text) {
    this.setState({
      bankCard:text
    })
    let params = {bankCardNum: text}
    LoginRegisterActions.requestGetBankInfo(params);
  }

  _supportBankAction = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: GQScreenNames.bankList,
        passProps: {
          url: GQAppMananger.getHTMLUrl() + GQHTMLConfig.banklist,
          title: '支持银行卡',
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

  render() {
    let topImgView = <Image source={{uri: 'auth2'}} style={{width: screenWidth, height: 270 * iPhone6sScale}}></Image>
    let topTipsView = <View style={styles.topTipsViewStyle}><GQCustomText
      style={styles.topTips}>您的信息将加密传到银行。</GQCustomText></View>

    let nameView = (
      <View style={{flexDirection: 'row'}}>
        <View style={styles.inputLayoutStyle}><Text style={styles.txtTipsStyle}>户名</Text></View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TextInput style={styles.textInputStyle}
                     fontSize={ScaleValue(30)}
                     editable={false}
                     value={this.props.realNameInfo.userName}
            // placeholder="请填写本人银行卡户名"
            // placeholderTextColor='#999999'
                     multiline={false}
                     underlineColorAndroid={'transparent'}
                     maxLength={10}
                     onChangeText={(text) => this.setState({text})}
          />
        </View>
      </View>
    )
    let dividerView = <View style={styles.dividerViewStyle}></View>
    let numberCardView = (
      <View style={{flexDirection: 'row'}}>
        <View style={styles.inputLayoutStyle}>
          <GQCustomText style={styles.txtTipsStyle}>银行卡号</GQCustomText></View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TextInput style={styles.textInputStyle}
                     fontSize={ScaleValue(30)}
                     returnKeyType="done"
                     placeholder="请填写本人银行卡号"
                     placeholderTextColor='#999999'
                     multiline={false}
                     underlineColorAndroid={'transparent'}
            // onChangeText={(text) => this.setState({bankCard: text})}
                     onChangeText={text => this._bankNumEditing(text)}
          />
        </View>
      </View>
    )
    let bankInfo = (
      <View style={{height: ScaleValue(50)}}>
        <GQCustomText style={styles.bankInfoText}>{this.state.bankInfo}</GQCustomText>
      </View>
    )
    let supportBank = (
      <View style={styles.supportBankView}>
        <TouchableOpacity style={styles.supportBankButton} onPress={this._supportBankAction}>
          <GQCustomText style={styles.supportBankButtonText}>查看支持银行卡列表</GQCustomText>
        </TouchableOpacity>
      </View>
    )

    let phoneNumberView = (
      <View style={{flexDirection: 'row'}}>
        <View style={styles.inputLayoutStyle}>
          <GQCustomText style={styles.txtTipsStyle}>手机号</GQCustomText></View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TextInput style={styles.textInputStyle}
                     fontSize={ScaleValue(30)}
                     returnKeyType="done"
                     placeholder="请填写本人银行卡预留手机号"
                     placeholderTextColor='#999999'
                     multiline={false}
                     underlineColorAndroid={'transparent'}
                     maxLength={11}
                     onChangeText={(text) => this.setState({mobile: text})}
          />
        </View>
      </View>
    )
    let smsCodeView = (
      <View style={{flexDirection: 'row'}}>
        <View style={styles.inputLayoutStyle}>
          <GQCustomText style={styles.txtTipsStyle}>验证码</GQCustomText></View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TextInput style={styles.textInputStyle}
                     fontSize={ScaleValue(30)}
                     returnKeyType="done"
                     placeholder="请填写验证码"
                     placeholderTextColor='#999999'
                     multiline={false}
                     underlineColorAndroid={'transparent'}
                     maxLength={10}
                     onChangeText={(text) => this.setState({msgCode: text})}
          />
        </View>
        <LCCountDownButton frameStyle={{marginRight: ScaleValue(20), height: ScaleValue(110)}}
                           activeTextStyle={{fontSize: ScaleValue(24)}}
                           disableTextStyle={{fontSize: ScaleValue(24)}}
                           beginText='获取验证码'
                           endText='重新获取'
                           count={30}
                           pressAction={this.sendMsgAction}
                           changeWithCount={(count) => count + 's'}
                           id='register'
                           ref={(e) => {
                             this.countDownButton = e
                           }}
        />
      </View>
    )

    let nextBtnView = (
      <TouchableOpacity style={styles.nextBtnViewStyle} onPress={this.onPressNextSubmit}>
        <ImageBackground source={{uri:'buttonbg'}} style={styles.nextButtonBg}>
          <GQCustomText style={styles.txtNextBtnStyle}>下一步</GQCustomText>
        </ImageBackground>
      </TouchableOpacity>
    )
    return (

      <View style={styles.contentContainer}>
        {topImgView}
        {topTipsView}
        {nameView}
        {dividerView}
        {numberCardView}
        {this.state.bankInfo.length > 0 && bankInfo}
        {supportBank}
        {phoneNumberView}
        {dividerView}
        {smsCodeView}
        {dividerView}
        {nextBtnView}

      </View>
    );
  }
}
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: "column",
  },
  topTips: {
    color: "#FFFFFF",
    fontSize: 24 * iPhone6sScale,
  },
  textInputStyle: {
    height: 45,
  },
  txtTipsStyle: {
    color: "#333333",
    fontSize: 30 * iPhone6sScale,
  },
  inputLayoutStyle: {
    marginLeft: 30 * iPhone6sScale,
    marginTop: 40 * iPhone6sScale,
    marginBottom: 40 * iPhone6sScale,
    marginRight: 40 * iPhone6sScale
  },
  dividerViewStyle: {
    height: 1 * iPhone6sScale,
    backgroundColor: '#e5e5e5',
    marginLeft: 30 * iPhone6sScale
  },
  topTipsViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#FFFFFF0A',
    width: GQUtils.getScreenWidth(),
    height: ScaleValue(64)
  },
  nextBtnViewStyle: {
    backgroundColor: "#FF3E19",
    marginTop: 100 * iPhone6sScale,
    marginLeft: 30 * iPhone6sScale,
    marginRight: 30 * iPhone6sScale,
    height: 90 * iPhone6sScale,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonBg: {
    width:'100%',
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtNextBtnStyle: {
    color: '#FFFFFF',
    fontSize: 30 * iPhone6sScale,
  },
  supportBankView: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#FAFAFA',
    height: ScaleValue(60)
  },
  supportBankButton: {
    marginRight: ScaleValue(25),
    width: ScaleValue(250)
  },
  supportBankButtonText: {
    color: '#4aa8fd',
    alignSelf: 'center',
    fontSize: ScaleValue(24)
  },
  bankInfoText: {
    color: '#ff411f',
    // alignSelf: 'center',
    fontSize: ScaleValue(24),
    marginLeft: ScaleValue(30),
    marginRight: ScaleValue(30),
  },
});

