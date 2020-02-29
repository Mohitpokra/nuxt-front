<template>
<b-container class="">
    <b-row class="" align-h="center">
        <b-col lg="6" cols="12">
            <h3 class="text-center m-header-text">Create your account to start<br class="d-lg-none"> searching
                homes by mortgage <br class="d-lg-none"> payment.</h3>
            <b-row class="" align-h="center">
                <b-col lg="9" cols="12">
                    <b-form>
                        <label class="" for="login-name">Name</label>
                        <b-input :class="{form_fill: user.name}" @blur="handleNameBlur"  @focus="handleFocus('name')" v-model.trim="user.name" :state="error_state.name" size="lg" id="login-name" placeholder="Charlie Exampleton"></b-input>
                        <b-form-invalid-feedback :state="error_state.name">
                            {{error.name}}
                        </b-form-invalid-feedback>
                        <label class="m-email" for="login-email">Email</label>
                        <b-input :class="{form_fill: user.email}" @blur="handleEmailBlur" @focus="handleFocus('email')" v-model.trim="user.email" :state="error_state.email" size="lg" id="login-email" placeholder="charlie@email.com"></b-input>
                        <b-form-invalid-feedback :state="error_state.email">
                            {{error.email}}
                        </b-form-invalid-feedback>
                        <label class="m-password" for="login-password">Password</label>
                        <b-input :class="{form_fill: user.password}" @blur="handlePasswordBlur" @focus="handleFocus('password')" v-model="user.password" :state="error_state.password" size="lg" id="login-password" type="password" placeholder="••••••••"></b-input>
                        <b-form-invalid-feedback :state="error_state.password">
                            {{error.password}}
                        </b-form-invalid-feedback>
                        <label class="m-password" for="confirm-password">Confirm Password</label>
                        <b-input :class="{form_fill: user.confirm_password}" @blur="handleCPasswordBlur" @focus="handleFocus('confirm_password')" v-model="user.confirm_password" :state="error_state.confirm_password" size="lg" id="login-confirm_password" type="password" placeholder="••••••••"></b-input>
                        <b-form-invalid-feedback :state="error_state.confirm_password">
                            {{error.confirm_password}}
                        </b-form-invalid-feedback>
                        <div>
                            <b-button class="m-singUp-btn" block variant="primary" size="lg" @click="register">Sign Up</b-button>
                            <p class="p2 m-singup-text">You’ll need to obtain a license key to access but it’s free of charge during our beta.</p>
                        </div>
                    </b-form>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
import {isRequired, isEmail } from './../../utils/validations.js'

export default {
    // auth: false,
    transition: {
        name: "custom-classes-transition",
        enterActiveClass: "animated bounceInDown"
    },
    async asyncData({
        $axios
    }) {
        const ip = await $axios.$post('http://icanhazip.com')
        return {
            ip
        }
    },
    data() {
        return {
            user: {
                name: '',
                email: '',
                password: '',
                confirm_password: ''
            },
            error: {
                name: '',
                email: '',
                password: '',
                confirm_password:''
            },
            error_state: {
                name: null,
                email: null,
                password: null,
                confirm_password: null
            }
        }
    },
    computed: {
        password_confirmation() {
            return this.user.password;
        }
    },
    methods: {
        handleFocus(fieldName){
            this.error[fieldName] = ''
            this.error_state[fieldName] = null
        },
        handleNameBlur(){
            const isValidName = isRequired(this.user.name)
            if(!isValidName){
                this.error.name = ' Name is Required. '
                this.error_state.name = false
            }else{
                this.error.name = ''
                this.error_state.name = true
            }

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
        handleCPasswordBlur(){
            const emptyPassword = isRequired(this.user.confirm_password)
            const passwordMatch = (this.user.password ==  this.user.confirm_password)
            const confirmPassword = emptyPassword && passwordMatch
            if(!confirmPassword){
                this.error.confirm_password = !emptyPassword ? 'Confirm Password is Required ' : " Password Didn't Match. "
                this.error_state.confirm_password = false
            }else{
                this.error.confirm_password = ''
                this.error_state.confirm_password = true
            }
        },
        register() {
            this.handleNameBlur();
            this.handleEmailBlur();
            this.handlePasswordBlur();
            this.handleCPasswordBlur()
            const isValid = this.error_state.name || this.error_state.email || this.error_state.password || this.error_state.confirm_password
            if(isValid){
                console.log('proceed to Register');
                //  try{
                //         const registered = await this.$axios.post('register', this.user);

                //         const loginSuccessfull = await this.$auth.loginWith('local', {
                //             data: {
                //                 email: this.user.email,
                //                 password: this.user.password
                //             },
                //         })
                //         if(registered && loginSuccessfull){
                //             this.$router.push('/')
                //         }else{
                //             // show error will sign up
                //         }
                //     } catch (e) {
                //         this.error = e.response.data.message
                //     }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.m-header-text {
    margin-top: 88px;
    margin-bottom: 48px;

    @media screen and (max-width: 992px) {
        margin-top: 77px;
        margin-bottom: 48px;
    }
}

.m-email {
    margin-top: 24px;
}

.m-password {
    margin-top: 24px;
}

.m-singUp-btn {
    margin-top: 48px;
    margin-bottom: 24px;
}

.m-singup-text {
    margin-bottom: 148px;

    @media screen and (max-width: 992px) {
        margin-bottom: 96px;
    }
}
</style>
