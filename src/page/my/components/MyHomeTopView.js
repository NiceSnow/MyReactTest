/**
 * Created by lilang on 2018-09-30.
 */

/*
* 包含 用户名，总资产，最新收益，轮播text
* */

import React, {Component} from 'react';
import {Text, View, Image, ImageBackground, TouchableOpacity, StyleSheet, Linking, Alert} from 'react-native';
import {ScaleValue} from "../../../utils/GQUtils";
import GQCustomText from "../../../common/customText/GQCustomText";
import GQUtil from "../../../utils/GQUtils";

import MyHomeProductView from './MyHomeProductView';
import NavigationMessageComponent from "../../../common/NavigationMessageComponent";
import Swiper from "react-native-swiper";
import GQAlert from "../../../common/GQAlert";
import GQInstructionDialog from "../../../common/GQInstructionDialog";
import GQUserInfo from "../../../utils/GQUserInfo";

const totalInstructionText = '总资产是指活期宝、基金、固收、高端理财每天日终的金额之和。其中包括申购待确认和赎回待到账金额。'

export default class MyHomeTopView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secure: this.props.secureMoney,
      modalVisible: false,
    };

    // GQUserInfo.getSecureMoneyStatus().then((status)=>{
    //   console.log('secure'+status);
    //   this.setState({secure:status})
    // })
  }

  static defaultProps = {
    islogin: false,
    avatorUrl: 'tx',
    unread: false,
    // data:{latestEarnings: '0.0', cumulativeEarnings: '0.0',onMoney: '0.0'}
  }

  totalMoneyQuestionAction = () => {
    // this.setState({modalVisible:true})
    GQInstructionDialog.show(totalInstructionText);
    // Alert.alert(
    //   '',
    //   totalInstructionText,
    //   [
    //     {text: '我知道了', onPress: () => console.log('OK Pressed')},
    //   ],
    //   { cancelable: false }
    // )
  }

  // 头像、用户名、消息
  _userNameView = () => {
    //未读消息的黄点透明度
    let unread = this.props.unread ? 1 : 0;
    return (
      <View style={styles.userNameContainer}>
        <TouchableOpacity onPress={this.props.avatorAction} style={{marginLeft:ScaleValue(30),alignItems:'center'}}>
          <Image source={{uri: this.props.avatorUrl}} style={styles.avator}/>
        </TouchableOpacity>

        <GQCustomText style={styles.userName}>Hi, 帝王</GQCustomText>

        <TouchableOpacity style={{marginRight:ScaleValue(10),width:ScaleValue(80),height:ScaleValue(80),justifyContent:'center'}} onPress={this.props.messageAction}>
          <Image source={{uri: 'xiaoxibai'}} style={styles.msgIcon}/>
          <View style={[styles.point, {opacity: unread}]}/>
        </TouchableOpacity>
        {/*<NavigationMessageComponent/>*/}
      </View>
    )
  }

  // 总资产
  _totalMoneyView = () => {
    let moneyText = '0.0';
    if (this.props.data) {
      moneyText = this.props.data.totalAssets;
    }
    moneyText = this.props.secureMoney ? '****' : moneyText;
    //问号按钮
    let questionButton = (
      <TouchableOpacity style={{marginLeft: ScaleValue(10)}} onPress={this.totalMoneyQuestionAction}>
        <Image source={{uri: 'shuom'}} style={{width: ScaleValue(25), height: ScaleValue(25)}}/>
      </TouchableOpacity>
    )

    return (
      <View style={{alignItems: 'center', marginTop: ScaleValue(40), marginBottom: ScaleValue(110)}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <GQCustomText style={{fontSize: ScaleValue(24), color: '#FFFFFF'}}>总资产(元)</GQCustomText>
          {questionButton}
        </View>
        <GQCustomText
          style={{fontSize: ScaleValue(56), color: '#FFFFFF', fontWeight: 'bold'}}>{moneyText}</GQCustomText>
      </View>
    )
  }

  _secureButton = () => {
    let image = this.props.secureMoney ? 'baisebi' : 'baisekai';
    return (
      <TouchableOpacity onPress={this.props.secureMoneyAction} style={styles.secureButton}>
        <Image source={{uri: image}} style={{width: ScaleValue(40), height: ScaleValue(40), resizeMode: 'center'}}/>
      </TouchableOpacity>
    )
  }


  render() {
    let subview;
    if (!this.props.islogin) {
      subview = <NotLoginView onPressLogin={this.props.onPressLogin}/>
    } else {
      let latestEarnings = '0.00', cumulativeEarnings = '0.00', onMoney = '00000000.00';
      if (this.props.data) {
        ({latestEarnings, cumulativeEarnings, onMoney} = this.props.data);
      }
      // let {latestEarnings,cumulativeEarnings,onMoney} = this.props.data
      subview = (
        <View style={{marginBottom: ScaleValue(20)}}>
          <ImageBackground source={{uri: 'toubg'}} style={{width: '100%',}}>
            {this._userNameView()}
            {this._totalMoneyView()}
            {this._secureButton()}
          </ImageBackground>

          <View style={styles.earningsView}>
            <EarningsItem title={'最新收益'} moneyColor={'#FF411F'} money={latestEarnings} secure={this.props.secureMoney}/>
            <View style={[styles.separateLine, {}]}/>
            <EarningsItem title={'累计收益'} money={cumulativeEarnings} secure={this.props.secureMoney}/>
            {/*<View style={[styles.separateLine, {}]}/>*/}
            {/*<EarningsItem title={'在途资金'} money={onMoney} secure={this.state.secure}/>*/}
          </View>

          <SwiperWarnTextView textArr={['购买理财需完成风险评测，请尽快完成',
            '应监管要求，购买理财需完成风险评测，请尽快完成，请尽快完成']}/>
        </View>
      )
    }
    let productList = null;
    if (this.props.data) {
      productList = this.props.data.productList;
    } else {
      productList = []
    }

    return (
      <View style={styles.container}>
        {/*<GQInstructionDialog*/}
        {/*visible={this.state.modalVisible}*/}
        {/*message={totalInstructionText}*/}
        {/*dismissAction={()=>this.setState({modalVisible:false})}*/}
        {/*/>*/}
        {subview}
        <MyHomeProductView islogin={this.props.islogin} secure={this.props.secureMoney} data={productList}/>
      </View>
    )
  }
}

