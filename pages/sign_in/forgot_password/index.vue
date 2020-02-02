<template>
<b-container>
    <b-row align-h="center">
        <b-col lg="6" cols="12">
            <h3 class="mt-5">Enter your email you used to sign up and we’ll send a link to reset your password.</h3>
            <b-row align-h="center">
                <b-col lg="10" cols="12">
                    <b-form>
                        <label class="mt-5" for="login-email">Email</label>
                        <b-input :class="{form_fill: user.email}" v-model="user.email" :state="error_state.email" size="lg" id="login-email" placeholder="charlie@email.com"></b-input>
                        <b-form-invalid-feedback :state="error_state.email">
                            {{error.email}}
                        </b-form-invalid-feedback>
                        <div class="mt-5">
                            <b-button block variant="primary" size="lg">Send reset intructions</b-button>
                            <div class="mt-2 p2">
                                <b-link class="mt-4 text-dark">Cancel</b-link>
                            </div>
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
                email: null
            },
            error: {
                email: ''
            },
            error_state: {
                email: null
            }
        }
    }

}
</script>

<style>

</style>
