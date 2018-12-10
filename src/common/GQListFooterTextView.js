import React, { Component } from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import {ScaleValue} from "../utils/GQUtils";

export default class GQListFooterTextView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {

    return (
      <View style={{height:ScaleValue(170),justifyContent:'center',backgroundColor:'#EFEFEF'}}>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <Image source={{uri:'zuo'}} style={{width:ScaleValue(232),height:ScaleValue(14)}} />
          <Text style={styles.text}>安全的金融服务平台</Text>
          <Image source={{uri:'you'}} style={{width:ScaleValue(232),height:ScaleValue(14)}} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    marginLeft:ScaleValue(14),
    marginRight:ScaleValue(14),
    fontSize:ScaleValue(24),
    color:'#666666',
  }
});