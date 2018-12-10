/**
 * Created by lilang on 2018-09-30.
 */

import React, {Component} from 'react';
import KeyboardManager from 'react-native-keyboard-manager';
import {Navigation} from 'react-native-navigation'
import GQLoading from "../utils/GQLoading";

export default class GQBaseComponent extends Component {

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);

    if (!this.props.hideBack) {
      Navigation.mergeOptions(this.props.componentId, {
        topBar: {
          leftButtons: [
            {
              id: 'back',
              icon: require('../images/xzjt.png'),
              color: '#acacac',
            }
          ]
        }
      });
    }
  }

  // componentWillMount() {
  //
  // }

  static defaultProps = {
    hideBack: false
  }

  navigationButtonPressed({buttonId}) {
    if (buttonId === 'back') {
      Navigation.pop(this.props.componentId);
    }
  }

  componentDidMount() {
    // KeyboardManager.setShouldResignOnTouchOutside(true);
  }

  componentWillUnmount() {
    // GQLoading.hidden();
  }

}