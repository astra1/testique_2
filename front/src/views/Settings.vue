<template>
	<div class="settings">
		<h1>Snake tune ups</h1>
		<div class="grid-x align-center">
            <div class="cell small-12 medium-5 large-4">
	            <label for="difficulty">Difficulty {{difficulty}}</label>
            </div>
            <div class="cell small-12 medium-7 large-8">
	            <input id="difficulty" type="range" min="5" max="50" v-model="difficulty">
            </div>
            <div class="cell small-12 medium-5 large-4">
	            <label for="col-count">Columns {{colCount}}</label>
            </div>
            <div class="cell small-12 medium-7 large-8">
                <input id="col-count" type="range" min="5" max="100" v-model="colCount">
            </div>
            <div class="cell small-12 medium-5 large-4">
	            <label for="row-count">Rows {{rowCount}}</label>
            </div>
            <div class="cell small-12 medium-7 large-8">
                <input id="row-count" type="range" min="5" max="100" v-model="rowCount">
            </div>
		</div>

	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import storage from '@/vuex/storage';
import { Settings } from '@/models/settings';
import GameUtils from '@/utils/game-utils';

@Component
export default class SettingsModule extends Vue {
    private storage = storage;

    private colCount: number = 15;
    private rowCount: number = 15;
    private difficulty: number = 15;

    @Watch('$route', { immediate: true, deep: true })
    private activate(newVal: any, oldVal: any) {
        if (oldVal && oldVal.name === 'settings') {
            GameUtils.saveSettings(
                new Settings({
                    colCount: this.colCount,
                    rowCount: this.rowCount,
                    difficulty: this.difficulty,
                }),
            );
        }
    }

    private created() {
        const settings = this.$store.state.settings;
        if (settings) {
            this.colCount = settings.colCount;
            this.rowCount = settings.rowCount;
            this.difficulty = settings.difficulty;
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
