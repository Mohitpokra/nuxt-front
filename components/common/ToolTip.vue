<template>
	<div class="tooltip-wrapper">
		<i
			class="material-icons"
			@mouseover="messageVisible = true"
			@mouseout="messageVisible = false"
			>info</i
		>
		<div class="tooltip-message" :class="{ visible: messageVisible }">
			{{ message }}
		</div>
	</div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
	name: 'ToolTip',
	props: {
		message: String,
	},

	data: () => ({
		messageVisible: false,
	}),

	methods: {},
})
</script>
<style lang="postcss">

/* .tooltip-wrapper {
	position: relative;
	margin-left: 8px;
	@mixin centerFlex;
	i {
		cursor: pointer;
	}
}
.tooltip-message {
	font-size: 10px;
	background-color: #4c4c4c;
	color: #ffffff;
	border-radius: 3px;
	position: absolute;
	padding: 8px;
	left: 100%;
	top: -6px;
	margin-left: 8px;
	width: 200px;
	opacity: 0;
	transform: scale(0);
	transform-origin: top left;
	font-size: 11px;
	@mixin cardHoverShadow;
	@mixin transition;
	&.visible {
		transform: scale(1);
		opacity: 1;
	}
	&:before {
		border-width: 6px;
		border-style: solid;
		border-color: transparent #4c4c4c transparent transparent;
		position: absolute;
		left: -12px;
		top: 6px;
		content: '';
	}
} */
</style>
