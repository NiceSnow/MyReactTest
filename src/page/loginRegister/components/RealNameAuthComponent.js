import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TextInput, Alert, TouchableOpacity, ImageBackground,} from 'react-native';
import GQUtils, {ScaleValue} from '../../../utils/GQUtils';
import Button from 'react-native-button';
import {Navigation} from 'react-native-navigation';
import {GQScreenNames} from "../../screens/GQScreenNames";
import GQBaseComponent from "../../../common/GQBaseComponent";
import LoginRegisterStores from "../stores/LoginRegisterStores";
import LoginRegisterConstants from "../constants/LoginRegisterConstants";
import LoginRegisterActions from "../actions/LoginRegisterActions";
import GQCustomText from "../../../common/customText/GQCustomText";
import DatePicker from 'react-native-datepicker'
import Moment from 'moment';
import RNProgressHUD from "../../../common/RNProgressHUD";

/**屏幕适配系数*/
let iPhone6sScale = GQUtils.getAutoScaleIPhone6s();
/**屏幕宽*/
let screenWidth = GQUtils.getScreenWidth();
var nowDate = new Date();

class RealNameAuthComponent extends GQBaseComponent {
  constructor(props) {
    super(props);
    // 后台规定 长期日期传 21001212
    this.state = {
      text: '',
      name: '',
      idCard: '',
      validDate: '21001212',
      address: '',
      isLeftSelected: true,
    };
    this.onPressNextSubmit = this.onPressNextSubmit.bind(this)
  }

  static options(passProps) {
    return {
      topBar: {
        rightButtons: [{
          id: 'skip',
          text: '跳过',
          color: '#666666',
          fontSize: ScaleValue(24),
          // icon: require('../../../images/js.png')
        }],

        title: {
          text: '实名认证',
          // fontSize:16,
          alignment: 'center'
        },
      },
    };
  }

  componentDidMount() {
    super.componentDidMount();
    LoginRegisterStores.addCustomListener(LoginRegisterConstants.realNameAuth, this._requestSubmitCallback)
  }

