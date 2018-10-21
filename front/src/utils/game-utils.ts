import store from '@/store';

export default class GameUtils {
    public static stopSnake() {
        // Clear all Timeouts to stop the snake
        let id = window.setTimeout(() => {
            return null;
        }, 0);

        while (id--) {
            window.clearTimeout(id);
        }
    }

    public static saveScore(score: any, date: Date) {
        store.dispatch('SAVE_SCORE', { score, date });
    }

    public static finishGame(lastGame: any) {
        store.dispatch('TOGGLE_GAME', lastGame);
    }

    public static winGame() {
        store.dispatch('WIN_GAME');
    }

    public static saveSettings(settings: any) {
        store.dispatch('SAVE_SETTINGS', settings);
    }
}
