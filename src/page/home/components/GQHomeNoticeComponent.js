import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
  NativeModules
} from "react-native";


import GQUtils from "../../../utils/GQUtils";
let iPhone6sScale = GQUtils.getAutoScaleIPhone6s();
/**屏幕宽带*/
let screenWidth = GQUtils.getScreenWidth();

import GQNativeBridgeModule from "../../../utils/GQNativeBridgeModule";
import GQHomeConstants from "../constants/GQHomeConstants";
import GQScrollVertical from "../../publicComponent/GQScrollVertical"

export default class GQHomeNoticeView extends Component {
  constructor(props) {
    super(props);
    this._clickNoticeTextView = this._clickNoticeTextView.bind(this);
    this.clickCloseNoticeView = this.clickCloseNoticeView.bind(this);
  }
  /** 点击公告*/
  _clickNoticeTextView(urlString) {
  }

  clickCloseNoticeView(params) {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  
  render() {
    /** 底部swiper*/
    let noticeSwiperView;
    if (!!this.props.noticeDataArray && this.props.noticeDataArray.length > 0) {
    
      noticeSwiperView = (
        <View style={styles.noticesViewStyle}>
          <Image
            source={{ uri: "gonggao" }}
            style={{
              marginLeft: 25 * iPhone6sScale,
              marginRight: 19 * iPhone6sScale,
              width: 44 * iPhone6sScale,
              height: 36 * iPhone6sScale
            }}
          />
           <GQScrollVertical
              onChange={(index => {
                this.index = index;
              })}
              clickNoticeTextView={this._clickNoticeTextView}
              enableAnimation={true}
              data={this.props.noticeDataArray}
              delay={1000}
              duration={500}
              scrollHeight={70*iPhone6sScale}
              scrollStyle={{ alignItems: 'flex-start' }}
              textStyle={{fontSize:  26 *iPhone6sScale }} />
          <TouchableOpacity
            style={{
              position:'absolute',
              right:0,
              height: 70 * iPhone6sScale,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={this.clickCloseNoticeView}
          >
            <Image
              source={{ uri: "s_guanb" }}
              style={{ width: 23 * iPhone6sScale, height: 23 * iPhone6sScale ,marginRight:30*iPhone6sScale}}
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      noticeSwiperView = <View />;
    }

    if (this.props.isHidden) {
      return noticeSwiperView;
    } else {
      return <View />;
    }

    return noticeSwiperView;
  }
}
const styles = StyleSheet.create({
  noticesViewStyle: {
    height: 70 * iPhone6sScale,
    width:screenWidth,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    overflow:"hidden"
  },
  wrapper: {
    marginHorizontal: 5,
  },
});
