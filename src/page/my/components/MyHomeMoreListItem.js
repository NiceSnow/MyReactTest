/**
 * Created by lilang on 2018-09-30.
 */

import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import GQCustomText from "../../../common/customText/GQCustomText";
import GQUtil, {ScaleValue} from "../../../utils/GQUtils";

export default class MyHomeMoreListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {
    showRightArrow:true,
    rightTitleColor:'#999999',
    userInteractionEnabled:true,
    title:'',
    subTitle:'',
  }

  _onPress = () => {
    // this.props.onPress&&this.props.onPress(this.props.index, this.props.section);
  }

  _leftImage = () => {
    if (this.props.image && this.props.image.length > 0) {
      return <Image source={{uri: this.props.image}} style={[styles.image,this.props.imageStyle]} resizeMode={'center'} overflow={false}/>
    }
    return null;
  }

  _rightArrowImage = () => {
    if (this.props.showRightArrow) {
      return <Image source={{uri: 'jiantou'}} style={styles.rightImage}/>
    }
    return null;
  }

  _contentView = ()=> {
    return {

    }
  }

  render() {
    let content = (
      <View style={[styles.container,this.props.style]}>
        {this._leftImage()}
        <GQCustomText style={[styles.text,this.props.titleStyle]}>{this.props.title}</GQCustomText>
        <GQCustomText style={[styles.rightText,{color:this.props.rightTitleColor}]}>{this.props.rightTitle}</GQCustomText>
        {this._rightArrowImage()}
      </View>
    );
    if (!this.props.userInteractionEnabled){
       return(
         <View>
           {content}
         </View>
       )
    }
    return (
      //可以这样绑定 onPress={this.props.onPress.bind(this,this.props.index,this.props.title)}
      <TouchableOpacity  onPress={this.props.onPress}>
        {content}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: 'center',
    height: ScaleValue(80),
    backgroundColor:'#FFFFFF',
  },
  image: {
    marginLeft: ScaleValue(30),
    width: ScaleValue(60),
    height: ScaleValue(60),
  },
  rightImage: {
    resizeMode:'center',
    marginRight: ScaleValue(30),
    width: ScaleValue(30),
    height: ScaleValue(30),
  },
  text: {
    flex: 1,
    fontSize: ScaleValue(30),
    color: '#333333',
    marginLeft: ScaleValue(35),
  },
  rightText: {
    fontSize: ScaleValue(24),
    // color: '#4AA8FD',
    marginRight: ScaleValue(20),
  },
});