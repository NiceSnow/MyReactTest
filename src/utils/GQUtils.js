"use strict";
import React, {Component} from "react";
import {Dimensions, PixelRatio, NativeModules, Platform} from "react-native";
import GQMd5 from "./GQMd5";
import GQAppUserInfo from "./GQAppUserInfo";
/**js和原生通讯bridgeModule*/
import GQNativeBridgeModule from "./GQNativeBridgeModule";
import DeviceInfo from 'react-native-device-info';

let debugLog = true;


export const ScaleValue = (value) => {
  if (Platform.OS == "ios") {
    let k = Dimensions.get("window").width / 750;
    return k * value;
  } else {
    return Math.min(
      Dimensions.get("window").width / 750,
      Dimensions.get("window").height / 1334
    ) * value;
  }
};
export default class GQUtil extends Component {
  /**
   * 返回屏幕高度度
   * @returns {*}
   * @private
   */
  static loadingActivityShow() {
    if (Platform.OS == "ios") {
      GQNativeBridgeModule.showLoadingHubWithType(
      );
    } else {
      NativeModules.GQAndroidBridgeModule.showLoadingHubWithType(

      );
    }
  }

  static loadingActivityHide() {
    if (Platform.OS == "ios") {
      GQNativeBridgeModule.showLoadingHubWithType(
      );
    } else {
      NativeModules.GQAndroidBridgeModule.showLoadingHubWithType(
      );
    }
  }

  /**
   * 判断是否是iphoneX 底部安全区域
   */
  static getIphoneXBottomBar() {
    return this.getIsIphoneX() ? 34 : 0;
  }

  static getTabbarHeight() {
    return this.getIsIphoneX() ? 83 : 49;
  }

  static getNavHeiht() {
    return this.getIsIphoneX() ? 88 : 64;
  }

  /**
   * 判断是否是iphoneX
   */
  static getIsIphoneX() {
    let k = Dimensions.get("window").height;
    if (k == 812 || k == 896) {
      return true;
    }
    return false;
  }

  /**
   * 判断是否是iphoneX 状态栏高度
   */
  static getIphoneStatusBar() {
    return this.getIsIphoneX() ? 44 : 20;
  }

  /**
   * 判断是否是iphoneX 底部安全区域
   */
  static getIphoneXBottomBar() {
    return this.getIsIphoneX() ? 34 : 0;
  }

  /**
   * 已iPhone6s为标准适配屏幕
   * @private
   */
  static getAutoScaleIPhone6s() {
    if (Platform.OS == "ios") {
      let k = Dimensions.get("window").width / 750;
      return k;
    } else {
      return Math.min(
        Dimensions.get("window").width / 750,
        Dimensions.get("window").height / 1334
      );
    }
  }

  static getTabbarHeight() {
    return this.getIsIphoneX() ? 83 : 49;
  }

  static getNavHeiht() {
    return this.getIsIphoneX() ? 88 : 64;
  }

  static getTitleHeight() {
    if (
      Dimensions.get("window").height == 692 &&
      Dimensions.get("window").width == 360
    ) {
      return 12;
    }
    return this.getIsIphoneX() ? (88 + 44) / 2 : 64;
  }

  static getIsS8() {
    if (
      Dimensions.get("window").height == 692 &&
      Dimensions.get("window").width == 360
    ) {
      return true;
    }
    return false;
  }

  /**
   * 返回屏幕宽度
   * @returns {*}
   * @private
   */
  static getScreenWidth() {
    return Dimensions.get("window").width;
  }

