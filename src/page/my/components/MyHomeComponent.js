/**
 * Created by lilang on 2018-09-30.
 */

import React, {Component} from 'react';
import {Text, View, SectionList, Alert, StyleSheet, Linking} from 'react-native';

import MyHomeMoreListItem from "./MyHomeMoreListItem";
import GQUtil, {ScaleValue} from "../../../utils/GQUtils";
import MyHomeListTwoButtonItem from "./MyHomeListTwoButtonItem";
import MyHomeLogoutView from "./MyHomeLogoutView";
import GQListFooterTextView from "../../../common/GQListFooterTextView";
import MyHomeTopView from "./MyHomeTopView";
import {Navigation} from "react-native-navigation";
import GQAlert from "../../../common/GQAlert";
import {GQScreenNames} from "../../screens/GQScreenNames";
import GQBaseComponent from "../../../common/GQBaseComponent";
import MyHomeStores from "../stores/MyHomeStores";
import MyConstants from "../constants/MyConstants";
import MyHomeActions from "../actions/MyHomeActions";
import RNProgressHUD from '../../../common/RNProgressHUD'
import GQUserInfo from "../../../utils/GQUserInfo";
import {GQAppMananger} from "../../../utils/GQAppManager";
import {GQHTMLConfig} from "../../../config/GQHTMLConfig";

// const moreListData = [{image:'wdbd',title:'我的保单'},
//   {image:'jyjl',title:'交易记录'},
//   {image:'wdkj',title:'我的卡券'},
//   {image:'yhkgl',title:'银行卡管理'},
//   {image:'wdlcs',title:'我的理财师'}];

const moreListData = [
  {image: 'yhkgl', title: '银行卡管理'}, {image: 'kefu', title: '联系客服'}];

