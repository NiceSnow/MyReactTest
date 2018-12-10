/**
 * Created by lilang on 2018-09-30.
 */

import {NativeModules} from 'react-native'

var ProgressHUD = NativeModules.RNMBProgressHUD;


export default class RNProgressHUD {
  static showText(message, duration=2000){
    ProgressHUD.showText(message,duration)
  }

  static showLoading(message=''){
    ProgressHUD.showLoading(message)
  }
  static hiddenLoading(){
    ProgressHUD.hiddenLoading();
  }

  static showIKnowDialog(message=''){
    ProgressHUD.showIKnowText(message)
  }
}