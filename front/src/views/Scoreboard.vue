<template>
	<div class="grid-x align-center">
		<div class="cell small-12 medium-6 large-6">
			<div class="scoreboard_wrapper stack">
				<h1>Last scores</h1>
				<table>
					<thead>
						<tr>
							<th class="text-right">Date</th>
							<th class="text-right">Score</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="score in scores" :key="score.id">
							<td class="text-right">{{score.date | date}}</td>
							<td class="text-right">{{score.score}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import dayjs from 'dayjs';
dayjs.locale('en');

import { Score } from '@/models/score';
@Component({
    name: 'Scoreboard',
    filters: {
        date: function(str: string) {
            if (!str) {
                return '(n/a)';
            }

            return dayjs(str).format('DD.MM.YYYY HH:MM:ss');
        },
    },
})
export default class ScoresModule extends Vue {
    get scores(): Score[] {
        console.log('scores: ', this.$store.state.scores);
        return this.$store.state.scores;
    }
}
</script>

<style lang="sass" scoped>
</style>
