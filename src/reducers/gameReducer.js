import { ACTIONS, initialState } from '../models/constants';

export default (state = initialState.game, action = {}) => {
  let players;
  switch (action.type) {
    case ACTIONS.GAME.START_GAME:
      return { ...state, players: action.data };
    default:
      return state;
  }
};
