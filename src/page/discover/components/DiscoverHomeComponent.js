/**
 * Created by lilang on 2018-09-30.
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, SectionList, Alert} from 'react-native';
import ListItem from './DiscoverListItem';
import SectionHeader from './DiscoverHomeSectionHeader';
import ReadMoreView from './ReadMoreButtonView';
import TopSwiperItem from './DiscoverHomeTopSwiperItem';
import TopSwiper from './DiscoverHomeTopSwiper';
import GQUntil, {ScaleValue} from '../../../utils/GQUtils';
import GQListFooterTextView from "../../../common/GQListFooterTextView";
import GQSwiperView from './GQSwiperView';
import {Navigation} from "react-native-navigation/lib/dist/index";
import {GQScreenNames} from "../../screens/GQScreenNames";
import GQBaseComponent from "../../../common/GQBaseComponent";
import {GQAppMananger} from "../../../utils/GQAppManager";
import {GQHTMLConfig} from "../../../config/GQHTMLConfig";

export default class DiscoverHomeComponent extends GQBaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [{title: '1', data: ['item1']},
        {
          title: '理财学堂',
          data: [{title: '公募基金20年 改革永远在路上', image: 'lcxt01'},
            {title: '可以越跌越买的基金 到底有没有？', image: 'lcxt02'},
            {title: '巴菲特、索罗斯、彼得·林奇：这些投资大师都有共同点！', image: 'lcxt03'}]
        },
        {
          title: '热门资讯',
          data: [{title: '公募穿越牛熊不悲情：王者东方红平均收益43.84%', image: 'rmzx01'},
            {title: '瞄准国企改革机遇 多家基金布局相关ETF', image: 'rmzx02'},
            {title: '国泰君安李少君：“金秋行情”已经到来 把握反击机会', image: 'rmzx03'}]
        }
      ]
    };

    // this.state = {
    //   dataSource:[{title: '1', data: ['item1']}, {title: '2', data: ['item1']},
    //     {
    //       title: '理财学堂',
    //       data: [{title: '公募基金20年 改革永远在路上', image: 'lcxt01'},
    //         {title: '可以越跌越买的基金 到底有没有？', image: 'lcxt02'},
    //         {title: '巴菲特、索罗斯、彼得·林奇：这些投资大师都有共同点！', image: 'lcxt03'}]
    //     },
    //     {
    //       title: '热门资讯',
    //       data: [{title: '公募穿越牛熊不悲情：王者东方红平均收益43.84%', image: 'rmzx01'},
    //         {title: '瞄准国企改革机遇 多家基金布局相关ETF', image: 'rmzx02'},
    //         {title: '国泰君安李少君：“金秋行情”已经到来 把握反击机会', image: 'rmzx03'}]
    //     }
    //   ]
    // };
  }

  componentDidAppear() {
  }

  static options(passProps) {
    return {
      topBar: {
        title: {text: '发现'},
        rightButtons: [
          {
            id: 'msg',
            component: {
              name: 'navigationMessage',
              passProps: {source: 'discoverHome'}
            }
          }
        ]
      }
    };
  }

  render() {
    return (
      <SectionList
        style={styles.container}
        renderItem={this._renderItem}
        renderSectionHeader={this._renderSectionHeader}
        renderSectionFooter={this._renderSectionFooter}
        stickySectionHeadersEnabled={false}
        ItemSeparatorComponent={this._renderSeparator}
        ListFooterComponent={this._footerView}
        sections={this.state.dataSource}
      />
    );
  }

  _renderItem = ({item, index, section}) => {
    if (section.title === '1') {
      return <TopSwiper onPress={this._topSwiperAction}/>;
    } else if (section.title === '2') {
      let imageUrls = [{imageUrl: 'https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=3b44ffc10746f21fd6345853c6256b31/8c1001e93901213f5480ffe659e736d12f2e955d.jpg'},
        {imageUrl: 'https://ss3.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=1f7674f69425bc31345d07986edf8de7/8694a4c27d1ed21b3c778fdda06eddc451da3f4f.jpg'}];
      return <GQSwiperView imageUrls={imageUrls} style={{height: ScaleValue(200)}}/>
    } else {

      return <ListItem style={{height: ScaleValue(210)}} data={item}
                       onPress={this._listItemAction.bind(this, section, item, index)}/>
    }
  };

  _renderSectionHeader = ({section: {title}}) => {
    if (title === '1' || title === '2') {
      return <View></View>
    } else {
      let icon = title === '理财学堂' ? 'lcxt' : 'rmzx';
      return <SectionHeader icon={icon} title={title} style={{height: ScaleValue(80), backgroundColor: 'white'}}/>
    }
  };

  _renderSectionFooter = ({section: {title}}) => {
    if (title === '1' || title === '2') {
      return <View style={{height: ScaleValue(20), backgroundColor: '#EFEFEF'}}/>
    } else {
      return <ReadMoreView style={{height: ScaleValue(104)}} title={title} onPress={this._readerMoreAction}/>
    }

  }

  //ItemSeparatorComponent
  _renderSeparator = () => {
    return (
      <View style={{backgroundColor: 'white'}}>
        <View style={{marginLeft: ScaleValue(30), height: ScaleValue(1), backgroundColor: '#E5E5E5'}}/>
      </View>
    );
  }

  _footerView = () => (
    <GQListFooterTextView/>
  );

  // ------action------

  _topSwiperAction = (item, index) => {
    this._pushDetailWebView('', 'tb', index);
  }

  _listItemAction = (section, item, index) => {

    let titleType = section.title === '理财学堂' ? 'lcxt' : 'rmzx';
    this._pushDetailWebView(section.title, titleType, index)
  }

  _readerMoreAction = (title) => {
    // Alert.alert(title);
    let url = title === '理财学堂' ? 'financing' : 'information';
    this._pushWebView(title, url);
  }

  _pushDetailWebView = (title, type, index) => {
    let url = `${GQAppMananger.getHTMLUrl()}/detailspage?title=${type}&id=${index}`;
    this._pushWebView(title, url)
  }

  _pushWebView = (title, url) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: GQScreenNames.webview,
        passProps: {
          title: title,
          url: url,
        },
        options: {
          bottomTabs: {
            visible: false,
            animate: true,
          },
        }
      },
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee'
  },
});