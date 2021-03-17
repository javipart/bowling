import React, { useEffect, useState } from 'react';

import {
  Button,
} from '@material-ui/core';

import Table from './Table';
import { useDispatch } from 'react-redux';
import Game from './Game';

import { setDataGame } from '../../actions/gameActions';

const Winner = ({ players, dataPlayers }) => {
  const dispatch = useDispatch();

  const [winner, setWinner] = useState('');
  const [playersSort, setPlayersSort] = useState([]);
  const [back, setBack] = useState(false);

  const sortPlayers = () => {
    let arr = []
    players.map(ply => {
      arr.push({ id: ply.id, score: ply.rounds[9].total, name: ply.name })
    });
    const newArr = arr.sort(function (a, b) {
      return b.score - a.score;
    });
    let sort = [];
    newArr.map(ar => {
      players.map(ply => {
        if (ar.id === ply.id) {
          sort.push(ply);
        }
      })
    });
    setWinner(newArr[0]);
    setPlayersSort(sort);
  }

  const handleRestart = () => {
    dispatch(setDataGame(dataPlayers));
    setBack(true);
  }

  useEffect(() => {
    sortPlayers();
  }, []);
  let component = (
    <>
      <div style={{ textAlign: 'center', display: 'block' }}>
        <h2>
          THE WINNER IS
        </h2>
        <hr style={{ border: '200px', marginTop: '2px', marginBottom: '2px', color: 'black' }} />
        <h3 style={{ marginTop: '2px', marginBottom: '2px' }}>{winner.name}</h3>
        <h4 style={{ marginTop: '2px', marginBottom: '2px' }}>Congrats!</h4>
      </div>
      <Table
        players={playersSort}
        active={true}
        winner={winner.id}
      />
      <Button variant="contained" color={'primary'} onClick={handleRestart}>Restart Game</Button>
      <Button variant="contained" color={'secondary'} onClick={() => window.location.reload()}>End</Button>
    </>
  )
  if (back) {
    component = (
      <Game
        dataPlayers={dataPlayers}
      />
    )
  }

  return (
    <>
      {component}
    </>
  )
}

export default Winner;