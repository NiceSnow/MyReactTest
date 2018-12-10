/**
 * Created by lilang on 2018-09-30.
 */

import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import MyHomeMoreListItem from "./MyHomeMoreListItem";
import {ScaleValue} from "../../../utils/GQUtils";
import GQBaseComponent from "../../../common/GQBaseComponent";

export default class MyCenterPwdManageComponent extends GQBaseComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static options(passProps){
    return ({
      topBar:{
        title:{text:'密码管理'}
      }
    })
  }

  _separatorView = ()=> {
    return (
      <View style={{marginLeft:ScaleValue(30), height:ScaleValue(1),backgroundColor:'#E5E5E5'}}/>
    )
  }

  render() {

    return (
      <ScrollView contentContainerStyle={{flex:1}}>
        <MyHomeMoreListItem title={'修改登录密码'} style={styles.cell}/>
        {this._separatorView()}
        <MyHomeMoreListItem title={'重置支付密码'} style={styles.cell}/>
        {this._separatorView()}
        <MyHomeMoreListItem title={'开启手势密码'} style={styles.cell}/>
        {this._separatorView()}
      </ScrollView>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cell:{
    height:ScaleValue(110)
  }
})