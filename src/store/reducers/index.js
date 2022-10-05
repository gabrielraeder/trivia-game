import { combineReducers } from 'redux';
import player from './player';
import settings from './settings';

const reducer = combineReducers({ player, settings });

export default reducer;
