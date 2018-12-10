import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,TouchableOpacity,TextInput,FlatList} from 'react-native';
import GQUtils from "../../utils/GQUtils";
import {Navigation} from 'react-native-navigation';
import SearchItemView from '../search/SearchItemView';
let iPhone6sScale = GQUtils.getAutoScaleIPhone6s();
let screenWidth = GQUtils.getScreenWidth();
var name= [
  {key: '国泰估值优势'},
  {key: '中海医疗保健'},
  {key: '大成短融债券'},
  {key: '国泰估值优势'},
  {key: '工银'},
  {key: 'Jillian'},
  {key: 'Jimmy'},
  {key: 'Julie'},
]
var localName= [
  {key: '160212'},
  {key: '160'},
  {key: '工银'},
  {key: '南方天天利'},
  {key: '工银货币A'},
  {key: 'Jillian'},
  {key: 'Jimmy'},
  {key: 'Julie'},
]
export default class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text:'',
      searchText:'',
    };
   
  }
  static options(passProps) {
    return {
      topBar: {
        // title: {
        //   text: ''
        // },
         // drawBehind: true,
         visible: false,
         // animate: false
      }
    };
  }
msg(){
  alert('消息')
}
itemClick(item){
  alert(item.key)
}
searchListener(event){
  //alert(event)
  this.setState({
    //text:event,
    searchText:event,
  })
}
  _renderItem=({item})=>{
    return <SearchItemView item={item}/>
  }
  render() {
    let searchLayout;
    if(this.state.text!=''&&this.state.searchText!=''){
      searchLayout= <View style={styles.contentContainer}>
      <FlatList
         data={localName}
         renderItem={this._renderItem}
       />
       </View>
    }else{
      let searchListView=name.map((item,index)=>{return(
        <View style={{marginLeft:20*iPhone6sScale,marginBottom:20*iPhone6sScale, borderColor:'#e5e5e5',borderWidth:2*iPhone6sScale,alignItems:'center',paddingLeft:15*iPhone6sScale,
        paddingRight:15*iPhone6sScale,paddingTop:10*iPhone6sScale,paddingBottom:10*iPhone6sScale}}>
          <Text style={{fontSize:24*iPhone6sScale,color:'#666666'}} onPress={()=>{this.itemClick(item)}}>
            {item.key}
          </Text>
        </View>
      )});
      let localSearchListView=localName.map((item,index)=>{return(
        <View style={{marginLeft:20*iPhone6sScale,marginBottom:20*iPhone6sScale, borderColor:'#e5e5e5',borderWidth:2*iPhone6sScale,alignItems:'center',paddingLeft:15*iPhone6sScale,
        paddingRight:15*iPhone6sScale,paddingTop:10*iPhone6sScale,paddingBottom:10*iPhone6sScale}}>
          <Text style={{fontSize:24*iPhone6sScale,color:'#666666'}} onPress={()=>{this.itemClick(item)}}>
            {item.key}
          </Text>
        </View>
      )});
      searchLayout=<View>
      <Text style={{fontSize:30*iPhone6sScale,color:'#333333',marginLeft:30*iPhone6sScale,marginTop:30*iPhone6sScale}}>大家都在搜</Text>
           <View style={styles.searchListViewStyle}>{searchListView}</View>
           <Text style={{fontSize:30*iPhone6sScale,color:'#333333',marginLeft:30*iPhone6sScale,marginTop:60*iPhone6sScale}}>搜索历史</Text>
           <View style={styles.searchListViewStyle}>{localSearchListView}</View>
         </View>
  }
    return (
      <View style={styles.contentContainer}>
      <View style={styles.container}>
        <View style={styles.searchViewLayoutStyle} >
     
      <View style={styles.leftViewStyle}>
      <Image source={{uri:'fdj'}} style={{marginLeft: 20*iPhone6sScale,width:28*iPhone6sScale,height:28*iPhone6sScale}}></Image>
        <TextInput style={{marginLeft:10*iPhone6sScale, height:68*iPhone6sScale,fontSize: 18*iPhone6sScale,flex:1,textAlign:'left'}}
      returnKeyType="search"
      placeholder="基金"
      placeholderTextColor='#999999'
      multiline={false}
      underlineColorAndroid={'transparent'}
      maxLength={10}
      onChangeText={(text) => this.setState({text})}
      onSubmitEditing={(event)=>{this.searchListener(event.nativeEvent.text)}}
         />
        </View>
        <Image source={{uri:'gb'}} style={{marginRight: 20*iPhone6sScale,width:31*iPhone6sScale,height:31*iPhone6sScale}}></Image>
    
      
      </View>
      <Text  style={{marginLeft:20*iPhone6sScale,fontSize:24*iPhone6sScale,color:'#666666', marginRight: 30*iPhone6sScale}} onPress={()=>{this.msg()}}>取消</Text>
      </View>
      {searchLayout}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  contentContainer:{

    flexDirection: 'column',
    backgroundColor:'#FFFFFF',
    // backgroundColor:'red',
  },
    container:{
      flexDirection: 'row',
      backgroundColor:'#FFFFFF',
      alignItems: 'center',
     
    },
    searchViewLayoutStyle:{
      flex: 1,
      flexDirection: 'row',
      height:68*iPhone6sScale,
      backgroundColor:'#F3F3F3',
      borderRadius: 4*iPhone6sScale,
      borderWidth: 1*iPhone6sScale,
      borderColor: '#F3F3F3',
      marginLeft:30*iPhone6sScale,
      marginTop: 20*iPhone6sScale,
      alignItems: 'center',
      justifyContent:'space-between',
      marginBottom: 20*iPhone6sScale,
    },
    leftViewStyle:{
      flexDirection: 'row',
      alignItems: 'center',
      flex:1,
    },
    searchListViewStyle:{
      flexDirection: "row",
      flexWrap: 'wrap',
     //justifyContent: 'space-between',
     marginTop:40*iPhone6sScale,
     marginLeft:10*iPhone6sScale,
     marginRight:50*iPhone6sScale,
    },
  
});
