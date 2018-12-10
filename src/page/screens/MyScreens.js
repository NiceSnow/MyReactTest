/**
 * Created by lilang on 2018-09-30.
 */

import {Navigation} from "react-native-navigation/lib/dist/index";
import MyHomeComponent from "../my/components/MyHomeComponent";
import RealNameAuth from "../loginRegister/components/RealNameAuthComponent";
import BindingBankCard from "../loginRegister/components/BindingBankCardComponent";
import BankListComponent from "../loginRegister/components/BankListComponent";
import LoginPhone from "../loginRegister/components/LoginPhoneComponent";
import SetTransactionPwd from "../loginRegister/components/SetTransactionPwdComponent";
import LoginPwd from "../loginRegister/components/LoginPwdComponent";
import RegisterComponent from "../loginRegister/components/RegisterComponent";
import GQGesturePassword from "../loginRegister/components/GQGesturePassword";
import MyAccountListComponent from '../my/components/MyAccountListComponent';
import MyCenterPwdManageComponent from '../my/components/MyCenterPwdManageComponent';
import VerifyIDCardComponent from '../loginRegister/components/VerifyIDCardComponent'

import {GQScreenNames} from "./GQScreenNames";
import GQResetPasswordComponent from "../loginRegister/components/GQResetPasswordComponent";

export function myRegisterScreens() {
  Navigation.registerComponent(GQScreenNames.myHome, () => MyHomeComponent);
  Navigation.registerComponent(GQScreenNames.loginPhone, () => LoginPhone);
  Navigation.registerComponent(GQScreenNames.loginPwd, () => LoginPwd);
  Navigation.registerComponent(GQScreenNames.register, () => RegisterComponent);
  Navigation.registerComponent(GQScreenNames.bankList, () => BankListComponent);
  Navigation.registerComponent(GQScreenNames.realNameAuth, () => RealNameAuth);
  Navigation.registerComponent(GQScreenNames.bindingBankCard, () => BindingBankCard);
  Navigation.registerComponent(GQScreenNames.setTransactionPwd, () => SetTransactionPwd);
  Navigation.registerComponent(GQScreenNames.gesturepassword, () => GQGesturePassword);
  Navigation.registerComponent(GQScreenNames.resetPassword, ()=>GQResetPasswordComponent);
  Navigation.registerComponent(GQScreenNames.verifyIDCard, ()=>VerifyIDCardComponent)


  Navigation.registerComponent(GQScreenNames.myAccount, ()=> MyAccountListComponent);
  Navigation.registerComponent(GQScreenNames.pwdManage, ()=> MyCenterPwdManageComponent);

}

