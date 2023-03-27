<template>
	<div class="container">
		<!-- Some default layout shared across all pages -->
		<Header />
		<slot />
	</div>
</template>

<style scoped>
.container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}

@media (max-width: 768px) {
	.container {
		align-items: center;
	}
}
</style>
