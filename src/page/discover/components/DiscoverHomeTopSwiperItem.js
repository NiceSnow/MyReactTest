/**
 * Created by lilang on 2018-09-30.
 */

import React, {Component} from 'react';
import {View, Text, ImageBackground, TouchableOpacity, StyleSheet} from 'react-native';
import GQUntil, {ScaleValue} from '../../../utils/GQUtils';
import GQCustomText from '../../../common/customText/GQCustomText'

export default class DiscoverHomeTopSwiperItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let bgImage;
    if (this.props.index % 3 === 0) {
      bgImage = 'discover_zs';
    } else if (this.props.index % 3 === 1) {
      bgImage = 'discover_ls';
    } else if (this.props.index % 3 === 2) {
      bgImage = 'discover_js';
    }
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <ImageBackground source={{uri: bgImage}} style={{width: '100%', height: '100%'}}>
          <GQCustomText style={styles.markText}> “ </GQCustomText>
          <GQCustomText style={styles.title}>{this.props.title}</GQCustomText>
          {/*<GQCustomText style={styles.subTitle}>涨价背后真相揭秘</GQCustomText>*/}
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  commonStyle: {},
  container: {
    marginLeft: ScaleValue(30),
    width: ScaleValue(250),
    height: ScaleValue(290),
  },
  markText: {
    fontSize: ScaleValue(70),
    color: '#FFFFFF',
    opacity: 0.6,
    fontFamily: 'Copperplate',
    marginBottom: -10,
  },
  title: {
    fontSize: ScaleValue(30),
    color: '#FFFFFF',
    fontWeight: 'bold',
    lineHeight: ScaleValue(50),
    marginLeft: ScaleValue(16),
    marginBottom: ScaleValue(10),
    marginRight: ScaleValue(16),
  },
  subTitle: {
    fontSize: 11,
    color: '#FFFFFF',
    opacity: 0.6,
    marginLeft: 8,
    position: 'absolute',
    bottom: 16,
  },
});
