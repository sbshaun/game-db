<script setup lang="ts">
import { ref } from 'vue';

const currentTab = ref('videogames');

const emit = defineEmits(['update-tab']);

const selectTab = (tabName: string) => {
	currentTab.value = tabName;
	emit('update-tab', tabName);
};
</script>

<template>
	<nav class="topMenu">
		<select
			v-model="currentTab"
			@change="selectTab(($event.target as HTMLSelectElement)?.value ?? '')"
		>
			<option value="videogames">Video Game</option>
			<option value="franchise">Franchise</option>
			<option value="developer">Developer</option>
			<option value="studio">Studio</option>
			<option value="individualdeveloper">Individual Developer</option>
			<option value="character">Character</option>
			<option value="voiceactor">Voice Actor</option>
			<option value="posts">Post</option>
			<option value="comments">Comment</option>
			<option value="users">User</option>
		</select>
	</nav>
</template>

<style scoped>
.topMenu {
	width: 100%;
	height: 100%;
	background-color: #eee;
}

select {
	font-size: 1rem;
	font-weight: bold;
	padding: 12px 24px;
	border: none;
	background-color: transparent;
	cursor: pointer;
	margin: 0 auto;
	display: block;
}

select option {
	font-weight: normal;
}

select:focus {
	outline: none;
}

nav li.active {
	background-color: #ddd;
}

.content {
	padding: 24px;
}
</style>
