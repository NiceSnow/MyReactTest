/**
 * Created by lilang on 2018-09-30.
 */

import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import GQUtil, {ScaleValue} from "../../../utils/GQUtils";
import GQCustomText from "../../../common/customText/GQCustomText";

export default class MyHomeListTwoButtonItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{flex:1}}>
          <GQCustomText style={styles.text}>我要吐槽</GQCustomText>
        </TouchableOpacity>
        <View style={styles.line}/>
        <TouchableOpacity style={{flex:1}}>
          <GQCustomText style={styles.text}>联系客服</GQCustomText>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#FFFFFF',
    height:ScaleValue(110),
  },
  line: {
    // alignSelf:'center',
    width:ScaleValue(1),
    height:ScaleValue(56),
    backgroundColor:'#E5E5E5',
  },
  text: {
    alignSelf:'center',
    color:'#333333',
    fontSize:ScaleValue(30),
  }
});