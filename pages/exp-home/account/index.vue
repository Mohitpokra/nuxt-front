<template>
<b-container>
    <div class="inner-container">
        <b-row align-h="start">
            <b-col>
                <b-breadcrumb :items="items"></b-breadcrumb>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" lg="12">
                <h3 class="top-title">My Account</h3>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" lg="6">
                <div class="inp-wrapper">
                    <div class="flex justify-content-between" >
                        <label for="login-email">Name</label>
                        <span class="inp-error">{{error.email}}</span>
                    </div>
                    <b-input :class="{form_fill: user.name}" v-model.trim="user.name" :state="error_state.name" size="lg" id="login-name" placeholder="Charlie Exampleton"></b-input>
                    <b-form-invalid-feedback :state="error_state.name">
                        {{error.name}}
                    </b-form-invalid-feedback>
                </div>
            </b-col>
            <b-col cols="12" lg="6">
                <div class="inp-wrapper">
                    <div class="flex justify-content-between" >
                        <label for="login-email">Email</label>
                        <span class="inp-error">{{error.email}}</span>
                    </div>
                    <b-input :class="{form_fill: user.email}" v-model.trim="user.email" :state="error_state.email" size="lg" id="login-email" placeholder="charlie@email.com"></b-input>
                    <b-form-invalid-feedback :state="error_state.email">
                        {{error.email}}
                    </b-form-invalid-feedback>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" lg="6">
                <div class="inp-wrapper">
                    <div class="flex justify-content-between" >
                        <label for="login-email">Password</label>
                        <span class="inp-error">{{error.email}}</span>
                    </div>
                    <b-input :class="{form_fill: user.password}" v-model="user.password" :state="error_state.password" size="lg" id="login-password" type="password" placeholder="••••••••"></b-input>
                    <b-form-invalid-feedback :state="error_state.password">
                        {{error.password}}
                    </b-form-invalid-feedback>
                </div>
                <div class="inp-wrapper">
                    <div class="flex justify-content-between" >
                        <label for="login-email"></label>
                        <span class="inp-error">{{error.email}}</span>
                    </div>
                    <b-input :class="{form_fill: user.password}" v-model="user.password" :state="error_state.password" size="lg" id="login-password" type="password" placeholder="••••••••"></b-input>
                    <b-form-invalid-feedback :state="error_state.password">
                        {{error.password}}
                    </b-form-invalid-feedback>
                </div>
                <div class="sub-btn" v-if="!isChangePass">
                    <b-button class="mt-4 save-btn" variant="primary" size="lg" @click="showNewPass">Save Changes</b-button>
                    <b-button class="btn-custom mt-4 cancel-btn" variant="secondary" size="lg">Cancel</b-button>
                </div>
            </b-col>

            <b-col cols="12" lg="12" v-if="!isChangePass">
                <hr class="divider">
            </b-col>
        </b-row>
        <b-row v-if="isChangePass">
            <b-col cols="12" lg="6">
                <b-input :class="{form_fill: user.newPassword}" v-model="user.newPassword" :state="error_state.newPassword" size="lg" id="login-password" type="password" placeholder="New Password"></b-input>
                <b-form-invalid-feedback :state="error_state.password">
                    {{error.newPassword}}
                </b-form-invalid-feedback>
            </b-col>
            <b-col cols="12" lg="6">
                <b-button class="btn-save-change" variant="primary" size="lg" @click="savePassword">Save Changes</b-button>
                <b-button class="btn-cancel" variant="secondary" size="lg" @click="cancelPass">Cancel</b-button>
            </b-col>
            </b-col>
            <b-col cols="12" lg="12">
                <hr>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" lg="12">
                <h3>Plan & Billing</h3>
            </b-col>
        </b-row>
        <b-row align-v="center">
            <b-col cols="12" lg="12">
                <b-row class="bg-custom plan-head">
                    <div class="prop-plan">
                        <p class="pr-title">Search by Mortgage Payment — <strong>Pro Plan</strong></p>
                        <b-button class="btn-chng-plan" variant="primary" size="lg" @click="$bvModal.show('bv-modal-example')">Change Plan</b-button>
                    </div>
                </b-row>
            </b-col>
        </b-row>
        <div class="info-list">
            <b-row class="il-list">
                <b-col cols="12" lg="3">
                    <span><strong>$15</strong> per month</span>
                </b-col>
                <b-col cols="12" lg="4">
                    <span>Renews <strong>January 23, 2020</strong></span>
                </b-col>
                <b-col cols="12" lg="12">
                    <hr>
                </b-col>
            </b-row>
            <b-row class="il-list">
                <b-col cols="12" lg="3">
                    <span><strong>$15</strong> per month</span>
                </b-col>
                <b-col cols="12" lg="4">
                    <span>Renews <strong>January 23, 2020</strong></span>
                </b-col>
                <b-col cols="12" lg="5" class="text-right">
                    <span class="pointer link">Update Card</span>
                </b-col>
                <b-col cols="12" lg="12">
                    <hr>
                </b-col>
            </b-row>
        </div>

        <div>
            <b-modal size="lg" id="bv-modal-example" class="modal-full-body" centered hide-footer hide-header>
                <div class="modal-temp-body">
                    <div v-if="!isPropPlan" class="header">
                        <b-container class="">
                            <b-row>
                                <b-col lg="9" cols="10">
                                    <h3 class="text-primary">Choose the plan for you</h3>
                                </b-col>
                                <b-col lg="1" cols="2"> <button type="button" aria-label="Close" class="close">×</button></b-col>
                            </b-row>
                            <b-row class="m-bottom">
                                <b-col class="box-shadow-low p-box m-box-right" cols="12" lg="5">
                                    <h3>Free</h3>
                                    <p class="p-box-subheading p2">Limited to 5 searches per month</p>
                                    <div class="p-box-money d-flex align-items-center">
                                        <h2 class="text-primary">
                                            $0
                                        </h2>
                                        <h2 class="month">/ month</h2>
                                    </div>
                                    <div>
                                        <b-button block variant="primary" size="lg">Choose Free Plan</b-button>
                                    </div>
                                </b-col>
                                <b-col class="box-shadow-low p-box m-box-left" cols="12" lg="5">
                                    <h3>Pro</h3>
                                    <p class="p-box-subheading p2">Unlimited searches</p>
                                    <div class="p-box-money d-flex align-items-center">
                                        <h2 class="text-primary">
                                            $15
                                        </h2>
                                        <h2 class="month">/ month</h2>
                                    </div>
                                    <div>
                                        <b-button block variant="primary" size="lg" @click="chooseProPlan">Choose Pro Plan</b-button>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-container>
                    </div>
                    <div v-else>
                        <b-row>
                            <b-col lg="11">
                                <h3 class="text-primary">Enter billing information</h3>
                            </b-col>
                            <b-col lg="1"> <button type="button" aria-label="Close" class="close" @click="$bvModal.hide('bv-modal-example')">×</button></b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form>
                                    <label class="" for="billing-name">Name on Credit Card</label>
                                    <b-input :class="{form_fill: billing.name}" v-model.trim="billing.name" :state="error_state_1.name" size="lg" id="billing-name" placeholder="Charlie Exampleton"></b-input>
                                    <b-form-invalid-feedback :state="error_state_1.name">
                                        {{error_1.name}}
                                    </b-form-invalid-feedback>
                                    <label class="m-field" for="billing-cardNo">Credit Card Number</label>
                                    <b-input :class="{form_fill: billing.cardNo}" v-model="billing.cardNo" :state="error_state_1.cardNo" size="lg" id="billing-cardNo" placeholder="1234 5678 9012 3456"></b-input>
                                    <b-form-invalid-feedback :state="error_state_1.cardNo">
                                        {{error_1.cardNo}}
                                    </b-form-invalid-feedback>
                                    <b-row class="">
                                        <b-col class="prl-0" cols="12" lg="6">
                                            <label class="m-field" for="billing-expiryDate">Expiration Date</label>
                                            <b-input :class="{form_fill: billing.expiryDate}" v-model="billing.expiryDate" :state="error_state_1.expiryDate" size="lg" id="billing-expiryDate" placeholder="MM/YY"></b-input>
                                            <b-form-invalid-feedback :state="error_state_1.expiryDate">
                                                {{error_1.expiryDate}}
                                            </b-form-invalid-feedback>
                                        </b-col>
                                        <b-col class="prl-0" cols="12" lg="6">
                                            <label class="m-field" for="billing-cvc">CVC</label>
                                            <b-input :class="{form_fill: billing.cvc}" v-model="billing.cvc" :state="error_state_1.cvc" size="lg" id="billing-cvc" placeholder="CVC"></b-input>
                                            <b-form-invalid-feedback :state="error_state_1.cvc">
                                                {{error_1.cvc}}
                                            </b-form-invalid-feedback>
                                        </b-col>
                                    </b-row>
                                    <b-row align-h="between" class="divider">
                                        <b-col cols="6">
                                            <b-button class="mt-3" block variant="primary" :disabled="isDisable" size="lg">Pay $15/mo</b-button>
                                        </b-col>
                                        <b-col cols="3">
                                            <b-button class="mt-3" block variant="secondary btn-custom_1" @click="$bvModal.hide('bv-modal-example')" size="lg">Cancel</b-button>
                                        </b-col>
                                    </b-row>
                                </b-form>
                            </b-col>
                        </b-row>
                    </div>
                </div>
            </b-modal>
        </div>
    </div>
