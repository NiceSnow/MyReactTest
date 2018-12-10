import GQHttpUtils from '../../../utils/GQHttpUtils'
import GQUtils from '../../../utils/GQUtils'
import GQHomeDispatcher from '../dispatcher/GQHomeDispatcher'
import GQHomeConstants from '../constants/GQHomeConstants'
import {GQRequestConfig} from "../../../config/GQRequestConfig";
export default class GQHomeAction {

    /**
     * 首页产品列表数据
     * @param {请求参数 注意传入pagesize} params 
     */
    static requestHomeProductList(params ,refresh){
        if(refresh==true){
            GQUtils.loadingActivityShow()
        }

        GQHttpUtils.postFormDataFatch(GQRequestConfig.GETHOME_PRODUCTLIST, '', params)
        .then((json) => {
            //处理 请求success
            if(refresh==true){
                GQUtils.loadingActivityHide()
            }
            if (json.code == '0000') {
                GQHomeDispatcher.dispatch({
                    actionType: GQHomeConstants.GET_HOME_PRODUCTLIST,
                    result: json.data,
                    status: json.code,
                    message: json.msg
                })
            } else {
                GQHomeDispatcher.dispatch({
                    actionType: GQHomeConstants.GET_HOME_PRODUCTLIST,
                    result: json.data,
                    status: json.code,
                    message: json.msg
                })
            }
        }, (json) => {
            if(refresh==true){
                GQUtils.loadingActivityHide()
            }
            //TODO 处理请求fail  
            GQHomeDispatcher.dispatch({
                actionType: GQHomeConstants.GET_HOME_PRODUCTLIST,
                result: null,
                status: '0005',
                message: ''
            })
        })
    }

}