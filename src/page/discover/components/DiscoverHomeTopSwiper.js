/**
 * Created by lilang on 2018-09-30.
 */

import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList} from 'react-native';
import GQUntil,{ScaleValue} from '../../../utils/GQUtils';
import DiscoverHomeTopSwiperItem from "./DiscoverHomeTopSwiperItem";

export default class DiscoverHomeTopSwiper extends Component {


  _renderRow = ({item,index})=>(
    <DiscoverHomeTopSwiperItem
      backgroundImage={item.background}
      index={index}
      title={item.title}
      onPress={this.props.onPress.bind(this,item,index)}
    />
  );

  _keyExtractor = item => item.id;

  _renderFooter = ()=>(
    <View style={{width:ScaleValue(31),height:ScaleValue(31)}} />
  );

  render(){
    return (
      <View style={{ backgroundColor:'#FFFFFF'}}>
        <FlatList
          data={[{id:'1',background:'discover_zs',title:'李克强：中国决不会走靠人民币贬值刺激出口的路',subTitle:'11111111'},
            {id:'2',background:'discover_ls',title:'李克强：正研究明显降低企业税费负担的政策',subTitle:'11111111'},
            {id:'3',background:'discover_js',title:'A股1305家上市公司有投资性房地产上市公司为何热衷买房？',subTitle:'11111111'}]}
          renderItem={this._renderRow}
          keyExtractor={this._keyExtractor}
          horizontal={true}
          ListFooterComponent={this._renderFooter}
          showsHorizontalScrollIndicator={false}
          style={{marginTop:ScaleValue(30),marginBottom:ScaleValue(30),}}
        />
      </View>
    );
  }
}