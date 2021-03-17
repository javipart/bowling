import { ACTIONS } from '../models/constants';

const startGameSuccess = data => ({ type: ACTIONS.GAME.START_GAME, data });
const saveShotSuccess = data => ({ type: ACTIONS.GAME.SAVE_SHOT, data });
const nextPlayerSuccess = next => ({ type: ACTIONS.GAME.NEXT_PLAYER, next });

export function setDataGame(players) {
  return (dispatch) => {
    console.log(players)
    const initialData = players.map(player => {
      player.rounds = [
        {
          id: 1,
          score: [{ shot: 1, score: 0, value: '' }, { shot: 2, score: 0, value: '' }],
          total: 0,
        },
        {
          id: 2,
          score: [{ shot: 1, score: 0, value: '' }, { shot: 2, score: 0, value: '' }],
          total: 0,
        },
        {
          id: 3,
          score: [{ shot: 1, score: 0, value: '' }, { shot: 2, score: 0, value: '' }],
          total: 0,
        },
        {
          id: 4,
          score: [{ shot: 1, score: 0, value: '' }, { shot: 2, score: 0, value: '' }],
          total: 0,
        },
        {
          id: 5,
          score: [{ shot: 1, score: 0, value: '' }, { shot: 2, score: 0, value: '' }],
          total: 0,
        },
        {
          id: 6,
          score: [{ shot: 1, score: 0, value: '' }, { shot: 2, score: 0, value: '' }],
          total: 0,
        },
        {
          id: 7,
          score: [{ shot: 1, score: 0, value: '' }, { shot: 2, score: 0, value: '' }],
          total: 0,
        },
        {
          id: 8,
          score: [{ shot: 1, score: 0, value: '' }, { shot: 2, score: 0, value: '' }],
          total: 0,
        },
        {
          id: 9,
          score: [{ shot: 1, score: 0, value: '' }, { shot: 2, score: 0, value: '' }],
          total: 0,
        },
        {
          id: 10,
          score: [{ shot: 1, score: 0, value: '' }, { shot: 2, score: 0, value: '' }, { shot: 3, score: 0, value: '' }],
          total: 0,
        },
      ];
      return player;
    })
    dispatch(startGameSuccess(initialData));
  };
}

export function saveShot(player, round, shot, points) {
  return (dispatch) => {
    const newPlayer = JSON.parse(JSON.stringify(player));
    newPlayer.rounds.map(rd => {
      if (parseInt(rd.id) === parseInt(round)) {
        return rd.score.map(ch => {
          if (parseInt(ch.shot) === parseInt(shot)) {
            ch.score = points;
            return ch;
          }
          return ch;
        })
      }
      return rd;
    });
    dispatch(saveShotSuccess(newPlayer));
  };
}

export function nextPlayer(player, setRound, round) {
  return (dispatch, getState) => {
    const state = getState();
    const { players } = state.game;
    const next = `player${parseInt(player.charAt(player.length - 1)) + 1}`;
    const newPlayer = players.filter(ply => ply.id === next);
    if (newPlayer.length > 0) {
      dispatch(nextPlayerSuccess(next));
    } else {
      setRound(round += 1);
      dispatch(nextPlayerSuccess('player1'));
    }
  };
}
