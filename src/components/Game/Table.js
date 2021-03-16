import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  Button,
} from '@material-ui/core';

import './Table.css'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));
const Table = ({
  players
}) => {
  const [titles, setTitles] = useState([]);

  const getTitles = () => {
    let allTitles = [];
    for (let i = 1; i <= 10; i++) {
      allTitles.push(
        <th colSpan={6}>{i}</th>
      )
    }
    setTitles(allTitles)
  };

  const mountTables = () => {
    return players.map(player => (
      <>
        <tr>
          {player.rounds.map((round, i) => (
            round.score.map((r, j) => (
              <td id={`frame${i}${j}`} colSpan={3}>{r.score}</td>
            ))
          ))}
        </tr>
        <tr>
          {player.rounds.map((round, i) => (
            <td id={`marker${i}`} colSpan={6}>{round.total}</td>
          ))}
        </tr>
      </>
    ))
  };

  useEffect(() => {
    getTitles()
  }, []);

  return (
    <div id='scorecard'>
      <table id='scorecardTable' className='scorecard' cellPadding={1} cellSpacing={0}>
        <tr>
          {titles}
        </tr>
        {mountTables()}
      </table>
    </div>
  )
}

export default Table;