  componentWillUnmount() {
    LoginRegisterStores.removeCustomListener(LoginRegisterConstants.realNameAuth, this._requestSubmitCallback);
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

  _requestSubmitCallback = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: GQScreenNames.bindingBankCard,
        passProps: {
          skipAction: this.props.skipAction
        },
        options: {
          bottomTabs: {
            visible: false,
            animate: true,
          },
        }
      }
    })
  }

  onPressNextSubmit() {
    let {name, idCard, validDate, address} = this.state;
    // if () {
    //   RNProgressHUD.showText('请填写姓名');
    //   return;
    // }
    if (name.length == 0 || !GQUtils.checkUserName(name)) {
      RNProgressHUD.showText('请填写中文姓名');
      return;
    }
    if (idCard.length == 0 || !GQUtils.checkIDCard(idCard)) {
      RNProgressHUD.showText('请填写正确的身份证号');
      return;
    }
    if (address.length == 0) {
      RNProgressHUD.showText('请填写地址');
      return;
    }

    // 设置传递给下一页的参数
    let params = {};
    params.userName = this.state.name;
    params.idCard = this.state.idCard;
    //请求参数中 日期格式为 yyyymmdd,没有'-'
    params.cardValidity = validDate.replace(/-/g, '');
    params.address = this.state.address;

    Navigation.push(this.props.componentId, {
      component: {
        name: GQScreenNames.bindingBankCard,
        passProps: {
          realNameInfo: params,
          skipAction: this.props.skipAction
        },
        options: {
          bottomTabs: {
            visible: false,
            animate: true,
          },
        }
      }
    })
  }

  _handlePress(tag) {
    // 左按钮 长期， 右侧按钮 选择日期
    this.setState({
      isLeftSelected: tag === 0,
      validDate: tag === 0 ? '21001212' : this.state.validDate,
      isRightSelected: tag === 1,
    });
    console.log('Now, button disabled' + tag);
  }

  render() {
    let topImgView = <Image source={{uri: 'auth1'}} style={{width: screenWidth, height: 270 * iPhone6sScale}}></Image>
    let topTipsView = (
      <View style={styles.topTipsViewStyle}>
        <Text style={styles.topTips}>信息仅用于实名认证，我司将全力守护您的隐私</Text>
      </View>
    )
    let nameView = (
      <View style={{flexDirection: 'row'}}>
        <View style={styles.inputLayoutStyle}><Text style={styles.txtTipsStyle}>姓名</Text></View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TextInput style={styles.textInputStyle}
                     fontSize={ScaleValue(30)}
                     returnKeyType="done"
                     placeholder="请填写您的真实姓名"
                     placeholderTextColor='#999999'
                     multiline={false}
                     underlineColorAndroid={'transparent'}
                     maxLength={10}
                     onChangeText={(name) => this.setState({name})}
          /></View>
      </View>
    )
    let dividerView = <View style={styles.dividerViewStyle}></View>
    let numberCardView = (
      <View style={{flexDirection: 'row'}}>
        <View style={styles.inputLayoutStyle}>
          <GQCustomText style={styles.txtTipsStyle}>身份证号</GQCustomText>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TextInput style={styles.textInputStyle}
                     fontSize={ScaleValue(30)}
                     returnKeyType="done"
                     placeholder="请填写您的身份证号"
                     placeholderTextColor='#999999'
                     multiline={false}
                     underlineColorAndroid={'transparent'}
                     maxLength={18}
                     onChangeText={(idCard) => this.setState({idCard})}
          />
        </View>
      </View>
    )
    let addressView = <View style={{flexDirection: 'row'}}>
      <View style={styles.inputLayoutStyle}>
        <GQCustomText style={styles.txtTipsStyle}>常住地址</GQCustomText></View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TextInput style={styles.textInputStyle}
                   fontSize={ScaleValue(30)}
                   returnKeyType="done"
                   placeholder="3-40个字符"
                   placeholderTextColor='#999999'
                   multiline={false}
                   underlineColorAndroid={'transparent'}
                   maxLength={40}
                   onChangeText={(text) => this.setState({address: text})}
        /></View></View>
    let nextBtnView = (
      <TouchableOpacity style={styles.nextBtnViewStyle} onPress={this.onPressNextSubmit}>
        <ImageBackground source={{uri:'buttonbg'}} style={styles.nextButtonBg}>
          <GQCustomText style={styles.nextButtonText}>下一步</GQCustomText>
        </ImageBackground>
      </TouchableOpacity>
    )

    let selectDateView = (
      <View style={{
        borderWidth: 1,
        borderColor: '#ff3e19',
        justifyContent: 'center',
        paddingLeft: ScaleValue(30),
        paddingRight: ScaleValue(30),
        height: ScaleValue(52),
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: this.state.validDate === '21001212' ? '#FFFFFF' : '#ff3e19'
      }}
      >
        <GQCustomText
          style={{color: this.state.isLeftSelected ? '#ff3e19' : '#FFFFFF',}}
        >
          {this.state.validDate === '21001212' ? '选择日期' : this.state.validDate}
        </GQCustomText>
      </View>
    )

    let validityView = (
      <View style={{flexDirection: 'row'}}>
        <View style={styles.inputLayoutStyle}>
          <GQCustomText style={styles.txtTipsStyle}>证件有效期</GQCustomText>
        </View>
        <View style={{alignSelf: 'center',}}>
          <Button
            style={{
              fontSize: 24 * iPhone6sScale,
              color: this.state.isLeftSelected ? '#FFFFFF' : '#ff3e19',
              fontWeight: 'normal',
            }}
            styleDisabled={{color: '#999999'}}
            // disabled={this.state.isLeftDisabled}
            containerStyle={{
              borderWidth: 1,
              borderColor: '#ff3e19',
              justifyContent: 'center',
              paddingLeft: ScaleValue(30),
              paddingRight: ScaleValue(30),
              height: 52 * iPhone6sScale,
              overflow: 'hidden',
              borderRadius: 4,
              backgroundColor: this.state.isLeftSelected ? '#ff3e19' : '#FFFFFF'
            }}
            disabledContainerStyle={{borderWidth: 1, borderColor: '#E1E1E1', backgroundColor: '#E1E1E1'}}
            onPress={() => this._handlePress(0)}
          > 长期 </Button>
        </View>
        <View style={{alignSelf: 'center',}}>
          {/*<Button*/}
          {/*style={{fontSize: 24 * iPhone6sScale, color: this.state.isLeftSelected?'#ff3e19':'#FFFFFF', fontWeight: 'normal',}}*/}
          {/*styleDisabled={{color: '#999999'}}*/}
          {/*// disabled={this.state.isRightDisabled}*/}
          {/*containerStyle={{*/}
          {/*justifyContent: 'center',*/}
          {/*borderWidth: 1,*/}
          {/*borderColor: '#ff3e19',*/}
          {/*marginLeft: 30 * iPhone6sScale,*/}
          {/*padding: 10 * iPhone6sScale,*/}
          {/*width: 184 * iPhone6sScale,*/}
          {/*height: 52 * iPhone6sScale,*/}
          {/*overflow: 'hidden',*/}
          {/*borderRadius: 4,*/}
          {/*backgroundColor: this.state.isLeftSelected?'#FFFFFF':'#ff3e19'*/}
          {/*}}*/}
          {/*disabledContainerStyle={{backgroundColor: '#E1E1E1'}}*/}
          {/*onPress={() => this._handlePress(1)}>选择日期</Button>*/}
        </View>
        <DatePicker
          style={{alignSelf: 'center'}}
          date={this._getSelectedDate()}
          mode="date"
          locale={'zh'}
          placeholder="选择日期"
          hideText={true}
          format="YYYY-MM-DD"
          minDate={Moment(nowDate).format('YYYY-MM-DD')}
          confirmBtnText="确定"
          cancelBtnText="取消"
          iconComponent={selectDateView}
          customStyles={{btnTextConfirm: {color: '#ff3e19'}}}
          onDateChange={(date) => {
            console.log(nowDate)
            this.setState({isLeftSelected: false, validDate: date})
          }}
        />
      </View>)

    return (
      <View style={styles.contentContainer}>
        {topImgView}
        {topTipsView}
        {nameView}
        {dividerView}
        {numberCardView}
        {dividerView}
        {validityView}
        {dividerView}
        {addressView}
        {dividerView}
        {nextBtnView}
      </View>
    );
  }

  _getSelectedDate() {
    if (this.state.validDate === '21001212') {
      return ''
    }
    return this.state.validDate;
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
    alignSelf: 'center',
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
  nextButtonText: {
    fontSize: 17,
    color: '#FFFFFF',
  },
});
export default RealNameAuthComponent;
