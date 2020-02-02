<template>
<b-container class="mt-5 pb-5">
    <b-row class="pt-2 my-5 pb-3" align-h="center">
        <b-col lg="6" cols="12">
            <h3 class="text-center">Create your account to start<br class="d-lg-none"> searching
                homes by mortgage <br class="d-lg-none"> payment.</h3>
            <b-row class="mt-5" align-h="center">
                <b-col lg="9" cols="12">
                    <b-form>
                        <label class="p3" for="login-name">Name</label>
                        <b-input :class="{form_fill: user.name}" v-model.trim="user.name" :state="error_state.name" size="lg" id="login-name" placeholder="Charlie Exampleton"></b-input>
                        <b-form-invalid-feedback :state="error_state.name">
                            {{error.name}}
                        </b-form-invalid-feedback>
                        <label class="mt-2 p3" for="login-email">Email</label>
                        <b-input :class="{form_fill: user.email}" v-model.trim="user.email" :state="error_state.email" size="lg" id="login-email" placeholder="charlie@email.com"></b-input>
                        <b-form-invalid-feedback :state="error_state.email">
                            {{error.email}}
                        </b-form-invalid-feedback>
                        <label class="mt-2 p3" for="login-password">Password</label>
                        <b-input :class="{form_fill: user.password}" v-model="user.password" :state="error_state.password" size="lg" id="login-password" type="password" placeholder="••••••••"></b-input>
                        <b-form-invalid-feedback :state="error_state.password">
                            {{error.password}}
                        </b-form-invalid-feedback>
                        <div class="mt-5">
                            <b-button block variant="primary" :disabled="isDisable" size="lg">Sign Up</b-button>
                            <p class="mt-4 p2">You’ll need to obtain a license key to access but it’s free of charge during our beta.</p>
                        </div>
                    </b-form>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
export default {
    data() {
        return {
            user: {
                name: null,
                email: null,
                password: null,
            },
            error: {
                name: '',
                email: '',
                password: '',
            },
            error_state: {
                name: null,
                email: null,
                password: null
            }
        }
    },
    computed: {
        isDisable() {
            if(this.user.name && this.user.email && this.user.password) {
                return false;
            } else {
                return true;
            }
        }
    }
}
</script>

<style>

</style>
