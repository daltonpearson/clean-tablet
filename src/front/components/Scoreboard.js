import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  div,
  h2,
  li,
  p,
  score,
  ul,
} from '../styles/Scoreboard.module.css';
import playerSort from '../utils/playerSort';
import mapFn from '../utils/mapFn';


export default function Scoreboard({ players, showAnswers, word }) {

  const scoreList = players
    .sort(playerSort('score', -1))
    .map(mapFn('score', li));

  const answerList = players
    .sort(playerSort('answer', 1))
    .map(mapFn('answer', li, p));

  return (
    <div style={{ height: `calc(95px + (28px * ${players.length}))` }} className={ score }>
      <div className={ div }>
        <h2 className={ h2 }>{ showAnswers ? `Last round: ${word}` : "Scores:"}</h2>
        <ul
          aria-label={ showAnswers ? "answers" : "scores" }
          className={ ul }
        >
          { showAnswers ? answerList : scoreList }
        </ul>
      </div>
    </div>
  );

}

Scoreboard.propTypes = {
  players: PropTypes.array,
  showAnswers: PropTypes.bool,
  word: PropTypes.string
}