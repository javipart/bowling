import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';

import Table from './Table';
import {
  Button, Grid, IconButton,
} from '@material-ui/core';
import { PlayCircleFilled } from '@material-ui/icons';

import { saveShot, nextPlayer } from '../../actions/gameActions';
import Winner from './Winner';

const Game = () => {
  const store = useStore();
  const dispatch = useDispatch();

  const [pins, setPins] = useState([]);
  const [round, setRound] = useState(1);
  const [shot, setShot] = useState(1);
  const [showWinner, setShowWinner] = useState(false);

  const game = useSelector((state = store.getState()) => state.game);
  const { players, idTurn } = game;

  const activePlayer = players.filter(player => player.id === idTurn);
  const inactivePlayers = players.filter(player => player.id !== idTurn);

  useEffect(() => {
    getPins();
  }, []);

  const getPins = () => {
    let allPins = [];
    for (let i = 1; i <= 10; i++) {
      allPins.push({
        id: `pin${i}`,
        status: 1,
      });
    }
    setPins(allPins);
  };

  const playRound = (player, round, shot) => {
    console.log(round, shot)
    if (round === 11) {
      setShowWinner(true);
      getPins();
    } else {
      const newPins = pins.filter(p => p.status)
        .map(pin => {
          pin.status = Math.round(Math.random() * 1);
          return pin;
        });
      setPins(newPins);
      const points = newPins.filter(p => !p.status).length;
      dispatch(saveShot(player, round, shot, points));
      if (round === 10 && shot === 2) {
        getPins();
        setShot(shot + 1)
      } else {
        if (shot === 2 && round !== 10) {
          dispatch(nextPlayer(player.id, setRound, round));
          getPins();
          setShot(1)
        } else {
          setShot(shot + 1)
        }
        if (round === 10 && shot === 3) {
          dispatch(nextPlayer(player.id, setRound, round));
          getPins();
          setShot(1)
        }
      }
    }
  }

  const getBackColor = (player) => {
    return player.shift().color;
  }

  let component = (
    <>
      <Table
        active={false}
        players={inactivePlayers}
      />
      <Grid container justify={'center'}>
        <Grid item xs={6}>
          <div className={'back'}>
            <div id="ball" style={{ backgroundColor: getBackColor(activePlayer.slice()) }}></div>
            <div id="lastball"></div>
            {pins.filter(pin => pin.status)
              .map(pin => (
                <div id={pin.id}>
                </div>
              ))}
          </div>
        </Grid>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={2}>
          <Button
            className={'back-btn'}
            disabled={round === 11}
            onClick={() => playRound(activePlayer.shift(), round, shot)}
            style={{ backgroundColor: getBackColor(activePlayer.slice()), color: 'white' }}
          >
            {'Play'}
          </Button>
        </Grid>
      </Grid>
      <Table
        active={true}
        players={activePlayer}
      />
    </>
  );

  if (round === 11) {
    component = (
      <>
        <Winner
          players={players}
        />
      </>
    );
  }

  return (
    <>
      {component}
    </>
  )
}

export default Game;