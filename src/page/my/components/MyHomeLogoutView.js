/**
 * Created by lilang on 2018-09-30.
 */

import React, {Component} from 'react';
import {Text, View, TouchableOpacity, ImageBackground, StyleSheet} from 'react-native';
import GQUtil, {ScaleValue} from "../../../utils/GQUtils";
import GQCustomText from "../../../common/customText/GQCustomText";

export default class MyHomeLogoutView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
          <ImageBackground source={{uri:'buttonbg'}} style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
            <GQCustomText style={styles.text}> 安全退出 </GQCustomText>
          </ImageBackground>
        </TouchableOpacity>


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#EFEFEF',
    height:ScaleValue(210),
  },
  button: {
    marginTop:ScaleValue(100),
    marginLeft:ScaleValue(30),
    marginRight:ScaleValue(30),
    height:ScaleValue(90),
  },
  text: {
    fontSize: ScaleValue(34),
    color: '#FFFFFF',
  },
});