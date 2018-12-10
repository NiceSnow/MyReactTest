/**
 * Created by lilang on 2018-09-30.
 */

import React, { Component } from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {ScaleValue} from "../utils/GQUtils";
import {Navigation} from 'react-native-navigation'
import {GQScreenNames} from "../page/screens/GQScreenNames";
import {GQAppMananger} from "../utils/GQAppManager";
import {GQHTMLConfig} from "../config/GQHTMLConfig";

export default class NavigationMessageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static defaultProps = {
    unread:1,
  }

  render() {
    let unread = this.props.unread ? 1 : 0;
    return (
      <View style={{width:30,height:30,justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity onPress={this._messageAction}>
          <Image source={{uri: 'xiaoxi'}} style={styles.msgIcon}/>
          <View style={[styles.point, {opacity: unread}]}/>
        </TouchableOpacity>
      </View>

    )
  }

  _messageAction = ()=>{
    Navigation.push(this.props.source,{
      component:{
        name:GQScreenNames.webview,
        passProps:{
          url:GQAppMananger.getHTMLUrl()+GQHTMLConfig.notification,
          title:'消息中心',
        },
        options:{
          bottomTabs: {
            visible: false,
            animate: true,
          },
        }
      },
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  msgIcon:{
    width: 30,
    height: 30,
    resizeMode:'center'
  },
  point: {
    position:'absolute',
    width:ScaleValue(20),
    height:ScaleValue(20),
    borderRadius:ScaleValue(10),
    backgroundColor:'#FF3E19',
    top:ScaleValue(0),
    right:ScaleValue(0),
  },
})