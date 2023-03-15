<script setup lang="ts">
import { ref } from 'vue';
import MenuItem from './MenuItem.vue';
import VideoGame from './VideoGame.vue';
import DocumentationIcon from './icons/IconDocumentation.vue';
import CommunityIcon from './icons/IconCommunity.vue';
import type {
	Developer,
	Franchise,
	VideoGame as VideoGameType,
} from '@/types/types';

const exampleGame: VideoGameType = {
	game_id: Math.floor(Math.random() * 1000),
	name: 'Example Game',
	release_date: '2022-01-01',
	genre: 'Action',
	synopsis:
		'This is an example game. This is an example game. This is an example game.',
	rating: 'E',
	sales: Math.floor(Math.random() * 1000000),
	developer_id: 1,
	start_date: 1640995200,
	end_date: 1640995200,
	franchise_id: 1,
};

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

const games = ref<VideoGameType[]>([exampleGame]);
const selectedGame = ref<VideoGameType | null>(null);
</script>

<template>
	<MenuItem>
		<template #icon>
			<DocumentationIcon />
		</template>
		<template #heading><a href="/">Games</a></template>
		<div v-if="!showGameContent">
			Looking for information on your favorite video games? You've come to the
			right place! Our database includes a wide range of games, and you can
			search by name, genre, developer, or release date. You can also filter by
			rating, sales, and release date to find exactly what you're looking for.
		</div>
	</MenuItem>

	<div class="videoGameDropDown">
		<select
			@change="(event) => handleGameSelection(Number((event.target as HTMLSelectElement).value))"
		>
			<option value="" selected disabled>Select a game...</option>
			<option value="-1">lol</option>
			<option v-for="game in games" :key="game.game_id" :value="game.game_id">
				{{ game.name }}
			</option>
		</select>
	</div>

	<div v-if="showGameContent && selectedGame">
		<VideoGame
			:videogame="selectedGame"
			:developer="exampleDeveloper"
			:franchise="exampleFranchise"
		/>
	</div>

	<MenuItem>
		<template #icon>
			<CommunityIcon />
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
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}
</style>
