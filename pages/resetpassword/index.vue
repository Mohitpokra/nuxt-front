<template>
<b-container>
    <b-row align-h="center">
        <b-col lg="5" cols="12">
            <h3 class="m-heading text-center">Reset Password</h3>
            <b-row align-h="center">
                <b-col></b-col>
                <b-col lg="10" cols="12">
                    <b-form class="forgor-form">
                        <div :class="['inp-wrapper',{'has-error':error_state.password == false}]">
                            <div class="flex justify-content-between" >
                                <label class="" for="login-password">New Password</label>
                                <span class="inp-error">{{ error.password }}</span>
                            </div>
                            <b-input :class="{form_fill: user.password}" v-model="user.password"  @blur="handlePasswordBlur"  @focus="handleFocus('password')"  :state="error_state.password" size="lg" id="login-password" type="password" placeholder="new password"></b-input>
                        </div>
                        <div :class="['inp-wrapper',{'has-error':error_state.confirm_password == false}]">
                            <div class="flex justify-content-between" >
                                <label class="" for="login-confirm_password">Confirm New Password</label>
                                <span class="inp-error">{{ error.confirm_password }}</span>
                            </div>
                            <b-input :class="{form_fill: user.confirm_password}" v-model="user.confirm_password"  @blur="handleCPasswordBlur"  @focus="handleFocus('confirm_password')"  :state="error_state.confirm_password" size="lg" id="login-confirm_password" type="password" placeholder="confirm new password"></b-input>
                        </div>
                        <div class="">
                            <b-button class="m-btn" :disabled="isDisable" block variant="primary" size="lg" @click="resetpassword">Reset Password</b-button>
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
import {isRequired} from './../../utils/validations.js'
import {toastDuration} from './../../constants.js'
export default {
    data() {
        return {
            user: {
			password: "",
			confirm_password: ""
		  },
		  error: {
			password: "",
			confirm_password: ""
		  },
		  error_state: {
			password: null,
			confirm_password: null
		  },
		  token : null
        }
    },
    computed: {
    },
    computed:{
        isDisable() {
			const ValidPassword = isRequired(this.user.password);
			const emptyPassword = isRequired(this.user.confirm_password);
			const passwordMatch = this.user.password == this.user.confirm_password;
			const confirmPassword = emptyPassword && passwordMatch;

			if (confirmPassword) {
				return false;
			} else {
				return true;
			}
        }
    },
    methods:{
        handleFocus(fieldName){
            this.error[fieldName] = ''
            this.error_state[fieldName] = null
        },
		handlePasswordBlur() {
			const isValidPassword = isRequired(this.user.password);
			if (!isValidPassword) {
			this.error.password = " Password is Required. ";
			this.error_state.password = false;
			} else {
			this.error.password = "";
			this.error_state.password = true;
			}
		},
		handleCPasswordBlur() {
			const emptyPassword = isRequired(this.user.confirm_password);
			const passwordMatch = this.user.password == this.user.confirm_password;
			const confirmPassword = emptyPassword && passwordMatch;
			if (!confirmPassword) {
			this.error.confirm_password = !emptyPassword
			  ? "Confirm Password is Required "
			  : " Password Didn't Match. ";
				this.error_state.confirm_password = false;
			} else {
				this.error.confirm_password = "";
				this.error_state.confirm_password = true;
			}
		},
		resetpassword(){
			this.handlePasswordBlur();
			this.handleCPasswordBlur();
            const isValid =  this.error_state.password
            if(isValid){
                this.$axios.$post('api/reset-password', {
                    password: this.user.password,
					password_confirmation: this.user.confirm_password,
					token: this.token,
					email: "namanbansal45@gmail.com"
                })
                .then(data=>{
					this.$router.push('/resetpassword/success/')
                })
                .catch((e)=>{
					this.showApiError = 'Error while resetting password!'
                    this.error_state.password = false
                })                
            }
        },

    },
	mounted() {
		const query = this.$route.query;
		const token = query && query.token;
		this.token = token;
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
