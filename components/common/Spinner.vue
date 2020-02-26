<template>
	<div class="w--spinner" :class="componentClassName">
		<div class="bounce1" />
		<div class="bounce2" />
		<div class="bounce3" />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
	props: {
		options: Array,
		componentClassName: String,
	},
})
export default class Spinner extends Vue {
	name: string = 'Spinner'
}
</script>

<style lang="postcss">
@import '@css/_settings.css';
/* spinner widget component */
.w--spinner {
	width: 70px;
	text-align: center;
	margin: 0 auto;
}

.w--spinner.narrow {
	width: 48px;
}

.w--spinner > div {
	width: 10px;
	height: 10px;
	margin-left: 3px;
	background-color: #030303;
	border-radius: 100%;
	display: inline-block;
	-webkit-animation: bouncedelay 1.4s infinite ease-in-out;
	animation: bouncedelay 1.4s infinite ease-in-out;
	-webkit-animation-fill-mode: both;
	animation-fill-mode: both;
}

.w--spinner .bounce1 {
	-webkit-animation-delay: -0.32s;
	animation-delay: -0.32s;
}

.w--spinner .bounce2 {
	-webkit-animation-delay: -0.16s;
	animation-delay: -0.16s;
}

@-webkit-keyframes bouncedelay {
	0%,
	80%,
	100% {
		-webkit-transform: scale(0);
	}
	40% {
		-webkit-transform: scale(1);
	}
}

@keyframes bouncedelay {
	0%,
	80%,
	100% {
		transform: scale(0);
		-webkit-transform: scale(0);
	}
	40% {
		transform: scale(1);
		-webkit-transform: scale(1);
	}
}
</style>
