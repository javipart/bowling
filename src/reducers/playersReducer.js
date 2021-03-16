import { ACTIONS, initialState } from '../models/constants';

export default (state = initialState.players, action = {}) => {
  let players;
  switch (action.type) {
    case ACTIONS.PLAYERS.SET_PLAYERS:
      players = state.selected;
      players[action.data.id] = action.data.value;
      return { ...state, selected: players };
    default:
      return state;
  }
};
