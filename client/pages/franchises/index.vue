<script setup lang="ts">
import { ref } from 'vue';
import { Character } from '~/types/types';
import {
	fetchCharactersInEntireFranchise,
	fetchFranchiseNames,
} from '~/api/FranchiseAPI';

const franchiseNames = ref<string[]>(await fetchFranchiseNames());
const characters = ref<Character[]>([]);
const characterColumns = ref<string[]>(['name', 'description', 'history']);
const selectedDropdown = ref<string>('Select Franchise');

async function fetchCharactersInAll() {
	if (selectedDropdown.value !== 'Select Franchise') {
		characters.value = await fetchCharactersInEntireFranchise(
			selectedDropdown.value
		);
	} else {
		characters.value = [];
	}
}
</script>

<template>
	<div class="franchisesContainer">
		<h1>Franchises</h1>
		<h3>Characters In All</h3>
		<div class="charactersAll">
			<select
				class="dropdown-menu"
				v-model="selectedDropdown"
				@change="fetchCharactersInAll"
			>
				<option selected="true">Select Franchise</option>
				<option v-for="name in franchiseNames" :key="name">{{ name }}</option>
			</select>
			<table>
				<thead>
					<th v-for="column in characterColumns" :key="column">{{ column }}</th>
				</thead>
				<tbody>
					<tr v-for="character in characters" :key="character.name">
						<td>{{ character.name }}</td>
						<td>{{ character.description }}</td>
						<td>{{ character.history }}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div
			v-if="selectedDropdown !== 'Select Franchise' && characters.length === 0"
			class="no-characters"
		>
			<strong
				>Sadly, there was no characters that could be found（＞人＜；)</strong
			>
		</div>
	</div>
</template>

<style scoped>
.franchisesContainer {
	width: 100%;
	max-width: 1000px;
	margin: 0 auto;
	padding: 1rem;
	box-sizing: border-box;
}

.dropdown-menu {
	text-align: left;
}

h1 {
	text-align: center;
}

h3 {
	text-align: center;
	padding-top: 25px;
}

table {
	width: 100%;
	margin-left: -10%;
	border-collapse: collapse;
}

th,
td {
	padding: 1rem;
	text-align: left;
	border-bottom: 1px solid #ccc;
	word-wrap: break-word;
	max-height: 150px;
	overflow-y: auto;
}

th {
	font-weight: bold;
	color: #2c3e50;
}

select {
	border: none;
	cursor: pointer;
	padding: 0.5rem 1rem;
	background-color: #007bff;
	color: #fff;
	font-weight: bold;
	border-radius: 4px;
	transition: background-color 0.3s;
}

.no-characters {
	padding: 15px;
	margin-left: -10%;
	width: 100%;
	background-color: #2596be;
	color: white;
	margin-bottom: 15px;
	align-self: flex-start;
}

strong {
	font-weight: bold;
}
</style>
