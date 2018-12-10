/**
 * Created by lilang on 2018-09-30.
 */


import React, {Component} from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
  RefreshControl
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import GQCustomText from "../../../common/customText/GQCustomText";
import GQBaseComponent from "../../../common/GQBaseComponent";
import LoginRegisterActions from "../actions/LoginRegisterActions";
import LoginRegisterStores from "../stores/LoginRegisterStores";
import LoginRegisterConstants from "../constants/LoginRegisterConstants";

export default class BankListComponent extends GQBaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      listData: []
    };
  }

  static options() {
    return {
      topBar: {
        title: {
          text: '银行卡限额'
        }
      }
    };
  };

  componentWillMount() {
    LoginRegisterStores.addCustomListener(LoginRegisterConstants.findBankCardList, this.requestSupportBankListCallback)
    LoginRegisterActions.requestSupportBankList({});
  }

  componentWillUnmount() {
    LoginRegisterStores.removeCustomListener(LoginRegisterConstants.findBankCardList, this.requestSupportBankListCallback)
  }

  requestSupportBankListCallback = () => {
    let response = LoginRegisterStores.getTempResponse();
    this.setState({listData: response.data})
  }

  _onRefresh = () => {
    this.setState({refreshing: true});

  }

  _renderItem = ({item}) => (
    <BankListItem
      itemData={item}
      // onPressItem={this._onPressItem}
    />
  );

  _onPressItem = (id) => {
    Alert.alert(id);
    Navigation.push(this.props.componentId, {
      externalComponent: {
        name: 'test',
        // options:{
        //   bottomTabs: {
        //     visible: false,
        //     animate: true,
        //   },
        // }
      },
    });
  };

  // _footerView = ()=>(
  //   <View style={{marginBottom:-40,paddingTop:15}}>
  //     <Text>FooterView</Text>
  //   </View>
  // );

  _keyExtractor = item => item.id;

  render() {
    return (
      this.state.listData.length > 0 && <FlatList
        // data={[{id: '1', icon: 'gs', bankName: '工商银行', background: 'jb', bankLimit: '单笔xxx 单日xxx 单月xxx'},
        //   {id: '2', icon: 'ny', bankName: '农业银行', background: 'jhb', bankLimit: '单笔xxx 单日xxx 单月xxx'},
        //   {id: '3', icon: 'ny', bankName: '农业银行', background: 'jhb', bankLimit: '单笔xxx 单日xxx 单月xxx'},
        //   {id: '4', icon: 'ny', bankName: '农业银行', background: 'jhb', bankLimit: '单笔xxx 单日xxx 单月xxx'},
        //   {id: '5', icon: 'ny', bankName: '农业银行', background: 'jhb', bankLimit: '单笔xxx 单日xxx 单月xxx'},
        //   {id: '6', icon: 'ny', bankName: '农业银行', background: 'jhb', bankLimit: '单笔xxx 单日xxx 单月xxx'},
        //   {id: '7', icon: 'ny', bankName: '农业银行', background: 'jhb', bankLimit: '单笔xxx 单日xxx 单月xxx'},
        //   {id: '8', icon: 'ny', bankName: '农业银行', background: 'jhb', bankLimit: '单笔xxx 单日xxx 单月xxx'},
        //   {id: '9', icon: 'ny', bankName: '农业银行', background: 'jhb', bankLimit: '单笔xxx 单日xxx 单月xxx'},
        //   {id: '10', icon: 'ny', bankName: '农业银行', background: 'jhb', bankLimit: '单笔xxx 单日xxx 单月xxx'}]}
        data={this.state.listData}
        renderItem={this._renderItem}
        // ListFooterComponent={this._footerView}
        refreshControl={<RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />}

        keyExtractor={this._keyExtractor}
      />
    );
  }
}

class BankListItem extends Component {
  _onPress = () => {
    this.props.onPressItem(this.props.itemData.id);
  };

  render() {
    const {bankLogo, bankOrganizationCode, bankOrganizationName, singleLimit, singleDayLimit, singleMonthLimit} = this.props.itemData;
    let bankLimit = singleLimit + singleDayLimit + singleMonthLimit
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={this._onPress}>
          <ImageBackground source={{uri: 'jhb'}} style={{width: '100%', height: '100%'}} resizeMode={'contain'}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Image source={{uri: bankLogo}} style={styles.itemIcon}/>
              <View style={styles.itemRightTextView}>
                <GQCustomText style={styles.itemBankName}>{bankOrganizationName}</GQCustomText>
                {bankLimit.length>0&&<GQCustomText style={styles.itemLimitText}>{bankLimit}</GQCustomText>}
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    height: 73,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
  },
  itemIcon: {
    marginLeft: 21,
    alignSelf: 'center',
    width: 40,
    height: 40,
  },
  itemRightTextView: {
    flex: 1,
    marginLeft: 18,
    marginTop: 15,
    marginBottom: 15,
  },
  itemBankName: {
    // marginLeft:18,
    // marginTop:15,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  itemLimitText: {
    marginTop: 8,
    fontSize: 11,
    color: 'white',
  },
});