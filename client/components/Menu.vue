<script setup lang="ts">
import type {
	Developer,
	Franchise,
	VideoGame as VideoGameType,
} from '../types/types';
import { fetchVideogames } from '~~/api/videoGameAPI';
import IconCommunity from './icons/IconCommunity.vue';
import IconGame from './icons/IconGame.vue';

onMounted(async () => {
	const videogames = await fetchVideogames();
	games.value = videogames;
});

const exampleDeveloper: Developer = {
	developer_id: 1,
	name: 'Example Developer',
	website_link: 'https://example.com',
	description: 'This is an example developer.',
};

const exampleFranchise: Franchise = {
	franchise_id: 1,
	name: 'Example Franchise',
	description: 'This is an example franchise.',
};

const showGameContent = ref(false);

const toggleGameContent = () => {
	showGameContent.value = !showGameContent.value;
};

const handleGameSelection = (gameId: number) => {
	if (gameId === -1) {
		// delete this in the future
		showGameContent.value = false;
		return;
	}
	showGameContent.value = true;
	selectedGame.value =
		games.value.find(game => game.game_id === gameId) || null;
};

const games = ref<VideoGameType[]>([]);
const selectedGame = ref<VideoGameType | null>(null);
</script>

<template>
	<MenuItem>
		<template #icon>
			<IconGame />
		</template>
		<template #heading><a href="/">Games</a></template>
		<div class="videoGameDropDown">
			<select
				@change="(event) => handleGameSelection(Number((event.target as HTMLSelectElement).value))"
			>
				<option value="-1" selected>Select a game...</option>
				<option v-for="game in games" :key="game.game_id" :value="game.game_id">
					{{ game.name }}
				</option>
			</select>
		</div>
		<div v-if="!showGameContent">
			Looking for information on your favorite video games? You've come to the
			right place! Our database includes a wide range of games, and you can
			search by name, genre, developer, or release date. You can also filter by
			rating, sales, and release date to find exactly what you're looking for.
		</div>
		<div v-if="showGameContent && selectedGame">
			<VideoGame
				:videogame="selectedGame"
				:developer="exampleDeveloper"
				:franchise="exampleFranchise"
			/>
		</div>
	</MenuItem>

	<MenuItem>
		<template #icon>
			<IconCommunity />
		</template>
		<template #heading><a href="/">Posts</a></template>
		Connect with other gamers and join the conversation! Our posts section is
		the perfect place to discuss your favorite games, share tips and tricks, and
		get advice from other players. You can also create your own posts and start
		new discussions on topics that matter to you.
	</MenuItem>
</template>

<style scoped>
.videoGameDropDown {
	left: 35%;
	margin-bottom: 30px;
}
</style>
