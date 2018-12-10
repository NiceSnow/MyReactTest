/**
  * 基于 加载失败页面 封装的 
  * @author wangfeng
  * @param {Object} 页面数据
  */
import React, { Component } from "react";

import { View, Text, StyleSheet, Image ,TouchableOpacity,Platform,NativeModules,ToastAndroid,InteractionManager} from 'react-native';
/**工具类*/
import GQUtils from '../../utils/GQUtils'
import GQScreenUtil from '../../utils/GQScreenUtil'
import GQAppUserInfo from '../../utils/GQAppUserInfo'
import GQCustomText  from '../../common/customText/GQCustomText'
/**屏幕适配系数*/
let iPhone6sScale = GQUtils.getAutoScaleIPhone6s();
/**屏幕宽带*/
let screenWidth = GQUtils.getScreenWidth()
/**屏幕高度*/
let screenHeight = GQUtils.getScreenHeight()


export default class GQExceptionView extends Component {
    constructor(props) {
        super(props)
        this.exceptionPress = this.exceptionPress.bind(this)
        
        
        
    }
    exceptionPress(){
        if(this.props.exceptionPress){
            this.props.exceptionPress()
        }
    }

    componentWillMount(){
    }

    // componentDidMount(){
    //     // { code: '999', msg: '登录状态失效，请重新登录！', success: false, data: {} }
    //     const { data , code} = this.props
    //     if(!!code && code == '999'){
    //         GQAppUserInfo.getInstance().setHasLogin(false)
    //         GQAppUserInfo.getInstance().setMobile('')
    //         GQAppUserInfo.getInstance().setTokenId('')
    //         if(Platform.OS === 'ios'){
    //             //苹果
    //         }else{
    //             setTimeout(() => {
    //                 NativeModules.GQAndroidBridgeModule.jsToNativeAct( "com.gq.android.common.login.ExistUserAct?isFromRN=1&isHasToken=10" );
    //             }, 500);
    //             ToastAndroid.show(data,ToastAndroid.SHORT)
    //         }
    //     }
    // }

    render() {
        let renderView
        if ( this.props.code ==='0500'){
            renderView =   <TouchableOpacity style={styles.container} onPress={this.exceptionPress}>
                             <View style={styles.exceptionView}>
                                <Image source={require('../../images/public/wuneirong.png')} style={styles.imageStyle} ></Image>
                                <GQCustomText style={styles.textStyle}>暂无内容</GQCustomText>
                             </View>
                           </TouchableOpacity>
        }else{
            renderView =   <TouchableOpacity style={styles.container} onPress={this.exceptionPress}>
                             <View style={styles.exceptionView}>
                                <Image source={{ uri: 'wangluo' }} style={styles.imageStyle} ></Image>
                                <GQCustomText style={styles.textStyle}>您的网络好像有问题，点击重新加载</GQCustomText>
                             </View>
                           </TouchableOpacity>
        }
        return renderView
    }
}
const styles = StyleSheet.create({
    container: {
        height: Platform.OS === 'ios' ? screenHeight - GQUtils.getTitleHeight() : GQScreenUtil.getScreenHeight(), 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    exceptionView:{
        alignItems: 'center'
    },
    imageStyle:{
        alignSelf: 'center', 
        width: 136 * iPhone6sScale , 
        height:140 * iPhone6sScale ,
    },
    textStyle:{
        marginTop: 60 * iPhone6sScale, 
        alignSelf: 'center' ,
        fontSize: 24 * iPhone6sScale
    }
})