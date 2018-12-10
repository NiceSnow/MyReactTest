import React, { Component } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  NativeModules
} from 'react-native'

/** 存储公告的数组*/
let iPhone6sScale = GQUtils.getAutoScaleIPhone6s();
import GQUtils from "../../../utils/GQUtils";
import GQNativeBridgeModule from "../../../utils/GQNativeBridgeModule";
import GQHomeConstants from "../constants/GQHomeConstants";
import GQCustomText from '../../../common/customText/GQCustomText'
import {Navigation} from 'react-native-navigation';
import { GQScreenNames } from '../../screens/GQScreenNames';

export default class GQHomeListHeaderComponent extends Component {

  constructor(props) {
    super(props);

  }

  /** 点击公告*/
  _clickToWebView(urlString,title) {
    Navigation.push(GQScreenNames.homeMain, {
      component: {
        name: GQScreenNames.webview,
        passProps: {
          title: title,
          url: urlString==""||urlString==undefined?"http://172.16.8.18/":urlString,
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

    let headerView;
    let lineView;
    if (!!this.props.headerData) {
      if(this.props.isHideLine){
        
      }else{
        lineView = <View style={{ backgroundColor: "#f5f5f5", height: 20 * iPhone6sScale }} />
      }
      let icon;
      switch (this.props.headerData.categoryNo) {
        case "ad6f29dc03"://新手专区
          icon='xs'
          break;
        case "be3902d104"://热销保险
        icon='baox'
          break;
        case "42a75a4005"://基金理财
        icon='jj'
          break;
      
        default:
          break;
      }
     
      headerView = (
        <View style={{ backgroundColor: "#ffffff" }}>
          {lineView}
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", height: 90 * iPhone6sScale }}
            activeOpacity={1}
            onPress={() => this._clickToWebView(this.props.headerData.categoryDataUrl,this.props.headerData.categoryName)}>
            <Image style={{ marginLeft: 30 * iPhone6sScale,height:40*iPhone6sScale,width:40*iPhone6sScale}} source={{uri:icon}}></Image>
            <GQCustomText style={{ fontSize: 30 * iPhone6sScale, color: "#333333",fontWeight: "bold" }} >  {!!this.props.headerData.categoryName?this.props.headerData.categoryName:this.props.headerData.categoryName} </GQCustomText>
            <GQCustomText style={{ fontSize: 24 * iPhone6sScale, color: "#999999"}} >  {!!this.props.headerData.categoryName?this.props.headerData.categoryName:this.props.headerData.categoryName} </GQCustomText>
            <GQCustomText style={{ marginRight: 24 * iPhone6sScale, flex: 1, textAlign: "right", fontSize: 24 * iPhone6sScale, color: "#567DF2" }} >{'查看更多'}</GQCustomText>
          </TouchableOpacity>
          {/* ,marginLeft:30*iPhone6sScale,marginRight: 30*iPhone6sScale, */}
          <View style={{ backgroundColor: "#e5e5e5", height: 1 * iPhone6sScale }} />
        </View>
      )
    } else {
      headerView = <View></View>
    }
    return (headerView)
  }
}
