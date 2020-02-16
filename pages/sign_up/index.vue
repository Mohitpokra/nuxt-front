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
                        <b-input :class="{form_fill: user.name}" v-model.trim="user.name" :state="error_state.name" size="lg" id="login-name" placeholder="Charlie Exampleton"></b-input>
                        <b-form-invalid-feedback :state="error_state.name">
                            {{error.name}}
                        </b-form-invalid-feedback>
                        <label class="m-email" for="login-email">Email</label>
                        <b-input :class="{form_fill: user.email}" v-model.trim="user.email" :state="error_state.email" size="lg" id="login-email" placeholder="charlie@email.com"></b-input>
                        <b-form-invalid-feedback :state="error_state.email">
                            {{error.email}}
                        </b-form-invalid-feedback>
                        <label class="m-password" for="login-password">Password</label>
                        <b-input :class="{form_fill: user.password}" v-model="user.password" :state="error_state.password" size="lg" id="login-password" type="password" placeholder="••••••••"></b-input>
                        <b-form-invalid-feedback :state="error_state.password">
                            {{error.password}}
                        </b-form-invalid-feedback>
                        <div>
                            <b-button class="m-singUp-btn" block variant="primary" :disabled="isDisable" size="lg" @click="register">Sign Up</b-button>
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
export default {
    auth: false,
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
                name: null,
                email: null,
                password: null,
            },
            error: {
                name: '',
                email: '',
                password: '',
            },
            error_state: {
                name: null,
                email: null,
                password: null
            }
        }
    },
    computed: {
        isDisable() {
            if (this.user.name && this.user.email && this.user.password) {
                return false;
            } else {
                return true;
            }
        },
        password_confirmation() {
            return this.user.password;
        }
    },
    methods: {
        async register() {
            try {
                await this.$axios.post('register', this.user);

                await this.$auth.loginWith('local', {
                    data: {
                        email: this.user.email,
                        password: this.user.password
                    },
                })

                this.$router.push('/')
            } catch (e) {
                this.error = e.response.data.message
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

.m-passsword {
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
