/*
 * @Author: yuanjie 
 * @Date: 2018-10-12 10:36:39 
 * @Last Modified by: yuanjie
 * @Last Modified time: 2018-10-14 17:23:24
 */
import React, {Component} from "react";
import {
  View,
  ListView,
  TouchableOpacity,
  Image,
  Platform,
  NativeEventEmitter,
  StyleSheet,
  ActivityIndicator,
  NativeModules,
  Animated,
  ImageBackground,
  ScrollView,
  NetInfo,
} from "react-native";

import {
  SwRefreshScrollView,
  SwRefreshListView,
  RefreshStatus,
  LoadMoreStatus
} from "../../../common/swRefreshList";
/********************弹框************************************************ */
import {MaterialDialog} from "../../../common/dialog";
/************************************************************************ */
import GQUtils from "../../../utils/GQUtils";
import GQScreenUtil from "../../../utils/GQScreenUtil";
import GQHomeStores from "../stores/GQHomeStores";
import GQHomeData from "../stores/GQHomeData";
import GQHomeAction from "../actions/GQHomeAction";

import GQHomeBannerComponent from './GQHomeBannerComponent'
import GQHomeNoticeComponent from './GQHomeNoticeComponent'
import GQHomeDataPlatfromComponent from './GQHomeDataPlatfromComponent'
import GQHomeListHeaderComponent from './GQHomeListHeaderComponent'
/**js和原生通讯bridgeModule*/
import GQNativeBridgeModule from "../../../utils/GQNativeBridgeModule";
import GQSellItemView from "../../publicComponent/GQSellItemView";
import GQExceptionView from "../../publicComponent/GQExceptionView";
import GQCustomText from '../../../common/customText/GQCustomText'
import GQListFooterTextView from "../../publicComponent/GQListFooterTextView";
import GQHomeGridViewComponent from "./GQHomeGridViewComponent";
import GQHomeSearchViewComponent from "./GQHomeSearchViewComponent";
import GQFooterListComponent from "./GQFooterListComponent";
import {GQScreenNames} from "../../screens/GQScreenNames";
import {Navigation} from 'react-native-navigation';
import {GQHTMLConfig} from "../../../config/GQHTMLConfig";
import {GQAppMananger} from "../../../utils/GQAppManager";

let screenWidth = GQUtils.getScreenWidth();
let screenHeight = GQUtils.getScreenHeight();
let iPhone6sScale = GQUtils.getAutoScaleIPhone6s();

let dataSourceCopy = {};

