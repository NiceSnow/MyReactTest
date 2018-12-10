/**
 * Created by lilang on 2018-09-30.
 */

import GQDispatcher from '../../../common/dispatcher/GQDispatcher'
import MyConstants from '../constants/MyConstants'
import MyHomeStores from "../stores/MyHomeStores";

GQDispatcher.register((action) => {
  switch (action.actionType) {
    case MyConstants.requestMyHomeData: {

      MyHomeStores.addTempResponse(action.response);
      MyHomeStores.emitCustomListener(MyConstants.requestMyHomeData);
    }
      break;
    case 'logout': {

    }
      break;
    case MyConstants.requestMineDetail: {
      MyHomeStores.addTempResponse(action.response);
      MyHomeStores.emitCustomListener(MyConstants.requestMineDetail);
    }
      break;
  }
})