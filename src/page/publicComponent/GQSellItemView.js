import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import GQUtils from "../../utils/GQUtils";
import GQCustomText from '../../common/customText/GQCustomText'
import {Navigation} from 'react-native-navigation';
import {GQScreenNames} from '../screens/GQScreenNames';

let iPhone6sScale = GQUtils.getAutoScaleIPhone6s();

export default class GQSellItemView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._onPressItem = this._onPressItem.bind(this);
  }

  //sell点击事件处理
  _onPressItem() {
    var cellInfo = this.props.item;
    // alert('点击了'+cellInfo.productName)
    Navigation.push(GQScreenNames.homeMain, {
      component: {
        name: GQScreenNames.webview,
        passProps: {
          title: cellInfo.productName,
          url: cellInfo.categoryDataEntity.categoryDataUrl,
          // url:urlString,
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
    let cellInfo = this.props.item;
    let backLineView = <View style={{height: 1 * iPhone6sScale, backgroundColor: 'rgba(239, 239, 239, 1)'}}/>;
    let leftLayoutView = <View style={styles.leftLayoutViewStyle}>
      <View style={{flexDirection: 'row',}}>
        <GQCustomText style={{
          fontSize: 46 * iPhone6sScale,
          color: "#FF3E19",
          marginTop: -13 * iPhone6sScale,
          fontWeight: "bold"
        }}>{cellInfo.planYield}</GQCustomText>
        <GQCustomText style={{
          fontSize: 24 * iPhone6sScale,
          color: "#FF3E19",
          marginTop: 12 * iPhone6sScale,
        }}>{cellInfo.planYield == "" || cellInfo.planYield == undefined ? "" : "%"}</GQCustomText>
      </View>
      <GQCustomText style={{
        marginTop: 7 * iPhone6sScale,
        fontSize: 24 * iPhone6sScale,
        color: "#999999"
      }}>{cellInfo.categoryDataEntity.categoryDataLabel1}</GQCustomText>
    </View>
    let rightLayoutView = <View style={styles.rightLayoutViewStyle}>
      <GQCustomText style={{
        fontSize: 30 * iPhone6sScale,
        color: "#333333",
        fontWeight: "bold"
      }}>{cellInfo.productName}</GQCustomText>
      <GQCustomText style={{
        marginTop: 14 * iPhone6sScale,
        fontSize: 24 * iPhone6sScale,
        color: "#999999"
      }}>{cellInfo.categoryDataEntity.categoryDataLabel2}</GQCustomText>
    </View>
    let centerDividerView = <View style={styles.centerDividerViewStyle}></View>
    let horizontalLayoutView = <View style={styles.horizontalLayoutView}>
      {leftLayoutView}
      {centerDividerView}
      {rightLayoutView}
    </View>
    return (
      <TouchableOpacity style={styles.container}
                        onPress={this._onPressItem}
      >
        {horizontalLayoutView}
        {backLineView}
      </TouchableOpacity>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    //导航栏下view
    flexDirection: "column", // 从上到下排布
    backgroundColor: "#FFFFFF"
  },
  horizontalLayoutView: {
    flexDirection: "row",
    alignItems: "center",
    height: 154 * iPhone6sScale,
    backgroundColor: "#FFFFFF"
  },
  leftLayoutViewStyle: {
    flexDirection: "column",
    marginLeft: 30 * iPhone6sScale,
    width: 220 * iPhone6sScale,
  },
  rightLayoutViewStyle: {
    flexDirection: "column",
    marginLeft: 30 * iPhone6sScale,
  },
  centerDividerViewStyle: {
    width: 1 * iPhone6sScale,
    height: 66 * iPhone6sScale,
    //marginLeft:100*iPhone6sScale,
    // position:'absolute',
    // right:10,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "#E5E5E5"
  },
})
