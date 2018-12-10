import React, { Component } from 'react';
import { Text, View,ActivityIndicator, StyleSheet } from 'react-native';
import RootSiblings from "react-native-root-siblings";
import AwesomeAlert from "../common/awesomeAlert/AwesomeAlert";
import {ScaleValue} from "./GQUtils";
import Navigation from 'react-native-navigation'

var silligns;
var loadingContainer;

export default class GQLoading extends Component{

  static show() {
    silligns = new RootSiblings(
      <GQLoadingContainer animating={true} ref={(e)=>{loadingContainer=e}}/>
    )
    return silligns;
  }

  static hidden() {
    loadingContainer.animating=false;
    silligns.destroy();
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //
  //   };
  // }
  //
  // componentWillReceiveProps(props){
  //
  // }

  // render() {
  //   return (
  //     <AwesomeAlert
  //       show={true}
  //       showProgress={true}
  //       title={'登录中...'}
  //       progressColor={'gray'}
  //       progressSize={'large'}
  //       titleStyle={{marginTop: ScaleValue(30),marginBottom: ScaleValue(-30)}}
  //       overlayStyle={{ backgroundColor: 'rgba(152,152,152,0.2)'}}
  //       closeOnTouchOutside={false}
  //       closeOnHardwareBackPress={false}
  //     />
  //   )
  // }
}

class GQLoadingContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <AwesomeAlert
        show={true}
        showProgress={true}
        title={'登录中...'}
        progressColor={'gray'}
        progressSize={'large'}
        titleStyle={{marginTop: ScaleValue(30),marginBottom: ScaleValue(-30)}}
        overlayStyle={{ backgroundColor: 'rgba(152,152,152,0.2)'}}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
