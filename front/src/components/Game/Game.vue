<template>
	    <div class="grid-x grid-margin-x">
	        <div class="small-12 medium-12 large-8 cell ">
                <div class="game-window">

	                <div class="greeting" v-if="!gameStarted">
	                    <h1>Welcome to Snake Game</h1>
	                    <p>Push the button on the left to start!</p>
	                </div>
	

	                <div id="stage" ref="stage" v-cloak></div>

	                <transition name="fade">
	                    <div class="finished-game-popup shadow align-center" v-if="gamePaused">
	                        <h4>Game Paused</h4>
	                    </div>
	                    <div class="finished-game-popup shadow align-center" v-if="lastGame.finished">
	                        <h4>Game Over</h4>
	                        <p>Your score is<br><span>{{lastGame.lastScore}}</span></p>
	                    </div>
	                    <div class="finished-game-popup shadow align-center" v-if="gameWon">
	                        <h4>You won!</h4>
	                        <p>Congratulations!</p>
	                        <p>Your score is<br><span>{{lastGame.lastScore}}</span></p>
	                    </div>
	                </transition>
                </div>
	        </div>
	
	        <div class="small-12 medium-12 large-4 cell sidebar-wrapper">
	            <div class="sidebar align-center align-items-center">
                    <div class="grid-x grid-margin-x align-center">

                        <div class="cell small-4 medium-6">
	                        <button class="button"
                                    v-bind:class="{ alert: gameStarted }"
                                    @click="startGame">{{ !gameStarted ? 'Start' : 'ReStart' }}</button>
                        </div>

                        <div class="cell small-4 medium-6">
	                        <transition name="scale">
	                            <div v-if="gameStarted && !lastGame.finished">
	                                <button class="button"
                                           @click="pauseGame"
                                           v-if="isPlaying">Pause</button>
	                                 <button class="button"
                                               @click="resumeGame"
                                               v-if="!isPlaying">Resume</button>
                               </div>
	                        </transition>
                        </div>
                    </div>

                    <div class="grid-x align-center">
                        <div class="cell">
                            <div class="controls">
                                <div class="grid-x grid-margin-x align-center">
                                    <div class="cell small-3 medium-4">
                                        <button @click="buttonPressed(38)"
                                                class="button"
                                                type="button">
	                                      <img class="control-button__image" src="@/assets/arrow_up.svg">
                                        </button>
                                    </div>
                                </div>
                                <div class="grid-x grid-margin-x align-center">
                                    <div class="cell small-3 medium-4">
                                       <button @click="buttonPressed(37)"
                                               type="button"
                                               class="button">
	                                        <img class="control-button__image"
                                                 src="@/assets/arrow_left.svg">
                                       </button>
                                    </div>
                                    <div class="cell small-1">
                                    </div>
                                    <div class="cell small-3 medium-4">
                                       <button @click="buttonPressed(39)"
                                               type="button"
                                               class="button">
	                                        <img class="control-button__image" src="@/assets/arrow_right.svg">
                                       </button>
                                    </div>
                                </div>
                                <div class="grid-x grid-margin-x align-center">
                                    <div class="cell small-3 medium-4">
                                        <button @click="buttonPressed(40)"
                                                class="button"
                                                type="button">
                                                <img class="control-button__image" src="@/assets/arrow_down.svg">
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid-x">
                        <div class="cell">
                            <div class="score-counter-wrapper">
                                <h2 class="scw-text">Score: <span v-text="game ? game.scoreValue : 0"></span></h2>
                            </div>
                        </div>
                    </div>
	
	            </div>
	        </div>

	    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Game } from '@/models/game';
import store from '@/store';

