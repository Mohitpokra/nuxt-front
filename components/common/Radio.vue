<template>
	<div>
		<div :class="componentClassName">
			<div
				v-for="item in options"
				:key="item.value"
				@click="selectItem(item)"
				:class="getOptionsItemClassName(item)"
			>
				{{ item.label }}
			</div>
		</div>
		<div v-if="errorMessage" class="cf-error">{{ errorMessage }}</div>
	</div>
</template>

<script lang="js">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { isNotNull } from './../../utils/index.js'
import { validationHandler } from './../../utils/validations.js'

@Component({
	props: {
		options: Array,
		showBlock: {
			type: Boolean,
			default: false,
		},
		showAsCfButtons: {
			type: Boolean,
			default: false,
		},
		value: {
			type: [String, Boolean, Number],
		},
		validations: {
			type: Array,
		},
	},
})
export default class Radio extends Vue {
	name = 'Radio'
	selectedValue = null
	errorMessage = ''

	created() {
		const { value } = this.$props
		this.setValue(value)
	}

	@Watch('value')
	updateValue(value) {
		this.setValue(value)
	}

	setValue(value) {
		const { options } = this.$props
		if (isNotNull(value)) {
			this.selectedValue = options.find((o) => o.value === value)
		} else {
			this.selectedValue = value
		}
	}

	isValid(showError = false) {
		if (this.$props.validations) {
			const validationObj = validationHandler(
				this.selectedValue,
				this.$props.validations,
			)

			const { message, isValid } = validationObj

			showError && (this.errorMessage = message || null)
			return isValid
		} else {
			return true
		}
	}

	selectItem(selected) {
		this.selectedValue = selected
		this.$emit('input', selected.value)
	}

	get componentClassName() {
		const { showAsCfButtons } = this.$props
		return [showAsCfButtons ? 'cf-button-radio' : 'cf-radio'].join('')
	}

	getOptionsItemClassName(item) {
		const { showBlock = false, showAsCfButtons = false } = this.$props
		return [
			showAsCfButtons ? 'cf-button-radio__option' : 'cf-radio__option',
			this.selectedValue && this.selectedValue.value === item.value
				? 'selected'
				: '',
			showBlock ? 'cf-radio__option--block' : '',
		].join(' ')
	}
}
</script>

<style lang="postcss" scoped>
@import '@css/_settings.css';
@import '@css/_mixins.css';

.cf-radio {
	text-align: center;
	display: inline-block;
	&__option {
		display: inline-block;
		padding-left: 32px;
		position: relative;
		cursor: pointer;
		min-height: 16px;
		font-size: 16px;
		&--block {
			display: block;
			margin-top: 8px;
			text-align: left;
			&:first-child {
				margin-top: 0px;
			}
		}
		&:not(:last-child) {
			margin-right: 24px;
		}
		&.selected {
			&:before {
				border-color: $black;
			}
			&:after {
				transform: translateY(-50%) scale(1);
				opacity: 1;
				background-color: $purple;
			}
		}
		&:after {
			position: absolute;
			content: '';
			width: 12px;
			height: 12px;
			left: 4px;
			top: 50%;
			transform: translateY(-50%) scale(0);
			background-color: $purple;
			border-radius: 10px;
			@mixin transition all, 0.4s;
		}
		&:before {
			background-color: #ffffff;
			position: absolute;
			content: '';
			width: 20px;
			height: 20px;
			left: 0px;
			top: 50%;
			transform: translateY(-50%);
			border: 1px solid $black;
			border-radius: 20px;
		}
	}
}

.cf-button-radio {
	&__option {
		min-width: 137px;
		font-size: 20px;
		padding: 16px;
		border-radius: $radius;
		border: 1px solid $black-50;
		display: inline-block;
		cursor: pointer;
		text-align: center;
		font-weight: $bold;
		@mixin transition;
		background-color: #fff;
		margin-right: 36px;
		&:last-child {
			margin-right: 0;
		}
		&:hover {
			border-color: $purple;
			box-shadow: 0 1px 16px 0 rgba(107, 122, 254, 0.3);
		}
		&.selected {
			background-color: $purple;
			color: #fff;
			border-color: $purple;
		}
		/* @media screen and (max-width: 768px) {
			font-size: 14px;
			padding: 10px;
			height: 40px;
			justify-content: center;
			border: 1px solid var(--black);
			&.selected {
				background-color: rgba(107, 122, 254, 0.16);
				color: $purple;
				border-color: $purple;
			}
		} */
	}
	@media screen and (max-width: 768px) {
		display: flex;
		flex: 1;
		justify-content: space-between;
		&__option {
			font-size: 14px;
			padding: 10px;
			min-height: 40px;
			justify-content: center;
			border: 1px solid $black-50;
			width: 45%;
			margin: 0px;
			&.selected {
				background-color: rgba(107, 122, 254, 0.16);
				color: $purple;
				border-color: $purple;
			}
		}
	}
}
</style>
