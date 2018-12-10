import React, {Component} from 'react';
import TouchID from "react-native-touch-id";
import RNProgressHUD from "../common/RNProgressHUD";
import GQAlert from "../common/GQAlert";
import {Navigation} from 'react-native-navigation';
import {GQScreenNames} from "../page/screens/GQScreenNames";
import GQUserInfo from "./GQUserInfo";
import GQInstructionDialog from "../common/GQInstructionDialog";
import MyHomeStores from "../page/my/stores/MyHomeStores";
import MyConstants from "../page/my/constants/MyConstants";
import LoginRegisterStores from "../page/loginRegister/stores/LoginRegisterStores";

const optionalConfigObject = {
  title: "Authentication Required", // Android
  color: "#e00606", // Android
  sensorDescription: "Touch sensor", // Android
  cancelText: "Cancel", // Android
  fallbackLabel: "", // iOS (if empty, then label is hidden)
  unifiedErrors: false // use unified error messages (default false)
}

export default class GQWebViewHandlerUtils {
  /*
  * componentId webView的componentId（pop用）
  * webView
  * url 需要做处理的url
  * */
  static handlerURL(componentId, webView, url, callback) {

    if (url.includes('openTouchID')) {

      TouchID.isSupported(optionalConfigObject)
        .then(biometryType => {
          // Success code
          let title = ''
          let showText = ''


          if (biometryType === 'FaceID') {
            console.log('FaceID is supported.');
            title = '请验证面容';
            showText = '面容登录';
          } else {
            console.log('TouchID is supported.');
            title = '请验证您的指纹';
            showText = '指纹密码';
          }

          TouchID.authenticate(title, optionalConfigObject)  //判断TouchID验证是否成功
            .then(success => {
              //验证成功后进行的操作
              webView.injectJavaScript('isChecked(true)');
              GQUserInfo.saveTouchIDStatus(true)
              // GQStorage.save({key: UserInfoKeys.isOpenTouchID, data: true})
              RNProgressHUD.showText(showText + '开启成功')
            })
            .catch(error => {
              //验证失败后进行的操作
              RNProgressHUD.showText(showText + '开启失败');
              webView.injectJavaScript('isChecked(false)');
            });
        })
        .catch(error => {
          // Failure code
          console.log(error);
        });
/*
      TouchID.isSupported(optionalConfigObject) //判断设备是否支持TouchID验证
        .then(success => {

          TouchID.authenticate('请验证指纹', optionalConfigObject)  //判断TouchID验证是否成功

            .then(success => {
              //验证成功后进行的操作
              webView.injectJavaScript('isChecked(true)');
              GQUserInfo.saveTouchIDStatus(true)
              // GQStorage.save({key: UserInfoKeys.isOpenTouchID, data: true})
              RNProgressHUD.showText('指纹密码开启成功')
            })
            .catch(error => {
              //验证失败后进行的操作
              RNProgressHUD.showText('指纹密码开启失败');
              webView.injectJavaScript('isChecked(false)');
            });
        })
        .catch(error => {
          //设备不支持TouchID验证后进行的操作
          RNProgressHUD.showText('设备不支持此操作')
        });
*/
    } else if (url.includes('closeTouchID')) {

      GQAlert.show({
        title: '确定关闭指纹密码吗？',
        cancelText: '取消',
        confirmText: '确定',
        onCancelPressed: () => {
          console.log('my cancel')
        },
        onConfirmPressed: () => {
          // GQStorage.save({key:UserInfoKeys.isOpenTouchID,data:false})
          GQUserInfo.saveTouchIDStatus(false)
          webView.injectJavaScript('isChecked(false)');
          RNProgressHUD.showText('指纹密码关闭成功')
        },
      });
      // TouchID.authenticate('请验证指纹',optionalConfigObject)  //判断TouchID验证是否成功
      //   .then(success => {
      //     //验证成功后进行的操作
      //     GQStorage.save({key:UserInfoKeys.isOpenTouchID,data:{isOpenTouchID: false}})
      //     webView.injectJavaScript('isChecked(false)');
      //   })
      //   .catch(error => {
      //     //验证失败后进行的操作
      //     // webView.injectJavaScript('isChecked(false)');
      //     // RNProgressHUD.showText('Authentication Failed')
      //   });
    } else if (url.includes('gpwd')) {

      // 保存手势密码
      let arr = url.split('/');
      console.log(url)
      GQUserInfo.saveGesturePassword(arr[arr.length - 1]).then(() => {
        RNProgressHUD.showText('手势密码设置成功');
      });
      // GQStorage.save({key:UserInfoKeys.gesturepwd,data: arr[arr.length - 1]}).then(()=>{
      //         RNProgressHUD.showText('手势密码设置成功');
      //       })
    } else if (url.includes('lockpwd')) {
      // 修改手势密码
      GQUserInfo.getGesturePassword().then((result) => {
        webView.injectJavaScript(`getLockPwd(${result})`);
      })
    } else if (url.includes('closegesture')) {
      // 关闭手势密码
      GQUserInfo.saveGesturePassword('');

    } else if (url.includes('fundback') || url.includes('pop')) {
      // 基金首页返回原生页面 h5返回原生
      Navigation.pop(componentId)

    } else if (url.includes('dialog')) {
      // webView 调用原生提示窗
      let arr = url.split('/');
      RNProgressHUD.showText(decodeURI(arr[arr.length - 1]))

    } else if (url.includes('tokenexpired')) {
      // token 过期
      GQInstructionDialog.show('您的账号已在其他设备登录');
      GQUserInfo.logout();
      Navigation.pop(componentId)
    } else if (url.includes('login')) {

      Navigation.push(componentId, {
        component: {
          name: GQScreenNames.loginPhone,
          passProps: {
            authSuccess:()=>{
              Navigation.popTo(componentId);
              callback();
              console.log('网页内跳转登录成功')
            }
          },
          options: {
            topBar:{
              visible: true
            },
            bottomTabs: {
              visible: false,
              animate: true,
            },
          }
        },
      });
    }
  }
}
