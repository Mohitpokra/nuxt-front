<template>
	<div>
		<div class="mobile-input-wrapper">
			<div class="country-code" :class="{ visible: isFocused || !!mobileNo }">
				+91
			</div>
			<div>
				<div
					class="placeholder-header"
					:class="{ visible: isFocused || !!mobileNo }"
				>
					{{ placeholder }}
				</div>
				<input
					v-model="mobileNo"
					type="tel"
					maxlength="10"
					@focus="handleFocus"
					@blur="handleBlur"
					class="mobile-input"
				/>
			</div>
			<div v-if="errorMessage" class="cf-error">{{ errorMessage }}</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import { validationHandler } from '@/Validations'

export default Vue.extend({
	name: 'Mobile',
	props: {
		value: [String, Number],
		placeholder: {
			type: [String, Number],
			default: 'Mobile No',
		},
		validations: Array,
		showErrorOnBlur: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		isFocused: false,
		mobileNo: null,
		isTouched: false,
		errorMessage: '',
	}),

	methods: {
		isValid(showError = false) {
			if (this.$props.validations) {
				const validationObj = validationHandler(
					this.mobileNo,
					this.$props.validations,
				)
				const { message, isValid } = validationObj

				showError && (this.errorMessage = message || null)

				return isValid
			} else {
				return true
			}
		},
		handleFocus() {
			this.isFocused = true
			this.$emit('focus', this.valueInput)
		},
		handleBlur() {
			this.touched = true
			this.isFocused = false
			this.isValid(this.$props.showErrorOnBlur)
			this.$emit('blur', this.valueInput)
		},
	},
	watch: {
		mobileNo(val) {
			this.mobileNo = val
			this.isFocused && this.isValid()
			this.$emit('input', val)
		},
	},
	mounted() {
		this.mobileNo = this.$props.value
	},
})
</script>

<style lang="postcss" scoped>
@import '@css/_settings.css';
@import '@css/_mixins.css';

.mobile-input-wrapper {
	position: relative;
	min-width: 220px;
	font-weight: $medium;
}
.country-code {
	position: absolute;
	left: 15px;
	position: absolute;
	top: 24px;
	opacity: 0;
	font-size: 16px;
	&:after {
		@mixin pseudoicon 1px, 19px, transparent, rgba(3, 3, 3, 0.4), auto, -6px,
			auto, 2px;
	}
	&.visible {
		opacity: 1;
		transition: opacity 0.2s;
	}
}
.mobile-input {
	padding: 23px 8px 9px 57px;
	border-radius: 4px;
	border: 1px solid #ddd;
	outline: none;
}
.placeholder-header {
	position: absolute;
	left: 16px;
	pointer-events: none;
	transition: 0.2s;
	top: 28px;
	font-weight: 400;
	transform: translateY(-50%);
	&.visible {
		top: 14px;
		font-size: 12px;
		opacity: 0.4;
	}
}
</style>
