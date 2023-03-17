<script setup lang="ts"></script>

<template>
	<div class="container">
		<header>
			<img
				alt="logo"
				class="logo"
				src="../assets/logo.png"
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
	</div>
</template>

<style scoped>
.container {
	width: 100%;
	max-height: 100vh;
	overflow: auto;
}

header {
	line-height: 1.5;
}

.logo {
	display: block;
	margin: 0 auto 2rem;
}
</style>