export default class MyHomeComponent extends GQBaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      islogin: false,
      secureMoney: false,
    };
  }

  componentWillMount() {
    this._loadUserStatus();
    MyHomeActions.requestHomeData({});
  }

  componentDidMount() {
    MyHomeStores.addCustomListener(MyConstants.requestMyHomeData, this.requestHomeDataCallBack)
    MyHomeStores.addCustomListener(MyConstants.loginCallback, this.loginCallback)
  }

  componentWillUnmount() {
    MyHomeStores.removeCustomListener(MyConstants.requestMyHomeData, this.requestHomeDataCallBack)
    MyHomeStores.removeCustomListener(MyConstants.loginCallback, this.loginCallback)
  }

  componentDidMount() {
    this._loadUserStatus();
    MyHomeActions.requestHomeData({});
  }
  
  componentDidAppear() {

    
  }

  static options(passProps) {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
      },
    };
  }

  async _loadUserStatus() {
    let isLogin = await GQUserInfo.isLogin();
    let secureMoney = await GQUserInfo.getSecureMoneyStatus();
    this.setState({
      islogin: isLogin,
      secureMoney: secureMoney
    });
  }

  render() {
    let statusBarStyle = 'dark';
    if (this.state.islogin) {
      statusBarStyle = 'light';
    }
    Navigation.mergeOptions(this.props.componentId, {
      statusBar: {
        visible: true,
        style: statusBarStyle,
      },
    });
    return (
      <SectionList
        style={styles.container}
        renderItem={this._renderItem}
        renderSectionHeader={this._renderSectionHeader}
        renderSectionFooter={this._renderSectionFooter}
        stickySectionHeadersEnabled={false}
        ItemSeparatorComponent={this._renderSeparator}
        ListHeaderComponent={this._renderHeaderView}
        ListFooterComponent={this._renderFooterView}
        sections={[{index: '2', data: moreListData}]}
      />
    )
  }

  _renderItem = ({item, index, section}) => {
    if (section.index === '2') {
      const {image, title} = item;
      return <MyHomeMoreListItem image={image} title={title} onPress={this._listItemAction.bind(this, index, title)}/>
    }
    // 第一期不上
    // else {
    //   return <MyHomeListTwoButtonItem />
    // }
  }

  _renderSectionHeader = ({section: {index}}) => {
    //第一期先不上，暂时隐藏
    // if (index === '2') {
    //   return (
    //     <View style={{height: ScaleValue(80), backgroundColor: 'white'}}>
    //       <View style={{flex:1,marginLeft:ScaleValue(30),justifyContent:'center'}}>
    //         <Text>更多功能</Text>
    //       </View>
    //       <View style={{marginBottom:0, height: ScaleValue(1), backgroundColor: '#EFEFEF'}} />
    //     </View>
    //   )
    // }
    return <View/>
  }

  _renderSectionFooter = () => {
    return <View style={{height: ScaleValue(20), backgroundColor: '#EFEFEF'}}/>
  }

  _renderHeaderView = () => {
    return <MyHomeTopView
      islogin={this.state.islogin}
      onPressLogin={this.loginButtonAction}
      avatorAction={this._avatorAction}
      messageAction={this._messageAction}
      secureMoney={this.state.secureMoney}
      secureMoneyAction={this._secureMoneyAction}
      data={this.state.data}
    />
  }

  _renderFooterView = () => {
    let logoutView;
    if (this.state.islogin) {
      logoutView = <MyHomeLogoutView onPress={this.logoutButtonAction}/>
    }
    return (
      <View>
        {logoutView}
        <GQListFooterTextView/>
      </View>
    )
  }

  _renderSeparator = () => {
    return (
      <View style={{backgroundColor: 'white'}}>
        <View style={{marginLeft: ScaleValue(100), height: ScaleValue(1), backgroundColor: '#E5E5E5'}}/>
      </View>
    )
  }

  loginCallback = () => {
    this._loadUserStatus();
    MyHomeActions.requestHomeData({});
  }

  requestHomeDataCallBack = () => {
    // GQLoading.hidden();
    let response = MyHomeStores.getTempResponse();
    if (response.code === '0000') {
      this.setState({data: response.data})
    } else {

    }
  }

  loginButtonAction = () => {
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

  logoutButtonAction = () => {
    GQAlert.show({
      title: '确定退出登录吗？',
      cancelText: '取消',
      confirmText: '确定',
      onCancelPressed: () => {
        console.log('my cancel')
      },
      onConfirmPressed: () => {
        // GQStorage.remove({ key:UserInfoKeys.loginStatus});
        // GQStorage.save({key:UserInfoKeys.isOpenTouchID,data:false})
        // GQStorage.save({key:UserInfoKeys.gesturepwd,data:''})
        GQUserInfo.logout();
        this.setState({islogin: false});
      },
    });
  }

  _avatorAction = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: GQScreenNames.myAccount,
        // name: GQScreenNames.bankList,

        options: {

          bottomTabs: {
            visible: false,
            animate: true,
          },
        }
      },
    });
  }

  _messageAction = () => {
    this._pushWebView('消息中心', GQHTMLConfig.notification)
  }

  _secureMoneyAction = () => {
    GQUserInfo.saveSecureMoneyStatus(!this.state.secureMoney)
    this.setState((prevState) => {
      return {secureMoney: !prevState.secureMoney}
    })
  }

  _listItemAction(index, title) {
    if (!this.state.islogin) {

      this.loginButtonAction();

      return;
    }

    let url = '';
    if (index === 0) {
      url = GQHTMLConfig.bankcardManage;
    } else if (index === 1) {
      GQAlert.show({
        title: '请拨打xxxx-xxxx-xxxx',
        cancelText: '取消',
        confirmText: '拨打',
        onCancelPressed: () => {
          console.log('my cancel')
        },
        onConfirmPressed: () => {
          let url = 'tel://10086'
          Linking.canOpenURL(url).then(supported => {
            if (!supported) {
              console.log('Can\'t handle url: ' + url);
            } else {
              return Linking.openURL(url);
            }
          }).catch(err => console.error('An error occurred', err));
        },
      });
      return;
    }
    this._pushWebView(title, url)
  }

  _pushWebView(title, url) {

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
            animate: true,
          },
        }
      },
    });
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    marginTop: -(GQUtil.getIphoneStatusBar()),
  },
});