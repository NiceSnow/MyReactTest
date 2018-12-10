/**
 * Created by lilang on 2018-09-30.
 */

import EventEmitter from 'events'
import assign from 'object-assign'

var MyHomeStores = assign({}, EventEmitter.prototype, {

  data:{},
  status:'',

  addTempResponse(data){
    this.data = data;
  },

  getTempResponse(){
    return this.data;
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

export default MyHomeStores;