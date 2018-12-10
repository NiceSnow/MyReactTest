/**
 * Created by lilang on 2018-09-30.
 */

import React, {Component} from 'react';
import {SectionList, Text, View, StyleSheet, Alert} from 'react-native';
import MyHomeMoreListItem from "./MyHomeMoreListItem";
import {ScaleValue} from "../../../utils/GQUtils";
import {Navigation} from "react-native-navigation";
import {GQScreenNames} from "../../screens/GQScreenNames";
import GQBaseComponent from "../../../common/GQBaseComponent";
import MyHomeActions from "../actions/MyHomeActions";
import GQUtil from "../../../utils/GQUtils";
import MyHomeStores from "../stores/MyHomeStores";
import MyConstants from "../constants/MyConstants";
import RNProgressHUD from "../../../common/RNProgressHUD";
import GQInstructionDialog from "../../../common/GQInstructionDialog";
import TouchID from 'react-native-touch-id'
import GQAlert from "../../../common/GQAlert";
import GQUserInfo from "../../../utils/GQUserInfo";
import {GQAppMananger} from "../../../utils/GQAppManager";
import {GQHTMLConfig} from "../../../config/GQHTMLConfig";

const alertMessage = '中国税收居民是指在中国境内有住所，或无住所而在境内居住满一年的个人。在中国境内有住所是指因户籍、家庭、经济利益关系而在中国境内习惯性居住。在境内居住满一年，是指在一个纳税年度在中国境内居住365日。临时离境的，不扣减日数。临时离境，是指在一个纳税年度中一次不超过30日或多次累计不超过90日的离境。非居民是指中国税收居民以外的个人。'