</b-container>
</template>

<script>
import { toastDuration } from '../../../constants';
import {isRequired} from './../../../utils/validations.js';
export default {
    data() {
        return {
            user: {
                name: null,
                email: null,
                password: null,
                newPassword: null,
            },
            error: {
                name: '',
                email: '',
                password: '',
                newPassword: '',
            },
            error_state: {
                name: null,
                email: null,
                password: null,
                newPassword: null
            },
            isChangePass: 0,
            isPropPlan: 0,
            billing: {
                name: null,
                cardNo: null,
                expiryDate: null,
                cvc: null
            },
            error_1: {
                name: null,
                cardNo: null,
                expiryDate: null,
                cvc: null
            },
            error_state_1: {
                name: null,
                cardNo: null,
                expiryDate: null,
                cvc: null
            },
            items: [
                {
                    text: 'Home',
                    href: '/'
                },
                {
                    text: 'My Account',
                    href: '#'
                },
            ]
        }
    },
    methods: {
        showNewPass() {
            this.isChangePass = 1
        },
        cancelPass() {
            this.isChangePass = 0;
        },
        chooseProPlan() {
            this.isPropPlan = 1;
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
            const emptyPassword = isRequired(this.user.newPassword)
            const passwordMatch = (this.user.password ==  this.user.newPassword)
            const confirmPassword = emptyPassword && passwordMatch
            if(!confirmPassword){
                this.error.newPassword = !emptyPassword ? 'New Password is Required ' : " Password Didn't Match. "
                this.error_state.newPassword = false
            }else{
                this.error.newPassword = ''
                this.error_state.newPassword = true
            }
        },
        savePassword(){
            this.handlePasswordBlur();
            this.handleCPasswordBlur()
            const isValid = this.error_state.password || this.error_state.newPassword
            if(isValid){
                    this.$axios.$post('/api/reset-password',{
                    email:this.user.email,
                    token: '',
                    password: this.user.password,
                    password_confirmation: this.user.newPassword,
                })
                .then(response => {
                    this.$toast.success('Password Changed ',toastDuration)
                })
                .catch(e => {
                    this.$toast.error('Try Again Later',toastDuration)
                })
            }
        }
    },
    computed: {
        isDisable() {
            if (this.billing.name && this.billing.cardNo && this.billing.expiryDate && this.billing.cvc) {
                return false;
            } else {
                return true;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.top-title{
    margin-top: 48px;
    font-size: 42px;
    margin-bottom: 24px;
    @media screen and(max-width: 992px) {
        font-size: 26px;
        margin-top: 24px;
        margin-bottom: 12px;
    }
}
.btn-custom {
    width: 179px;
    height: 48px;
    border-radius: 2px;
    background-color: #f5f5f5;
    color: #1f1f1f;
}

.btn-chng-plan {
    width: 141px;
    height: 48px;
    border-radius: 2px;

    @media screen and (max-width: 992px) {
        width: 100%;
    }
}

.bg-custom {
    background-color: #dff7ff;
    margin-left: 0px;
    margin-right: 0px;

}

.prop-plan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    width: 100%;
    p{
        margin: 0px;
        font-size: 20px;
        font-weight: 400;
    }
    @media screen and (max-width: 992px) {
        font-size: 16px;
    }
}

.btn-save-change {
    width: 152px;
    height: 48px;
    border-radius: 2px;
}

.btn-cancel {
    width: 99px;
    height: 48px;
    border-radius: 2px;
    color: black;
    background-color: #f5f5f5;
}

.divider{
    margin: 48px 0px;
}
.m-plan-text {
    margin-top: 90px;
    margin-bottom: 48px;

    @media screen and (max-width: 992px) {
        margin-top: 77px;
        margin-bottom: 48px;
    }
}

.p-box {
    padding: 48px;

    @media screen and (max-width: 992px) {
        padding: 24px
    }

}

.p-box-subheading {
    margin-bottom: 48px;

    @media screen and (max-width: 992px) {
        margin-bottom: 24px
    }
}

.p-box-money {
    margin-bottom: 72px;

    @media screen and (max-width: 992px) {
        margin-bottom: 24px
    }
}

.m-box-right {
    margin-right: 12px;

    @media screen and (max-width: 992px) {
        margin-right: 0px;
        margin-bottom: 8px;
    }
}

.m-box-left {
    margin-left: 12px;

    @media screen and (max-width: 992px) {
        margin-left: 0px;
    }
}

.row {
    @media screen and (max-width: 992px) {
        margin-right: -0px;
        margin-left: -0px;
    }
}
.save-btn{
    width: 152px;
}
.cancel-btn{
    width: 99px;
    margin-left: 24px;
}
.month {
    font-family: CerebriSans;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.4;
    letter-spacing: normal;
    color: #44a1bf;
    margin-left: 8px;
}
.plan-head{
    margin-top: 48px;
}
.prl-0 {
    @media screen and (max-width: 992px) {
        padding-left: 0px;
        padding-right: 0px;
    }
}
.info-list{
    margin-top: 24px;
}
.il-list{
    hr{
        margin: 24px 0px;
    }
    p{
        margin: 0px;
    }
    .link{
        color: #44a1bf;
    }
}
</style>
