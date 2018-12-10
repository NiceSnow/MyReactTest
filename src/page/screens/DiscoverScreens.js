/**
 * Created by lilang on 2018-09-30.
 */

import {Navigation} from "react-native-navigation/lib/dist/index";
import DiscoverListComponent from "../discover/components/DiscoverListComponent";
import DiscoverHomeComponent from "../discover/components/DiscoverHomeComponent";
import {GQScreenNames} from "./GQScreenNames";


export function discoverRegisterScreens() {
  Navigation.registerComponent(GQScreenNames.discoverHome, () => DiscoverHomeComponent);
  Navigation.registerComponent(GQScreenNames.discoverList, () => DiscoverListComponent);
}
