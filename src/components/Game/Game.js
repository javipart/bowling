import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';

import Table from './Table';
import {
  Button, Fab, Grid
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { saveShot, nextPlayer } from '../../actions/gameActions';
import Winner from './Winner';

import img from '../../assets/strike.gif';

const Game = ({ dataPlayers }) => {
  const store = useStore();
  const dispatch = useDispatch();

  const [pins, setPins] = useState([]);
  const [round, setRound] = useState(1);
  const [shot, setShot] = useState(1);
  const [showMenu, setShowMenu] = useState(false);
  const [lastBall, setLastBall] = useState(false);
  const [running, setRunning] = useState(false);
  const [strike, setStrike] = useState(false);

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
    setRunning(true);
    if (round === 11) {
      getPins();
    } else {
      const newPins = pins.filter(p => p.status)
        .map(pin => {
          pin.status = Math.round(Math.random() * 1);
          return pin;
        });
      setPins(newPins);
      const points = newPins.filter(p => !p.status).length;
      setTimeout(() => {
        if (points === 10) {
          setStrike(true);
        }
        setLastBall(true);
      }, 2000)
      setTimeout(() => {
        dispatch(saveShot(player, round, shot, points));
        if (round === 10 && shot === 2) {
          getPins();
          setShot(shot + 1)
          setLastBall(false);
          setRunning(false);
          setStrike(false);
        } else {
          if (shot === 2 && round !== 10) {
            dispatch(nextPlayer(player.id, setRound, round));
            getPins();
            setShot(1);
            setLastBall(false);
            setRunning(false);
            setStrike(false);
          } else {
            setShot(shot + 1)
            setLastBall(false);
            setRunning(false);
            setStrike(false);
          }
          if (round === 10 && shot === 3) {
            dispatch(nextPlayer(player.id, setRound, round));
            getPins();
            setShot(1);
            setLastBall(false);
            setRunning(false);
          }
        }
      }, 3000);
    }
  }

  const getBackColor = (player) => {
    return player.shift().color;
  }

  let component = (
    <>
      <Fab
        onClick={() => setShowMenu(!showMenu)}
        color="secondary" style={{
          position: 'absolute',
          top: '80px',
          right: '10px',
        }}>
        <Close />
      </Fab>
      {showMenu
        ? (
          <div style={{
            position: 'absolute',
            top: '90px',
            right: '80px',
          }}>
            {'End Game?'}
            <Button onClick={() => window.location.reload()} color="secondary">Yes</Button>
            <Button onClick={() => setShowMenu(false)} color="primary">No</Button>
          </div>
        )
        : null}
      <Table
        active={false}
        players={inactivePlayers}
      />
      <Grid container justify={'center'}>
        <Grid item xs={6}>
          <div className={'back'}>
            {lastBall
              ? <div id="lastball" style={{ backgroundColor: getBackColor(activePlayer.slice()) }}></div>
              : <div id="ball" style={{ backgroundColor: getBackColor(activePlayer.slice()) }}></div>}
            {pins.filter(pin => pin.status)
              .map(pin => (
                <div id={pin.id}>
                </div>
              ))}
            {strike
              ? (
                <img src={img} style={{ maxHeight: '160px', maxWidth: '160px', bottom: '300px' }} />
              )
              : null}
          </div>
        </Grid>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={2}>
          <Button
            className={'back-btn'}
            disabled={round === 11 || lastBall || running}
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
          dataPlayers={dataPlayers}
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