<script setup lang="ts">
import Header from './components/Header.vue';
import Menu from './components/Menu.vue';
</script>

<template>
	<header>
		<img
			alt="logo"
			class="logo"
			src="./assets/logo.png"
			width="125"
			height="125"
		/>

		<div class="wrapper">
			<Header />
		</div>
	</header>

	<main>
		<Menu />
	</main>
</template>

<style scoped>
header {
	line-height: 1.5;
}

.logo {
	display: block;
	margin: 0 auto 2rem;
}
</style>
