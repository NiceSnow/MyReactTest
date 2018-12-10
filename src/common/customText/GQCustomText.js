import React, { Component } from "react";
import { Text, } from "react-native";

export default class GQCustomText extends Component {
  render() {
    // allowFontScaling:是否随系统字体大小改变。默认为true，即跟随系统字体大小改变
    return (
      <Text
        allowFontScaling={false}
        {...this.props}
        // allowFontScaling={
        //   this.props.allowFontScaling !== undefined
        //     ? this.props.allowFontScaling
        //     : false
        // }
      >
        {this.props.children}
      </Text>
    );
  }
}