export default Vue.extend({
    store,
    data() {
        return {
            game: null as any,
            isPlaying: false,
            gameStarted: false,
            gamePaused: false,
            isLeftButtonPressed: false,
            isUpButtonPressed: false,
            isRightButtonPressed: false,
            isDownButtonPressed: false,
        };
    },

    watch: {
        $route(to, from) {
            if (this.gameStarted) {
                this.pauseGame();
            }
        },
    },

    computed: {
        lastGame(): any {
            return {
                finished: this.$store.getters.finishedGame.finished,
                lastScore: this.$store.getters.finishedGame.score,
            };
        },

        gameWon(): any {
            return this.$store.getters.gameWon;
        },

        stage(): any {
            return this.$refs.stage;
        },
    },
    methods: {
        startGame(): any {
            if (this.game) {
                this.removePrevCells();
            }

            this.game = new Game(
                this.$store.state.settings.colCount,
                this.$store.state.settings.rowCount,
                this.$store.state.settings.difficulty,
                this.$refs.stage,
            );

            this.gameStarted = true;
            this.isPlaying = true;
            this.gamePaused = false;

            this.$store.dispatch('TOGGLE_GAME', { finished: false, score: 0 });
            this.$store.dispatch('WIN_GAME', false);
        },

        pauseGame(): any {
            this.isPlaying = this.game!.finishLoop();
            this.gamePaused = false;
        },

        resumeGame(): any {
            this.isPlaying = this.game!.startLoop();
            this.gamePaused = false;
        },

        buttonPressed(key: number): void {
            if (this.gameStarted) {
                this.game!.snake.controller(key);
            }

            let button = '';

            if (key === 37) {
                button = 'Left';
                this.isLeftButtonPressed = true;
                setTimeout(() => (this.isLeftButtonPressed = false), 100);
            }
            if (key === 38) {
                button = 'Up';
                this.isUpButtonPressed = true;
                setTimeout(() => (this.isUpButtonPressed = false), 100);
            }
            if (key === 39) {
                button = 'Right';
                this.isRightButtonPressed = true;
                setTimeout(() => (this.isRightButtonPressed = false), 100);
            }
            if (key === 40) {
                button = 'Down';
                this.isDownButtonPressed = true;
                setTimeout(() => (this.isDownButtonPressed = false), 100);
            }
        },

        removePrevCells(): void {
            while (this.game.stage.hasChildNodes()) {
                this.game.stage.removeChild(this.game.stage.lastChild);
            }
        },
    },
    created() {
        const self = this;
        window.addEventListener('keydown', (e: any) => {
            self.buttonPressed(e.keyCode);
        });
    },
});
</script>

<style lang="scss">
@import '@/assets/styles/scss/styles.scss';

.container {
    @media (max-width: 40rem) {
        padding: 0 0.3125rem;
    }
}

.game-window {
    position: relative;

    .greeting {
        @media (max-width: 40rem) {
            margin-bottom: 0.625rem;
            h1 {
                font-size: 1.625rem;
            }
        }
    }

    #stage {
        position: relative;
        font-size: 1em;
        margin-bottom: 1rem;
        position: relative;

        & .stage-cell {
            position: absolute;
            transition: all 0.01s;
            background-color: #bccad0;

            &.filled {
                @include cell-image('../../assets/pages.svg');

                &.food {
                    @include cell-image('../../assets/cherry.svg');
                    transform: scale(1);
                }

                &.head {
                    @include cell-image('../../assets/smile.svg');
                    outline: none;
                    transform: scale(1);
                }
            }

            &.empty {
                @include cell-image('../../assets/border-clear.svg');
                // opacity: 0.8;
            }
        }
        @media (max-width: 40rem) {
            font-size: 0.5625rem;
        }

        @media screen and (min-width: 40em) and (max-width: 63.9375em) {
            font-size: 0.8125rem;
        }
    }
}

.sidebar-wrapper {
    .sidebar {
        height: 100%;

        & scw-text {
            @media screen and (min-width: 40em) {
                font-size: 1.1875rem;
            }
        }

        input[type='range'] {
            margin-bottom: 0;
        }

        & .instruction {
            margin-bottom: 0.625rem;
        }

        .controls {
            margin-top: 2.1875rem;
            @media screen and (min-width: 40em) {
                margin-top: 0.9375rem;
            }
            @media screen and (min-width: 63.9375em) {
                margin-top: 6.25rem;
            }

            & .button {
                background: #bbbbbf;
                margin-bottom: 0.625rem;
                padding: 0.1875rem;

                & .control-button__image {
                    width: 2rem;
                    height: 2rem;
                }
            }
        }
    }
}

.finished-game-popup {
    position: absolute;
    margin: 0 auto;
    top: 0;
    left: auto;
    transform: translateX(-50%);
    z-index: 2;
    padding: 1.25rem;
    background-color: #fff;

    h4,
    p {
        margin-bottom: 0;
    }

    span {
        @include gradient-text($gradient-secondary);
        font-weight: 700;
        font-size: 1.25rem;
    }
}

.button {
    width: 100%;
}

// button:active {
//     transform: scale($scale-coef);
//     background: $gradient-secondary;
// }
</style>