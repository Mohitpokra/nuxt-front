<template>
<b-container>
    <b-row align-h="center">
        <b-col lg="5" cols="12">
            <h3 class="m-heading text-center">Enter your email you used to sign up and we’ll send a link to reset your password.</h3>
            <b-row align-h="center">
                <b-col></b-col>
                <b-col lg="10" cols="12">
                    <b-form class="forgor-form">
                        <div :class="['inp-wrapper',{'has-error':error_state.email == false}]">
                            <div class="flex justify-content-between" >
                                <label class="" for="login-email">Email</label>
                                <span class="inp-error">Email address not found</span>
                            </div>
                            <b-input :class="{form_fill: user.email}" v-model="user.email"  @blur="handleEmailBlur"  @focus="handleFocus('email')"  :state="error_state.email" size="lg" id="login-email" placeholder="charlie@email.com"></b-input>
                        </div>
                        <div class="">
                            <b-button class="m-btn" block variant="primary" size="lg" @click="submit">Send reset intructions</b-button>
                            <div class="">
                                <b-link class="text-dark m-forgot" href="/sign_in">Cancel</b-link>
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
import {isEmail } from './../../../utils/validations.js'
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
    },
    computed: {
    },
    methods:{
        submit(){
            this.handleEmailBlur();
            const isValid =  this.error_state.email
            if(isValid){
                console.log('proceed to Forgot Password')
                // proceed to forgot password Api
            }
        },
        handleFocus(fieldName){
            this.error[fieldName] = ''
            this.error_state[fieldName] = null
        },
        handleEmailBlur(){
            const isValidEmail = isRequired(this.user.email) && isEmail(this.user.email)
            if(!isValidEmail){
                this.error.email = ' Email is Required. '
                this.error_state.email = false
            }else{
                this.error.email = ''
                this.error_state.email = true
            }

        },

    }

}
</script>

<style lang="scss" scoped>
.m-heading {
    margin: auto;
    margin-top: 88px;
    margin-bottom: 48px;
    max-width: 502px;
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
.forgor-form{
    margin: auto;
    max-width: 360px;
}
</style>
