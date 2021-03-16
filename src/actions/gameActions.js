import { ACTIONS } from '../models/constants';


const startGameSuccess = data => ({ type: ACTIONS.GAME.START_GAME, data });

const rounds = [
  {
    id: 1,
    score: [{ round: 1, score: 0 }, { round: 2, score: 0 }],
    total: 0,
  },
  {
    id: 2,
    score: [{ round: 1, score: 0 }, { round: 2, score: 0 }],
    total: 0,
  },
  {
    id: 3,
    score: [{ round: 1, score: 0 }, { round: 2, score: 0 }],
    total: 0,
  },
  {
    id: 4,
    score: [{ round: 1, score: 0 }, { round: 2, score: 0 }],
    total: 0,
  },
  {
    id: 5,
    score: [{ round: 1, score: 0 }, { round: 2, score: 0 }],
    total: 0,
  },
  {
    id: 6,
    score: [{ round: 1, score: 0 }, { round: 2, score: 0 }],
    total: 0,
  },
  {
    id: 7,
    score: [{ round: 1, score: 0 }, { round: 2, score: 0 }],
    total: 0,
  },
  {
    id: 8,
    score: [{ round: 1, score: 0 }, { round: 2, score: 0 }],
    total: 0,
  },
  {
    id: 9,
    score: [{ round: 1, score: 0 }, { round: 2, score: 0 }],
    total: 0,
  },
  {
    id: 10,
    score: [{ round: 1, score: 0 }, { round: 2, score: 0 }],
    total: 0,
  },
]

export function setDataGame(players) {
  return (dispatch, getState) => {
    const state = getState();
    const initialData = players.map(player => {
      player.rounds = rounds;
      return player;
    })
    dispatch(startGameSuccess(initialData));
  };
}