class NotLoginView extends Component {

  render() {
    return (
      <View style={styles.notLoginContainer}>
        <Image source={{uri: 'weidltx'}} style={[styles.avator,{marginLeft:ScaleValue(30)}]}/>
        <GQCustomText style={styles.notLoginText}>欢迎来到活期宝</GQCustomText>
        <TouchableOpacity style={styles.loginButton} onPress={this.props.onPressLogin}>
          <ImageBackground source={{uri: 'button1'}} style={{
            width: '100%', height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <GQCustomText style={styles.loginButtonText}>立即登录</GQCustomText>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    )
  }
}

//收益单个view
class EarningsItem extends Component {
  static defaultProps = {
    title: 'title',
    moneyColor: '#333333',
    secure: false,
  }

  render() {
    let moneyText = this.props.secure ? '****' : this.props.money;
    return (
      <View style={styles.earningsItem}>
        <GQCustomText style={styles.earningsItemTitle}>{this.props.title}</GQCustomText>
        <GQCustomText style={[{color: this.props.moneyColor}, styles.earningsItemMoney]}>{moneyText}</GQCustomText>
      </View>
    )
  }
}

// 提醒、警告文字
class SwiperWarnTextView extends Component {

  render() {

    if (this.props.textArr && this.props.textArr.length === 0) {
      return null;
    }

    let items = this.props.textArr.map((item, index) => {

      if (item.url && item.url.length > 0) {
        return (
          <TouchableOpacity key={index}
                            style={styles.swiperItems}>
            <View style={styles.warnTextView}>
              <GQCustomText style={styles.warnText} numberOfLines={1} >{item}</GQCustomText>
            </View>
            <Image source={{uri: 'gengdu'}} style={styles.swiperRightImage}/>
          </TouchableOpacity>
        )
      } else {
        return (
          <View key={index} style={{height: ScaleValue(60), justifyContent: 'center', alignItems: 'center'}}>
            <GQCustomText style={styles.warnText} numberOfLines={1} >{item}</GQCustomText>
          </View>
        )
      }
    });

    return (
      <View style={styles.warnView}>
        <Swiper
          loop={true}
          autoplay={true}
          autoplayTimeout={4}
          index={0}
          showsPagination={false}
        >
          {items}
        </Swiper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
    marginBottom: ScaleValue(20),
  },
  bottomView: {
    backgroundColor: '#F0F0F0',
    height: ScaleValue(210),
  },
  earningsView: {
    backgroundColor: '#FFFFFF',
    borderRadius: ScaleValue(4),
    marginTop: ScaleValue(-74),
    marginLeft: ScaleValue(20),
    marginRight: ScaleValue(20),
    flexDirection: 'row',
  },
  earningsItem: {
    flex: 1,
    // paddingLeft: ScaleValue(20),
    alignItems: 'center',
  },

  earningsItemTitle: {
    marginTop: ScaleValue(40),
    fontSize: ScaleValue(24),
    color: '#999999',
  },
  earningsItemMoney: {
    marginTop: ScaleValue(17),
    marginBottom: ScaleValue(40),
    fontSize: ScaleValue(36),
    fontWeight: '500'
  },
  separateLine: {
    width: ScaleValue(1),
    height: ScaleValue(68),
    backgroundColor: '#E5E5E5',
    alignSelf: 'center',
  },
  warnView: {
    height: ScaleValue(60),
    backgroundColor: '#FFF7EA',
    marginLeft: ScaleValue(20),
    marginRight: ScaleValue(20),
    borderBottomLeftRadius: ScaleValue(4),
    borderBottomRightRadius: ScaleValue(4),
  },
  swiperItems: {
    flexDirection: 'row',
    height: ScaleValue(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  warnTextView: {
    justifyContent: 'center',
    flex: 1,
  },
  warnText: {
    fontSize: ScaleValue(24),
    color: '#FFAE3A',
    marginLeft: ScaleValue(20),
    marginRight: ScaleValue(20),
  },
  swiperRightImage: {
    resizeMode: 'center',
    marginRight: ScaleValue(10),
    width: ScaleValue(30),
    height: ScaleValue(30),
  },
  avator: {
    // marginLeft: ScaleValue(30),

    width: ScaleValue(68),
    height: ScaleValue(68),
    borderRadius: ScaleValue(68 / 2),
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: ScaleValue(30) + GQUtil.getIphoneStatusBar(),
  },
  userName: {
    flex: 1,
    fontSize: ScaleValue(32),
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: ScaleValue(14),
  },
  msgIcon: {
    // marginRight: ScaleValue(30),
    alignSelf:'center',
    width: ScaleValue(40),
    height: ScaleValue(36),
  },
  point: {
    position: 'absolute',
    width: ScaleValue(20),
    height: ScaleValue(20),
    borderRadius: ScaleValue(10),
    backgroundColor: '#FFDF5E',
    top: ScaleValue(12),
    right: ScaleValue(12),
  },
  secureButton: {
    position: 'absolute',
    alignItems: 'center',
    top: ScaleValue(130) + GQUtil.getIphoneStatusBar(),
    right: ScaleValue(10),
    width: ScaleValue(80),
    height: ScaleValue(80),
  },

  notLoginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ScaleValue(130) + GQUtil.getIphoneStatusBar() + GQUtil.getNavHeiht(),
    backgroundColor: '#FFFFFF',
    paddingTop: GQUtil.getIphoneStatusBar() + GQUtil.getNavHeiht(),
    marginBottom: ScaleValue(20),
  },
  notLoginText: {
    color: '#333333',
    fontSize: ScaleValue(30),
    marginLeft: ScaleValue(10),
    alignSelf: 'center',
    flex: 1,
  },
  loginButton: {
    width: ScaleValue(199),
    height: ScaleValue(70),
    borderRadius: ScaleValue(35),
    marginRight: ScaleValue(30),
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: ScaleValue(26),
    fontWeight: 'bold',
  }
});
