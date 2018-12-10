/**
 * Created by lilang on 2018/10/17.
 */

import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import GQCustomText from "./customText/GQCustomText";
import {ScaleValue} from "../utils/GQUtils";
import RootSiblings from "react-native-root-siblings";


var siblings;

export default class GQInstructionDialog {

  static show = (message)=>{
    siblings = new RootSiblings(
      <GQInstructionDialogContainer
        message={message}
        dismissAction={()=>{
          siblings.destroy();
        }}
      />
    )
    return siblings;
  }
}

class GQInstructionDialogContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
    };
  }

  render() {
    let dialog = (
      <View style={styles.dialog}>
        <GQCustomText style={styles.contentText}>{this.props.message}</GQCustomText>
        <View style={styles.line}/>
        <TouchableOpacity style={styles.buttonContainer} onPress={this._confirmButtonAction}>
          <GQCustomText style={styles.buttonText}>我知道了</GQCustomText>
        </TouchableOpacity>
      </View>
    )

    return (
      <Modal
        animationType={'fade' }
        visible={this.state.modalVisible}
        transparent={true}
      >
        <View style={styles.container}>
          {dialog}
        </View>
      </Modal>
    )
  }

  _confirmButtonAction = ()=>{
    this.setState({modalVisible:false})
    this.props.dismissAction();
  }

}

/*
export default class GQInstructionDialogContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  static defaultProps = {
    visible: false,
  }

  render() {
    let dialog = (
      <View style={styles.dialog}>
        <GQCustomText style={styles.contentText}>{this.props.message}</GQCustomText>
        <View style={styles.line}/>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.props.dismissAction}>
          <GQCustomText style={styles.buttonText}>我知道了</GQCustomText>
        </TouchableOpacity>
      </View>
    )

    return (
      <Modal
        animationType={'fade' }
        visible={this.props.visible}
        transparent={true}
      >
        <View style={styles.container}>
          {dialog}
        </View>
      </Modal>
    )
  }

  _dismissAction = ()=>{

  }

}

*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(52,52,52,0.2)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialog: {
    borderRadius:ScaleValue(8),
    backgroundColor:'white',
    marginLeft: ScaleValue(90),
    marginRight: ScaleValue(90),
  },
  contentText: {
    fontSize: ScaleValue(28),
    color: '#000000',
    margin: ScaleValue(38),
    marginTop: ScaleValue(38),
    marginLeft: ScaleValue(38),
    marginRight: ScaleValue(38),
  },
  line: {
    height: ScaleValue(1),
    backgroundColor: '#e5e5e5',
  },
  buttonContainer: {
    height: ScaleValue(84),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#4aa8fd',
    fontSize: ScaleValue(30),
  },
})