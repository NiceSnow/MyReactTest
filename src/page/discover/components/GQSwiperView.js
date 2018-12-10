/**
 * Created by lilang on 2018-09-30.
 */

import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import Swiper from 'react-native-swiper';


export default class GQSwiperView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    let items;
    if (this.props.imageUrls.length>0) {
      items = this.props.imageUrls.map((item,index)=>{
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={()=>{}} >
              <Image source={{uri:item.imageUrl}} style={{width:'100%',height:'100%'}} />
            </TouchableWithoutFeedback>
          )
        });
    } else {
      
    }

    return (
      <Swiper
        loop={true}
        autoplay={true}
        autoplayTimeout={2}
        index={0}
        paginationStyle={{bottom:8}}
        dotStyle={{backgroundColor:'#E5E5E5',opacity:0.4, width:5,height:5 }}
        activeDotStyle={{backgroundColor:'#FFFFFF', width:5,height:5}}
        style={this.props.style}
      >
        {items}
      </Swiper>
    );
  }
}
