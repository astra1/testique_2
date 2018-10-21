export default {
  allScores(state: any) {
    // Do not mutate array and sort by score value
    return state.scores.concat().sort((scoreA: any, scoreB: any) => {
      return scoreB.score - scoreA.score;
    });
  },

  finishedGame(state: any) {
    return {
      finished: state.lastGame.finished,
      score: state.lastGame.score,
    };
  },

  gameWon(state: any) {
    return state.gameWon;
  },
};
