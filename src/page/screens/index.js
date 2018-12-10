/**
 * Created by lilang on 2018-09-30.
 */

import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';

//首页
import {homeRegisterScreens} from './HomeScreens';
// 发现
import {discoverRegisterScreens} from './DiscoverScreens';
// 我的
import {myRegisterScreens} from './MyScreens';

import GQWebView from '../../common/GQWebView';
import NavigationMessageComponent from '../../common/NavigationMessageComponent'
import GQBaseComponent from "../../common/GQBaseComponent";
import MessageAuthCodeDialog from "../loginRegister/components/MessageAuthCodeDialog";

export function registerScreens() {
  homeRegisterScreens()
  discoverRegisterScreens()
  myRegisterScreens()

  Navigation.registerComponent('webview',()=>GQWebView);
  Navigation.registerComponent('navigationMessage',()=>NavigationMessageComponent);
  // Navigation.registerComponent('sms',()=>MessageAuthCodeDialog)
}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
    didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
    willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
    didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
  }).register();
}

