import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

var GQStorage = new Storage({
  size:1000,
  storageBackend:AsyncStorage,
  defaultExpires:null,

})

global.GQStorage = GQStorage;