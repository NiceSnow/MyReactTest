import GQDispatcher from '../../../common/dispatcher/GQDispatcher'
import GQHttpUtils from '../../../utils/GQHttpUtils'
import GQUtils from "../../../utils/GQUtils";
import LoginRegisterConstants from "../constants/LoginRegisterConstants";
import LoginRegisterDispatcher from '../dispatcher/LoginRegisterDispatcher';
import MyHomeDispatcher from '../../my/dispatcher/MyHomeDispatcher'
import {GQRequestConfig} from "../../../config/GQRequestConfig";
import RNProgressHUD from "../../../common/RNProgressHUD";
import GQUserInfo from "../../../utils/GQUserInfo";

export default class LoginRegisterActions {
  // 用户登录
  static login(params) {

    RNProgressHUD.showLoading('登录中...');

    GQHttpUtils.postJsonFatch(GQRequestConfig.login, '', params).then((response) => {

      RNProgressHUD.hiddenLoading();

      if (!response.data) {
        RNProgressHUD.showText(response.exception);
      } else {
        GQUserInfo.saveLoginData(response.data);
        GQUserInfo.saveCurrentUserPhone(params.userName)
        GQDispatcher.dispatch({
          actionType: LoginRegisterConstants.login,
          response: response,
        })
      }

    }, (failJson) => {

      RNProgressHUD.hiddenLoading();

      RNProgressHUD.showText('登录失败');

    });

  }

  static logout(params) {
    GQDispatcher.dispatch({
      actionType: LoginRegisterConstants.logout,
    })
  }

  // 请求是否已注册
  static requestIsRegister(params) {

    RNProgressHUD.showLoading()

    GQHttpUtils.postJsonFatch(GQRequestConfig.isRegister, '', params).then((response) => {
      RNProgressHUD.hiddenLoading();

      if (response.code === '0') {
        GQDispatcher.dispatch({
          actionType: LoginRegisterConstants.isRegister,
          response: response,
        })
      }

    }, (failJson) => {
      RNProgressHUD.hiddenLoading();
      RNProgressHUD.showText(failJson.exception)
    });
  }

  // 新用户 注册
  static register(params, showLoading) {
    if (showLoading) {
      RNProgressHUD.showLoading();
    }

    GQHttpUtils.postJsonFatch(GQRequestConfig.register, '', params).then((response) => {
      if (showLoading) {
        RNProgressHUD.hiddenLoading();
      }
      if (response.code === '0') {
        if (response.data.token.length > 0) {
          GQUserInfo.saveLoginData(response.data)
          GQUserInfo.saveCurrentUserPhone(response.data.mobile)
          GQDispatcher.dispatch({
            actionType: LoginRegisterConstants.register,
            response: response,
          })
        }
      } else {
        if (response.exception.length > 0) {
          RNProgressHUD.showText(response.exception)
        }
      }

    }, (failJson) => {
      if (showLoading) {
        RNProgressHUD.hiddenLoading();
      }
    });
  }

  // static isRealNameByMobile(params) {
  //   RNProgressHUD.showLoading();
  //   console.log(params)
  //   GQHttpUtils.postJsonFatch(GQRequestConfig.isRealNameByMobile, '', params).then((response) => {
  //
  //     RNProgressHUD.hiddenLoading();
  //     if (response.code === '0') {
  //       GQDispatcher.dispatch({
  //         actionType: LoginRegisterConstants.isRealNameByMobile,
  //         data: response.data,
  //       })
  //     }
  //   }, (failJson) => {
  //     RNProgressHUD.hiddenLoading();
  //
  //   });
  // }

  // 获取验证码
  static sendMessageWithPhone(params, type) {
    // type = 1 注册   type = 2 修改登录密码
    RNProgressHUD.showLoading();
    GQHttpUtils.getJsonFetch(GQRequestConfig.sendMessage + `/${params}/${type}`, null).then((response) => {
      RNProgressHUD.hiddenLoading();
      if (response.code === '0') {
        RNProgressHUD.showText('短信验证码发送成功')
        GQDispatcher.dispatch({
          actionType: LoginRegisterConstants.sendMessage,
          response: response,
        })
      } else {
        RNProgressHUD.showText(response.exception)
      }
    }, failJson => {
      RNProgressHUD.hiddenLoading();
      RNProgressHUD.showText(response.exception)
    })
  }

