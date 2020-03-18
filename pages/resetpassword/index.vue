<template>
<b-container>
    <b-row align-h="center">
        <b-col lg="5" cols="12">
            <h3 class="m-heading text-center">Reset Password</h3>
            <b-row align-h="center">
                <b-col></b-col>
                <b-col lg="10" cols="12">
                    <b-form class="forgor-form">
                        <div :class="['inp-wrapper',{'has-error':error_state.email == false}]">
                            <div class="flex justify-content-between" >
                                <label class="" for="login-email">Password</label>
                                <span class="inp-error">Email address not found</span>
                            </div>
                            <b-input :class="{form_fill: user.email}" v-model="user.email"  @blur="handleEmailBlur"  @focus="handleFocus('email')"  :state="error_state.email" size="lg" id="login-email" placeholder="password"></b-input>
                        </div>
                        <div :class="['inp-wrapper',{'has-error':error_state.email == false}]">
                            <div class="flex justify-content-between" >
                                <label class="" for="login-email">New Password</label>
                                <span class="inp-error">Email address not found</span>
                            </div>
                            <b-input :class="{form_fill: user.email}" v-model="user.email"  @blur="handleEmailBlur"  @focus="handleFocus('email')"  :state="error_state.email" size="lg" id="login-email" placeholder="new password"></b-input>
                        </div>
                        <div class="">
                            <b-button class="m-btn" :disabled="isDisable" block variant="primary" size="lg" @click="submit">Reset Password</b-button>
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
import {isEmail, isRequired} from './../../utils/validations.js'
import {toastDuration} from './../../constants.js'
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
    computed:{
        isDisable() {
            const ValidEmail = isRequired(this.user.email) && isEmail(this.user.email)
            if(ValidEmail){
                return false
            }else {
                return true
            }
        }
    },
    methods:{
        submit(){
            this.handleEmailBlur();
            const isValid =  this.error_state.email
            if(isValid){
                this.$axios.$post('api/forgot-password', {
                    email: this.user.email
                })
                .then(data=>{
                    // this.$toast.success("Email Sent Successfully", toastDuration)
                })
                .catch((e)=>{
                    // this.$toast.error("Try Again Later !!!", toastDuration)
                })
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
