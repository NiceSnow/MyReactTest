/**
 * Created by lilang on 2018-09-30.
 */

import React, { Component } from 'react';
import { Text, View, Vibration } from 'react-native';
import GesturePassword from "../../../common/gesturePassword";
import GQBaseComponent from "../../../common/GQBaseComponent";
import {Navigation} from 'react-native-navigation'
import {GQScreenNames} from "../../screens/GQScreenNames";
import GQUserInfo from "../../../utils/GQUserInfo";

var savepassword = '';

export default class GQGesturePassword extends GQBaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      status:'normal',
      message:'请解锁',
    };
  }

  render() {

    return (
      <GesturePassword
        status={this.state.status}
        message={this.state.message}
        onStart={this._onStart}
        onEnd={this._onEnd}
        passwordLogin={this._passwordLogin}
        rightColor={'#ff3e19'}
        outerCircle={false}
        circleBackgoroundColor={'#fff5f3'}
        interval={500}
        textStyle={{color:'#567df2'}}
        authSuccess={this._dismissModal}
        isOpenTouchID={this.props.isOpenTouchID}
        gesturePassword={this.props.gesturePassword}
      />
    )
  }


  _onEnd = (password) => {
    if (password.length < 4){
      this.setState({
        status:'wrong',
        message:'至少需要连接4个点',
      })
      return;
    }

    GQUserInfo.getGesturePassword().then((result) => {
      if (result === password) {
        this.setState({
          status:'right',
          message:'密码验证成功',
        })
        this._dismissModal();
      }else{

        this.setState({
          status: 'wrong',
          message:  '密码错误,请重新绘制'
        });
      }
    })
  }

  _passwordLogin = ()=>{
    Navigation.push(this.props.componentId,{
      component:{
        name:GQScreenNames.loginPhone,
        passProps:{
          authSuccess:this._dismissModal
        }
      }
    })
  }

  _dismissModal = ()=> {
    Navigation.dismissModal(this.props.componentId)
    this.props.dismissAction();
  }


}