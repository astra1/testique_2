import * as types from '@/vuex/mutation-types';
import storage from '@/vuex/storage';
import axios from 'axios';
import { Score } from '@/models/score';

export default {
    FETCH_SCORE(context: any) {
        console.log(context);
        axios
            .get('http://localhost:3000/scores/')
            .then((res: any) => {
                console.log('data from api', res.data);
                if (res.data) {
                    context.state.scores = res.data;
                    context.commit(types.SUCCESS);
                } else {
                    throw new Error('no data');
                }
            })
            .catch((e: any) => context.commit(types.FAILURE));
    },
    SAVE_SCORE(context: any, score: Score) {
        // storage.saveScore(score);
        // context.commit(types.SAVE_SCORE, score);
        axios
            .post('http://localhost:3000/scores/', new Score(score))
            .then((res: any) => {
                if (res.data) {
                    context.commit(types.SAVE_SCORE, new Score(res.data));
                    context.commit(types.SUCCESS);
                } else {
                    throw new Error('??');
                }
            })
            .catch((e: any) => {
                context.commit(types.FAILURE);
                // mutation failure
            });
    },
    TOGGLE_GAME(context: any, lastGame: any) {
        context.commit(types.TOGGLE_GAME, lastGame);
    },

    WIN_GAME(context: any, won: any) {
        console.log('W O N ' + won, context);
        context.commit(types.WIN_GAME, won);
    },

    SAVE_SETTINGS(context: any, settings: any) {
        storage.saveSettings(settings);
        context.commit(types.SAVE_SETTINGS, settings);
    },

    PENDING(context: any) {
        console.log('pending');
    },
    FAILURE(context: any) {
        console.log('fail');
    },
    SUCCESS(context: any) {
        console.log('hooray');
    },
};
