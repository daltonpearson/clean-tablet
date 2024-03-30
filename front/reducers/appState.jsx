function StateReducer(state, { type, name, players, winners, word }) {
  switch (type) {
    case 'player':
      return {
        ...state,
        playerName: name,
      };
    case 'players':
      return {
        ...state,
        oldWord: state.newWord,
        players,
        showAnswers: !!state.newWord,
      };
    case 'winners': {
      const win = winners.includes(state.playerName)
        ? 'YOU WON!!'
        : 'YOU LOST!!';
      return {
        ...state,
        h1Text: win,
      };
    }
    case 'word':
      return {
        ...state,
        newWord: word,
        showAnswers: false,
      };
    default:
      throw new Error('Reducer action type not recognized');
  }
}

export default StateReducer;
