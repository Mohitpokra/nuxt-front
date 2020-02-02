<template>
<b-container class="my-5 pb-2">
    <b-row class="pt-2 my-5" align-h="center">
        <b-col lg="6" cols="12">
            <h3 class="text-center">Sign into your account.</h3>
            <b-row class="mt-5" align-h="center">
                <b-col></b-col>
                <b-col lg="9" cols="12">
                    <b-form>
                        <label class="mt-2 p3" for="login-email">Email</label>
                        <b-input :class="{form_fill: user.email}" v-model.trim="user.email" :state="error_state.email" size="lg" id="login-email" placeholder="charlie@email.com"></b-input>
                        <b-form-invalid-feedback :state="error_state.email">
                            {{error.email}}
                        </b-form-invalid-feedback>
                        <label class="mt-2 p3" for="login-password">Password</label>
                        <b-input :class="{form_fill: user.password}" v-model="user.password" :state="error_state.password" size="lg" id="login-password" type="password" placeholder="••••••••"></b-input>
                        <b-form-invalid-feedback :state="error_state.password">
                            {{error.email}}
                        </b-form-invalid-feedback>
                        <div class="mt-5">
                            <b-button block variant="primary" :disabled="isDisable" size="lg">Sign In</b-button>
                            <div class="mt-2 p2">
                                <b-link class="mt-4 text-dark" to="sign_in/forgot_password">Forgot Password</b-link>
                            </div>
                        </div>
                    </b-form>
                </b-col>
                <b-col></b-col>
            </b-row>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
export default {
    transition: {
        name: "custom-classes-transition",
        enterActiveClass: "animated fadeIn"
    },
    data() {
        return {
            user: {
                email: null,
                password: null,
            },
            error: {
                email: '',
                password: '',
            },
            error_state: {
                email: null,
                password: null
            }
        }
    },
    computed: {
        isDisable() {
            if (this.user.email && this.user.password) {
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
