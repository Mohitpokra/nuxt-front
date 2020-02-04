<template>
<b-container>
    <b-row align-h="center">
        <b-col lg="6" cols="12">
            <h3 class="text-center m-sign">Sign into your account.</h3>
            <b-row align-h="center">
                <b-col></b-col>
                <b-col lg="9" cols="12">
                    <b-form>
                        <label for="login-email">Email</label>
                        <b-input :class="{form_fill: user.email}" v-model.trim="user.email" :state="error_state.email" size="lg" id="login-email" placeholder="charlie@email.com"></b-input>
                        <b-form-invalid-feedback :state="error_state.email">
                            {{error.email}}
                        </b-form-invalid-feedback>
                        <label class="m-password" for="login-password">Password</label>
                        <b-input :class="{form_fill: user.password}" v-model="user.password" :state="error_state.password" size="lg" id="login-password" type="password" placeholder="••••••••"></b-input>
                        <b-form-invalid-feedback :state="error_state.password">
                            {{error.email}}
                        </b-form-invalid-feedback>
                        <div>
                            <b-button class="m-signIn-btn" block variant="primary" :disabled="isDisable" size="lg">Sign In</b-button>
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
.m-sign {
    margin-top: 88px;
    margin-bottom: 80px;

    
    @media screen and (max-width: 992px) {
        margin-top: 77px;
        margin-bottom: 89px;
    }
}

.m-password {
    margin-top: 24px;
}

.m-signIn-btn {
    margin-top: 48px;
}

.m-forgot-password {
    margin-top: 24px;
    margin-bottom: 268px;

    @media screen and (max-width: 992px) {
        margin-bottom: 211px;
    }
}
</style>