  // 设置 新密码
  static submitNewPwd(params) {
    RNProgressHUD.showLoading();
    GQHttpUtils.postJsonFatch(GQRequestConfig.revserPwd, '', params).then(response => {
      RNProgressHUD.hiddenLoading();
      if (!response.data) {
        RNProgressHUD.showText(response.exception)
      } else {
        RNProgressHUD.showText('密码重置成功')
        GQDispatcher.dispatch({
          actionType: LoginRegisterConstants.revserPwd,
          response: response
        })
      }
    }, failResponse => {
      RNProgressHUD.hiddenLoading();
      RNProgressHUD.showText(failResponse.exception)
    })
  }

  // static submitRealNameAuth(params) {
  //   RNProgressHUD.showLoading();
  //   GQHttpUtils.postFormDataFatch(GQRequestConfig.realNameAuth, '', params).then((response) => {
  //     RNProgressHUD.hiddenLoading();
  //     if (response.code === '0000') {
  //       GQDispatcher.dispatch({
  //         actionType: LoginRegisterConstants.realNameAuth,
  //         data: response.data,
  //         status: response.code,
  //       })
  //     }
  //
  //   }, (failJson) => {
  //     RNProgressHUD.hiddenLoading();
  //   });
  // }
  // 身份证是否正确
  static requestIDCardIsTrue(params) {
    RNProgressHUD.showLoading();
    GQHttpUtils.postFormDataFatch(GQRequestConfig.getCustIsEmpty, '', params).then((response) => {
      RNProgressHUD.hiddenLoading();
      if (response.code === '0000') {
        // 验证成功
        GQDispatcher.dispatch({
          actionType: LoginRegisterConstants.getCustIsEmpty,
          response: response
        })
      }
    }, (failJson) => {
      RNProgressHUD.hiddenLoading();
      RNProgressHUD.showText(failJson.msg)
    });
  }

  static sendBankMsgCode(params) {
    RNProgressHUD.showLoading();
    GQHttpUtils.postFormDataFatch(GQRequestConfig.bindCradCode, '', params).then((response) => {
      RNProgressHUD.hiddenLoading();
      if (response.code === '0000') {
        GQDispatcher.dispatch({
          actionType: LoginRegisterConstants.bindingBankCardCode,
          response: response
        })
      }
    }, (failJson) => {
      RNProgressHUD.hiddenLoading();
      RNProgressHUD.showText(failJson.msg)
    });
  }

  static requestBindCard(params) {
    RNProgressHUD.showLoading();
    GQHttpUtils.postFormDataFatch(GQRequestConfig.bindCrad, '', params).then((response) => {
      RNProgressHUD.hiddenLoading();
      if (response.code === '0000') {
        GQDispatcher.dispatch({
          actionType: LoginRegisterConstants.bindingBankCardCode,
          response: response
        })
      }
    }, (failJson) => {
      RNProgressHUD.hiddenLoading();
      RNProgressHUD.showText(failJson.msg)
    });
  }

  static requestGetBankInfo(params) {

    GQHttpUtils.postFormDataFatch(GQRequestConfig.getBankInfo, '', params).then((response) => {

      if (response.code === '0000') {
        GQDispatcher.dispatch({
          actionType: LoginRegisterConstants.bindingBankCardCode,
          response: response,
        })
      }
    }, (failJson) => {
      RNProgressHUD.hiddenLoading();
    });
  }

  static requestSupportBankList(params) {
    GQHttpUtils.postFormDataFatch(GQRequestConfig.findBankCardList, '', params).then((response) => {

      if (response.code === '0000') {
        GQDispatcher.dispatch({
          actionType: LoginRegisterConstants.findBankCardList,
          response: response
        })
      }
    }, (failJson) => {
      RNProgressHUD.hiddenLoading();
    });
  }

}