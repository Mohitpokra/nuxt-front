<template>
	<div
		class="app-modal"
		:class="className"
		v-show="show"
		@click="closeOnOutsideClick"
		ref="modalParent"
	>
		<div class="app-modal__content">
			<div
				class="app-modal__close"
				:class="{ 'app-modal__close--inverted': isInvertedCloseIcon }"
				@click="close"
				v-if="showCloseIcon"
			></div>
			<slot></slot>
		</div>
	</div>
</template>

<script lang="js">
import { Component, Vue, Watch } from 'vue-property-decorator'
// import { onEscPress } from '@/utils/KeyboardUtils'

@Component({
	props: {
		show: {
			type: Boolean,
			default: false,
		},
		theme: {
			type: String,
			default: 'default',
		},
		showCloseIcon: {
			type: Boolean,
			default: true,
		},
		isMobileDevice: {
			type: Boolean,
			default: false,
		},
		isFullScreen: Boolean,
		isInvertedCloseIcon: Boolean,
		isNestedModal: Boolean,
		closeOnOutside: {
			type: Boolean,
			default: false,
		},
	},
})
export default class Modal extends Vue {
	name: string = 'Modal'

	get className() {
		const { theme, isMobileDevice, isFullScreen } = this.$props
		return [
			theme ? `app-modal-${theme}` : '',
			isMobileDevice ? `app-modal--mobile` : '',
			isFullScreen ? `app-modal--fullscreen` : '',
		].join(' ')
	}

	close() {
		this.$emit('close')
	}

	// @Watch('show')
	// blockBodyScroll() {
	// 	document.body.style.overflow = this.$props.show ? 'hidden' : ''
	// }
	created() {
		const { show, isNestedModal } = this.$props
		// onEscPress(() => show && this.close())
		!isNestedModal && show && document.body.classList.add('modal-open')
	}
	destroyed() {
		const { isNestedModal } = this.$props
		!isNestedModal && document.body.classList.remove('modal-open')
	}
	closeOnOutsideClick(event) {
		if (this.$refs.modalParent === event.target) {
			if (this.$props.closeOnOutside) {
				this.close()
			}
		}
	}
}
</script>

<style lang="postcss">
/* @import '@css/_settings.css';
@import '@css/_mixins.css';
@import '@css/_keyframes.css';

.app-modal {
	background-color: $black-80;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 302;
	overflow: auto;
	@mixin AnimateContent 0s, fadeincontent, 0.3s;
	&--mobile {
		padding-left: 18px;
		padding-right: 18px;
		padding-bottom: 60px;
		background-color: $black-60;
		.app-modal__close {
			margin-top: 4px;
		}
		& > .app-modal__content {
			margin-top: 60px;
			max-width: 100%;
		}
		&.app-modal--fullscreen {
			padding: 0;
			& > .app-modal__content {
				margin-top: 0;
				height: 100%;
			}
		}
	}
	&__content {
		background: #fff;
		@mixin cardBaseShadow;
		border-radius: 3px;
		position: relative;
		padding: 20px;
		max-width: 770px;
		margin: 0 auto;
		backface-visibility: hidden;
	}
	&__close {
		@mixin iconCross;
		position: absolute;
		cursor: pointer;
		right: 12px;
		top: 10px;
		z-index: 2;
		text-decoration: none;
		&:before {
			font-size: 14px;
		}
		&--inverted {
			background-color: #000;
			right: -10px;
			top: -20px;
			border-radius: 100px;
			width: 30px;
			height: 30px;
			display: flex;
			justify-content: center;
			align-items: center;
			&:before {
				font-size: 12px;
				color: #fff;
			}
		}
	}
}
.app-modal-default {
	.app-modal__content {
		opacity: 0;
		@mixin AnimateContent 0.45, fadeincontent, 0.35s;
	}
}
.app-modal-slideup {
	.app-modal__content {
		opacity: 0;
		transform: translateY(20%);
		@mixin AnimateContent 0.45s, slideup, 0.35s;
	}
}
.app-modal-slidedown {
	.app-modal__content {
		opacity: 0;
		@mixin AnimateContent 0.45s, slidedown, 0.35s;
	}
} */
</style>
