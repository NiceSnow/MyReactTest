import React, { Component } from 'react';
import { View, Text,StyleSheet,Image} from 'react-native';
import GQUtils from "../../utils/GQUtils";
let iPhone6sScale = GQUtils.getAutoScaleIPhone6s();
let screenWidth = GQUtils.getScreenWidth();
export default class SearchItemView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isChecked:false
    };
  }
  clickListener(){
    alert('点击')
  }
  render() {
      let item=this.props.item;
      let btnView;
      if(this.isChecked){
          btnView= <View style={{flexDirection: 'row', borderColor:'#567DF2',borderWidth:1*iPhone6sScale,borderRadius:30*iPhone6sScale,
          paddingTop:10*iPhone6sScale,paddingBottom:10*iPhone6sScale,paddingLeft:15*iPhone6sScale,paddingRight:15*iPhone6sScale}}>
          <Image source={{uri:'tianj'}} style={{height:21*iPhone6sScale,width:21*iPhone6sScale,alignSelf:'center'}}></Image>
          <Text style={{fontSize:24*iPhone6sScale,color:'#567DF2',marginLeft:5*iPhone6sScale}} onPress={()=>{this.clickListener()}}>自选</Text>
          </View>
      }else{
        btnView=<View style={{flexDirection: 'row', borderColor:'#999999',borderWidth:1*iPhone6sScale,borderRadius:30*iPhone6sScale,
        paddingTop:10*iPhone6sScale,paddingBottom:10*iPhone6sScale,paddingLeft:15*iPhone6sScale,paddingRight:15*iPhone6sScale}}>
        <Image source={{uri:'shanc'}} style={{height:3*iPhone6sScale,width:21*iPhone6sScale,alignSelf:'center'}}></Image>
        <Text style={{fontSize:24*iPhone6sScale,color:'#999999',marginLeft:5*iPhone6sScale}} onPress={()=>{this.clickListener()}}>自选</Text>
        </View>
      }
    return (
        <View style={{flexDirection: 'column',}}>
      <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.name}> {item.key} </Text>
        <Text style={styles.no}> {160212} </Text>
      </View>
     
      <View style={styles.right}>
        {btnView}
      </View>
      </View>
      <View style={styles.divider}></View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
       },
    left:{
        marginLeft:30*iPhone6sScale,
        justifyContent: 'center',
    },
    name: {
        fontSize: 30*iPhone6sScale,
        color:'#333333',
        marginTop: 40*iPhone6sScale,
      },
      no:{
        fontSize: 24*iPhone6sScale,
        color:'#666666',
        marginTop: 20*iPhone6sScale,
        marginBottom: 40*iPhone6sScale,
      },
      right:{
        marginRight: 30*iPhone6sScale,
        justifyContent: 'center',
      },
      divider:{
        backgroundColor:'#e5e5e5',
        height:1*iPhone6sScale,
        marginLeft:30*iPhone6sScale,
        marginRight: 30*iPhone6sScale,
      }
})