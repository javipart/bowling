import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';

import Game from './Game/Game';

import { setDataPlayers } from '../actions/playersAction';
import { setDataGame } from '../actions/gameActions';

import {
  TextField,
  Button,
  CssBaseline,
  Container,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Form = ({ setNewGame }) => {
  const store = useStore();
  const dispatch = useDispatch();

  const players = useSelector((state = store.getState()) => state.players);
  const { maxPlayers } = players;

  const classes = useStyles();

  const [error, setError] = useState('');
  const [inputs, setInputs] = useState([]);
  const [formOk, setFormOk] = useState(false);
  const [showRoom, setShowRoom] = useState(false);
  const [colorPlayer, setColorPlayer] = useState({});
  const [colors, setColors] = useState([
    'red',
    'blue',
    'yellow',
    'grey',
    'green',
    'orange',
  ]);

  useEffect(() => {
    generateInputs();
  }, []);

  const handleSubmit = (game = false) => {
    if (game) {
      const isValid = true;
      if (!isValid) {
        setError('Incorrect data');
      } else {
        let gamePlayers = [];
        for (let prop in players.selected) {
          gamePlayers.push({
            id: prop,
            name: players.selected[prop],
            color: colorPlayer[prop],
          })
        }
        dispatch(setDataGame(gamePlayers));
        setShowRoom(true);
      }
    } else {
      setNewGame(false);
    }
  };

  const handlePlayers = (e) => {
    const { id, value } = e.target;
    dispatch(setDataPlayers(id, value));
    if (validateNames().length === maxPlayers) {
      setFormOk(true);
    } else {
      setFormOk(false);
    }
  }

  const handleColor = (e) => {
    const { name, value } = e.target;
    const newColors = colors.filter(cl => cl !== value);
    setColorPlayer(prev => ({ ...prev, [name]: value }));
  }

  const generateInputs = () => {
    let newInputs = [];
    for (let i = 1; i <= maxPlayers; i++) {
      let idInput = `player${i}`;
      let labelInput = `Player ${i}`;
      newInputs.push(
        <>
          <Grid container>
            <Grid item xs={7}>
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                required
                id={idInput}
                label={labelInput}
                name={idInput}
                autoComplete="name"
                autoFocus
                value={players.selected[idInput]}
                onChange={handlePlayers}
              />
            </Grid>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={4}>
              <InputLabel id={`color${i}`}>Color</InputLabel>
              <Select
                fullWidth
                variant={'outlined'}
                labelId={`color${i}`}
                name={`player${i}`}
                value={colorPlayer[`player${i}`]}
                onChange={handleColor}
              >
                {colors.map(color => (
                  <MenuItem value={color}>{color}</MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </>
      )
    }
    setInputs(newInputs);
  };

  const validateNames = () => {
    const { selected } = players;
    let names = [];
    for (let i = 1; i <= maxPlayers; i++) {
      names.push(selected[`player${i}`]);
    }
    const isOk = names.filter(name => name && name !== '');
    return isOk;
  }

  if (showRoom) {
    return (
      <Game />
    )
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          BOWLING 2D
        </Typography>
        <form className={classes.form} noValidate>
          {inputs}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!formOk || Object.keys(colorPlayer).length !== maxPlayers}
            onClick={() => handleSubmit(true)}
          >
            Start
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={() => handleSubmit(false)}
          >
            Back
          </Button>
          {error ? <h3>{error}</h3> : ''}
        </form>
      </div>
    </Container>
  );
};

export default Form;
