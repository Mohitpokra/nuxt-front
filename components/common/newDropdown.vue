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
import Vue from 'vue'
import { validationHandler } from './../../utils/validations.js'

export default Vue.extend({
    name :'DropDown',
    props:{
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
    data(){
        return {
            selected: null,
            searchKey: '',
            isOpen: false,
            cursor: -1,
            errorMessage: ''
        }
    },
    computed:{
        optionsList(){
            return this.$props.options
        }
    },
    methods:{
    close() {
		this.isOpen && (this.isOpen = false)
	},
	toggle() {
		this.isOpen = !this.isOpen
		this.isOpen ? this.$emit('onOpen') : this.$emit('onClose')
	},
	select(option) {
		this.selected = option
		this.$emit('input', option.value)
		this.toggle()
		this.searchKey = ''
	},

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
	},

	keyUp(e) {
		if (this.cursor > -1) {
			this.cursor--
			this.scrollToSelected()
		}
	},
	keyDown(e) {
		this.cursor < this.optionsList.length && this.cursor++
		this.scrollToSelected()
	},
	keyEnter(e) {
		if (this.isOpen) {
			if (this.optionsList.length === 1 && this.optionsList[0]) {
				this.select(this.optionsList[0])
			} else if (this.optionsList[this.cursor]) {
				this.select(this.optionsList[this.cursor])
			}
			this.close()
		}
	},
	handleClickOutside(evt) {
		this.$props.closeOnOutSideClick &&
			!this.$el.contains(evt.target) &&
			this.close()
	},
	scrollToSelected() {
        // const optionHeight = this.$refs.option[0].clientHeight
		// if (this.cursor < this.optionsList.length) {
			// ;(this.refs.optionsList as any).scrollTop = optionHeight * this.cursor
		// } else {
			// this.cursor = 1
			// ;(this.$refs.optionsList as any).scrollTop = optionHeight
		// }
	}
    },
    mounted(){
        document.addEventListener('click', this.handleClickOutside)
    },
    destroyed(){
        document.removeEventListener('click', this.handleClickOutside)
    },
    created(){
        const { value, options } = this.$props
        debugger
		value && options && (this.selected = options.find((o) => o.value === value))
    },
    watch:{
        isOpen(flag) {
			// flag && (this.$refs.searchInput as any).focus()
		},
    }
})
</script>

<style lang="scss" scoped>

.drop-down {
	position: relative;
	&.disabled {
		opacity: 0.5;
		pointer-events: none;
	}
}

.dd {
	&__handle {
		border: 2px solid #1f1f1f;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 16px;
		height: 48px;
		cursor: pointer;
	}
	&__placeholder {
		font-size: 16px;
		text-align: left;
		color: #1f1f1f;
		font-weight: 600;
	}
	&__value {
		width: 100%;
		text-align: left;
		&--inline {
			display: flex;
			align-items: flex-end;
			font-weight: 600;
			font-size: 16px;
			.dd__placeholder--minimized {
				font-size: 12px;
				color: balck;
				margin-right: 8px;
				line-height: 20px;
				font-weight: 500;
			}
		}
		&-selected {
			font-size: 18px;
			font-weight: 600;
		}
	}

	&__inner {
		opacity: 0;
		transform: scaleY(0);
		transform-origin: 1% 1%;
		position: absolute;
		top: 56px;
		background-color: #fff;
		transition: 0.25s;
		width: 100%;
		box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
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
	}
	&__option {
		padding: 12px 32px;
		cursor: pointer;
		font-weight: 500;
		transition: 0.45s;
		margin-top: 1px;
		&.selected {
			background-color: #1f1f1f;
			color: #fff;
		}
		&.highlighted,
		&:hover {
			background-color: #1f1f1f;
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
			border: 1px solid #1f1f1f;
			padding: 8px;
			&:focus {
				outline: none;
			}
		}
	}
	&__arrow {
		position: relative;
		width: 16px;
		height: 16px;
		display: flex;
		transform: rotate(-45deg);
		align-items: center;
		&::before {
			position: absolute;
			content: '';
			border: 2px solid #1f1f1f;
			border-right: none;
			border-top: none;
			top: -4px;
			width: 12px;
			height: 12px;
		}
	}
}
.drop-down {
	.dd {
		&__option {
			&:hover {
				background-color: #1f1f1f;
				color:#fff;
			}
		}
	}
	&:hover {
		.dd__handle {
			transition: 0.45s;
			border-color: #1f1f1f;
			box-shadow: 0 2px 25px 0 rgba(0, 0, 0, 0.12);
		}
	}
}
</style>
