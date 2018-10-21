const storage = window.localStorage;
import {} from 'vue';
import { Score } from '@/models/score';
import { Settings } from '@/models/settings';

export default {
    saveScore(score: Score) {
        let scores: any = {};
        const scoreStorage = storage.getItem('scores');
        if (scoreStorage) {
            scores = JSON.parse(scoreStorage);

            const k = Object.keys(scores).sort(
                (a, b) => Date.parse(a) - Date.parse(b),
            );

            if (k.length > 10) {
                delete scores[k[k.length - 1]];
            }
        }
        scores[score.date.toISOString()] = JSON.stringify(score.score);
        storage.setItem('scores', JSON.stringify(scores));
    },

    getScores(): Score[] {
        const scores: Score[] = [];
        const storageScores = storage.getItem('scores');
        if (storageScores !== null) {
            const scoresObject = JSON.parse(storageScores);
            for (const key of Object.keys(scoresObject)) {
                scores.push(
                    new Score({
                        score: scoresObject[key],
                        date: new Date(key),
                    }),
                );
            }
        }
        return scores;
    },

    getSettings(): Settings {
        let settings = new Settings();
        const storageSettings = storage.getItem('settings');
        if (storageSettings) {
            settings = JSON.parse(storageSettings);
        } else {
            storage.setItem('settings', JSON.stringify(settings));
        }

        return settings;
    },

    saveSettings(settings: Settings) {
        console.log('i should save', settings);
        storage.setItem('settings', JSON.stringify(settings));
    },
};
