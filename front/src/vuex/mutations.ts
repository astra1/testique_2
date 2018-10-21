import * as types from './mutation-types';

export default {
    [types.SAVE_SCORE](state: any, score: any) {
        state.scores.push(score);
    },

    [types.TOGGLE_GAME](state: any, lastGame: any) {
        state.lastGame.finished = lastGame.finished;
        state.lastGame.score = lastGame.score;
    },

    [types.WIN_GAME](state: any, won: any) {
        state.gameWon = won;
    },
    [types.SAVE_SETTINGS](state: any, settings: any) {
        state.settings = settings;
    },
    [types.FAILURE](state: any) {
        // console.log('fail');
    },
    [types.PENDING](state: any) {
        // console.log('pending');
    },
    [types.SUCCESS](state: any) {
        // console.log('success');
    },
};
