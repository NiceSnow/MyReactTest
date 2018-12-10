
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
import GQHomeConstants from '../constants/GQHomeConstants';

var GQHomeStores = assign({}, EventEmitter.prototype, {


    /**
     * 首页平台数据
     */
    emitProductListListener() {
        this.emit(GQHomeConstants.GET_HOME_PRODUCTLIST);
    },
    addProductListListener(callback) {
        this.on(GQHomeConstants.GET_HOME_PRODUCTLIST, callback);
    },
    removeProductListListener(callback) {
        this.removeListener(GQHomeConstants.GET_HOME_PRODUCTLIST, callback);
    },

    /**
     * 首页弹窗
     */
    emitPopAdViewListener() {
        this.emit(GQHomeConstants.GET_HOME_POPADVIEW);
    },
    addPopAdViewListener(callback) {
        this.on(GQHomeConstants.GET_HOME_POPADVIEW, callback);
    },
    removePopAdView(callback) {
        this.removeListener(GQHomeConstants.GET_HOME_POPADVIEW, callback);
    },

    /**
     * 首页升级弹窗
     */
    emitUpdateListener() {
        this.emit(GQHomeConstants.GET_HOME_UPDATE);
    },
    addUpdateListener(callback) {
        this.on(GQHomeConstants.GET_HOME_UPDATE, callback);
    },
    removeUpdateView(callback) {
        this.removeListener(GQHomeConstants.GET_HOME_UPDATE, callback);
    },

    /**
     * 首页加息券
     */
    emitLoadRuleByUserListener() {
        this.emit(GQHomeConstants.GET_HOME_LOADRULEBYUSER);
    },
    addLoadRuleByUserListener(callback) {
        this.on(GQHomeConstants.GET_HOME_LOADRULEBYUSER, callback);
    },
    removeLoadRuleByUserView(callback) {
        this.removeListener(GQHomeConstants.GET_HOME_LOADRULEBYUSER, callback);
    },

    /**
     * 首页加息券点击领取
     */
    emitClickToReceiveListener() {
        this.emit(GQHomeConstants.GET_HOME_CLICKTORECEIVE);
    },
    addClickToReceiveListener(callback) {
        this.on(GQHomeConstants.GET_HOME_CLICKTORECEIVE, callback);
    },
    removeClickToReceiveView(callback) {
        this.removeListener(GQHomeConstants.GET_HOME_CLICKTORECEIVE, callback);
    },
})

module.exports = GQHomeStores;

