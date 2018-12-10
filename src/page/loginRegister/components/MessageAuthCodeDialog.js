/**
 * Created by lilang on 2018/10/12.
 */

import React, {Component} from 'react';
import {Text, TextInput, View, Image, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import {ScaleValue} from "../../../utils/GQUtils";
import GQCustomText from "../../../common/customText/GQCustomText";
import GQBaseComponent from "../../../common/GQBaseComponent";

export default class MessageAuthCodeDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    let codeInputView = (
      <View style={styles.codeInputView}>
        <TextInput
          style={styles.textInput}
          fontSize={ScaleValue(28)}
          placeholder={'请输入右方的图形验证码'}
          placeholderTextColor={'#c7c7c7'}
          allowFontScaling={false}
        />
        <View style={{backgroundColor:'#cacaca', flex:1, height: ScaleValue(2)}}/>
      </View>
    )

    let codeImageView = (
      <View style={styles.codeImageView}>
        <Image key={new Date()}
               style={{width: ScaleValue(167), height: ScaleValue(75),}}
               source={{uri:'http://10.100.200.63:8080/wealth-qt-oauth/user/validateCode/13112345678'}}/>
      </View>
    )

    let switchView = (
      <TouchableOpacity style={{alignItems:'flex-end'}} onPress={this.refreshCode}>
        <GQCustomText style={styles.switchText}>看不清？换一换</GQCustomText>
      </TouchableOpacity>
    )

    let buttonsView = (
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.buttonCommon,styles.cancelButton]} onPress={this.props.cancelAction}>
          <GQCustomText style={[styles.buttonTextCommon,{color:'#ff3e19'}]}>取消</GQCustomText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonCommon,styles.confirmButton]} onPress={this.props.confirmAction}>
          <GQCustomText style={[styles.buttonTextCommon,{color:'#ffffff'}]}>确定</GQCustomText>
        </TouchableOpacity>
      </View>
    )

    return (
      <View style={styles.container}>
        <View style={styles.dialog}>
          <View style={styles.codeContainer}>
            {codeInputView}
            {codeImageView}
          </View>
          {switchView}
          {/*<View style={{flex:1,justifyContent:'flex-end'}}>*/}
            {buttonsView}
          {/*</View>*/}

        </View>
      </View>

    )
  }

  refreshCode = ()=> {
    this.forceUpdate()
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'rgba(52,52,52,0.5)',
    justifyContent:'center',
    alignItems:'center'
  },
  dialog: {
    backgroundColor:'white',
    height: ScaleValue(340)
  },
  codeContainer: {
    flexDirection: 'row',
    height:ScaleValue(75),
    marginTop: ScaleValue(86),
  },
  codeInputView: {
    flexDirection:'column',
    height:ScaleValue(75),
    marginLeft: ScaleValue(30),
    // backgroundColor:'skyblue'
  },
  textInput: {
    fontSize: ScaleValue(28),
    height: ScaleValue(74),

  },
  codeImageView: {
    borderWidth: ScaleValue(1),
    borderColor: '#e5e5e5',
    marginLeft: ScaleValue(35),
    marginRight: ScaleValue(30),
    width: ScaleValue(167),
    height: ScaleValue(75),
  },
  switchView: {
    alignItems: 'flex-end'
  },
  switchText: {
    fontSize: ScaleValue(24),
    color:'#4aa9fd',
    marginTop: ScaleValue(16),
    marginRight: ScaleValue(30),
  },
  buttonsContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems:'flex-end',
    marginBottom:ScaleValue(30),
  },
  buttonCommon:{
    height:ScaleValue(70),
    width: ScaleValue(229),
    justifyContent:'center',
    alignItems:'center',
    borderRadius:ScaleValue(6)

  },
  buttonTextCommon:{
    fontSize:ScaleValue(30),
  },
  cancelButton: {
    borderWidth: ScaleValue(1),
    borderColor: '#ff3e19'
  },
  confirmButton: {
    backgroundColor:'#ff3e19'
  },
})