import React, { useEffect, useState } from 'react';

import './Table.css'

const Table = ({
  players,
  active,
  winner,
}) => {
  const [titles, setTitles] = useState([]);

  const getTitles = () => {
    let allTitles = [];
    for (let i = 1; i <= 10; i++) {
      allTitles.push(
        <th colSpan={i === 10 ? 9 : 6}>{i}</th>
      )
    }
    setTitles(allTitles)
  };

  const mountTables = (player) => (
    <>
      <tr>
        {player.rounds.map((round, i) => (
          round.score.map((r, j) => (
            <td id={`frame${i + 1}${j}`} colSpan={3}>{r.value}</td>
          ))
        ))}
      </tr>
      <tr>
        {player.rounds.map((round, i) => (
          <td id={`marker${i + 1}`} colSpan={6}>{round.total}</td>
        ))}
      </tr>
    </>
  );

  useEffect(() => {
    getTitles()
  }, []);

  return (
    <div id='scorecard'>
      {players.map((player) => (
        <div style={{ backgroundColor: winner === player.id ? 'green' : '' }}>
          <span style={{ float: 'center', color: 'white', backgroundColor: player.color, opacity: active ? '' : '50%' }}>
            {player.name}
          </span>
          <table id='scorecardTable' className='scorecard' cellPadding={1} cellSpacing={0}>
            <tr>
              {titles}
            </tr>
            {mountTables(player)}
          </table>
        </div>
      ))}
    </div>
  )
}

export default Table;