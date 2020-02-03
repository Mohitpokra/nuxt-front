<template>
<b-container>
    <b-row align-h="center">
        <b-col lg="6" cols="12">
            <h3 class="m-heading text-center">Enter your email you used to sign up and we’ll send a link to reset your <br class="d-lg-none"> password.</h3>
            <b-row align-h="center">
                <b-col lg="10" cols="12">
                    <b-form>
                        <label class="" for="login-email">Email</label>
                        <b-input :class="{form_fill: user.email}" v-model="user.email" :state="error_state.email" size="lg" id="login-email" placeholder="charlie@email.com"></b-input>
                        <b-form-invalid-feedback :state="error_state.email">
                            {{error.email}}
                        </b-form-invalid-feedback>
                        <div class="">
                            <b-button class="m-btn" block variant="primary" size="lg">Send reset intructions</b-button>
                            <div class="">
                                <b-link class="text-dark m-forgot">Cancel</b-link>
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

<style lang="scss" scoped>

.m-heading {
    margin-top: 94px;
    margin-bottom: 48px;

    
    @media screen and (max-width: 992px) {
        margin-top: 77px;
        margin-bottom: 40px;
    }
}

.m-btn {
    margin-top: 48px;
    margin-bottom: 24px;
}

.m-forgot {
    margin-bottom: 370px;

      @media screen and (max-width: 992px) {
        margin-bottom: 308px;
    }
}

</style>
