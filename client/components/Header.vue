<script setup lang="ts">
import { ref } from 'vue';

const tabs = [
	{ id: 1, title: 'videogames' },
	{ id: 2, title: 'franchise' },
	{ id: 3, title: 'posts' },
];

const currentTab = ref(1);
</script>

<template>
	<div>
		<div class="header">
			<nav>
				<ul>
					<li
						v-for="tab in tabs"
						:key="tab.id"
						:class="{ active: tab.id === currentTab }"
						@click="currentTab = tab.id"
					>
						{{ tab.title }}
					</li>
				</ul>
			</nav>
		</div>
		<div class="content">
			<div v-if="currentTab === 1">
				<h1>videogames</h1>
			</div>
			<div v-if="currentTab === 2">
				<h1>franchise</h1>
			</div>
			<div v-if="currentTab === 3">
				<h1>posts</h1>
			</div>
		</div>
	</div>
</template>

<style scoped>
.header {
	background-color: #f1f1f1;
}

nav ul {
	display: flex;
	justify-content: space-between;
	list-style-type: none;
	margin: 0;
	padding: 0;
}

nav li {
	padding: 12px 24px;
	cursor: pointer;
}

nav li.active {
	background-color: #ddd;
}

.content {
	padding: 24px;
}
</style>
