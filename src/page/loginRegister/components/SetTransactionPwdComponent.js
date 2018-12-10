import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TextInput, Alert, TouchableOpacity} from 'react-native';
import GQUtils, {ScaleValue} from '../../../utils/GQUtils';
import {Navigation} from 'react-native-navigation';
import {GQScreenNames} from "../../screens/GQScreenNames";
import GQBaseComponent from "../../../common/GQBaseComponent";
import GQCustomText from "../../../common/customText/GQCustomText";

/**屏幕适配系数*/
let iPhone6sScale = GQUtils.getAutoScaleIPhone6s();
/**屏幕宽*/
let screenWidth = GQUtils.getScreenWidth();

export default class SetTransactionPwdComponent extends GQBaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
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
        }],

        title: {
          text: '设置交易密码',
          // fontSize:16,
          alignment: 'center'
        },

        backButton: {
          icon: require('../../../images/xzjt.png'),
          visible: true
        },

      },
      bottomTab: {
        badge: '2',
        badgeColor: 'red'
      }
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

  onPressNextSubmit() {
    Navigation.push(this.props.componentId, {
      component: {
        name: GQScreenNames.loginPhone,
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
    let topImgView = <Image source={{uri: 'auth3'}} style={{width: screenWidth, height: 270 * iPhone6sScale}}></Image>
    let topTipsView = <View style={styles.topTipsViewStyle}><Text style={styles.topTips}>交易密码用于您每次买入/卖出产品</Text></View>
    let setPwdView = <View style={{flexDirection: 'row'}}>
      <View style={styles.inputLayoutStyle}><Text style={styles.txtTipsStyle}>交易密码</Text></View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TextInput style={styles.textInputStyle}
                   fontSize={ScaleValue(30)}
                   returnKeyType="done"
                   placeholder="请设置6位数字交易密码"
                   placeholderTextColor='#999999'
                   multiline={false}
                   underlineColorAndroid={'transparent'}
                   maxLength={10}
                   onChangeText={(text) => this.setState({text})}
        />
      </View>
    </View>
    let dividerView = <View style={styles.dividerViewStyle}></View>
    let againPwdView = (
      <View style={{flexDirection: 'row'}}>
        <View style={styles.inputLayoutStyle}>
          <GQCustomText style={styles.txtTipsStyle}>再次确认</GQCustomText>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TextInput style={styles.textInputStyle}
                     fontSize={ScaleValue(30)}
                     placeholder="请再次确认您的交易密码"
                     placeholderTextColor='#999999'
                     multiline={false}
                     underlineColorAndroid={'transparent'}
                     maxLength={10}
                     onChangeText={(text) => this.setState({text})}
          />
        </View>
      </View>
    )

    let nextBtnView = <TouchableOpacity style={styles.nextBtnViewStyle} onPress={this.onPressNextSubmit}>
      <View>
        <GQCustomText style={styles.txtNextBtnStyle}>下一步</GQCustomText>
      </View>
    </TouchableOpacity>
    return (
      <View style={styles.contentContainer}>
        {topImgView}
        {topTipsView}
        {setPwdView}
        {dividerView}
        {againPwdView}
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
    alignSelf: 'center',
    position: 'absolute',
    top: 10 * iPhone6sScale
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
  txtNextBtnStyle: {
    color: '#FFFFFF',
    fontSize: 30 * iPhone6sScale,
  }
});

