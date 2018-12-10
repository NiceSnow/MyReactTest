export var GQRequestConfig = {

  /**
   * 首页接口
   */
  //首页产品数据
  GETHOME_PRODUCTLIST: '/index',

  // 我的 首页
  myHome: '/mineInfo',
  // 个人信息
  mineDetail:'/mineDetails',
  // 登录
  login: '/user/login',
  // 是否已注册
  isRegister: '/user/isRegister',
  // 注册
  register: '/user/register',
  // 发送验证码
  sendMessage:'/message/sendMessage',
  //重置密码
  revserPwd: '/user/revserPwd',

  // 实名认证
  realNameAuth:'/realNameAttest',
  // 设置交易密码
  setPayPassword:'/setPayPassword',
  // 绑定银行卡
  confirmCard:'/confirmCard',
  // 绑定银行卡发送验证码
  bindCradCode: '/bindCradCode',
  // 绑定银行卡
  bindCrad: '/bindCrad',
  // 获取银行卡对应的信息
  getBankInfo:'/getBankInfo',
  // 支持的银行卡列表
  findBankCardList:'/findBankCardList',
  // 获取身份证号是否匹配
  getCustIsEmpty:'/getCustIsEmpty',
  isRealNameByMobile:'/user/isRealNameByMobile',
  isRealNameByIdCard:'/user/isRealNameByIdCard',

}