import React, { Component } from 'react';
import { View, Text,StyleSheet,Image} from 'react-native';
import GQUtils from "../../../utils/GQUtils";
import GQCustomText from '../../../common/customText/GQCustomText';
let iPhone6sScale = GQUtils.getAutoScaleIPhone6s();
let screenWidth = GQUtils.getScreenWidth();
export default class GQFooterListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
      //证监会监管 基金销售牌照 民生银行托管
      let list=this.props.footerListDataArray;
    if(!!list){
        let footerView=<View style={styles.footerViewStyle}>
        <View style={styles.footerTopItemViewStyle}>
        <Image style={styles.footerTopItemImageViewStyle} source={{uri:list[0].imgPath}}></Image>
        <GQCustomText style={styles.footerTopItemTextViewStyle}>{list[0].title}</GQCustomText>
        </View>
        <View  style={styles.footerTopItem2ViewStyle}>
        <Image style={styles.footerTopItemImageViewStyle} source={{uri:list[1].imgPath}}></Image>
        <GQCustomText style={styles.footerTopItemTextViewStyle}>{list[1].title}</GQCustomText>
        </View>
        <View style={styles.footerTopItem3ViewStyle}>
        <Image style={styles.footerTopItemImageViewStyle} source={{uri:list[2].imgPath}}></Image>
        <GQCustomText style={styles.footerTopItemTextViewStyle}>{list[2].title}</GQCustomText>
        </View>
        </View>

        return <View>{footerView}</View>
    }else{
        return <View></View>;
    }
   
  }
}
const styles = StyleSheet.create({
    footerTopItemViewStyle: {
        flexDirection: 'column',
        height: 144 * iPhone6sScale,
        marginTop:30*iPhone6sScale,
        marginBottom:30*iPhone6sScale,
        justifyContent: 'center',
        flex: 1,
        alignItems:'center',
        backgroundColor:'#F3F3F3',
        marginLeft: 30 * iPhone6sScale,
       
      },
      footerTopItem2ViewStyle: {
        flexDirection: 'column',
        height: 144 * iPhone6sScale,
        marginTop:30*iPhone6sScale,
        marginBottom:30*iPhone6sScale,
        marginLeft:21*iPhone6sScale,
        marginRight:21*iPhone6sScale,
        justifyContent: 'center',
        flex: 1,
        alignItems:'center',
        backgroundColor:'#F3F3F3'
      },
      footerTopItem3ViewStyle: {
        flexDirection: 'column',
        height: 144 * iPhone6sScale,
        marginTop:30*iPhone6sScale,
        marginBottom:30*iPhone6sScale,
        marginRight:30*iPhone6sScale,
        justifyContent: 'center',
        flex: 1,
        alignItems:'center',
        backgroundColor:'#F3F3F3'
      },
      footerViewStyle: {
        backgroundColor: "#FFFFFF",
        flexDirection: 'row',
      },
      footerTopItemImageViewStyle: {
        height: 76 * iPhone6sScale,
        width: 76 * iPhone6sScale,
        marginTop:14*iPhone6sScale,
      },
      footerTopItemTextViewStyle: {
          fontSize: 24 * iPhone6sScale,
          color: "#666666",
          fontWeight: 'bold',
          marginTop:10*iPhone6sScale,
          marginBottom:20*iPhone6sScale
      },
});