  /*
         * 参数说明：
         * number：要格式化的数字
         * decimals：保留几位小数
         * dec_point：小数点符号
         * thousands_sep：千分位符号
         * roundtag:舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入
         * */
  static number_format(number, decimals, dec_point, thousands_sep, roundtag) {
    number = (number + "").replace(/[^0-9+-Ee.]/g, "");
    roundtag = roundtag || "ceil"; //"ceil","floor","round"
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
      dec = typeof dec_point === "undefined" ? "." : dec_point,
      s = "",
      toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec);
        return (
          "" +
          parseFloat(
            Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(
              prec * 2
            )
          ) /
          k
        );
      };
    s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if ((s[1] || "").length < prec) {
      s[1] = s[1] || "";
      s[1] += new Array(prec - s[1].length + 1).join("0");
    }
    return s.join(dec);
  }

  /**
   * 返回屏幕高度度
   * @returns {*}
   * @private
   */
  static getScreenHeight() {
    if (Platform.OS === "ios") {
      return Dimensions.get("window").height;
    } else {
      return GQAppUserInfo.getInstance().getScreenHeight();
    }
  }

  /**
   * 输出log
   * @private
   */
  static log(text) {
    if (debugLog) {
      console.log(text);
    }
  }

  /**
   *json转表单数据
   *
   */
  static jsonToFromData(data) {
    let str = "";
    for (let [k, v] of Object.entries(data)) {
      if (str == "") {
        str += k + "=" + v;
      } else {
        str += "&" + k + "=" + v;
      }
    }
    return str;
  }

  static encryptParameter(params) {

    params.ver = DeviceInfo.getVersion();
    params.device = Platform.OS;
    // params.tokenId = GQAppUserInfo.getInstance().getTokenId();
    // params.deviceId = GQAppUserInfo.getInstance().getDeviceId();
    // this.log("encryptParameter-0-----------params");
    // this.randomMobile(params);
    // params.appModel = GQAppUserInfo.getInstance().getAppModel();
    // params.mobileSysVer = GQAppUserInfo.getInstance().getMobileSysVer();
    // this.log("encryptParameter---1------------params===" + params);
    // params.userName = "11111111";
    // params.tokenId = '222222';
    // params.ver = "1.0";
    console.log(params)
    return params;
  }

  /**
   *手机号拼接
   */
  static randomMobile(params) {
    let strRandom = "";
    if (!!params.mobile && params.mobile.length == 11) {
      for (let i = 0; i < 32; i++) {
        if (i == 1) {
          strRandom += params.mobile.charAt(0);
        } else if (i == 5) {
          strRandom += params.mobile.charAt(1);
        } else if (i == 8) {
          strRandom += params.mobile.charAt(2);
        } else if (i == 10) {
          strRandom += params.mobile.charAt(3);
        } else if (i == 13) {
          strRandom += params.mobile.charAt(4);
        } else if (i == 16) {
          strRandom += params.mobile.charAt(5);
        } else if (i == 19) {
          strRandom += params.mobile.charAt(6);
        } else if (i == 22) {
          strRandom += params.mobile.charAt(7);
        } else if (i == 25) {
          strRandom += params.mobile.charAt(8);
        } else if (i == 27) {
          strRandom += params.mobile.charAt(9);
        } else if (i == 28) {
          strRandom += params.mobile.charAt(10);
        } else {
          strRandom += this.randomNumBoth(0, 9);
        }
      }
      params.mobile = strRandom;
    }
    this.log("randomMobile------------params");
    this.log(params);
    this.encryptUlr(params);
  }

  /**MD5 加密 */
  static encryptUlr(params) {
    let keyarry = Object.keys(params).sort((a, b) => {
      var a = a.toLowerCase();
      var b = b.toLowerCase();
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    let md5str = "";
    keyarry.forEach((key, i) => {
      if (i == 0) {
        md5str = key + "=" + params[key];
      } else {
        if (key == 'file') {
        } else {
          md5str += "&" + key + "=" + params[key];
        }
      }
    });
    md5str +=  "&secretKey=4704540132603844096724182068402814985072698556303674268151921210";
    md5str = GQMd5.md5(md5str);
    params.sign = md5str;

    return params;
  }

  static randomNumBoth(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
  }

  /**
   *字符串转json
   */
  static stringToJson(data) {
    return JSON.parse(data);
  }

  /**
   *json转字符串
   */
  static jsonToString(data) {
    return JSON.stringify(data);
  }

  /**
   *map转换为json
   */
  static mapToJson(map) {
    return JSON.stringify(JsonUtils.strMapToObj(map));
  }

  /**
   *json转换为map
   */
  static jsonToMap(jsonStr) {
    return JsonUtils.objToStrMap(JSON.parse(jsonStr));
  }

  /**
   *map转化为对象（map所有键都是字符串，可以将其转换为对象）
   */
  static strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
      obj[k] = v;
    }
    return obj;
  }

  /**
   *对象转换为Map
   */
  static objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
      strMap.set(k, obj[k]);
    }
    return strMap;
  }

  static changeToDecimal(s, n) {
    if (s === "") return;
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s
        .split(".")[0]
        .split("")
        .reverse(),
      r = s.split(".")[1];
    var t = "";
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
    }
    return (
      t
        .split("")
        .reverse()
        .join("") +
      "." +
      r +
      "%"
    );
  }
  // 手机号是否正确
  static checkPhoneNumber(string) {
    return /^1[34578]\d{9}$/.test(string);
  }
  // 数字+字母 8-20位 组合密码
  static checkPassword(string) {
    // return /^.*(?=.{8,20})(?=.*\d)(?=.*[a-z]).*$/.test(string);
    return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(string)
  }
  // 身份证校验
  static checkIDCard(string) {
    return /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/.test(string);
  }
  // 中文姓名 + .
  static checkUserName(string) {
    return /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(string)
  }
  // 手机号密文  130****5678
  static getSecurePhone(phone='') {
    if (phone.length === 11) {
      return phone.substr(0,3) + '****' + phone.substr(7,4);
    }
    return ''
  }

}
// module.exports = GQUtil;
