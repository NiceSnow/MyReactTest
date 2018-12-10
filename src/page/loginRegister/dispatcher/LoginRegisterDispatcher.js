/**
 * Created by lilang on 2018-09-30.
 */

import GQDispatcher from '../../../common/dispatcher/GQDispatcher'
import LoginRegisterConstants from '../constants/LoginRegisterConstants';
import LoginRegisterStores from '../stores/LoginRegisterStores'
import MyHomeStores from "../../my/stores/MyHomeStores";
import MyConstants from "../../my/constants/MyConstants";

GQDispatcher.register((action) => {
  console.log(action.actionType)
  switch (action.actionType) {

    case LoginRegisterConstants.login: {
      LoginRegisterStores.addTempResponse(action.response)
      LoginRegisterStores.emitLoginListener();
      // //我的首页登录状态回调
      // MyHomeStores.addTempData(action.response)
      MyHomeStores.emitCustomListener(MyConstants.loginCallback)
    }
      break;
    case LoginRegisterConstants.Logout: {

    }
      break;
    case LoginRegisterConstants.register: {
      LoginRegisterStores.addTempResponse(action.response);
      LoginRegisterStores.emitCustomListener(LoginRegisterConstants.register);
    }
      break;
    case LoginRegisterConstants.isRegister: {
      LoginRegisterStores.addTempResponse(action.response);
      LoginRegisterStores.emitCustomListener(LoginRegisterConstants.isRegister);
    }
      break;
    case LoginRegisterConstants.realNameAuth:{
      LoginRegisterStores.addTempResponse(action.data,action.status);
      LoginRegisterStores.emitCustomListener(LoginRegisterConstants.realNameAuth);
    }
      break;
    case LoginRegisterConstants.bindingBankCardCode:{
      LoginRegisterStores.addTempResponse(action.data,action.status);
      LoginRegisterStores.emitCustomListener(LoginRegisterConstants.bindingBankCardCode);
    }
      break;
    case LoginRegisterConstants.bindingBankCard:{
      LoginRegisterStores.addTempResponse(action.data,action.status);
      LoginRegisterStores.emitCustomListener(LoginRegisterConstants.bindingBankCard);
    }
      break;
    // case LoginRegisterConstants.setTransactionPwd:{
    //   LoginRegisterStores.addTempResponse(action.data,action.status);
    //   LoginRegisterStores.emitCustomListener(LoginRegisterConstants.setTransactionPwd);
    // }
    //   break;
    // case LoginRegisterConstants.isRealNameByMobile:{
    //   LoginRegisterStores.addTempResponse(action.data,action.status);
    //   LoginRegisterStores.emitCustomListener(LoginRegisterConstants.isRealNameByMobile);
    // }
    //   break;
    // case LoginRegisterConstants.isRealNameByIdCard:{
    //   LoginRegisterStores.addTempResponse(action.data,action.status);
    //   LoginRegisterStores.emitCustomListener(LoginRegisterConstants.isRealNameByIdCard);
    // }
    //   break;
    case LoginRegisterConstants.sendMessage:{
      LoginRegisterStores.addTempResponse(action.data,action.status);
      LoginRegisterStores.emitCustomListener(LoginRegisterConstants.sendMessage);
    }
      break;
    case LoginRegisterConstants.revserPwd:{
      LoginRegisterStores.addTempResponse(action.response);
      LoginRegisterStores.emitCustomListener(LoginRegisterConstants.revserPwd);
    }
      break;
    case LoginRegisterConstants.getBankInfo:{
      LoginRegisterStores.addTempResponse(action.response);
      LoginRegisterStores.emitCustomListener(LoginRegisterConstants.getBankInfo);
    }
      break;
    case LoginRegisterConstants.findBankCardList:{
      LoginRegisterStores.addTempResponse(action.response);
      LoginRegisterStores.emitCustomListener(LoginRegisterConstants.findBankCardList);
    }
      break;
    case LoginRegisterConstants.getCustIsEmpty:{
      LoginRegisterStores.addTempResponse(action.response);
      LoginRegisterStores.emitCustomListener(LoginRegisterConstants.getCustIsEmpty);
    }
      break;

  }
})