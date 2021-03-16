import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Index from './components/Index';

import {
  AppBar,
  Container,
  Toolbar,
  Typography,
} from '@material-ui/core';


function App() {
  const [newGame, setNewGame] = useState(false);
  const [game, setGame] = useState({});
  return (
    <div lassName="App">
      <AppBar>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Bowling
          </Typography>
        </Toolbar>
      </AppBar>
      <header className="App-header">
        <Index
          newGame={newGame}
          setNewGame={setNewGame}
          game={game}
          setGame={setGame}
        />
      </header>
    </div>
  );
}

export default App;
