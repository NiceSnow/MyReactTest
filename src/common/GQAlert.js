/**
 * Created by lilang on 2018-09-30.
 */

import React, { Component } from 'react';
import {Modal, Text, View, StyleSheet} from 'react-native';
import AwesomeAlert from './awesomeAlert';
import {ScaleValue} from "../utils/GQUtils";
import PropTypes from 'prop-types';
import RootSiblings from "react-native-root-siblings";

var siblings;

export default class GQAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  static show = (configData={})=>{
    siblings = new RootSiblings(
      <GQAlertContainer
      {...configData}
        onCancelPressed={()=>{
          configData.onCancelPressed();
          siblings.destroy();
        }}
        onConfirmPressed={()=>{
          configData.onConfirmPressed();
          siblings.destroy();
        }}
    />);
    return siblings;
  }
}

class GQAlertContainer extends Component {

  static propTypes = {
    title:PropTypes.string,
    cancelText:PropTypes.string,
    confirmText:PropTypes.string,
    onCancelPressed:PropTypes.func,
    onConfirmPressed:PropTypes.func,
  }

  hide = ()=>{
    console.log('GQAlertContainer hide>>>>>>>>>>>>.');
  }
  onCancelPressed = () => {
    this.hide();
    this.props.onCancelPressed();
  }
  onConfirmPressed = () => {
    this.hide();
    this.props.onConfirmPressed();
  }

  render() {
    let showCancel = this.props.cancelText&&this.props.cancelText.length > 0;
    let showConfirm = this.props.confirmText&&this.props.confirmText.length > 0;

    return (
      <Modal
        animationType='none'
        transparent={true}
        visible={true}>
        <AwesomeAlert
          show={true}
          showProgress={false}
          title={this.props.title}
          // message="I have a message for you!"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={showCancel}
          showConfirmButton={showConfirm}
          cancelText={this.props.cancelText}
          confirmText={this.props.confirmText}
          titleStyle={styles.title}
          cancelButtonStyle={styles.cancelButton}
          cancelButtonTextStyle={styles.cancelButtonText}

          confirmButtonStyle={styles.confirmButton}
          confirmButtonTextStyle={styles.confirmButtonText}

          contentContainerStyle={{minWidth: ScaleValue(540), minHeight: ScaleValue(341)}}

          onCancelPressed={this.onCancelPressed}
          onConfirmPressed={this.onConfirmPressed}
        />
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  title:{
    marginTop: ScaleValue(70),
    fontSize: ScaleValue(30),
    color: '#000000'
  },
  cancelButton:{
    marginTop: ScaleValue(70),
    width: ScaleValue(229),
    marginBottom: ScaleValue(10),
    borderWidth: ScaleValue(1),
    borderColor: '#c9c9c9',
    backgroundColor: '#FFFFFF'
  },
  confirmButton: {
    backgroundColor:'#ff3e19',
    width:ScaleValue(229),
    marginTop: ScaleValue(70),
    marginLeft:ScaleValue(),
    marginBottom: ScaleValue(10),
  },
  cancelButtonText: {
    alignSelf: 'center',color: '#666666', fontSize: ScaleValue(30)
  },
  confirmButtonText:{
    alignSelf: 'center',color: '#ffffff', fontSize: ScaleValue(30)
  }
})