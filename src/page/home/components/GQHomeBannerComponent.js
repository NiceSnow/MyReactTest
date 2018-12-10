import React, {Component} from 'react'
import {
  View,
  Image,
  TouchableWithoutFeedback,
  Platform,
  NativeModules,
} from 'react-native'

let iPhone6sScale = GQUtils.getAutoScaleIPhone6s();
import GQUtils from "../../../utils/GQUtils";

var Swiper = require("react-native-swiper");

import GQNativeBridgeModule from "../../../utils/GQNativeBridgeModule";
import GQHomeConstants from "../constants/GQHomeConstants";
import {GQScreenNames} from '../../screens/GQScreenNames';
import {Navigation} from 'react-native-navigation';

export default class GQHomeBannerView extends Component {

  constructor(props) {
    super(props)
  }

  /** 点击banner图片*/
  _clickBannerImageView(urlString, title = '') {

    Navigation.push(GQScreenNames.homeMain, {
      component: {
        name: GQScreenNames.webview,
        passProps: {
          // title: title,
          url: urlString,
        },
        options: {
          bottomTabs: {
            visible: false,
            animate: true,
          },
        }
      },
    });
  }

  render() {
    let lineView;
    let height;
    if (this.props.isShowLine) {
      lineView = <View style={{backgroundColor: "#f5f5f5", height: 20 * iPhone6sScale}}/>
    } else {
      lineView = <View></View>
    }
    if (!!this.props.height) {
      height = this.props.height;
    } else {
      height = 314 * iPhone6sScale;
    }
    /** 底部swiper*/
    let bannerSwiperView;
    /** swiper内部的image组件集合*/
    let bannerImageViewArray;
    let bannerLayoutView;
    if (!!this.props.bannerImageDataArray && this.props.bannerImageDataArray.length > 0) {
      bannerImageViewArray = this.props.bannerImageDataArray.map((item, index) => {

        return (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => this._clickBannerImageView(item.categoryDataEntity.categoryDataUrl, item.categoryDataEntity.categoryDataName)}>
            <Image source={{uri: item.categoryDataEntity.categoryDataImageUrl}} style={{height: 318 * iPhone6sScale}}/>
          </TouchableWithoutFeedback>
        )
      })

      bannerSwiperView = <Swiper
        style={{height: height}}
        autoplay={true}
        autoplayTimeout={2}
        paginationStyle={{bottom: 10}}
        dotStyle={{
          //未选中的圆点样式
          backgroundColor: "#000000",
          opacity: 0.4
        }}
        loop={true}
        index={0}
        activeDotStyle={{
          //选中的圆点样式
          backgroundColor: "#ffffff",
          opacity: 1
        }}
      >
        {bannerImageViewArray}
      </Swiper>
      bannerLayoutView = <View style={{backgroundColor: "#ffffff"}}>
        {lineView}
        {bannerSwiperView}
      </View>
    } else {
      bannerLayoutView = <View></View>
    }
    return (bannerLayoutView)
  }
}