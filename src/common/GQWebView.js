/**
 * Created by lilang on 2018-09-30.
 */

import React, {Component} from 'react';
import {WebView, View, StyleSheet, InteractionManager, StatusBar, Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import GQBaseComponent from "./GQBaseComponent";
import GQWebViewHandlerUtils from "../utils/GQWebViewHandlerUtils";
import GQUtil, {ScaleValue} from "../utils/GQUtils";
import RNProgressHUD from "./RNProgressHUD";
import GQInstructionDialog from "./GQInstructionDialog";
import GQUserInfo from "../utils/GQUserInfo";
import {GQAppMananger} from "../utils/GQAppManager";
import GQHomeData from "../page/home/stores/GQHomeData";
import GQExceptionView from "../page/publicComponent/GQExceptionView";
import DeviceInfo from "react-native-device-info";
/*
* passProps 参数：
* title 导航栏文字
* navRightButtonText 导航栏右侧按钮文字
* navRightButtonAction 导航栏右侧按钮 事件回调
* topBarVisible 导航栏是否隐藏
* urlHasDomain  网页链接是否包含 域名前缀
* */
export default class GQWebView extends GQBaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      url: '',
      loadFail: false
    };

    this.canNavigateBack = false;
  }

  static defaultProps = {
    topBarVisible: true,
    title:''
  }

  static options(passProps) {
    return {
      topBar: {
        // visible: passProps.topBarVisible,
        title: {
          text: passProps.title,
        },
        rightButtons: [
          {
            id: 'rightButton',
            text: passProps.navRightButtonText,
            color: '#333333',
            fontSize: ScaleValue(30),
          }
        ]
        // leftButtons:[
        //   {
        //     id:'back',
        //     icon:require('../images/xzjt.png'),
        //     color: '#acacac',
        //   }
        // ]
      }
    }
  }

  componentWillMount() {
    this._loadUrl();
    this.onMessageVisible = false;
  }

  navigationButtonPressed({buttonId}) {
    if (buttonId === 'back') {
      if (this.canNavigateBack) {
        this._webview.goBack();
      } else {
        Navigation.pop(this.props.componentId);
      }
    } else if (buttonId === 'rightButton') {
      // this.setState({modalVisible:true})
      this.props.navRightButtonAction();
    }
  }

  _reload = () => {
    this.setState({loadFail: false})
  }

  render() {
    let top = 0;
    if (!this.props.topBarVisible) {
      top = GQUtil.getIphoneStatusBar();
    }

    let webView = (
      <WebView
        ref={c => (this._webview = c)}
        style={[styles.webView, {marginTop: top}]}
        // source={{uri: this._getSource()}}
        source={{uri: this.state.url}}
        automaticallyAdjustContentInsets={true}
        onLoad={(e) => console.log('onLoad')}
        onLoadStart={this._onLoadStart}
        onLoadEnd={this._onLoadEnd}
        onError={this._onError}
        onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest}
        useWebKit={true}
        onMessage={this._onMessage}
      />
    )

    return (
      <View style={{flex: 1}}>
        {/*<GQInstructionDialog*/}
        {/*visible={this.state.modalVisible}*/}
        {/*message={this.props.dialogMessage}*/}
        {/*dismissAction={()=>this.setState({modalVisible:false})}*/}
        {/*/>*/}
        {this.state.loadFail && <GQExceptionView exceptionPress={this._reload}/>}
        {!this.state.loadFail && webView}
      </View>
    )
  }

  // h5 的 postMessage 回调
  _onMessage = (e) => {

    if (e.nativeEvent.data.includes('jsaction/')) {

      if (e.nativeEvent.data.includes('login')){
        // 记录是否有收到消息，收到消息后 强制不让网页加载（return false;）,
        // 因为加载会导致页面跳转后显示加载框和导航栏隐藏问题
        this.onMessageVisible = true;
      }
      GQWebViewHandlerUtils.handlerURL(this.props.componentId, this._webview, e.nativeEvent.data, this._loadUrl);
    }
  }

  _onShouldStartLoadWithRequest = (navState) => {

    console.log(`当前网页链接：${navState.url}`)

    if (this.onMessageVisible) {
      return false;
    }

    //设置 导航栏 title
    if (!this.props.title && this.props.title.length == 0 && navState.title.length > 0) {
      Navigation.mergeOptions(this.props.componentId, {
        topBar: {
          title: {
            text: navState.title,
          }
        }
      })
    }

    this.canNavigateBack = navState.canGoBack;

    if (navState.url.includes('jsaction/')) {
      GQWebViewHandlerUtils.handlerURL(this.props.componentId, this._webview, navState.url, this._loadUrl)
      return false;
    }
    return true;
  }

  _onLoadStart = (e) => {
    console.log('onLoadStart')
    RNProgressHUD.showLoading();
  }

  _onLoadEnd = (e) => {
    // !e.nativeEvent.url.includes('jsaction') &&
    if (e.nativeEvent.code != -1001 && !this.props.topBarVisible) {
      Navigation.mergeOptions(this.props.componentId, {
        topBar: {
          visible: this.props.topBarVisible,
        }
      })
    }
    console.log('onLoadEnd:' + e.nativeEvent)
    RNProgressHUD.hiddenLoading();
  }
  _onError = () => {
    this.setState({loadFail: true})
  }

  _loadUrl = () => {
    this.onMessageVisible = false;
    GQUserInfo.getTokenAndPhone().then((result) => {
      // let source = GQAppMananger.getHTMLUrl() + this.props.url
      // if (this.props.urlHasDomain) {
      //   source = this.props.url
      // }
      let source = this.props.url;
      if (result.token.length > 0) {
        if (this.props.url.includes('?')) {
          source += '&'
        } else {
          source += '?'
        }
      }
      if (this.props.urlHasDomain){
        source += `token=${result.token}`
      }else {
        source += `token=${result.token}&mobile=${result.phone}&ver=${DeviceInfo.getVersion()}&device=${Platform.OS}`
      }
      this.setState({url: source});
    })
  }
}


const styles = StyleSheet.create({
  webview: {
    flex: 1,
  }
})