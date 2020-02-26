<template>
	<div :class="{ disabled: disabled }">
		<label
			class="check-container"
			:class="[
				'checkbox-ui',
				{
					selected: isChecked,
				},
			]"
		>
			<input type="checkbox" v-model="isChecked" id="check-comp" />
			<span class="checkmark"></span>
		</label>
		<label class="check-label" for="check-comp">{{ label }}</label>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'CheckBoxInput',
	props: {
		label: {
			type: String,
			required: true,
		},
		checked: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		isChecked: false,
	}),
	mounted() {
		this.isChecked = this.$props.checked
	},
	watch: {
		isChecked(val) {
			this.$emit('click', val)
		},
	},
})
</script>

<style lang="postcss" scoped>
@import '@css/_settings.css';
/* The container */
.check-container {
	display: block;
	position: relative;
	padding-left: 35px;
	cursor: pointer;
	font-size: 22px;
	user-select: none;
}

/* Hide the browser's default checkbox */
.check-container input {
	position: absolute;
	opacity: 0;
	cursor: pointer;
	height: 0;
	width: 0;
}

/* Create a custom checkbox */
.checkmark {
	position: absolute;
	top: 0;
	left: 0;
	height: 19px;
	width: 19px;
	background-color: #eee;
	border: 1px solid #aaadad;
	border-radius: 4px;
}

/* On mouse-over, add a grey background color */
.check-container:hover input ~ .checkmark {
	background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.check-container input:checked ~ .checkmark {
	background-color: $purple;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
	content: '';
	position: absolute;
	display: none;
}

/* Show the checkmark when checked */
.check-container input:checked ~ .checkmark:after {
	display: block;
}

/* Style the checkmark/indicator */
.check-container .checkmark:after {
	left: 6px;
	top: 2px;
	width: 6px;
	height: 11px;
	border: solid white;
	border-width: 0 3px 3px 0;
	transform: rotate(45deg);
}
.check-label {
	margin-left: 27px;
	cursor: pointer;
}
</style>
