import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';

import Table from './Table';
import {
  Button,
} from '@material-ui/core';
const Game = () => {
  const store = useStore();
  const dispatch = useDispatch();

  const game = useSelector((state = store.getState()) => state.game);
  const { players, idTurn } = game;

  const activePlayer = players.filter(player => player.id === idTurn);
  const inativePlayers = players.filter(player => player.id !== idTurn);

  return (
    <>
      <Table
        players={inativePlayers}
      />
      <h1>Hola</h1>
      <Table
        players={activePlayer}
      />
    </>
  )
}

export default Game;