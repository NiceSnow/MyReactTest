import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import GQUtils from "../../../utils/GQUtils";
import {Navigation} from 'react-native-navigation';
import { GQScreenNames } from '../../screens/GQScreenNames';
let iPhone6sScale = GQUtils.getAutoScaleIPhone6s();
let screenWidth = GQUtils.getScreenWidth();
export default class GQHomeGridViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this._onPressItem = this._onPressItem.bind(this);
  }
//sell点击事件处理
_onPressItem(item) {
   Navigation.push(GQScreenNames.homeMain, {
    component: {
      name: GQScreenNames.webview,
      passProps: {
        title: item.productName,
        url: item.categoryDataEntity.categoryDataUrl,
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
    if(!!this.props.gridDataArray){
        // let backLineView = <View style={{ height: 1*iPhone6sScale, width:screenWidth/2, backgroundColor: '#E5E5E5' }} />;
        // let centerDividerView=<View style={{  width: 1*iPhone6sScale,height:224*iPhone6sScale, backgroundColor: "#E5E5E5"}} ></View>
       let view= this.props.gridDataArray.map((item, index) => {
           let itemViewStyle;
        if(index%2==0){
            itemViewStyle=styles.itemViewStyle
        }else{
            itemViewStyle=styles.itemView2Style
        }
       return (
        <TouchableOpacity key={index} onPress={()=>this._onPressItem(item)}>
           <View style={itemViewStyle}>
           <Text style={{marginLeft:30*iPhone6sScale,marginTop:50*iPhone6sScale, color:'#333333',fontSize:30*iPhone6sScale,fontWeight:'bold'}}>{item.productName}</Text>
           <Text style={{marginLeft:30*iPhone6sScale,marginTop:9*iPhone6sScale, color:'#999999',fontSize:24*iPhone6sScale,}}>{item.categoryDataEntity.categoryDataLabel1}</Text>
           <Text style={{marginLeft:30*iPhone6sScale, marginTop:15*iPhone6sScale,marginBottom:50*iPhone6sScale, color:'#FF3E19',fontSize:24*iPhone6sScale,}}>{item.categoryDataEntity.categoryDataLabel2}</Text>
           </View>
            </TouchableOpacity>
       );
    });
    return (
        <View style={styles.container}>
        {view}
        </View>
      );
  }else{
    return <View></View>;
  }
 
}
}
const styles = StyleSheet.create({
    container: {
        //导航栏下view
        flexDirection: "row", // 从上到下排布
        backgroundColor: "#FFFFFF",
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    itemViewStyle:{
        // flex: 1,
       // flexDirection:"column",
       //flexDirection:"row",
        width:screenWidth/2,
        height:224*iPhone6sScale,
        borderColor: '#E5E5E5',
       // borderWidth: 1*iPhone6sScale,
       borderBottomWidth: 1*iPhone6sScale,
       borderRightWidth: 1*iPhone6sScale,
      //  alignItems: 'center',
        justifyContent:'center',
      // backgroundColor:'red'
    },
    itemView2Style:{
        width:screenWidth/2,
        height:224*iPhone6sScale,
        borderColor: '#E5E5E5',
       // borderWidth: 1*iPhone6sScale,
       borderBottomWidth: 1*iPhone6sScale,
        justifyContent:'center',
    },
});
