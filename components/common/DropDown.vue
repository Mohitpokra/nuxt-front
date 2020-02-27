<template>
	<div class="drop-down" :class="{ disabled: disabled }">
		<div class="dd__handle" @click="toggle">
			<div
				class="dd__value"
				:class="{ 'dd__value--inline': inlineLabel }"
				v-if="selected"
			>
				<div class="dd__placeholder--minimized" v-if="showLabelOnSelection">
					{{ label }}
				</div>
				<div class="dd__value-selected">{{ selected.label }}</div>
			</div>
			<div class="dd__placeholder" v-else>{{ label }}</div>
			<div class="dd__arrow" v-if="showDropDownArrow"></div>
		</div>
		<div class="dd__inner" :class="{ reveal: isOpen }">
			<div class="dd__header" v-if="showHeaderText">{{ headerText }}</div>
			<div class="dd__search-wrapper" v-show="options.length > 5">
				<input
					type="text"
					class="dd__search-input"
					ref="searchInput"
					v-model="searchKey"
					:placeholder="placeholder"
					@keydown.up="keyUp"
					@keydown.down="keyDown"
					@keyup.enter="keyEnter"
				/>
			</div>
			<div class="dd__options" ref="optionsList">
				<div v-if="optionsList.length < 1" class="dd__option">
					No results found
				</div>
				<div
					v-else
					class="dd__option"
					ref="option"
					v-for="(option, index) in optionsList"
					:class="{
						highlighted: index === cursor,
						selected: (selected && selected.value) === option.value,
					}"
					:key="`${option.label}-${option.value}`"
					@click="select(option)"
					@mouseover="cursor = index"
					@mouseout="cursor = -1"
				>
					{{ option.label }}
					<span class="option-subtitle" v-if="showOptionsubTitle">{{
						option.subTitle
					}}</span>
				</div>
			</div>
			<slot name="footer"></slot>
		</div>
		<div v-if="errorMessage" class="cf-error">{{ errorMessage }}</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { filterSearchKey } from '@/utils/Common'
import { onEscPress } from '@/utils/KeyboardUtils'
import { ILVItem } from '@/interfacepool'
import { validationHandler } from '@/Validations'

interface IOption {
	label: string
	value: any
}

@Component({
	props: {
		options: {
			type: Array,
			default: [],
		},
		closeOnOutSideClick: {
			type: Boolean,
			default: true,
		},
		showLabelOnSelection: {
			type: Boolean,
			default: false,
		},
		showHeaderText: {
			type: Boolean,
			default: true,
		},
		label: {
			type: String,
			default: 'Select',
		},
		placeholder: {
			type: String,
			default: 'Search',
		},
		headerText: {
			type: String,
			default: 'Select',
		},
		showDropDownArrow: {
			type: Boolean,
			default: true,
		},
		showOptionsubTitle: {
			type: Boolean,
			default: false,
		},
		value: {
			type: [Number, String],
		},
		// isSearchable: {
		// 	type: Boolean,
		// 	default: true,
		// },
		inlineLabel: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		validations: {
			type: Array,
		},
	},
	watch: {
		isOpen(flag) {
			flag && (this.$refs.searchInput as any).focus()
		},
	},
})
export default class DropDown extends Vue {
	name = 'DropDown'
	selected? = null
	searchKey = ''
	isOpen = false
	cursor = -1
	errorMessage = ''

	close() {
		this.isOpen && (this.isOpen = false)
	}

	toggle() {
		this.isOpen = !this.isOpen
		this.isOpen ? this.$emit('onOpen') : this.$emit('onClose')
	}

	select(option) {
		this.selected = option
		this.$emit('input', option.value)
		this.toggle()
		this.searchKey = ''
	}

	isValid(showError = false) {
		if (this.$props.validations) {
			const validationObj = validationHandler(
				this.selected,
				this.$props.validations,
			)

			const { message, isValid } = validationObj

			showError && (this.errorMessage = message || null)
			return isValid
		} else {
			return true
		}
	}

	keyUp(e) {
		if (this.cursor > -1) {
			this.cursor--
			this.scrollToSelected()
		}
	}
	keyDown(e) {
		this.cursor < this.optionsList.length && this.cursor++
		this.scrollToSelected()
	}
	keyEnter(e) {
		if (this.isOpen) {
			if (this.optionsList.length === 1 && this.optionsList[0]) {
				this.select(this.optionsList[0])
			} else if (this.optionsList[this.cursor]) {
				this.select(this.optionsList[this.cursor])
			}
			this.close()
		}
	}
	handleClickOutside(evt) {
		this.$props.closeOnOutSideClick &&
			!this.$el.contains(evt.target) &&
			this.close()
	}

