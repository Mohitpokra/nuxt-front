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
                                <label class="" for="login-email">Email</label>
                                <span class="inp-error" v-if="!showApiError && error.email">{{
									error.email
								  }}</span>
								  <span
									class="inp-error"
									v-if="!!showApiError && !error.email"
									>{{ showApiError }}</span
								  >
                            </div>
                            <b-input :class="{form_fill: user.email}" v-model="user.email"  @blur="handleEmailBlur"  @focus="handleFocus('email')"  :state="error_state.email" size="lg" id="login-email" placeholder="charlie@email.com" :disabled="isFromEmail"></b-input>
                        </div>
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
import {isRequired, isEmail} from './../../utils/validations.js'
import {toastDuration} from './../../constants.js'
export default {
    data() {
        return {
		  isFromEmail: true,
            user: {
			email: "",
			password: "",
			confirm_password: ""
		  },
		  error: {
			email: "",
			password: "",
			confirm_password: ""
		  },
		  error_state: {
			email: null,
			password: null,
			confirm_password: null
		  },
		  token : null,
		  showApiError : null
        }
    },
    computed: {
    },
    computed:{
        isDisable() {
			const ValidEmail = isRequired(this.user.email) && isEmail(this.user.email);
			const ValidPassword = isRequired(this.user.password);
			const emptyPassword = isRequired(this.user.confirm_password);
			const passwordMatch = this.user.password == this.user.confirm_password;
			const confirmPassword = emptyPassword && passwordMatch;

			if (ValidEmail && ValidPassword && confirmPassword) {
				return false;
			} else {
				return true;
			}
        }
    },
    methods:{
        handleFocus(fieldName){
            this.error[fieldName] = '';
            this.error_state[fieldName] = null;
			this.showApiError = null;
        },
		handleEmailBlur() {
		  const isValidEmail =
			isRequired(this.user.email) && isEmail(this.user.email);
		  if (!isValidEmail) {
			this.error.email = (this.user.email && this.user.email.trim()) == '' ? "Email is Required." : " Email is Invalid. ";
			this.error_state.email = false;
		  } else {
			this.error.email = "";
			this.error_state.email = true;
		  }
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
		errorHandling(responseObj) {
		  let { message, errors = {} } =
			responseObj.response && responseObj.response.data;
		  if (Object.keys(errors).length) {
			Object.keys(errors).map(error => {
			  this.showApiError = errors[error];
			  this.error_state.email = false;
			});
		  } else {
			this.showApiError = message;
			this.error_state.email = false;
		  }
		},
		resetpassword(){
			this.handlePasswordBlur();
			this.handleCPasswordBlur();
			this.handleEmailBlur();
            const isValid =  this.error_state.password
            if(isValid){
                this.$axios.$post('api/reset-password', {
                    password: this.user.password,
					password_confirmation: this.user.confirm_password,
					token: this.token,
					email: this.user.email
                })
                .then(data=>{
				  this.$auth
					.loginWith("local", {
					  data: {
						email: this.user.email,
						password: this.user.password
					  }
					})
					.then(data => {
					  this.$router.push("/exp-home");
					})
					.catch(responseObj => {
					  this.errorHandling(responseObj);
					  return;
					});
				})
                .catch((e)=>{
					this.showApiError = 'Error while resetting password!'
                    //this.error_state.password = false
                })                
            }
        },

    },
	mounted() {
		const query = this.$route.query;
		const token = query && query.token;
		this.token = token;	
		const obj = {
          token: this.token,
        };
		
		if (token) {
		  this.isFromEmail = true;
		  this.$axios
		  .post("api/get-email-by-token",obj)
		  .then(data => {
			this.user.email = data.data.email;
			if(data.data.error){
				this.showApiError = data.data.error;
				this.error.email = "";
				this.error_state.email = false;
			}
		  })
		}
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
