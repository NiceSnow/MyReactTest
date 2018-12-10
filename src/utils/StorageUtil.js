import { AsyncStorage } from 'react-native';


export default class StorageUtil {

  /**
   * 保存一个Json对象
   * @param key
   * @param value
   * @param callback
   */
  static saveJsonObject(key, value) {

    AsyncStorage.setItem(key, value, (error) => {
      if (!error) {
        return value
      } else {
      }
    })
  }

  //查询保存的数据
  static getJsonObject(key, callback) {
    AsyncStorage.getItem(key, (error, result) => {
      if (!error) {
        if (result !== '' && result !== null) {
          return result
        }
      }
    }).then(ret => {
      callback(ret)
    })
  }

  /**
   * 移除一个值
   * @param key
   */
  static remove(key) {
    AsyncStorage.removeItem(key, (error) => {
      if (!error) {
      } else {
      }
    })
  }

  loadStorage(key){

  }
}