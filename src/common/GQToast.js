/**
 * Created by lilang on 2018-09-30.
 */

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import Toast from './react-native-root-toast';
import GQUtil, {ScaleValue} from "../utils/GQUtils";

export default class GQToast extends Component {
   static show = (message) => {
    Toast.show(`${message}`, {
      duration: Toast.durations.LONG,
      position: Toast.positions.TOP,
      // shadow:false,
      animation: true,
      hideOnPress: true,
      delay: 1,
      textStyle:{fontSize:ScaleValue(28)},
      textColor:'#FFFFFF',
      backgroundColor:'#4AA8FD',
      opacity:1,
      shadowColor:'#0044a1',
      containerStyle:{paddingLeft: 20,paddingRight: 20,borderRadius:ScaleValue(35)},
      // onShow: () => {
      //   // calls on toast\`s appear animation start
      // },
      // onShown: () => {
      //   // calls on toast\`s appear animation end.
      // },
      // onHide: () => {
      //   // calls on toast\`s hide animation start.
      // },
      // onHidden: () => {
      //   // calls on toast\`s hide animation end.
      // }
    });
  };
}
