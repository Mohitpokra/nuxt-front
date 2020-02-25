<template>
	<div>
		<div class="inp-wrapper">
            <div class="flex justify-content-between">
                <label for="login-email">Email</label>
                <span class="inp-error">Invalid</span>
            </div>
            <b-input :class="{form_fill: user.email}" size="lg" id="login-email" placeholder="charlie@email.com"></b-input>
            <b-form-invalid-feedback :state="error_state.email">
                {{error.email}}
            </b-form-invalid-feedback>
        </div>
	</div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
	name: 'TextInput',
})
</script>
<style lang="scss">

</style>