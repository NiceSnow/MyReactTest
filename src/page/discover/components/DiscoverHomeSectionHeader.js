/**
 * Created by lilang on 2018-09-30.
 */

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import {ScaleValue} from "../../../utils/GQUtils";
import GQCustomText from '../../../common/customText/GQCustomText'

export default class DiscoverHomeSectionHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static defaultProps = {
    icon:'zs',
    title:'标题',
  };

  render() {
    let {icon} = this.props;
    return (
      <View>
        <View style={[styles.container,this.props.style]}>
          <Image source={{uri:icon}} style={styles.icon}/>
          <GQCustomText style={styles.title}> {this.props.title} </GQCustomText>
        </View>
        <View style={{height:ScaleValue(1),backgroundColor:'#E5E5E5'}} />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
  },
  icon: {
    marginLeft:15,
    alignSelf:'center',
    width:15,
    height:15,
  },
  title: {
    alignSelf:'center',
  }
});