let refreshArray = [];
let refreshHeader = [];
// const onlineEvent =
//   Platform.OS == "ios"
//     ? new NativeEventEmitter(GQNativeBridgeModule)
//     : new NativeEventEmitter(NativeModules.GQAndroidBridgeModule);

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      }),
      // scrollY: new Animated.Value(0),
      data: [],
      isShowNoticesView: true,
      refreshIndex: 0,
      isTopVisible: false,
    };
    this.refreshState = "0";
    this.addProductListListenerCallback = this.addProductListListenerCallback.bind(this);
    this.clickCloseNoticeView = this.clickCloseNoticeView.bind(this);
    this._getData = this._getData.bind(this);
    this._renderListView = this._renderListView.bind(this);
    this.topIndicatorRender = this.topIndicatorRender.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this._onListRefersh = this._onListRefersh.bind(this)
    Navigation.events().bindComponent(this);
  }

  static options(passProps) {
    return {
      topBar: {
        title: {
          text: '首页'
        },
        //  // visible:false,
        //  //hideOnScroll: true,
        //  drawBehind: true,
        //  visible: false,
        //  animate: false
        backButton: {
          visible: false
        },
        rightButtons: [
          {
            id: 'buttonOne',
            icon: require('../../../images/home/xiaoxi.png'),
            color: '#666666'
            // component: {
            //   name:'navigationMessage',
            //   passProps:{source:"homeMain"}
            // }
          }
        ]
      }
    };
  }

  navigationButtonPressed({buttonId}) {
    // will be called when "buttonOne" is clicked
    switch (buttonId) {
      case 'buttonOne':
        Navigation.push(GQScreenNames.homeMain, {
          component: {
            name: GQScreenNames.webview,
            passProps: {
              url: GQAppMananger.getHTMLUrl() + GQHTMLConfig.notification,
              title: '消息中心',
            },
            options: {
              bottomTabs: {
                visible: false,
                animate: true,
              },
            }
          },
        });
        break;

      default:
        break;
    }
  }


  componentWillMount() {
    GQHomeStores.addProductListListener(this.addProductListListenerCallback);
    NetInfo.addEventListener('connectionChange', this._networkChanged)
  }

  componentWillUnmount() {
    GQHomeStores.removeProductListListener(this.addProductListListenerCallback)
    NetInfo.removeEventListener('connectionChange', this._networkChanged)
  }

  componentDidMount() {
    //请求数据
    this._getData();
  }

  _networkChanged = (status) => {
    // if (status.type != 'none') {
    //   this._getData();
    // }
  }

  /**
   * 首页首次无数据时请求调用此方法
   */
  _getData() {
    console.log("正在请求首页数据接口");
    GQHomeData.setProductListCode('1000')
    this.setState({
      productListCode: GQHomeData.productListCode,
    });
    let productParams = {};
    let productRequestParams = GQUtils.encryptParameter(productParams);
    GQHomeAction.requestHomeProductList(productRequestParams);
  }

  /**
   * 首页刷新调用此方法
   */
  refreshData() {
    /**
     * 请求列表
     */
    let productParams = {};
    let productRequestParams = GQUtils.encryptParameter(productParams);
    GQHomeAction.requestHomeProductList(productRequestParams);
  }

  addProductListListenerCallback() {
    console.log("########################首页数据########################");
    if (GQHomeData.productListCode == "0000") {
      if (!!GQHomeData.productListData && Array.isArray(GQHomeData.productListData)) {
        for (let index = 0; index < GQHomeData.productListData.length; index++) {
          const element = GQHomeData.productListData[index];
          let categoryNo = element.categoryNo;
          let key = element.categoryNo + "_" + index;
          switch (categoryNo) {
            case "20b0e89801"://banner1
              dataSourceCopy[key] = [GQHomeData.productListData[index].datalist];
              break;
            case "3e0f25df02"://banner2
              dataSourceCopy[key] = [GQHomeData.productListData[index].datalist];
              break;
            case "ad6f29dc03"://新手专区
              dataSourceCopy[key] = GQHomeData.productListData[index].datalist;
              break;
            case "be3902d104"://热销保险
              dataSourceCopy[key] = [GQHomeData.productListData[index].datalist];
              break;
            case "42a75a4005"://基金理财
              dataSourceCopy[key] = GQHomeData.productListData[index].datalist;
              break;
            case "84f21e3a06"://平台模块
              dataSourceCopy[key] = [GQHomeData.productListData[index].datalist];
              break;
            default:
              dataSourceCopy[key] = GQHomeData.productListData[index].datalist;
              break;
          }
        }
      }
      this.setState({
        data: dataSourceCopy,
        productListCode: GQHomeData.productListCode,
        isShowNoticesView: true
      });
      if (this.refreshState === "1") {
        this.refreshState = "0";
        this.refs.listView.resetStatus(); //重置上拉加载的状态
        this.refs.listView.endRefresh();
      }
    } else {
      this.setState({
        data: []
      })
    }
  }

  _renderRow(rowData, sectionID, rowId) {
    let index = sectionID.substring(11, sectionID.length)
    switch (sectionID.substring(0, 10)) {
      case "20b0e89801"://banner1
        return (
          <GQHomeBannerComponent bannerImageDataArray={rowData}/>
        );
      case "3e0f25df02"://banner2
        return (
          <GQHomeBannerComponent bannerImageDataArray={rowData} isShowLine={true} height={196 * iPhone6sScale}/>
        );
      case "ad6f29dc03"://新手专区
        return <GQSellItemView item={rowData}/>;
      case "be3902d104"://热销保险
        return (
          <GQHomeGridViewComponent gridDataArray={rowData}/>
        );
      case "42a75a4005"://基金理财
        return <GQSellItemView item={rowData}/>;
      case "84f21e3a06"://平台模块
        return <GQHomeDataPlatfromComponent dataPlatfromData={rowData}/>
      default:
        return <GQSellItemView item={rowData}/>;
    }
  }

  _renderHeader(sectionData, sectionId) {
    let index = sectionId.substring(11, sectionId.length)
    switch (sectionId.substring(0, 10)) {
      case "ad6f29dc03"://新手专区
      case "be3902d104"://热销保险
      case "42a75a4005"://基金理财
        return <GQHomeListHeaderComponent headerData={GQHomeData.productListData[index]}/>
        break;
      default:
        break;
    }
  }

  /**
   * 模拟刷新
   * @param end
   * @private
   */
  _onListRefersh(end) {
    this.refs.listView.beginRefresh();
    this.refreshState = "1";
    if (this.state.refreshIndex >= refreshArray.length - 1) {
      this.state.refreshIndex = 0;
    } else {
      this.state.refreshIndex = this.state.refreshIndex + 1;
    }
    let timer = setTimeout(() => {
      clearTimeout(timer);
      this.refreshData();
    }, 500);
  }

  /*******************************************列表************************************ */
  _renderListView() {
    return (
      <SwRefreshListView
        ref="listView"
        dataSource={this.state.ds.cloneWithRowsAndSections(this.state.data)}
        renderRow={(rowData, sectionID, rowId) =>
          this._renderRow(rowData, sectionID, rowId)
        }
        onRefresh={this._onListRefersh}
        // onScroll={e => {
        //   if (Platform.OS == 'ios') {
        //     if (e.nativeEvent.contentOffset.y > 10) {
        //       this.setState({
        //         scrollY: new Animated.Value(e.nativeEvent.contentOffset.y),
        //         isTopVisible: true
        //       });
        //     } else if (e.nativeEvent.contentOffset.y === 0) {
        //       refreshHeader = "下拉刷新";
        //       this.setState({
        //         scrollY: new Animated.Value(0),
        //         isTopVisible: false
        //       });
        //     }
        //     if (e.nativeEvent.contentOffset.y <= 0 && e.nativeEvent.contentOffset.y < (GQUtils.getIsIphoneX() ? -120 : -50)) {
        //       if (refreshArray.length > 0) {
        //         refreshHeader = refreshArray[this.state.refreshIndex];
        //       } else {
        //         refreshHeader = "下拉刷新";
        //       }
        //     }
        //     if (e.nativeEvent.contentOffset.y <= 0 && e.nativeEvent.contentOffset.y < (GQUtils.getIsIphoneX() ? -160 : -120)) {
        //
        //       if (refreshArray.length > 0) {
        //         refreshHeader = refreshArray[this.state.refreshIndex];
        //       } else {
        //         refreshHeader = "下拉刷新";
        //       }
        //     }
        //     if (e.nativeEvent.contentOffset.y <= 0 && e.nativeEvent.contentOffset.y < (GQUtils.getIsIphoneX() ? -180 : -180)) {
        //       if (refreshArray.length > 0) {
        //         refreshHeader = refreshArray[this.state.refreshIndex];
        //       } else {
        //         refreshHeader = "下拉刷新";
        //       }
        //     }
        //   } else {
        //     if (e.nativeEvent.contentOffset.y <= 250 * iPhone6sScale) {
        //       this.setState({
        //         scrollY: new Animated.Value(0),
        //         isTopVisible: false
        //       });
        //     } else {
        //       this.setState({
        //         scrollY: new Animated.Value(e.nativeEvent.contentOffset.y),
        //         isTopVisible: true
        //       });
        //     }
        //     if (e.nativeEvent.contentOffset.y <= 240 * iPhone6sScale && e.nativeEvent.contentOffset.y >= 0) {
        //       if (refreshArray.length > 0) {
        //         refreshHeader = refreshArray[this.state.refreshIndex];
        //       } else {
        //         refreshHeader = "下拉刷新";
        //       }
        //     }
        //   }
        // }}
        isShowLoadMore={false}
        pageSize={1}
        removeClippedSubviews={false}
        stickySectionHeadersEnabled={false} // section header 不悬浮
        renderFooter={this._listFooterView}
        renderSectionHeader={(sectionData, sectionId) => this._renderHeader(sectionData, sectionId)}
        // renderSeparator={this._renderSeperator}
        // customRefreshView={this.topIndicatorRender}
        // customRefreshViewHeight={240 * iPhone6sScale}
        // scrollEventThrottle={16}
      />
    );
  }

  /*********************************************** */
  render() {
    if (GQHomeData.productListCode == "0001" || GQHomeData.productListCode == "0005") {

      console.log('请求失败..............')
      return <GQExceptionView code={GQHomeData.productListCode} exceptionPress={this._getData}/>;

    } else if (GQHomeData.productListCode == "0000") {
      console.log('请求成功.......页面绘制结束.......')
      return (
        <View
          style={{
            backgroundColor: "#efefef",
          }}
        >
          {this._renderListView()}
        </View>
      );

    } else {
      console.log('请求中..............')
      return (
        <View
          style={{
            height: screenHeight - 64,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator
            style={[styles.centering, styles.gray]}
            color="#aa3300"
          />
        </View>
      )
    }
  }

  _listFooterView() {
    let footerView = (
      <View style={styles.footerViewStyle}>
        <View style={styles.footerTopItemViewStyle}>
          <Image style={styles.footerTopItemImageViewStyle} source={{uri: 'zjhjg'}}></Image>
          <GQCustomText style={styles.footerTopItemTextViewStyle}>证监会监管</GQCustomText>
        </View>
        <View style={styles.footerTopItem2ViewStyle}>
          <Image style={styles.footerTopItemImageViewStyle} source={{uri: 'jjxspz'}}></Image>
          <GQCustomText style={styles.footerTopItemTextViewStyle}>基金销售牌照</GQCustomText>
        </View>
        <View style={styles.footerTopItem3ViewStyle}>
          <Image style={styles.footerTopItemImageViewStyle} source={{uri: 'msyhtg'}}></Image>
          <GQCustomText style={styles.footerTopItemTextViewStyle}>民生银行托管</GQCustomText>
        </View>
      </View>
    )
    let footerLayoutView = (
      <View style={{flexDirection: 'column'}}>
        {footerView}
        <GQListFooterTextView/>
      </View>
    )
    return footerLayoutView;
  }

  topIndicatorRender() {
    let icon = require('../../../images/homerefresh.gif')
    return (
      <View
        style={{
          height: 240 * iPhone6sScale,
          alignItems: "center",
          justifyContent: "flex-end",

        }}
      >
        <GQCustomText
          style={{
            marginTop: 30 * iPhone6sScale,
            color: "#999999",
            fontSize: 22 * iPhone6sScale,
            alignSelf: "center"
          }}
        >
          {refreshHeader}
        </GQCustomText>
        <Image
          source={icon}
          style={{
            width: 407 * iPhone6sScale,
            height: 164 * iPhone6sScale,
            marginBottom: 0
          }}
        />
      </View>
    );
  }

  _renderSeperator() {
    return (
      <View
        style={{
          height: 1 * iPhone6sScale,
          backgroundColor: '#e5e5e5',
          marginLeft: 30 * iPhone6sScale,
          marginRight: 30 * iPhone6sScale,
        }}
      />
    );
  }

  clickCloseNoticeView() {
    this.setState({
      isShowNoticesView: !this.state.isShowNoticesView
    });
  }
}

const styles = StyleSheet.create({
  // contentContainer: {
  //   height: screenHeight,
  //   backgroundColor: "#efefef"
  // },
  // container: {
  //   //导航栏下view 从上到下分布
  //   flexDirection: "column"
  // },
  footerTopItemViewStyle: {
    flexDirection: 'column',
    height: 144 * iPhone6sScale,
    marginTop: 30 * iPhone6sScale,
    marginBottom: 30 * iPhone6sScale,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    marginLeft: 30 * iPhone6sScale,

  },
  footerTopItem2ViewStyle: {
    flexDirection: 'column',
    height: 144 * iPhone6sScale,
    marginTop: 30 * iPhone6sScale,
    marginBottom: 30 * iPhone6sScale,
    marginLeft: 21 * iPhone6sScale,
    marginRight: 21 * iPhone6sScale,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F3F3F3'
  },
  footerTopItem3ViewStyle: {
    flexDirection: 'column',
    height: 144 * iPhone6sScale,
    marginTop: 30 * iPhone6sScale,
    marginBottom: 30 * iPhone6sScale,
    marginRight: 30 * iPhone6sScale,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F3F3F3'
  },
  footerViewStyle: {
    backgroundColor: "#FFFFFF",
    flexDirection: 'row',
    marginTop: 20 * iPhone6sScale,
  },
  footerTopItemImageViewStyle: {
    height: 76 * iPhone6sScale,
    width: 76 * iPhone6sScale,
    marginTop: 14 * iPhone6sScale,
  },
  footerTopItemTextViewStyle: {
    fontSize: 24 * iPhone6sScale,
    color: "#666666",
    fontWeight: 'bold',
    marginTop: 10 * iPhone6sScale,
    marginBottom: 20 * iPhone6sScale
  },
  centering: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8
  },
  gray: {
    backgroundColor: "#FFFFFF"
  }
});
