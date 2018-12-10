/**
 * 环境配置类型
 * @param{int} GQGET_TEST 测试环境
 * @param{int} GQGET_RELEASE 线上环境地址
 */
//  jiashuai:  0
//  test: 1
//  liwei:  2
//  docker: 3
var Server = {
  jiashuai: 'jiashuai',
  test: 'test',
  liwei: 'liwei',
  docker: 'docker'
};

var AppServersType = Server.jiashuai;
var LoginServersType = Server.test;
var H5ServersType = Server.test;

export var GQAppMananger = {
  /**
   * 获取基础服务器地址
   * @param{string}
   */
  getAppSeverUrl() {
    let servers = {
      jiashuai: 'http://10.1.4.121:8081/wealth/api',
      test: 'http://10.100.200.68:8080/wealth/api',
      liwei: 'http://10.1.6.96:8081/wealth/api',
      docker: 'http://wealth-qt-rest-api-customers.test.gqichina.com/wealth/api',
    }
    // return "http://10.1.4.121:8081/wealth/api" //佳帅电脑
    // return 'http://10.100.200.68:8080/wealth/api' //测试服务器
    // return 'http://10.1.6.96:8081/wealth/api' //李伟电脑
    // return 'http://wealth-qt-rest-api-customers.test.gqichina.com/wealth/api'
    return servers[AppServersType];
  },
  getLoginServerUrl() {
    let servers = {
      jiashuai: 'http://10.1.4.121:8081/wealth/api',
      test: 'http://10.100.200.68:8083',
      liwei: 'http://10.1.6.96:8888',
      docker: 'http://wealth-qt-oauth.test.gqichina.com',
    }
    // return 'http://10.100.200.63:8080/wealth-qt-oauth' //登录服务器
    // return 'http://10.100.200.68:8083' //登录测试服务器
    // return 'http://10.1.6.96:8888' //李伟电脑
    // return 'http://wealth-qt-oauth.test.gqichina.com'
    return servers[LoginServersType];
  },
  getHTMLUrl() {
    let servers = {
      test: 'http://10.100.200.68:81',
      docker: 'http://wealth-h5.test.gqichina.com',
    }
    // return 'http://10.1.4.64:8080'; //周琳
    // return 'http://10.100.200.68:81'   //测试
    // return 'http://wealth-h5.test.gqichina.com'
    return servers[H5ServersType];
  }

}
// module.exports = GQAppMananger;