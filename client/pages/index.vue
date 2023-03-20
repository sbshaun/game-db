<script setup lang="ts">
const currentTab = ref('videogames');
</script>

<template>
	<div class="container">
		<header class="header">
			<Header @update-tab="currentTab = $event" />
		</header>

		<main class="content">
			<template v-if="currentTab === 'videogames'">
				<h1>Videogames</h1>
			</template>
			<template v-if="currentTab === 'franchise'">
				<h1>Franchise</h1>
			</template>
			<template v-if="currentTab === 'posts'">
				<h1>Posts</h1>
			</template>
			<template v-if="currentTab === 'developer'">
				<h1>Developer</h1>
			</template>
			<template v-if="currentTab === 'studio'">
				<h1>Studio</h1>
			</template>
			<template v-if="currentTab === 'individualdeveloper'">
				<h1>Individual Developer</h1>
			</template>
			<template v-if="currentTab === 'character'">
				<h1>Character</h1>
			</template>
			<template v-if="currentTab === 'voiceactor'">
				<VoiceActor />
			</template>
			<template v-if="currentTab === 'comments'">
				<h1>Comments</h1>
			</template>
			<template v-if="currentTab === 'users'">
				<h1>Users</h1>
			</template>
		</main>
	</div>
</template>

<style scoped>
.container {
	width: 100%;
	height: 100%;
}

.header {
	max-height: 5vh;
}

.content {
	height: 95vh;
}
</style>
