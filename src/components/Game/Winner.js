import React, { useEffect } from 'react';

import {
  Button,
} from '@material-ui/core';
const Winner = ({ players }) => {

  const sortPlayers = () => {
    let arr = []
    players.map(ply => {
      arr.push({ id: ply.id, score: ply.rounds[9].total })
    });
    const newArr = arr.sort(function (a, b) {
      return b.score - a.score;
    });
    let sort = [];
    console.log(newArr);
    newArr.map(ar => {
      players.map(ply => {
        if (ar.id === ply.id) {
          sort.push(ply);
        }
      })
    })
    console.log(sort);

  }

  useEffect(() => {
    sortPlayers();
  }, []);
  return (
    <>

    </>
  )
}

export default Winner;