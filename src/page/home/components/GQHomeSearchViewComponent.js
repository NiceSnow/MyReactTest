import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,TouchableOpacity} from 'react-native';
import GQUtils from "../../../utils/GQUtils";
import {Navigation} from 'react-native-navigation';
import { GQScreenNames } from '../../screens/GQScreenNames';
let iPhone6sScale = GQUtils.getAutoScaleIPhone6s();
let screenWidth = GQUtils.getScreenWidth();
export default class GQHomeSearchViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  search(){
    Navigation.push(GQScreenNames.homeMain,{
      component:{
        name:'Search',
        options:{
          animated: false,
          topBar: {
            title: {
              text: 'Modal'
            },
            animated: false,
          },
          bottomTabs: {
            visible: false,
            animate: true, 
          },
        }
      },
    });
  }
msg(){
  alert('消息')
}
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.searchViewLayoutStyle} onPress={()=>{this.search()}}>
     
      <View style={styles.leftViewStyle}>
      <Image source={{uri:'fdj'}} style={{marginLeft: 20*iPhone6sScale,width:28*iPhone6sScale,height:28*iPhone6sScale}}></Image>
        <Text style={{fontSize:24*iPhone6sScale,color:'#999999',marginLeft:10*iPhone6sScale}}> 基金 </Text>
        </View>
        <Image source={{uri:'gb'}} style={{marginRight: 20*iPhone6sScale,width:31*iPhone6sScale,height:31*iPhone6sScale}}></Image>
    
      
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{this.msg()}}>
      <Image source={{uri:'xiaoxi'}} style={{marginLeft:40*iPhone6sScale, marginRight: 30*iPhone6sScale,width:40*iPhone6sScale,height:36*iPhone6sScale}}></Image>
      </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
      flexDirection: 'row',
      backgroundColor:'#FFFFFF',
      alignItems: 'center',
     
    },
    searchViewLayoutStyle:{
      flex: 1,
      flexDirection: 'row',
      height:68*iPhone6sScale,
      backgroundColor:'#F3F3F3',
      borderRadius: 4*iPhone6sScale,
      borderWidth: 1*iPhone6sScale,
      borderColor: '#F3F3F3',
      marginLeft:30*iPhone6sScale,
      marginTop: 20*iPhone6sScale,
      alignItems: 'center',
      justifyContent:'space-between',
      marginBottom: 20*iPhone6sScale,
    },
    leftViewStyle:{
      flexDirection: 'row',
      alignItems: 'center',
    }
});
