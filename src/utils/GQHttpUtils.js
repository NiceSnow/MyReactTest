import {
  NativeModules,
  Platform,
  ToastAndroid,
  StatusBar
} from 'react-native';
import {GQAppMananger} from './GQAppManager'
import {GQRequestConfig} from '../config/GQRequestConfig'
/**js和原生通讯bridgeModule*/
import GQNativeBridgeModule from './GQNativeBridgeModule'
import GQUtils from './GQUtils'
import GQAppUserInfo from './GQAppUserInfo'
import RNProgressHUD from "../common/RNProgressHUD";
import {Navigation} from 'react-native-navigation'
import {GQScreenNames} from "../page/screens/GQScreenNames";
import GQUserInfo from "./GQUserInfo";
import GQInstructionDialog from "../common/GQInstructionDialog";
import LoginRegisterStores from "../page/loginRegister/stores/LoginRegisterStores";
import MyConstants from "../page/my/constants/MyConstants";
import MyHomeStores from "../page/my/stores/MyHomeStores";
import DeviceInfo from 'react-native-device-info';

/**
 * React-Native Fatch网络请求工具类
 * params:请求参数
 * ES6 Promise 使用
 * resolve 成功时候返回
 * reject 失败时候返回
 */


export default class GQHttpUtils {
  /**
   * 基于 fetch 封装的 GET请求
   * @param {string} url 接口地址
   * @param {string} header 请求头信息
   * @return 返回Promise
   */
  static getFatch(url, header) {

    return new Promise((resolve, reject) => {
      let customHeader = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        header
      }
      fetch(GQAppMananger.getAppSeverUrl() + url, {
        method: 'GET',
        headers: customHeader,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            reject({status: response.status})
          }
        })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * 基于 fetch 封装的 POST请求 json数据格式
   * @param {string} url 接口地址
   * @param {string} header 请求头信息
   * @param {JSON} [params=''] body的请求参数，默认为空
   * @return 返回Promise
   */
  static getJsonFetch(url, params) {

    if (params) {
      let paramsArray = [];
      //拼接参数
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
      if (!url.includes('?')) {
        url += '?' + paramsArray.join('&')
      } else {
        url += '&' + paramsArray.join('&')
      }
    }

    let timeout = 10000;
    const request = new Promise((resolve, reject) => {
      var initData = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'User-Agent': GQAppUserInfo.getInstance().getUserAgent(),
        },
      }
      let requestUrl = GQAppMananger.getLoginServerUrl() + url
      let msg = `请求地址：${requestUrl}`
      console.log(msg)

      fetch(requestUrl, initData)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            reject({status: response.status})
          }
        })
        .then((response) => {
          //成功返回
          resolve(response)
        })
        .catch((error) => {
          //失败返回
          reject(error)
        })
    })
    // 定义一个延时函数
    const timeoutRequest = new Promise((resolve, reject) => {
      setTimeout(() => {
        var resCode = {code: '0408', result: null, message: ''}
        reject(resCode)
      }, timeout)
    })
    // 竞时函数，谁先完成调用谁
    return Promise.race([request, timeoutRequest])
  }


  /**
   *
   * 此方式主要跟用户中心相关接口通信
   * exception 错误信息字段
   *
   * 基于 fetch 封装的 POST请求 json数据格式
   * @param {string} url 接口地址
   * @param {string} header 请求头信息
   * @param {JSON} [params=''] body的请求参数，默认为空
   * @return 返回Promise
   */
  static postJsonFatch(url, header, params = '') {
    let timeout = 10000;
    params.chanelStyle = 'MOBILE';
    const request = new Promise((resolve, reject) => {
      var initData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': GQAppUserInfo.getInstance().getUserAgent(),
        },
        body: JSON.stringify(params)
      }
      let requestUrl = GQAppMananger.getLoginServerUrl() + url
      let msg = `请求地址：${requestUrl}`
      console.log(msg + '\n' + '参数' + JSON.stringify(params))

      fetch(requestUrl, initData)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            reject({code: response.status, exception: '网络连接失败'})
          }
        })
        .then((response) => {
          //成功返回
          resolve(response)
          console.log(response)
        })
        .catch((error) => {
          //失败返回
          reject(error)
          console.log(`请求失败：${msg} error: ${error}`)
        })
    })
    // 定义一个延时函数
    const timeoutRequest = new Promise((resolve, reject) => {
      setTimeout(() => {
        var resCode = {code: '0408', result: null, exception: '网络请求超时'}
        reject(resCode)
      }, timeout)
    })
    // 竞时函数，谁先完成调用谁
    return Promise.race([request, timeoutRequest])
  }

  /**
   * 基于 fetch 封装的 POST请求 form表单格式
   * @param {string} url 接口地址
   * @param {string} header 请求头信息
   * @param {JSON} [params=''] body的请求参数，默认为空
   * @return 返回Promise
   */
  static postFormDataFatch(url, header, params = '') {
    let timeout = 20000
    // 拼接参数
    params = GQUtils.encryptParameter(params);

    return GQUserInfo.getTokenAndPhone().then((user) => {
      //添加用户手机号
      params.mobile = user.phone;
      let formData = GQUtils.jsonToFromData(params);
      var initData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': DeviceInfo.getUserAgent(),
          'token': user.token,
        },
        body: formData
      }
      let msg = `请求地址：${GQAppMananger.getAppSeverUrl() + url}`
      console.log(msg)
      //设置网络指示器状态
      StatusBar.setNetworkActivityIndicatorVisible(true);

      const request = new Promise((resolve, reject) => {

        fetch(GQAppMananger.getAppSeverUrl() + url, initData)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              reject({code: response.status, msg: '网络连接失败'})

              console.log(`请求失败......response：${JSON.stringify(response)}`)
            }
          })
          .then((response) => {
            StatusBar.setNetworkActivityIndicatorVisible(false);
            //服务器返回数据
            resolve(response)
            console.log(JSON.stringify(response))

            if (response.code == '999') {
              //token失效，重新登录
              GQUserInfo.logout();
              let message = '您的账号已在其他设备登录';
              if (response.msg && response.msg.length > 0) {
                message = response.msg;
              }
              GQInstructionDialog.show(message)

            } else if (response.code === '0001') {
              // 0001：异常（返回对应的msg）
              if (url === GQRequestConfig.getBankInfo){
                //获取银行卡信息时不显示错误提示
                return;
              }
              if (response.msg.length > 0) {
                RNProgressHUD.showText(response.msg)
              }
            }
          })
          .catch((error) => {

            let resCode = {code: '0004', result: null, msg: ''}
            reject(resCode)

            StatusBar.setNetworkActivityIndicatorVisible(false);

            console.log(`请求失败：${msg} error: ${error}`)
          })
      })
      // 定义一个延时函数
      const timeoutRequest = new Promise((resolve, reject) => {
        setTimeout(() => {
          var resCode = {code: '0408', result: null, msg: '网络请求超时'}

          reject(resCode)

          console.log(resCode.msg)

          StatusBar.setNetworkActivityIndicatorVisible(false);

        }, timeout)
      })
      // 竞时函数，谁先完成调用谁
      return Promise.race([request, timeoutRequest])
    })
  }

  // 上传图片
  static uploadImageFatch(url, header, params = '') {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      for (var key in params) {
        if (key != 'file') {
          formData.append(key, params[key]);
        }
      }
      for (let i = 0; i < params.file.length; i++) {
        formData.append("file", {
          uri: params.file[i].uri,
          type: 'application/octet-stream',
          name: 'image' + i + '.jpg'
        });
      }
      var initData = {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data;charset=utf-8',
          'User-Agent': GQAppUserInfo.getInstance().getUserAgent(),
        },
        body: formData
      }
      if (Platform.OS == 'ios') {
      } else {
      }
      fetch(GQAppMananger.getAppSeverUrl() + url, initData
      )
        .then((response) => {
          if (Platform.OS == 'ios') {
          } else {
          }
          if (response.ok) {
            return response.json();
          } else {
            reject({status: response.status})
          }
        })
        .then((response) => {
          //成功返回
          resolve(response)
        })
        .catch((error) => {
          //失败返回
          if (Platform.OS == 'ios') {
          } else {
          }
          reject(error)
        })
    })
  }
}

/* 使用方法
import GQHttpUtils from './HttpUtils'

 export default class GQUserFatchUtils extends Component {

     GQHttpUtils.postFatch(url, header,params)
        .then((json) => {
            //处理 请求success
            if(json.code === 0 ){
            }else{
                 //处理自定义异常
            }
        },(json) => {
          //TODO 处理请求fail
        })
 }
*/
