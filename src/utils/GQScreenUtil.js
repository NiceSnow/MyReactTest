"use strict";
import React, { Component } from "react";
import {
    PixelRatio,Platform
} from 'react-native';

import GQAppUserInfo from './GQAppUserInfo'
import GQUtils from './GQUtils'

/**屏幕高度*/
let screenHeight = GQUtils.getScreenHeight();

let iPhone6sScale = GQUtils.getAutoScaleIPhone6s();

class GQScreenUtil extends Component {

// 根据密度适配不同的分辨率，参数为px
static getDimensbyPX(length) {
    // 获取密度
    let ratio=PixelRatio.get();
    return length/ ratio;
}
//判断是否是全面屏
static getIsFullPhone(){
    let isFull = GQAppUserInfo.getInstance().getHeight() / GQAppUserInfo.getInstance().getWidth() > 1.86;
    if(isFull){
        return true;
    }else{
        return false;
    }
}

static getNavigationBarHeight(){
    return this.getDimensbyPX(GQAppUserInfo.getInstance().getNavigationBarHeight());
}

static getScreenHeight(){
    let isFull = this.getIsFullPhone();
    if(isFull){
        //全面屏
        return this.getDimensbyPX((GQAppUserInfo.getInstance().getScreenHeight() == 2160 || GQAppUserInfo.getInstance().getScreenHeight() == 2030 ? GQAppUserInfo.getInstance().getScreenHeight():GQAppUserInfo.getInstance().getScreenHeight())) - 10 - this.getDimensbyPX(GQAppUserInfo.getInstance().getNavigationBarHeight());
    }else{
        if(GQAppUserInfo.getInstance().getScreenHeight() == 2560 && GQAppUserInfo.getInstance().getNavigationBarHeight() == 152){
            return this.getDimensbyPX(GQAppUserInfo.getInstance().getScreenHeight()) - this.getDimensbyPX(GQAppUserInfo.getInstance().getNavigationBarHeight()) - 10;
        }
        if(GQAppUserInfo.getInstance().getScreenHeight() == 1920){
            return this.getDimensbyPX(GQAppUserInfo.getInstance().getScreenHeight()) - this.getDimensbyPX(GQAppUserInfo.getInstance().getNavigationBarHeight()) - 5;
        }
        return this.getDimensbyPX(GQAppUserInfo.getInstance().getScreenHeight()) - this.getDimensbyPX(GQAppUserInfo.getInstance().getNavigationBarHeight()) - 10;
    }
}

static getHomeHeight(){
    let isFull = this.getIsFullPhone();
    if(isFull){
        //全面屏
        if(this.getDimensbyPX(GQAppUserInfo.getInstance().getNavigationBarHeight()) == 0){
            return this.getDimensbyPX((GQAppUserInfo.getInstance().getScreenHeight() == 2160 || GQAppUserInfo.getInstance().getScreenHeight() == 2030 ? GQAppUserInfo.getInstance().getScreenHeight() + 15:GQAppUserInfo.getInstance().getScreenHeight())) - 16 - this.getDimensbyPX(GQAppUserInfo.getInstance().getNavigationBarHeight()) - 30;
        }else{
        return this.getDimensbyPX((GQAppUserInfo.getInstance().getScreenHeight() == 2160 || GQAppUserInfo.getInstance().getScreenHeight() == 2030 ? GQAppUserInfo.getInstance().getScreenHeight() + 15:GQAppUserInfo.getInstance().getScreenHeight())) - 16 - this.getDimensbyPX(GQAppUserInfo.getInstance().getNavigationBarHeight()) - 30;
    }
    }else{
        return this.getDimensbyPX(GQAppUserInfo.getInstance().getScreenHeight()) - this.getDimensbyPX(GQAppUserInfo.getInstance().getNavigationBarHeight()) - 50;
    }
}


static getLendHeight(){
    let isFull = this.getIsFullPhone();
    if(isFull){
        //全面屏
        return this.getDimensbyPX(GQAppUserInfo.getInstance().getScreenHeight()) - 60 - this.getDimensbyPX(GQAppUserInfo.getInstance().getNavigationBarHeight());
    }else{
        return this.getDimensbyPX(GQAppUserInfo.getInstance().getScreenHeight()) - this.getDimensbyPX(GQAppUserInfo.getInstance().getNavigationBarHeight()) - 70;
    }
}

static getScreenHeightIOS(){
    return screenHeight;
}


}

module.exports = GQScreenUtil;

