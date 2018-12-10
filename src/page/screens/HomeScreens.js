/**
 * Created by lilang on 2018-09-30.
 */


import {Navigation} from "react-native-navigation/lib/dist/index";
import GQHomeMain from '../home/components/HomeComponent';
import Search from '../search/SearchComponent';
import {GQScreenNames} from "./GQScreenNames";

export function homeRegisterScreens() {
  Navigation.registerComponent(GQScreenNames.homeMain,()=>GQHomeMain);
  Navigation.registerComponent(GQScreenNames.search,()=>Search);
}
