/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import {Navigation} from 'react-native-navigation';
import {Platform, AppState} from 'react-native';
import {registerScreens} from './page/screens';
import KeyboardManager from 'react-native-keyboard-manager';
import TouchID from 'react-native-touch-id';

import './config/GQStorageConfig';
import './common/GQUserInfoKeys';
import {GQScreenNames} from "./page/screens/GQScreenNames";
import RNProgressHUD from "./common/RNProgressHUD";
import GQUserInfo from "./utils/GQUserInfo";
import {ScaleValue} from "./utils/GQUtils";

const defaultColor = '#333333';
const selectColor = '#FF3E19';

const optionalConfigObject = {
  title: "Authentication Required", // Android
  color: "#e00606", // Android
  sensorDescription: "Touch sensor", // Android
  cancelText: "Cancel", // Android
  // fallbackLabel: "Show Passcode", // iOS (if empty, then label is hidden)
  unifiedErrors: false // use unified error messages (default false)
}

start();

function start() {
  //键盘遮挡组件
  KeyboardManager.setToolbarPreviousNextButtonEnable(true);

  AppState.addEventListener('change', handleAppStateChange);

  GQUserInfo.getToken();

  //注册页面
  registerScreens();

  Navigation.events().registerAppLaunchedListener(() => {


    // GQStorage.save({key: 'lockDisplayed', data: false}).then((result) => {
    //   checkLoginStyle();
    // })

    Navigation.setDefaultOptions({
      topBar: {
        title: {
          color: '#666666',
          fontSize: ScaleValue(36)
        },
        buttonColor: '#acacac',
        backButton: {
          color: '#acacac',
          // icon: require('./images/xzjt.png'),
          visible: false,
          showTitle: false
        },
      },
      bottomTab: {
        textColor: defaultColor,
        selectedTextColor: selectColor,
        fontSize: ScaleValue(22)
      },
    });
    // setTabBarRoot();
    setRoot();
  });

  // 根据登录状态设置跟控制器
  function setRoot() {
    GQUserInfo.isLogin().then(isLogin => {
      if (isLogin) {
        setTabBarRoot();
        // 重启app时设置 锁屏已经显示 设为 false
        saveLockDisplayedStatus(false).then((result) => {
          checkLoginStyle();
        })
      } else {
        setLoginRoot();
      }
    })
  }

  function setLoginRoot() {
    Navigation.setRoot({
      root: {
        stack: {
          options: {},
          children: [
            {
              component: {
                name: GQScreenNames.loginPhone,
                passProps: {
                  hideBack: true,
                  authSuccess: () => {
                    setTabBarRoot()
                  }
                }
              }
            }
          ]
        },

      }
    })
  }

  function setTabBarRoot() {

    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [{
            stack: {
              id: GQScreenNames.homeMain,
              children: [
                {
                  component: {
                    name: GQScreenNames.homeMain
                  }
                }
              ],
              options: {
                bottomTab: {
                  text: '首页',
                  // textColor: defaultColor,
                  // selectedTextColor: selectColor,
                  icon: require('./images/home/syh.png'),
                  selectedIcon: require('./images/home/syx.png')
                }
              }
            }
          },
            {
              stack: {
                id: GQScreenNames.discoverHome,
                children: [
                  {
                    component: {
                      name: GQScreenNames.discoverHome,
                      passProps: {
                        //隐藏导航栏返回按钮
                        hideBack: true,
                      },
                    }
                  }
                ],
                options: {
                  bottomTab: {
                    text: '发现',
                    // textColor: 'blue',
                    // selectedTextColor: 'red',
                    icon: require('./images/home/fxh.png'),
                    selectedIcon: require('./images/home/fxx.png')
                  }
                }
              }
            },
            {
              stack: {
                id: GQScreenNames.myHome,
                children: [
                  {
                    component: {
                      name: GQScreenNames.myHome
                    }
                  }
                ],
                options: {
                  bottomTab: {
                    text: '我的',
                    // textColor: 'blue',
                    // selectedTextColor: 'red',
                    icon: require('./images/home/wdh.png'),
                    selectedIcon: require('./images/home/wdx.png')
                  }
                }
              }
            }]
        }
      }
    });
  }

  // 前后台状态切换 回调
  function handleAppStateChange(nextAppState) {

    let date = new Date();

    if (nextAppState === 'active') {

      GQStorage.load({key: 'backgroundTime'}).then((time) => {
        console.log('上次进入后台的时间' + time)
        let nowTime = new Date().getTime();
        if (nowTime - time >= 5 * 60 * 1000) {
          checkLoginStyle();
        }
      }).catch(() => {
        console.log('读取后台时间出错')
      });
    } else {
      GQStorage.save({key: 'backgroundTime', data: date.getTime()})
    }

    console.log(`时间:${date}${nextAppState}   ` + date.getTime())
  }

  async function checkLoginStyle() {

    let isOpenTouchID = false;
    let gesturepwd = '';

    try {
      isOpenTouchID = await GQUserInfo.isOpenTouchID();
      gesturepwd = await GQUserInfo.getGesturePassword();
    } catch (e) {
    }

    if (isOpenTouchID || gesturepwd.length > 0) {
      // 获取 锁屏界面 是否已经显示
      getLockDisplayed().then((lockDisplayed) => {

        if (!lockDisplayed) {

          Navigation.showModal({
            stack: {
              children: [{
                component: {
                  name: GQScreenNames.gesturepassword,
                  passProps: {
                    isOpenTouchID: isOpenTouchID,
                    gesturePassword: gesturepwd,
                    dismissAction: () => {
                      saveLockDisplayedStatus(false)
                    }
                  },
                  options: {
                    topBar: {
                      visible: false,
                    }
                  }
                }
              }]
            }
          });
          saveLockDisplayedStatus(true)
        }
      })
    }
  }

  function saveLockDisplayedStatus(status) {
    return GQStorage.save({key: 'lockDisplayed', data: status})
  }

  async function getLockDisplayed() {

    let lockDisplayed = false;
    try {
      lockDisplayed = await GQStorage.load({key: 'lockDisplayed'})
    } catch (e) {

    }
    return lockDisplayed;
  }

}
