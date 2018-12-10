import {
    NativeModules,
    NativeEventEmitter,
    Platform,
    DeviceEventEmitter
} from 'react-native';
/**js和原生通讯bridgeModule*/
import GQNativeBridgeModule from './GQNativeBridgeModule'
const authModuleEvent = Platform.OS == 'ios' ? new NativeEventEmitter(GQNativeBridgeModule) : new NativeEventEmitter(NativeModules.GQAndroidBridgeModule);

let GQAppUserInfo = NativeModules.GQAppUserInfo;
let instance = null;
var name = '';
export default class AppStatusManager {
    constructor() {
        if (!instance) {
            this.userAgent = GQAppUserInfo.userAgent
            this.hasLogin = GQAppUserInfo.hasLogin
            this.mobile = GQAppUserInfo.mobile
            this.tokenId = GQAppUserInfo.tokenId
            this.ver = GQAppUserInfo.ver
            this.device = GQAppUserInfo.device
            this.deviceId = GQAppUserInfo.deviceId
            this.appModel = GQAppUserInfo.appModel
            this.mobileSysVer = GQAppUserInfo.mobileSysVer
            this.width = GQAppUserInfo.width
            this.height = GQAppUserInfo.height
            this.screenHeight = GQAppUserInfo.screenHeight
            this.navigationBarHeight = GQAppUserInfo.navigationBarHeight
            instance = this;
        }
        return instance;
    }

    /***
    * 类方法
    */
    static getInstance() {
        let singleton = new AppStatusManager();
        return singleton;
    }

    /***
    * 实例方法
    */
    getUserAgent() {
        return this.userAgent;
    }
    setUserAgent(userAgent) {
        this.userAgent = userAgent
    }
    getAmount() {
        return this.amount;
    }
    setAmount(amount) {
        this.amount = amount
    }
    getHasLogin() {
        return this.hasLogin;
    }
    setHasLogin(hasLogin) {
        this.hasLogin = hasLogin;
    }
    getMobile() {
        return this.mobile;
    }
    setMobile(mobile) {
        this.mobile = mobile;
    }
    getTokenId() {
        return this.tokenId;
    }
    setTokenId(tokenId) {
        this.tokenId = tokenId;
    }
    getVer() {
        return this.ver;
    }
    setVer(ver) {
        this.ver = ver;
    }
    getDevice() {
        return this.device;
    }
    setDevice(device) {
        this.device = device;
    }
    getDeviceId() {
        return this.deviceId;
    }
    setDeviceId(deviceId) {
        this.deviceId = deviceId;
    }
    getAppModel() {
        return this.appModel;
    }
    setAppModel(appModel) {
        this.appModel = appModel;
    }
    getMobileSysVer() {
        return this.mobileSysVer;
    }
    setMobileSysVer(mobileSysVer) {
        this.mobileSysVer = mobileSysVer;
    }
    getWidth() {
        return this.width;
    }
    setWidth(width) {
        this.width = width;
    }
    getHeight() {
        return this.height;
    }
    setHeight(height) {
        this.height = height;
    }
    getScreenHeight() {
        return this.screenHeight;
    }
    setScreenHeight(screenHeight) {
        this.screenHeight = screenHeight;
    }
    getNavigationBarHeight() {
        return this.navigationBarHeight;
    }
    setNavigationBarHeight(navigationBarHeight) {
        this.navigationBarHeight = navigationBarHeight;
    }
    loginReceiveEventEmitter() {
        authModuleEvent.addListener("GQLoginSuccessNotificationJs", notifion => {
            this.setHasLogin(notifion.hasLogin)
            this.setMobile(notifion.mobile)
            this.setTokenId(notifion.tokenId)
        });

        authModuleEvent.addListener("GQLoginOutSuccessNotificationJs", notifion => {
            this.setHasLogin(notifion.hasLogin)
            this.setMobile(notifion.mobile)
            this.setTokenId(notifion.tokenId)
        });

    }
}

// export default class GQAppUserInfo {

