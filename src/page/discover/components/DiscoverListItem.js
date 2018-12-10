/**
 * Created by lilang on 2018-09-30.
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native';
import GQCustomText from "../../../common/customText/GQCustomText";
import {ScaleValue} from "../../../utils/GQUtils";

export default class DiscoverListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    let {title,image} = this.props.data;
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <View style={styles.leftInfoView}>
          <GQCustomText style={styles.titleText}>{title}</GQCustomText>
          <View style={styles.bottomTextView}>
            <GQCustomText style={[styles.bottomText,styles.timeText]}>2018年10月30日</GQCustomText>
            <GQCustomText style={[styles.bottomText,styles.categoryText]}>金融网</GQCustomText>
            <View style={{flex:1}}>
              {/*<GQCustomText style={[styles.bottomText,styles.readNumText]}>888</GQCustomText>*/}
            </View>
          </View>
        </View>
        <Image source={{uri:image}} style={{width:90,height:65,alignSelf:'center',marginRight:15}}/>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height:ScaleValue(105*2),
    backgroundColor:'white'
  },
  leftInfoView:{
    flex:1,
    marginTop:15,
    marginLeft:15,
    marginBottom:15,
    marginRight:35,
    // backgroundColor:'blue',
  },
  titleText:{
    color:'#333333',
    fontWeight:'bold',
    fontSize:ScaleValue(30),
    marginLeft:0,
  },
  bottomTextView: {
    // backgroundColor:'gray',
    flexDirection: 'row',
    position:'absolute',
    bottom:0,
  },
  bottomText: {
    color: '#999999',
    fontSize: ScaleValue(24),
  },
  timeText: {
    // marginLeft:15,
  },
  categoryText: {
    marginLeft: 10,
  },
  readNumText: {
    alignSelf:'flex-end'
  },
});