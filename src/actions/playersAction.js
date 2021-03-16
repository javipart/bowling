import { ACTIONS } from '../models/constants';


const setDataPlayersSuccess = data => ({ type: ACTIONS.PLAYERS.SET_PLAYERS, data });

export function setDataPlayers(id, value) {
  return (dispatch) => {
    dispatch(setDataPlayersSuccess({id, value}));
  };
}
