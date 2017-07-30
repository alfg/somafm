import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import player from './player';
import channels from './channels';

const rootReducer = combineReducers({
  player,
  channels,
  routing
});

export default rootReducer;