	scrollToSelected() {
		const optionHeight = this.$refs.option[0].clientHeight
		if (this.cursor < this.optionsList.length) {
			;(this.$refs.optionsList as any).scrollTop = optionHeight * this.cursor
		} else {
			this.cursor = 1
			;(this.$refs.optionsList as any).scrollTop = optionHeight
		}
	}

	get optionsList() {
		return filterSearchKey(this.$props.options, this.searchKey, 'label')
	}

	created() {
		const { value, options } = this.$props
		value && options && (this.selected = options.find((o) => o.value === value))
	}

	@Watch('value')
	updateValue(value) {
		const { options = [] } = this.$props
		this.selected =
			options.length && value ? options.find((o) => o.value === value) : null
	}

	mounted() {
		document.addEventListener('click', this.handleClickOutside)
	}

	destroyed() {
		document.removeEventListener('click', this.handleClickOutside)
	}
}
</script>

<style lang="postcss">
/* @import '@css/_settings.css';
@import '@css/_mixins.css';

.drop-down {
	position: relative;
	&.disabled {
		opacity: 0.5;
		pointer-events: none;
	}
}

.dd {
	&__handle {
		border: 1px solid $black-60;
		border-radius: 4px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 16px;
		height: 60px;
		cursor: pointer;
	}
	&__placeholder {
		font-size: 16px;
		text-align: left;
		color: $black-60;
		font-weight: $medium;
		&--minimized {
			font-size: 10px;
			text-transform: uppercase;
			text-align: left;
		}
	}

	&__value {
		width: 100%;
		text-align: left;
		&--inline {
			display: flex;
			align-items: flex-end;
			font-weight: $bold;
			font-size: 16px;
			.dd__placeholder--minimized {
				font-size: 12px;
				color: $purple;
				margin-right: 8px;
				line-height: 20px;
				font-weight: $medium;
			}
		}
		&-selected {
			font-size: 18px;
			font-weight: $bold;
		}
	}

	&__inner {
		opacity: 0;
		transform: scaleY(0);
		transform-origin: 1% 1%;
		position: absolute;
		top: 0;
		background-color: #fff;
		transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
		width: 100%;
		border: 1px solid $purple;
		border-radius: 4px;
		box-shadow: 0 2px 25px 0 rgba(0, 0, 0, 0.12);
		&.reveal {
			opacity: 1;
			transform: scaleY(1);
			z-index: 300;
		}
	}
	&__options {
		max-height: 350px;
		overflow: auto;
		text-align: left;
		margin-top: 8px;
	}
	&__option {
		padding: 10px 14px;
		cursor: pointer;
		font-weight: $medium;
		@mixin transition;
		&.selected {
			background: url('../../assets/img/checkmark.svg') no-repeat;
			background-position: top 15px right 10px;
		}
		&.highlighted,
		&:hover {
			background-color: $listhover;
		}
	}

	&__header {
		padding: 16px 14px 6px 14px;
		text-transform: uppercase;
		font-size: 10px;
		letter-spacing: 1px;
		text-align: left;
	}

	&__search-wrapper {
		margin: 6px 14px 0;
		input {
			width: 100%;
			border-radius: 4px;
			border: 1px solid $purple;
			padding: 8px;
			&:focus {
				outline: none;
			}
		}
	}
	&__arrow {
		display: inline-block;
		font-family: 'iconfont' !important;
		speak: none;
		font-style: normal;
		font-weight: $bold;
		font-variant: normal;
		text-transform: none;
		line-height: 1;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		line-height: 9px;
		width: 16px;
		height: 9px;
		&::before {
			
			content: '\e906';
			color: inherit;
			font-size: 16px;
		}
	}
}
.drop-down {
	.dd {
		&__option {
			&:hover {
				background-color: $listhover;
			}
		}
	}
	&:hover {
		.dd__handle {
			@mixin transition;
			border-color: $purple;
			box-shadow: 0 2px 25px 0 rgba(0, 0, 0, 0.12);
		}
	}
} */
</style>
