<template>
<b-container>
    <b-row align-h="center">
        <b-col lg="6" cols="12">
            <h3 class="text-center m-sign">Sign into your account.</h3>
            <b-row align-h="center">
                <b-col></b-col>
                <b-col lg="10" cols="12">
                    <b-form class="login-box">
                        <div :class="['inp-wrapper',{'has-error':error_state.email == false}]">
                            <div class="flex justify-content-between" >
                                <label for="login-email">Email</label>
                                <span class="inp-error" v-if="!showApiError && error.email">{{error.email}}</span>
                                <span class="inp-error" v-if="!!showApiError && !error.email">{{showApiError}}</span>
                            </div>
                            <b-input :class="{form_fill: user.email}"  @blur="handleEmailBlur"  @focus="handleFocus('email')" v-model.trim="user.email" :state="error_state.email" size="lg" id="login-email" placeholder="charlie@email.com"></b-input>
                        </div>
                        <div :class="['inp-wrapper',{'has-error':error_state.password == false}]">
                            <div class="flex justify-content-between" >
                                <label  class="m-password" for="login-password">Password</label>
                                <span class="inp-error">{{error.password}}</span>
                            </div>
                            <b-input :class="{form_fill: user.password}" @blur="handlePasswordBlur"  @focus="handleFocus('password')"  v-model="user.password" :state="error_state.password" size="lg" id="login-password" type="password" placeholder="••••••••"></b-input>
                        </div>
                        <div>
                            <b-button class="m-signIn-btn" :disabled="isDisable" block variant="primary" size="lg" @click="login">Sign In</b-button>
                            <div class="m-forgot-password">
                                <b-link class="text-dark p2" to="sign_in/forgot_password">Forgot Password?</b-link>
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
import {isRequired, isEmail } from './../../utils/validations.js'
import {toastDuration} from './../../constants.js'

export default {
    transition: {
        name: "custom-classes-transition",
        enterActiveClass: "animated fadeIn"
    },
    data() {
        return {
            user: {
                email: '',
                password:'',
            },
            error: {
                email: '',
                password: '',
            },
            error_state: {
                email: null,
                password: null
            },
            showApiError: null
        }
    },
    computed:{
        isDisable() {
            const ValidEmail = isRequired(this.user.email) && isEmail(this.user.email)
            const ValidPassword = isRequired(this.user.password)
            if(ValidEmail && ValidPassword){
                return false
            }else {
                return true
            }
        }
    },
    methods: {
        errorHandling(responseObj){
            let {message, errors = {}} = responseObj.response && responseObj.response.data
            if(Object.keys(errors).length){
                Object.keys(errors).map((error)=>{
                    // this.$toast.error(errors[error], toastDuration)
                });
            }else{
                    // this.$toast.error(message, toastDuration)
                    this.showApiError = message
                    this.error_state.email = false
            }
        },
        login(){
            this.handleEmailBlur();
            this.handlePasswordBlur();
            const isValid = this.error_state.email || this.error_state.password
            if(isValid){
                try {
                    this.$auth.loginWith('local',{
                        data: {
                            email: this.user.email,
                            password: this.user.password
                        }
                    })
                    .then((data)=>{
                        // this.$toast.success('Successfully LoggedIn', toastDuration)
                        this.$router.push('/')
                    })
                    .catch((responseObj)=>{
                        this.errorHandling(responseObj);
                        return
                    })
                }
                catch(e){

                }
            }
        },
        handleFocus(fieldName){
            this.error[fieldName] = ''
            this.error_state[fieldName] = null
            this.showApiError = null
        },
        handleEmailBlur(){
            const isValidEmail = isRequired(this.user.email) && isEmail(this.user.email)
            if(!isValidEmail){
                this.error.email = (this.user.email && this.user.email.trim()) == '' ? "Email is Required." : " Email is Invalid. ";
                this.error_state.email = false
            }else{
                this.error.email = ''
                this.error_state.email = true
            }

        },
        handlePasswordBlur(){
            const isValidPassword = isRequired(this.user.password)
            if(!isValidPassword){
                this.error.password = ' Password is Required. '
                this.error_state.password = false
            }else{
                this.error.password = ''
                this.error_state.password = true
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.m-sign {
    margin-top: 88px;
    margin-bottom: 80px;
    @media screen and (max-width: 992px) {
        margin-top: 77px;
        margin-bottom: 89px;
    }
}
.login-box{
    max-width: 360px;
    margin: auto;
}

.m-signIn-btn {
    margin-top: 48px;
}

.m-forgot-password {
    margin-top: 24px;

    @media screen and (max-width: 992px) {
        margin-bottom: 211px;
    }
}
</style>
