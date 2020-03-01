<template>
<b-container>
    <div class="inner-container">
        <b-row align-h="start">
            <b-col offset-lg="1">
                <b-breadcrumb>
                    <b-breadcrumb-item>Home</b-breadcrumb-item>
                    <b-breadcrumb-item active>Account</b-breadcrumb-item>
                </b-breadcrumb>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" lg="10" offset-lg="1">
                <h3>My Account</h3>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" lg="5" offset-lg="1">
                <label class="" for="login-name">Name</label>
                <b-input :class="{form_fill: user.name}" v-model.trim="user.name" :state="error_state.name" size="lg" id="login-name" placeholder="Charlie Exampleton"></b-input>
                <b-form-invalid-feedback :state="error_state.name">
                    {{error.name}}
                </b-form-invalid-feedback>
            </b-col>
            <b-col cols="12" lg="5">
                <label class="m-email" for="login-email">Email</label>
                <b-input :class="{form_fill: user.email}" v-model.trim="user.email" :state="error_state.email" size="lg" id="login-email" placeholder="charlie@email.com"></b-input>
                <b-form-invalid-feedback :state="error_state.email">
                    {{error.email}}
                </b-form-invalid-feedback>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" lg="5" offset-lg="1">
                <label class="m-password" for="login-password">Password</label>
                <b-input :class="{form_fill: user.password}" v-model="user.password" :state="error_state.password" size="lg" id="login-password" type="password" placeholder="••••••••"></b-input>
                <b-form-invalid-feedback :state="error_state.password">
                    {{error.password}}
                </b-form-invalid-feedback>
            </b-col>
            <b-col cols="12" lg="6" offset-lg="1" v-if="!isChangePass">
                <b-button class="btn-custom" variant="secondary" size="lg" @click="showNewPass">Change Password</b-button>
            </b-col>
            <b-col cols="12" offset-lg="1" lg="10" v-if="!isChangePass">
                <hr>
            </b-col>
        </b-row>
        <b-row v-if="isChangePass">
            <b-col cols="12" lg="5" offset-lg="1">
                <b-input :class="{form_fill: user.newPassword}" v-model="user.newPassword" :state="error_state.newPassword" size="lg" id="login-password" type="password" placeholder="New Password"></b-input>
                <b-form-invalid-feedback :state="error_state.password">
                    {{error.newPassword}}
                </b-form-invalid-feedback>
            </b-col>
            <b-col cols="12" lg="6" offset-lg="1">
                <b-button class="btn-save-change" variant="primary" size="lg">Save Changes</b-button>
                <b-button class="btn-cancel" variant="secondary" size="lg" @click="cancelPass">Cancel</b-button>
            </b-col>
            </b-col>
            <b-col cols="12" offset-lg="1" lg="10">
                <hr>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" lg="10" offset-lg="1">
                <h3>Plan & Billing</h3>
            </b-col>
        </b-row>
        <b-row align-v="center">
            <b-col cols="12" lg="10" offset-lg="1">
                <b-row class="bg-custom" align-v="center">
                    <b-col cols="12" lg="6">
                        <p class="p1 mb-lg-0 prop-plan">Search by Mortgage Payment — <strong>Pro Plan</strong></p>
                    </b-col>
                    <b-col cols="12" lg="6" style="text-align:end">
                        <b-button class="btn-chng-plan" variant="primary" size="lg" @click="$bvModal.show('bv-modal-example')">Change Plan</b-button>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" lg="4" offset-lg="1">
                <p class="p3"><span class="text-heading">$15</span>per month</p>
            </b-col>
            <b-col cols="12" lg="4">
                <p class="p3">Renews <span class="text-heading">January 23, 2020</span></p>
            </b-col>
            <b-col cols="12" lg="10" offset-lg="1">
                <hr>
            </b-col>
        </b-row>

        <div>
            <b-modal size="lg" id="bv-modal-example" class="modal-full-body" centered hide-footer hide-header>
                <div class="modal-temp-body">
                    <div v-if="!isPropPlan" class="header">
                        <b-container class="">
                            <b-row>
                                <b-col lg="9" cols="10" offset-lg="1">
                                    <h3 class="text-primary">Choose the plan for you</h3>
                                </b-col>
                                <b-col lg="1" cols="2"> <button type="button" aria-label="Close" class="close">×</button></b-col>
                            </b-row>
                            <b-row class="m-bottom">
                                <b-col class="box-shadow-low p-box m-box-right" cols="12" lg="5" offset-lg="1">
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
            }
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

.prl-0 {
    @media screen and (max-width: 992px) {
        padding-left: 0px;
        padding-right: 0px;
    }
}
</style>
