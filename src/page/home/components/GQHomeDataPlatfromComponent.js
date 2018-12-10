import React, {Component} from 'react'
import {
  View,
  Image,
  Platform,
  NativeEventEmitter,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
  ImageBackground
} from 'react-native'

let iPhone6sScale = GQUtils.getAutoScaleIPhone6s();
import GQUtils from "../../../utils/GQUtils";

import GQNativeBridgeModule from "../../../utils/GQNativeBridgeModule";
import GQHomeConstants from "../constants/GQHomeConstants";
import GQCustomText from '../../../common/customText/GQCustomText'
import {Navigation} from 'react-native-navigation';
import {GQScreenNames} from "../../screens/GQScreenNames";
import GQUserInfo from "../../../utils/GQUserInfo";
import {GQAppMananger} from "../../../utils/GQAppManager";

export default class GQDataPlatfromView extends Component {

  constructor(props) {
    super(props)


  }

  /** 点击banner图片*/
  _clickToWebView(urlString, title) {
    // urlString = 'http://172.16.8.10:4040/#/'
    urlString = 'http://172.16.8.18/home'
    GQUserInfo.getToken().then((token) => {
      urlString = `${urlString}?type=APP`
      Navigation.push(GQScreenNames.homeMain, {
        component: {
          name: GQScreenNames.webview,
          passProps: {
            title: title,
            // urlHasDomain: true,
            url: urlString,
            topBarVisible: false,
          },
          options: {
            topBar: {
              // drawBehind: true,
              //  visible: false,
            },
            bottomTabs: {
              visible: false,
              animate: true,
            },
          }
        },
      });
    })
  }

  render() {

    let cmsItemView;

    /**
     * 根据数据刷新视图
     * **/
    if (!!this.props.dataPlatfromData && this.props.dataPlatfromData.length > 0) {

      let items = this.props.dataPlatfromData.map((item, index) => {
        let tipView
        if (item.planYield != "" && item.planYield != undefined) {
          tipView = (
            <ImageBackground
              style={{
                width: 90 * iPhone6sScale,
                height: 37 * iPhone6sScale,
                paddingLeft: 5 * iPhone6sScale,
                paddingRight: 5 * iPhone6sScale,
                position: 'absolute',
                right: 10 * iPhone6sScale,
                top: 10 * iPhone6sScale
              }}
              source={{uri: "biaoqian"}}>
              <GQCustomText
                style={{
                  fontSize: 22 * iPhone6sScale,
                  color: "#FFFFFF",
                  alignSelf: 'center',
                }}
              >{item.planYield + "%"}</GQCustomText>
            </ImageBackground>
          )
        } else {
          tipView = <View></View>
        }

        return (

          <TouchableOpacity
            key={index}
            style={styles.cmsItemStyle}
            onPress={() => this._clickToWebView(item.categoryDataEntity.categoryDataUrl, item.categoryDataEntity.categoryDataName)}>
            <Image
              style={{width: 58 * iPhone6sScale, height: 58 * iPhone6sScale}}
              source={{uri: item.categoryDataEntity.categoryDataImageUrl}}/>
            <GQCustomText style={{
              marginTop: 13 * iPhone6sScale,
              fontSize: 24 * iPhone6sScale,
              color: "#333333"
            }}> {item.categoryDataEntity.categoryDataName} </GQCustomText>
            {tipView}
          </TouchableOpacity>

        )
      })
      cmsItemView = <TouchableOpacity style={styles.cmsItemViewStyle}>{items}</TouchableOpacity>
    } else {
      cmsItemView = <View/>;
    }
    return (
      <View style={{backgroundColor: "#ffffff"}}>
        {cmsItemView}
      </View>
    );
  }
}
const styles = StyleSheet.create({

  dataPlatfromViewStyle: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 118 * iPhone6sScale,
    backgroundColor: "#ffffff"
  },
  dataPlatfromSubviewStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  bidInfoSubViewLineStyle: {
    width: 1,
    height: 48 * iPhone6sScale,
    justifyContent: "center",
    backgroundColor: "#efefef"
  },
  cmsItemViewStyle: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 148 * iPhone6sScale,
    backgroundColor: "#ffffff"
  },
  cmsItemStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

})