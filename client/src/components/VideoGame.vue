<script lang="ts">
import { defineComponent } from 'vue';
import type { VideoGame, Developer, Franchise } from '../types/types';

export default defineComponent({
	props: {
		videogame: {
			type: Object as () => VideoGame,
			required: true,
		},
		developer: {
			type: Object as () => Developer,
			required: true,
		},
		franchise: {
			type: Object as () => Franchise,
			required: true,
		},
	},
});
</script>

<template>
	<div class="videogame-card">
		<div class="name-synopsis-container">
			<h3 class="name">{{ videogame.name }}</h3>
			<p class="synopsis">{{ videogame.synopsis }}</p>
		</div>
		<div class="details">
			<div class="detail">
				<span class="label">Genre:</span>
				<span class="value">{{ videogame.genre }}</span>
			</div>
			<div class="detail">
				<span class="label">Release Date:</span>
				<span class="value">{{ videogame.release_date }}</span>
			</div>
			<div class="detail">
				<span class="label">Rating:</span>
				<span class="value">{{ videogame.rating }}</span>
			</div>
			<div class="detail">
				<span class="label">Sales:</span>
				<span class="value">{{ videogame.sales }}</span>
			</div>
			<div class="detail">
				<span class="label">Developer:</span>
				<a href="">{{ videogame.name }}</a>
			</div>
			<div class="detail">
				<span class="label">Franchise:</span>
				<a href="/">{{ videogame.name }}</a>
			</div>
		</div>
	</div>
</template>

<style scoped>
.videogame-card {
	margin: 2rem;
	padding: 1rem;
	display: flex;
	flex-direction: row;
	border: 1px solid #ccc;
	border-radius: 4px;
	margin-bottom: 16px;
}

.name-synopsis-container {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-right: 3rem;
	flex-basis: 50%;
	box-sizing: border-box;
}

.name {
	margin: 0 0 0 1rem;
}

.synopsis {
	margin: 0 0 0 2rem;
}

.details {
	flex: 1;
	margin-left: 1rem;
}

.detail {
	margin-right: 16px;
	margin-bottom: 8px;
	display: flex;
	align-items: center;
}
.label {
	margin-right: 8px;
	font-weight: bold;
}
</style>
