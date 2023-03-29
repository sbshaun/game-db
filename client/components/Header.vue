<script setup lang="ts">
const currentTab = ref('videogames');

const selectTab = (tabName: string) => {
	currentTab.value = tabName;
};
</script>

<template>
	<nav class="topMenu">
		<ul>
			<nuxt-link to="/" @click="selectTab('videogames')">
				<li :class="{ active: currentTab === 'videogames' }">Video Games</li>
			</nuxt-link>
			<nuxt-link to="/franchises" @click="selectTab('franchises')">
				<li :class="{ active: currentTab === 'franchises' }">Franchises</li>
			</nuxt-link>
			<nuxt-link to="/developers" @click="selectTab('developers')">
				<li :class="{ active: currentTab === 'developers' }">Developers</li>
			</nuxt-link>
			<nuxt-link to="/characters" @click="selectTab('characters')">
				<li :class="{ active: currentTab === 'characters' }">Characters</li>
			</nuxt-link>
			<nuxt-link to="/stats" @click="selectTab('stats')">
				<li :class="{ active: currentTab === 'stats' }">Stats</li>
			</nuxt-link>
			<nuxt-link to="/projections" @click="selectTab('projections')">
				<li :class="{ active: currentTab === 'projections' }">Projections</li>
			</nuxt-link>
		</ul>
	</nav>
</template>

<style scoped>
.topMenu {
	width: 100%;
	background-color: #eee;
	display: flex;
	justify-content: center;
}

ul {
	display: flex;
	justify-content: center;
	align-items: center;
	list-style: none;
	padding: 0;
	margin: 0;
}

li {
	padding: 12px 24px;
	cursor: pointer;
	transition: background-color 0.3s;
	font-size: 1rem;
}

li.active,
li:hover {
	background-color: #ddd;
}

nuxt-link {
	text-decoration: none;
	color: inherit;
}

@media (max-width: 768px) {
	ul {
		width: 100%;
		flex-direction: column;
	}

	li {
		width: 100vw;
		padding: 3px 0;
		font-size: 1.2rem;
		text-align: center;
	}
}
</style>
