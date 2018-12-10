/**
 * Created by lilang on 2018-09-30.
 */

import EventEmitter from 'events'
import assign from 'object-assign'
import LoginRegisterConstants from "../constants/LoginRegisterConstants";

var LoginRegisterStores = assign({}, EventEmitter.prototype, {

  data:{},

  addTempResponse(data){
    this.data = data;
  },

  getTempResponse(){
    return this.data;
  },

  emitLoginListener(){
    this.emit(LoginRegisterConstants.login);
  },
  addLoginListener(callback){
    this.on(LoginRegisterConstants.login,callback);
  },
  removeLoginListener(callback){
    this.removeListener(LoginRegisterConstants.login,callback);
  },

  emitRegisterListener(name){
    this.emit(name);
  },
  addRegisterListener(name, callback){
    this.on(name,callback);
  },
  removeRegisterListener(name, callback){
    this.removeListener(name,callback);
  },

  emitCustomListener(name){
    this.emit(name);
  },
  addCustomListener(name, callback){
    this.on(name,callback);
  },
  removeCustomListener(name, callback){
    this.removeListener(name,callback);
  }

})

export default LoginRegisterStores;