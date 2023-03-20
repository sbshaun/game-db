<script setup lang="ts"></script>

<template>
	<div class="container">
		<header>
			<div class="wrapper">
				<Header />
			</div>
		</header>

		<main>
			<Menu />
		</main>
	</div>
</template>

<style scoped>
.container {
	width: 100%;
	height: 100%;
	overflow: hidden;
}

header {
	line-height: 1.5;
}

.logo {
	display: block;
	margin: 0 auto 2rem;
}
</style>