//     userAgent= GQAppUserInfo.userAgent
//     hasLogin= GQAppUserInfo.hasLogin
//     mobile=GQAppUserInfo.mobile
//     tokenId= GQAppUserInfo.tokenId
//     ver= GQAppUserInfo.ver
//     device= GQAppUserInfo.device
//     deviceId= GQAppUserInfo.deviceId
//     appModel= GQAppUserInfo.appModel
//     mobileSysVer= GQAppUserInfo.mobileSysVer

//     static instance = null;
//     static createInstance() {
//         var object = new GQAppUserInfo();
//         return object;
//     }
//     static getInstance () {
//         if (!GQAppUserInfo.instance) {
//             GQAppUserInfo.instance = GQAppUserInfo.createInstance();
//         }
//         return GQAppUserInfo.instance;
//     }
//     getUserAgent() {
//         return this.userAgent; 
//     }
//     setUserAgent(userAgent) {
//         this.userAgent = userAgent
//     }
//     getAmount() {
//         return this.amount;
//     }
//     setAmount(amount) {
//         this.amount = amount
//     }
//     getHasLogin() {
//         console.log(this.hasLogin)
//         return this.hasLogin;
//     }
//     setHasLogin(hasLogin) {
//         console.log(hasLogin)
//         this.hasLogin = hasLogin;
//         console.log(this.hasLogin)
//     }
//     getMobile() {
//         return this.mobile;
//     }
//     setMobile(mobile) {
//         this.mobile = mobile;
//     }
//     getTokenId() {
//         return this.tokenId;
//     }
//     setTokenId(tokenId) {
//         this.tokenId = tokenId;
//     }
//     getVer() {
//         return this.ver;
//     }
//     setVer(ver) {
//         this.ver = ver;
//     }
//     getDevice() {
//         return this.device;
//     }
//     setDevice(device) {
//         this.device = device;
//     }
//     getDeviceId() {
//         return this.deviceId;
//     }
//     setDeviceId(deviceId) {
//         this.deviceId = deviceId;
//     }
//     getAppModel() {
//         return this.appModel;
//     }
//     setAppModel(appModel) {
//         this.appModel = appModel;
//     }
//     getMobileSysVer() {
//         return this.mobileSysVer;
//     }
//     setMobileSysVer(mobileSysVer) {
//         this.mobileSysVer = mobileSysVer;
//     }
//     loginReceiveEventEmitter() {
//         if (Platform.OS == 'ios') {

//             authModuleEvent.addListener("GQLoginSuccessNotificationJs", notifion => {
//                 console.log('GQLoginSuccessNotificationJs>>>>>1')
//                 console.log(notifion)
//                 this.setHasLogin(notifion.hasLogin)
//                 this.setMobile(notifion.mobile)
//                 this.setTokenId(notifion.tokenId)
//                 console.log('this.hasLogin-------------1')
//                 console.log(this.hasLogin)
//             });

//             authModuleEvent.addListener("GQLoginOutSuccessNotificationJs", notifion => {
//                 this.setHasLogin(notifion.hasLogin)
//                 this.setMobile(notifion.mobile)
//                 this.setTokenId(notifion.tokenId)
//             });
//         } else {
//             authModuleEvent.addListener("loginResult", notifion => {
//                 console.log('loginResult>>>>>1')
//                 console.log(notifion)
//                 this.setHasLogin(notifion.hasLogin)
//                 this.setMobile(notifion.mobile)
//                 this.setTokenId(notifion.tokenId)
//                 console.log('loginResult this.hasLogin-------------1' + this.hasLogin)
//             });
//             authModuleEvent.addListener("NativeLoginOutResult", notifion => {
//                 this.setHasLogin(notifion.hasLogin)
//                 this.setMobile(notifion.mobile)
//                 this.setTokenId(notifion.tokenId)
//                 console.log('NativeLoginOutResult this.hasLogin-------------1' + this.hasLogin)
//                 NativeModules.GQAndroidBridgeModule.finishActivity();
//             });
//         }

//     }
// }  



// module.exports = {




//}