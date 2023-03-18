<script setup lang="ts">
import { ref } from 'vue';
import getServerResponse from '../api/test';

const message = ref('');

async function handleClick() {
	// delete this in the future
	const response = await getServerResponse();
	message.value = response.message;
}
</script>

<template>
	<div class="greetings">
		<h1 class="green"><pre>👋 GameHaven: 💬💻 for 🎮 fans!</pre></h1>
		<h3>
			hello this is a message to welcome the marker, the only user of our
			applicaiton.
		</h3>
		<div class="test-server">
			<!-- delete this in the future -->
			<button @click="handleClick">test server response</button>
			<p>{{ message }}</p>
		</div>
	</div>
</template>

<style scoped>
.test-server {
	margin-top: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
}

h1 {
	overflow: auto;
	font-weight: 500;
	font-size: 2.7rem;
	top: -10px;
}

h3 {
	font-size: 1rem;
}

.greetings h1,
.greetings h3 {
	text-align: center;
}
</style>
