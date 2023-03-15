<template>
	<div class="item">
		<i>
			<!-- added to clarify: In Vue.js, a slot is a placeholder for content that
			can be passed into a component from its parent component. Slots allow you
			to create reusable components that can be customized and extended with
			different content depending on the context in which they are used. In the
			example below, the slot element is used to define two named slots: "icon"
			and "heading". These slots are placeholders for content that can be added
			to the component when it is used in a parent component. -->
			<slot name="icon"></slot>
		</i>
		<div class="details">
			<h3>
				<slot name="heading"></slot>
			</h3>
			<slot></slot>
			<!-- added to clarify: The slot element without a name attribute is used to
			define a default slot, which is used if no named slot is provided.  -->
		</div>
	</div>
</template>

<style scoped>
.item {
	margin-top: 2rem;
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
