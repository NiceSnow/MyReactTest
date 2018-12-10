/**
 * Created by lilang on 2018/10/20.
 */
import LoginRegisterStores from "../page/loginRegister/stores/LoginRegisterStores";
import LoginRegisterConstants from "../page/loginRegister/constants/LoginRegisterConstants";
import MyConstants from "../page/my/constants/MyConstants";
import MyHomeStores from "../page/my/stores/MyHomeStores";

const keySecureMoney = 'secureMoneyKey'
const keyUserPhone = 'keyUserPhone'

export default class GQUserInfo {

  static saveCurrentUserPhone(phone) {
    return GQStorage.save({key: keyUserPhone, data: phone})
  }

  static async getCurrentUserPhone(){
    let phone = ''
    try {
      phone = await GQStorage.load({key:keyUserPhone})
    }catch (e) {
      console.log('读取手机号出错')
    }
    return phone;
  }

  static logout() {
    // GQStorage.remove({key: UserInfoKeys.loginStatus});
    GQStorage.save({key: UserInfoKeys.loginStatus, data: {token: ''}})
    // GQStorage.save({key:UserInfoKeys.isOpenTouchID,data:false})
    // GQStorage.save({key:UserInfoKeys.gesturepwd,data:''})
    GQUserInfo.saveTouchIDStatus(false);
    GQUserInfo.saveGesturePassword('')
    GQUserInfo.saveCurrentUserPhone('')
    MyHomeStores.emitCustomListener(MyConstants.loginCallback)
  }

  static async isLogin() {
    let token = await this.getToken();
    return token.length > 0 ? true : false;
  }

  static async saveLoginData(data) {
    // token = data.token;
    return GQStorage.save({key: UserInfoKeys.loginStatus,data:data})
  }

  static async getToken() {
    let result = {token: ''}
    try {
      result = await GQStorage.load({key: UserInfoKeys.loginStatus})
    } catch (e) {

    }
    return result.token;
  }

  static async getTokenAndPhone() {
    let result = {token: '',phone:''}
    try {
      result.token = await GQUserInfo.getToken();
      result.phone = await GQUserInfo.getCurrentUserPhone();
    } catch (e) {

    }
    return result;
  }

  // 保存 touchID 开启状态
  static saveTouchIDStatus(status) {
    return GQStorage.save({key: UserInfoKeys.isOpenTouchID, data: status})
  }

  // 获取 touchID 开启状态
  static async isOpenTouchID() {
    let isOpenTouchID = false;
    try {
      isOpenTouchID = await GQStorage.load({key: UserInfoKeys.isOpenTouchID});
    } catch (e) {
      console.log('读取指纹密码出错')
    }
    return isOpenTouchID;
  }

  static saveGesturePassword(password) {
    return GQStorage.save({key: UserInfoKeys.gesturepwd, data: password})
  }

  static async getGesturePassword() {
    let gesturepwd = ''
    try {
      gesturepwd = await GQStorage.load({key: UserInfoKeys.gesturepwd});
    } catch (e) {
      console.log('读取手势密码出错')
    }
    return gesturepwd;
  }

  /*
  *
  * 我的页面 金额密文显示
  * */
  static async saveSecureMoneyStatus(status) {
    let user = await this.getCurrentUserPhone()
    // console.log(`保存${user}密文金额`+status)

    return GQStorage.save({key: `secureMoney${user}`, data: status})
  }

  static async getSecureMoneyStatus() {
    let isSecureMoney = false;
    let user = await this.getCurrentUserPhone()
    try {
      isSecureMoney = await GQStorage.load({key: `secureMoney${user}`});
    } catch (e) {
      console.log('读取金额是否密文显示出错')
    }
    console.log(`读取${user}密文金额`+isSecureMoney)
    return isSecureMoney;
  }
}


