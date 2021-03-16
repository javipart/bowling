import React from 'react';

import Form from './Form';
import {
  Button,
} from '@material-ui/core';
const Index = ({
  newGame,
  setNewGame,
  game,
  setGame,
}) => {
  let component = (
    <>
      <h1>BOWLING 2</h1>
      <Button
        variant='contained'
        color='primary'
        onClick={() => setNewGame(true)}
      >
        New Game
      </Button>
    </>
  )
  if (newGame) {
    component = (
      <Form
        setNewGame={setNewGame}
        game={game}
        setGame={setGame}
      />
    )
  }
  return (
    <>
      {component}
    </>
  )
}

export default Index;