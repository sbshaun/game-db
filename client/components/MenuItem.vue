<template>
	<div class="item">
		<i>
			<slot name="icon"></slot>
			<!-- slots in Vue 3: https://vuejs.org/guide/components/slots.html#slot-content-and-outlet -->
		</i>
		<div class="details">
			<h3>
				<slot name="heading"></slot>
			</h3>
			<slot></slot>
		</div>
	</div>
</template>

<style scoped>
.item {
	padding: 3rem;
	display: flex;
}

.details {
	flex: 1;
	margin-left: 1rem;
}

i {
	display: flex;
	place-items: center;
	place-content: center;
	width: 32px;
	height: 32px;

	color: var(--color-text);
}

h3 {
	font-size: 1.7rem;
	font-weight: 500;
	margin-bottom: 0.4rem;
	color: var(--color-heading);
}
</style>
