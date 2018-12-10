/**
 * Created by lilang on 2018-09-30.
 */

import React, {Component} from 'react';
import {Text, View, ImageBackground, TouchableOpacity, StyleSheet} from 'react-native';
import GQUntil, {ScaleValue} from '../../../utils/GQUtils';
import GQCustomText from '../../../common/customText/GQCustomText';

export default class MyHomeProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    if (this.props.islogin) {
      // let itemData = [{key:1,title:'活期宝',bg:'lanse',future:false},
      //   {key:2,title:'基金',bg:'hongse',future:false},
      //   {key:4,title:'',bg:'lansewu',future:true}];
      let productItems = [];
      if (this.props.data && this.props.data.length > 0) {
        let itemData = this.props.data;
        let bgArr = ['lanse', 'hongse', 'huangse', 'lanse', 'hongse', 'huangse']
        productItems = itemData.map((item, index) => (
          <MyHomeProductItem
            key={index}
            background={bgArr[index % 3]}
            // future={item.future}
            data={item}
            secure={this.props.secure}
          />)
        );
      }
      productItems.push(<MyHomeProductItem key={'future'} future={true}/>)
      return (
        <View style={styles.container}>
          {productItems}
          {productItems && productItems.length % 2 === 1 &&
          <View style={{
            width: ScaleValue(330),
            height: ScaleValue(255),
            marginTop: ScaleValue(30)
          }}/>
          }
        </View>
      )
    } else {
      let productItems = [];
      let bgArr = ['lansex', 'jusex', 'chengsex']
      if (this.props.data && this.props.data.length > 0) {
        let itemData = this.props.data;
        productItems = itemData.map((item, index) => (
          <MyHomeNoLoginProductView
            key={index}
            background={bgArr[index % 3]}
            // future={item.future}
            title={item.productName}
            subTitle={item.productDes}
            secure={this.props.secure}
          />)
        );
      }
      productItems.push(<MyHomeNoLoginProductView background={bgArr[productItems.length % 3]} title={'更多精彩'} subTitle={'敬请期待'}/>)
      return (
        <View style={styles.container}>
          {productItems}
          {productItems && productItems.length % 2 === 1 &&
            <View style={{width: ScaleValue(330), height: ScaleValue(120), marginTop: ScaleValue(30) }}/>
          }
        </View>
      )
    }
  }
}

// 产品view
class MyHomeProductItem extends Component {
  render() {
    let newMoneyText = '99.80';
    let totalMoneyText = '9999.81';
    let title = '产品名称'
    if (this.props.data) {
      title = this.props.data.productName;
      newMoneyText = this.props.data.latestEarnings;
      totalMoneyText = this.props.data.totalAssets;
    }

    if (this.props.secure) {
      newMoneyText = '****';
      totalMoneyText = '****';
    }

    if (this.props.future) {
      //这个view是 更多精彩 敬请期待
      return (
        <View style={styles.itemFutureView}>
          <ImageBackground source={{uri: 'lansewu'}} style={styles.itemFutureBgImage}>
            <GQCustomText style={styles.itemFutureText}>{`更多精彩\n敬请期待`}</GQCustomText>
          </ImageBackground>
        </View>
      )
    } else {
      return (
        <View style={{width: ScaleValue(330), height: ScaleValue(255), marginTop: ScaleValue(30)}}>
          <TouchableOpacity>
            <ImageBackground source={{uri: this.props.background}} style={{width: '100%', height: '100%'}}>
              <GQCustomText style={styles.itemTitle}>{title}</GQCustomText>
              <View style={{marginLeft: ScaleValue(23), marginTop: ScaleValue(40),}}>
                <GQCustomText style={styles.itemEarningValue}>{newMoneyText}</GQCustomText>
                <GQCustomText style={styles.itemEarningText}>最新收益</GQCustomText>
                <View style={styles.itemTotalView}>
                  <GQCustomText style={styles.itemTotalText}>投资总额</GQCustomText>
                  <GQCustomText style={styles.itemTotalValue}>{totalMoneyText}</GQCustomText>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      )
    }
  }
}

// 未登录状态下的产品view
class MyHomeNoLoginProductView extends Component {

  static defaultProps = {
    title:'标题',
    subTitle:'副标题',
    background: 'lansege'
  }

  render() {
    let content = (
      <ImageBackground source={{uri: this.props.background}} style={{width: '100%', height: '100%'}}>
        <View style={{marginLeft: ScaleValue(30), marginTop: ScaleValue(26), justifyContent: 'space-between'}}>
          <GQCustomText style={styles.noLoginItemTitle}>{this.props.title}</GQCustomText>
          <GQCustomText style={[styles.noLoginItemSubTitle, {marginTop: ScaleValue(14)}]}>{this.props.subTitle}</GQCustomText>
        </View>
      </ImageBackground>
    )

    if (this.props.onPress) {
      return (
        <TouchableOpacity style={styles.noLoginItemContainer}>
          {content}
        </TouchableOpacity>
      )
    } else {
      return (
        <View style={styles.noLoginItemContainer}>
          {content}
        </View>
      )
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFFFF',
    paddingBottom: ScaleValue(50),
  },
  itemTitle: {
    fontSize: ScaleValue(28),
    color: '#2257BB',
    marginTop: ScaleValue(12),
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  itemEarningText: {
    fontSize: ScaleValue(22),
    color: '#FFFFFF',
    marginTop: ScaleValue(15),
  },
  itemEarningValue: {
    fontSize: ScaleValue(40),
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  itemTotalView: {
    flexDirection: 'row',
    // justifyContent:'center'
    alignItems: 'center',
    marginTop: ScaleValue(32),
  },
  itemTotalText: {
    fontSize: ScaleValue(22),
    color: '#FFFFFF',

  },
  itemTotalValue: {
    fontSize: ScaleValue(24),
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: ScaleValue(4),
  },
  itemFutureView: {
    width: ScaleValue(330),
    height: ScaleValue(255),
    marginTop: ScaleValue(30)
  },
  itemFutureBgImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemFutureText: {
    fontSize: ScaleValue(28),
    color: '#FFFFFF',
    lineHeight: ScaleValue(40)
  },
  noLoginItemContainer: {
    width: ScaleValue(330),
    height: ScaleValue(120),
    marginTop: ScaleValue(30),
  },
  noLoginItemTitle: {
    fontSize: ScaleValue(30),
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  noLoginItemSubTitle: {
    fontSize: ScaleValue(24),
    color: '#FFFFFF',
  }
});