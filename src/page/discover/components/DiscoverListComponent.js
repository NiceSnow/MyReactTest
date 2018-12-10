/**
 * Created by lilang on 2018-09-30.
 */

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PageListView from 'react-native-page-listview';
import {
  SwRefreshListView,
  RefreshStatus, //刷新状态 用于自定义
  LoadMoreStatus //上拉加载状态 用于自定义
} from '../../../common/swRefreshList';
import {ScaleValue} from "../../../utils/GQUtils";
import ListItem from './DiscoverListItem';
import GQCustomText from '../../../common/customText/GQCustomText';


export default class DiscoverListComponent extends Component {
  constructor(props) {
    super(props);
    const ds = new SwRefreshListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3', 'row 4', 'row 5', 'row 5', 'row 5', 'row 5', 'row 5', 'row 5']),
    };
  }

  static options(passProps) {
    return {
      topBar: {
        // title: {
        //   text: passProps.navTitle,
        // }
      }
    }
  }

  _renderRow=(item)=>(
    <View>
      <GQCustomText>4546546464</GQCustomText>
      <GQCustomText>4546546464</GQCustomText>
      <GQCustomText>4546546464</GQCustomText>
    </View>
  );

  _onRefresh=(end)=>{
    let timer = setTimeout(()=>{
      clearTimeout(timer);
      end();
    },2000);

  }

  _onLoadMore=(end)=>{
    let timer = setTimeout(()=>{
      clearTimeout(timer);
      // end(true);
      this.listView.endLoadMore();
    },2000);
  }

  render() {
    return (
      <SwRefreshListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        onRefresh={this._onRefresh}
        onLoadMore={this._onLoadMore}
        ref={(listView)=>{this.listView=listView}}
      />
    )
  }
}