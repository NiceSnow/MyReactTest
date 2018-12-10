/**
  * 基于 详情页面顶部View 封装的 
  * @author wangfeng
  * @param {Object} 页面数据
  */
 import React, { Component } from "react";

 import { View, Text, StyleSheet, Image ,Platform} from 'react-native';
 /**工具类*/
 import GQUtils from '../../utils/GQUtils.js'
 import GQCustomText from '../../common/customText/GQCustomText'
 /**屏幕适配系数*/
 let iPhone6sScale = GQUtils.getAutoScaleIPhone6s();
 
 /**屏幕宽带*/
 let screenWidth = GQUtils.getScreenWidth()
 /**屏幕高度*/
 let screenHeight = GQUtils.getScreenHeight()
 export default class GQFollowTagView extends Component {
 
     constructor(props) {
         super(props);
         const params = { ...this.props.params };
         if (params.selectedPosition == '-1') {
             this.state = {
                 selectedPosition: '-1',
             }
         } else {
             this.state = {
                 selectedPosition: params.selectedPosition,
             }
         }
         this.getTagItemView = this.getTagItemView.bind(this)
         this.OnItemSelectedListener = this.OnItemSelectedListener.bind(this)
     }
 
     OnItemSelectedListener(position, item) {
         if(this.props.onItemClick){
             this.props.onItemClick(position, item)
         }
         this.setState({
             selectedPosition: item.amountAndNoFree
         })
     }
 
     getTagItemView(params) {
         
         if (params.data != null && params.data != undefined && params.data.length != 0) {
             let textArray = params.data.map((item, index) => {
                 if (!!item.name) {
                     if (this.state.selectedPosition == item.amountAndNoFree) {
                         //选中
                         if(Platform.OS ==='ios'){
                            return <View style={{ height: 50 * iPhone6sScale,
                                                  width: (screenWidth - 40 * 2 * iPhone6sScale - 10 * 3 * iPhone6sScale) / 4 - 10 * iPhone6sScale,   backgroundColor: '#FF3E19',
                                                  borderColor:'#FF3E19',
                                                  borderRadius:4*iPhone6sScale,  
                                                  justifyContent:"center",
                                                  alignItems:'center',    
                                                  marginLeft: 10 * iPhone6sScale,
                                                  marginBottom: 10 * iPhone6sScale}}
                                            ><GQCustomText  key={item + index} 
                                                    style={{ fontSize: 26 * iPhone6sScale,
                                                             color: '#FFFFFF',
                                                             textAlign: 'center',}} 
                                            >{item.name}
                                            </GQCustomText> 
                                    </View>
                         } else{
                            return <GQCustomText key={item + index} style={params.selectedStyle} >{item.name}</GQCustomText>
                         }
                         
                     } else {
                         //未选中
                        
                         return <GQCustomText key={item + index} onPress={() => this.OnItemSelectedListener(index, item)} style={params.normalStyle} >{item.name}</GQCustomText>
                     }
                 } else {
                     if (this.state.selectedPosition == item.amountAndNoFree) {
                         //选中
                         return <GQCustomText key={item + index} style={params.selectedStyle} >{item}</GQCustomText>
                     } else {
                         //未选中
                         return <GQCustomText key={item + index} onPress={() => this.OnItemSelectedListener(index, item)} style={params.normalStyle} >{item}</GQCustomText>
                     }
                 }
 
             })
             return textArray
         }
         return <View></View>
     }
 
     render() {
         let params = { ...this.props.params };
         return (
             <View style={params.parentStyle} >
                 {this.getTagItemView(params)}
             </View>
         )
     }
 
 }
 const styles = StyleSheet.create({
     topView: {//导航栏下view
         flexDirection: 'column',// 从上到下排布
     },
     subViewStyle: {
         flexDirection: 'row',// 从左到右排布
     },
 })