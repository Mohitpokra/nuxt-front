<template>
	<button
		class="app-button"
		:disabled="isLoading"
		:class="className"
		@click="click"
	>
		<slot name="beforeTitle"></slot>
		<Spinner v-if="isLoading" class="btn-spinner" />
		<span v-else>{{ title }}</span>
		<slot name="afterTitle">
			<span v-if="showArrow" class="right-arrow"></span>
		</slot>
	</button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
	props: {
		title: {
			type: String,
			default: 'Submit',
		},
		theme: {
			type: String,
			default: 'purple',
		},
		size: {
			type: String,
			default: 'medium',
		},
		showArrow: {
			type: Boolean,
			default: false,
		},
		isLoading: Boolean,
	},
})
export default class AppButton extends Vue {
	get className() {
		const { size, theme } = this.$props
		return [
			size ? `app-button--${size}` : '',
			theme ? `app-button--${theme}` : '',
		].join(' ')
	}

	click(e) {
		this.$emit('click', e)
	}
}
</script>

<style lang="postcss">
@import '@css/_settings.css';
@import '@css/_mixins.css';

.app-button {
	font-size: 14px;
	padding: 10px 15px;
	border-radius: 4px;
	transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
	display: inline-block;
	cursor: pointer;
	box-shadow: none;
	outline: none;
	font-weight: $medium;
	border: none;
	&:empty {
		display: none;
	}
	&--block {
		display: block;
		width: 100%;
	}
	&--purple {
		background-color: $purple;
		color: #fff;
	}
	&--bordered {
		border: 1px solid $purple;
		color: $purple;
		border-radius: 4px;
		background-color: #fff;
		&:hover {
			box-shadow: 0 1px 16px 0 rgba(107, 122, 254, 0.3);
		}
	}
	&--medium {
		height: 45px;
		font-size: 16px;
	}
	&--large {
		height: 60px;
		font-size: 20px;
		font-weight: bold;
		font-size: 18px;
		padding-left: 20px;
	}
	&--block {
		width: 100%;
	}
	&:hover {
		.right-arrow {
			right: 20px;
		}
	}
	@media screen and (max-width: 768px) {
		height: 46px;
		box-shadow: 0 3px 8px 0 #a8b1ff;
		text-transform: uppercase;
		font-size: 14px;
	}
}
.right-arrow {
	position: absolute;
	right: 30px;
	display: block;
	top: 28px;
	width: 20px;
	background-color: #fff;
	height: 2px;
	transition: 0.2s;
	&:before {
		@mixin pseudoicon 12px, 12px, #fff, transparent, auto, 0px, -5px, auto;
		transform: rotate(45deg);
		border: 5px solid;
		border-color: #fff #fff transparent transparent;
	}
}
</style>
<style lang="postcss">
@import '@css/_settings.css';
.app-button {
	.btn-spinner.w--spinner {
		& > div {
			background-color: #fff;
		}
	}
}
</style>
