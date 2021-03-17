import { ACTIONS, initialState } from '../models/constants';

export default (state = initialState.game, action = {}) => {
  let players;
  let morePlayers;
  switch (action.type) {
    case ACTIONS.GAME.START_GAME:
      return { ...state, players: action.data };
    case ACTIONS.GAME.SAVE_SHOT:
      ({ players } = state);
      morePlayers = players.filter(player => player.id !== action.data.id);
      morePlayers.push(action.data);
      return { ...state, players: morePlayers };
    case ACTIONS.GAME.NEXT_PLAYER:
      return { ...state, idTurn: action.next };
    default:
      return state;
  }
};
