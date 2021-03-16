import { combineReducers } from 'redux';

import players from './playersReducer';
import game from './gameReducer';

const reducersCombined = {
  players,
  game,
};

const reducerMix = combineReducers(reducersCombined);

export default reducerMix;