export default class MyAccountListComponent extends GQBaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [{
        index: 0,
        data: [{
          image: 'weidltx',
          titleStyle: {marginLeft: ScaleValue(20)},
          imageStyle: {width: ScaleValue(80), height: ScaleValue(80)},
          title: '欢乐谷',
          subTitle: '',
          showRightArrow: false
        },
          {image: '', title: '手机号码', subTitle: '137****0394'},
          {image: '', title: '实名认证', subTitle: ''},
          {image: '', title: '密码管理', subTitle: '包含登录密码、交易密码等'},]
      },
        {
          index: 1,
          data: [
            {title: '风险评测', subTitle: ''},
            {title: '税收居民身份证明', subTitle: ''},
            {title: '投资者适当性身份', subTitle: ''}
          ]
        }],
      netData: {},
    };
  }

  componentDidMount() {
    super.componentDidMount();

    MyHomeStores.addCustomListener(MyConstants.requestMineDetail, this._requestDataCallback)

    MyHomeActions.requestMineDetailData({});
  }

  componentWillUnmount() {
    MyHomeStores.removeCustomListener(MyConstants.requestMineDetail, this._requestDataCallback)
  }

  static options(passProps) {
    return {
      topBar: {title: {text: '个人信息'}}
    }
  }

  _requestDataCallback = () => {
    let {data} = MyHomeStores.getTempResponse();
    this.setState({netData: data})
  }

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          style={{flex: 1, backgroundColor: '#F0F0F0'}}
          sections={this.state.dataSource}
          renderItem={this._renderItem}
          renderSectionHeader={this._renderSectionHeader}
          ItemSeparatorComponent={this._renderSeparator}
          stickySectionHeadersEnabled={false}
          keyExtractor={(item, index) => index}
        />
      </View>

    )
  }

  _keyExtractor = item => item.id;

  _renderItem = ({item, index, section}) => {
    // console.log(section);
    let {userName, mobile, isRealName, riskTest, taxProve, investors} = this.state.netData;
    let subTitle;
    let title = item.title;
    if (section.index === 0) {
      if (index == 0) {
        // 判断是否全是数字 并且是11位
        // let reg = /^[\d]+$/;
        // if (reg.test(userName) && userName.length === 11){
        if (userName === mobile) {
          title = GQUtil.getSecurePhone(userName);
        } else {
          title = userName;
        }
      }
      subTitle = ['', GQUtil.getSecurePhone(mobile), isRealName, item.subTitle];
    } else {
      subTitle = [riskTest, taxProve, investors];
    }
    return <MyHomeMoreListItem
      image={item.image}
      imageStyle={item.imageStyle}
      titleStyle={item.titleStyle}
      title={title}
      rightTitle={subTitle[index]}
      showRightArrow={item.showRightArrow}
      style={{height: ScaleValue(108)}}
      userInteractionEnabled={!(section.index == 0 && index == 0)}
      onPress={this._listItemAction.bind(this, index, item.title, section)}
    />
  }

  _renderSectionHeader = () => {
    return <View style={{height: ScaleValue(20), backgroundColor: '#EFEFEF'}}/>
  }

  _renderSeparator = () => {
    return (
      <View style={{backgroundColor: 'white'}}>
        <View style={{marginLeft: ScaleValue(30), height: ScaleValue(1), backgroundColor: '#E5E5E5'}}/>
      </View>
    )
  }

  _listItemAction(index, title, section) {
    let url;
    let pushWeb = true;
    if (section.index === 0) {
      if (index === 1) {

        return;
      }
      if (index === 2) {
        pushWeb = false;
        Navigation.push(this.props.componentId, {
          component: {
            name: GQScreenNames.realNameAuth,
            options: {
              bottomTabs: {
                visible: false,
              }
            }
          }
        })
      } else if (index === 3) {

        this.loadPasswordManageUrl().then((url) => {
          Navigation.push(this.props.componentId, {
            component: {
              name: GQScreenNames.webview,
              passProps: {
                url: GQAppMananger.getHTMLUrl() + url,
                title: title,
              },
              options: {
                bottomTabs: {
                  visible: false,
                }
              }
            }
          })
        });
        return;
      }
    } else {
      if (this.state.netData && this.state.netData.isRealName != '已完成') {

        GQAlert.show({
          title: '请先完成实名认证',
          cancelText: '取消',
          confirmText: '去认证',
          onCancelPressed: () => {
            console.log('my cancel')
          },
          onConfirmPressed: () => {
            Navigation.push(this.props.componentId, {
              component: {
                name: GQScreenNames.realNameAuth,
                options: {
                  bottomTabs: {
                    visible: false,
                  }
                }
              }
            })
          },
        });
        return;
      }

      if (index === 0) {
        // 风险评测
        url = GQHTMLConfig.riskAssessment;
      } else if (index === 1) {
        // 税收居民身份证明
        url = GQHTMLConfig.identification;
      } else if (index === 2) {
        // 投资者适当性身份
        url = GQHTMLConfig.investor;
      }
    }
    let navRightButtonText = '';
    let navRightButtonAction;

    if (url === GQHTMLConfig.identification) {
      navRightButtonText = '说明'
      navRightButtonAction = () => {
        GQInstructionDialog.show('中国税收居民是指在中国境内有住所，或无住所而在境内居住满一年的个人。在中国境内有住所是指因户籍、家庭、经济利益关系而在中国境内习惯性居住。在境内居住满一年，是指在一个纳税年度在中国境内居住365日。临时离境的，不扣减日数。临时离境，是指在一个纳税年度中一次不超过30日或多次累计不超过90日的离境。非居民是指中国税收居民以外的个人。')
      }
    }

    if (pushWeb) {
      Navigation.push(this.props.componentId, {
        component: {
          name: GQScreenNames.webview,
          passProps: {
            url: GQAppMananger.getHTMLUrl() + url,
            title: title,
            navRightButtonText: navRightButtonText,
            // dialogMessage:'中国税收居民是指在中国境内有住所，或无住所而在境内居住满一年的个人。在中国境内有住所是指因户籍、家庭、经济利益关系而在中国境内习惯性居住。在境内居住满一年，是指在一个纳税年度在中国境内居住365日。临时离境的，不扣减日数。临时离境，是指在一个纳税年度中一次不超过30日或多次累计不超过90日的离境。非居民是指中国税收居民以外的个人。',
            navRightButtonAction: navRightButtonAction
          }
        }
      })
    }

  }

  loadPasswordManageUrl = async () => {
    let touchID = 0
    let gesture = ''
    let biometryType = 'TouchID'
    try {
      touchID = await GQStorage.load({key: UserInfoKeys.isOpenTouchID});
      gesture = await GQStorage.load({key: UserInfoKeys.gesturepwd});
      biometryType = await TouchID.isSupported();
    } catch (e) {
    }
    console.log('biometryType' + biometryType)
    let isFaceID = biometryType === 'TouchID' ? false : true;
    console.log('isfaceid' + isFaceID)
    return `${GQHTMLConfig.pwdManager}?touchID=${Number(touchID)}&gestures=${Number(gesture.length > 0)}&faceID=${Number(isFaceID)}`;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})