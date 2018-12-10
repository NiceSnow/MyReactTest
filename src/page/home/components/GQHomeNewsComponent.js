import React, { Component } from 'react'
import {
    View,
    Image,
    TouchableOpacity,
    Platform,
    NativeModules
} from 'react-native'


let iPhone6sScale = GQUtils.getAutoScaleIPhone6s();
import GQUtils from "../../../utils/GQUtils";
import GQNativeBridgeModule from "../../../utils/GQNativeBridgeModule";
import GQHomeConstants from "../constants/GQHomeConstants";
import GQCustomText from '../../../common/customText/GQCustomText'
export default class GQHomeNoticeView extends Component {

    constructor(props) {
        super(props)
    }

    /** 点击公告*/
    _clickToWebView(urlString) {

    }

    render() {
        if(!!this.props.newsDataArray){
            let aaa = this.props.newsDataArray.map((item, index) => {
                return (
                    <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                        <View
                            style={{ height: 1 * iPhone6sScale, backgroundColor: '#e5e5e5',marginLeft: 30 * iPhone6sScale, marginRight: 30 *iPhone6sScale, }} />
                        <TouchableOpacity
                            style={{ height: 186 * iPhone6sScale, flexDirection: "row", paddingLeft: 40 * iPhone6sScale, paddingBottom: 30 * iPhone6sScale, paddingRight: 40 * iPhone6sScale, paddingTop: 30 * iPhone6sScale }}
                            onPress={() => this._clickToWebView(item.linkUrl)}>
                            <View style={{ flexDirection: "column", flex: 1 ,justifyContent : 'center'}}>
                                <View>
                                    <GQCustomText style = {{ color:'#333333' }} >{item.title}</GQCustomText>
                                </View>
                                <View style={{ marginTop: 50 * iPhone6sScale}}>
                                    <GQCustomText style = {{fontSize : 24 * iPhone6sScale, color : '#999999'}}>{item.publishTime}</GQCustomText>
                                </View>
                            </View>
                            <View style={{ flexDirection: "column", marginRight: 10,marginLeft : 20 * iPhone6sScale }}>
                                <Image
                                    source={{ uri: item.imgPath }}
                                    style={{ width: 195 * iPhone6sScale, height: 126 * iPhone6sScale }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            });
            return <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}>{aaa}</View>;
        }
        return <View></View>;
    }
}
