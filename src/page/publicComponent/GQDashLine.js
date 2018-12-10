import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

import GQUtils from '../../utils/GQUtils';
import  GQCustomText from '../../common/customText/GQCustomText'
let iPhone6sScale = GQUtils.getAutoScaleIPhone6s();
let screenWidth = GQUtils.getScreenWidth();

/*水平方向的虚线 
 * len 虚线个数 
 * width 总长度 
 * backgroundColor 背景颜色 
 * */
export default class GQDashLine extends Component {
    render() {
        var len = (screenWidth - 120 * iPhone6sScale) / (20 * iPhone6sScale) + 1;
        var arr = [];
        for (let i = 0; i < len; i++) {
            arr.push(i);
        }
        return <View style={styles.dashLine}>
            {
                arr.map((item, index) => {
                    return <GQCustomText style={styles.dashItem}
                        key={'dash' + index}> </GQCustomText>
                })
            }
        </View>
    }
}
const styles = StyleSheet.create({
    dashLine: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 40 * iPhone6sScale,
        paddingRight: 40 * iPhone6sScale,
    },
    dashItem: {
        height: 2 * iPhone6sScale,
        width: 10 * iPhone6sScale,
        marginRight: 10 * iPhone6sScale,
        backgroundColor: '#E5E5E5',
    }
}) 