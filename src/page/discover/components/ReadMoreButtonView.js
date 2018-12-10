/**
 * Created by lilang on 2018-09-30.
 */

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import GQUntil,{ScaleValue} from '../../../utils/GQUtils';
import GQCustomText from '../../../common/customText/GQCustomText';

export default class ReadMoreButtonView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  _onPressItem = () => {
    this.props.onPress(this.props.title);
  };

  render() {

    return (
      <View style={[this.props.style,{backgroundColor:'white'}]}>
        <View style={{height:ScaleValue(1),backgroundColor:'#E5E5E5'}} />
        <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity onPress={this._onPressItem}>
            <GQCustomText style={{fontSize:ScaleValue(24),color:'#567DF2'}}>查看更多</GQCustomText>
          </TouchableOpacity>
        </View>
        <View style={{height:ScaleValue(20),backgroundColor:'#EFEFEF'}} />
      </View>
    );
  }
}