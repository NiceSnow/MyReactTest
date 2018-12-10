import GQHomeDispathcher from '../../../common/dispatcher/GQDispatcher';
import GQHomeConstants from '../constants/GQHomeConstants';
import GQHomeData from '../stores/GQHomeData';
import GQHomeStores from '../stores/GQHomeStores'


GQHomeDispathcher.register((action) => {


    switch (action.actionType) {


        /** 产品列表*/
        case GQHomeConstants.GET_HOME_PRODUCTLIST:
            {
                if (action.status == '0000') {
                    GQHomeData.setProductListData(action.result)
                    GQHomeData.setProductListCode(action.status)
                } else {
                    GQHomeData.setProductListData(action.result)
                    GQHomeData.setProductListCode(action.status)
                    GQHomeData.setProductListMsg(action.message)
                }
                GQHomeStores.emitProductListListener();
            }
            break;


        /** 首页平台数据及四个广告位*/
        case GQHomeConstants.GET_HOME_POPADVIEW:
            {
                if (action.status == '0000') {
                    GQHomeData.setPopAdViewData(action.result)
                    GQHomeData.setPopAdViewCode(action.status)
                } else {
                    GQHomeData.setPopAdViewCode(action.status)
                }
                GQHomeStores.emitPopAdViewListener();
            }
            break;

        /** 首页升级弹窗*/
        case GQHomeConstants.GET_HOME_UPDATE:
            {
                if (action.status == '0000') {
                    GQHomeData.setUpdateData(action.result)
                    GQHomeData.setUpdateCode(action.status)
                } else {
                    GQHomeData.setUpdateCode(action.status)
                }
                GQHomeStores.emitUpdateListener();
            }
            break;
        /** 首页加息券列表弹窗*/
        case GQHomeConstants.GET_HOME_LOADRULEBYUSER:
        {
            if (action.status == '0000') {
                GQHomeData.setLoadRuleByUserData(action.result)
                GQHomeData.setLoadRuleByUserCode(action.status)
            } else {
                GQHomeData.setLoadRuleByUserCode(action.status)
            }
            GQHomeStores.emitLoadRuleByUserListener();
        }
        break;

                /** 首页加息券列表点击领取*/
                case GQHomeConstants.GET_HOME_CLICKTORECEIVE:
                {
                    if (action.status == '0000') {
                        GQHomeData.setClickToReceiveData(action.result)
                        GQHomeData.setClickToReceiveCode(action.status)
                    } else {
                        GQHomeData.setClickToReceiveCode(action.status)
                    }
                    GQHomeStores.emitClickToReceiveListener();
                }
                break;
        
    }
})
module.exports = GQHomeDispathcher;