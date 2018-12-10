/**
 * Created by lilang on 2018-09-30.
 */

import GQLoading from "../../../utils/GQLoading";
import GQHttpUtils from "../../../utils/GQHttpUtils";
import {GQRequestConfig} from "../../../config/GQRequestConfig";
import GQDispatcher from '../../../common/dispatcher/GQDispatcher'
import MyConstants from "../constants/MyConstants";
import MyHomeDispatcher from '../dispatcher/MyHomeDispatcher'
import GQUtil from "../../../utils/GQUtils";
import RNProgressHUD from "../../../common/RNProgressHUD";

export default class MyHomeActions {

   static requestHomeData(params){

     GQHttpUtils.postFormDataFatch(GQRequestConfig.myHome, '', params).then((response) => {

       GQDispatcher.dispatch({
         actionType: MyConstants.requestMyHomeData,
         response:response,
       })

     }, (fail) => {

     })
  }

  static requestMineDetailData(params){
     
     GQHttpUtils.postFormDataFatch(GQRequestConfig.mineDetail,'',params).then((response)=>{

      if (response.code === '0000') {
        GQDispatcher.dispatch({
          actionType:MyConstants.requestMineDetail,
          response:response,
        })

        GQStorage.save({key:'mineDetail',data:response.data})
      }

     },(fail)=>{

     })
  }

}
