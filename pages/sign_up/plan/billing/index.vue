<template>
<b-container>
    <div class="inner-container billing-wrapper">
        <b-row class="" :no-gutters="true">
            <b-col>
                <h3 class="m-heading-text">Enter billing information</h3>
                <p class="m-subheading-text">Review your plan and enter your payment details</p>
            </b-col>
        </b-row>
        <b-row id="card-element"></b-row>
        <b-row class="billing" :no-gutters="true">
            <b-col class="d-none d-lg-block billing-left-block">
                <p class="p1 m-search-text ">Search by Mortgage <br> Payment Pro Plan</p>
                <div class="d-flex">
                    <h3 class="m-money-symbol">$15</h3>
                    <h3 class="month">/ month</h3>
                </div>
                <hr class="m-line mr-5">
                <p class="p2 p2-new"><span><img class="m-img-text text-primary" src="~/assets/icons/icon-interface-check.svg" /></span>Unlimited searches</p>
                <p class="p2 p2-new"><span><img class="m-img-text " src="~/assets/icons/icon-interface-check.svg" /></span>Unlimited search history</p>
                <p class="p2 p2-new"><span><img class="m-img-text " src="~/assets/icons/icon-interface-check.svg" /></span>Cancel anytime</p>
            </b-col>
            <b-col class="billing-right-block">
                <b-form>
                    <div class="inp-wrapper">
                        <div class="flex justify-content-between">
                            <label class="inp-title" for="billing-name">Name on Credit Card</label>
                            <span class="inp-error">Invalid</span>
                        </div>
                        <!-- @focus="handleFocus('name')" 
                            @blur="handleNameBlur" -->
                        <b-input :class="{form_fill: billing.name}"
                            v-model.trim="billing.name" :state="error_state.name" size="lg" id="billing-name" placeholder="Charlie Exampleton"></b-input>
                        <b-form-invalid-feedback :state="error_state.name">
                            {{error.name}}
                        </b-form-invalid-feedback>
                    </div>
                    <div class="inp-wrapper">
                        <div class="flex justify-content-between">
                            <label class="inp-title" for="billing-cardNo">Credit Card Number</label>
                            <span class="inp-error">Invalid</span>
                        </div>
                        <!-- <b-input :class="{form_fill: billing.cardNo}" v-model="billing.cardNo" :state="error_state.cardNo" size="lg" id="billing-cardNo" placeholder="1234 5678 9012 3456"></b-input> -->
                        <div id='cardNumber' :class="{form_fill: billing.cardNo}" :state="error_state.cardNo"></div>
                        <b-form-invalid-feedback :state="error_state.cardNo">
                            {{error.cardNo}}
                        </b-form-invalid-feedback>
                    </div>
                    <b-row class="">
                        <b-col cols="12" lg="6">
                            <div class="inp-wrapper">
                                <div class="flex justify-content-between">
                                    <label class="inp-title" for="billing-expiryDate">Expiration Date</label>
                                    <span class="inp-error">Invalid</span>
                                </div>
                                <!-- <b-input :class="{form_fill: billing.expiryDate}" v-model="billing.expiryDate" :state="error_state.expiryDate" id="billing-expiryDate" placeholder="MM/YY"></b-input> -->
                                <div id='cardExpiry'></div>
                                <b-form-invalid-feedback :state="error_state.expiryDate">
                                    {{error.expiryDate}}
                                </b-form-invalid-feedback>
                            </div>
                        </b-col>
                        <b-col cols="12" lg="6">
                            <div class="inp-wrapper">
                                <div class="flex justify-content-between">
                                    <label class="inp-title" for="billing-cvc">CVC</label>
                                    <span class="inp-error">Invalid</span>
                                </div>
                                <!-- <b-input :class="{form_fill: billing.cvc}" v-model="billing.cvc" :state="error_state.cvc" size="lg" id="billing-cvc" placeholder="CVC"></b-input> -->
                                <div id='cardCvc' class='form-control form-control-lg' size="lg"></div>
                                <b-form-invalid-feedback :state="error_state.cvc">
                                    {{error.cvc}}
                                </b-form-invalid-feedback>
                            </div>
                        </b-col>
                    </b-row>
                    <div class="m-pay-btn">
                        <b-button block variant="primary" @click="setUpIntent" size="lg" :disabled="isDisable">Pay $15/mo</b-button>
                    </div>
                </b-form>
            </b-col>
        </b-row>
    </div>
</b-container>
</template>

<script>
import {loadStripe} from '@stripe/stripe-js';
import { mapGetters } from "vuex";
import { isRequired } from "./../../../../utils/validations";

export default {

    data() {
        return {
            plans:null,
            cardNumber: null,
            cardExpiry: null,
            cardCvc: null,
            cardNumberDetails: false,
            cardExpiryDetails: false,
            cardCvcDetails: false,
            stripe:null,
            stripeCustomer:null,
            cardElement: null,
            stripDetails: null,
            isStripeLoaded: false,
            showApiError:null,
            billing: {
                name: null,
                cardNo: null,
                expiryDate: null,
                cvc: null
            },
            error: {
                name: null,
                cardNo: null,
                expiryDate: null,
                cvc: null
            },
            error_state: {
                name: null,
                cardNo: null,
                expiryDate: null,
                cvc: null
            }
        }
    },
    computed: {
        isDisable() {
            const isValidName = isRequired(this.billing.name);
            const isValid = isValidName && this.cardNumberDetails && this.cardExpiryDetails && this.cardCvcDetails
            if (isValid) {
                return false;
            } else {
                return true;
            }
        }
    },
    methods:{
        handleFocus(fieldName) {
            this.error[fieldName] = "";
            this.error_state[fieldName] = null;
            this.showApiError = null;
        },
        handleNameBlur() {
            const isValidName = isRequired(this.billing.name);
            if (!isValidName) {
                this.error.name = " Name is Required. ";
                this.error_state.name = false;
            } else {
                this.error.name = "";
                this.error_state.name = true;
            }
        },
        submit(){
            const clientSecret = this.stripeIntent.client_secret
            this.stripDetails.createToken(this.cardNumber)
                .then((response)=>{
                    this.stripDetails.confirmCardSetup(clientSecret, {
                            payment_method: {card: {token: response.token.id,},},})
                        .then((data)=>{
                            const subObj = { paymentMethod: data.setupIntent.payment_method, plan:this.plans[1].stripe_id}
                            this.$axios.post('/api/subscription/subscribe', subObj)
                                .then((response) => {
                                    this.$router.push("/exp-home");
                                })
                        })
                })
            // this.stripDetails.confirmCardSetup( clientSecret, {
            //     payment_method: {
            //             card: this.cardElement,
            //             billing_details: { name: this.stripeCustomer.email }
            //         }
            //     })
            //     .then((response)=>{
            //         const data = { token: response.token, plan:this.plans[1].stripe_id}
            //         // this.$axios.post('/api/subscription/subscribe', data)
            //         //     .then((response) => {
            //         //         this.$router.push("/exp-home");
            //         //     })
            //     })
            //     .catch(e=>{
            //         console.log(e)
            //     })
        },
        setUpListeners(){
            this.cardCvc.on('change',(event)=>{
                if (event.complete) {
                    this.cardCvcDetails = true
                } else if (event.error) {
                    this.cardCvcDetails = false
                }
            })
            this.cardExpiry.on('change',(event)=>{
                if (event.complete) {
                    this.cardExpiryDetails = true
                } else if (event.error) {
                    this.cardExpiryDetails = false
                }
            })
            this.cardNumber.on('change',(event)=>{
                if (event.complete) {
                    this.cardNumberDetails = true
                    } else if (event.error) {
                       this.cardNumberDetails = false
                    }
            })
        },
        setUpIntent(){
            this.$axios.post('/api/subscription/create-stripe-customer')
                .then((data)=>{
                    this.stripeCustomer = data.data
                    this.$axios.get('/api/subscription/intent')
                        .then((response)=>{
                            this.stripeIntent = response.data
                            this.submit()
                        })
                    })
        }
    },
    mounted(){
        const stripe = loadStripe('pk_test_EhFqsqBMFIFmoe4EIWwnHVva007Wjtz8cz')
        this.stripe = stripe
        stripe.then((data)=>{
            this.isStripeLoaded = true
            this.stripDetails = data
            const elements = this.stripDetails.elements();
            // this.cardElement = elements.create('card');
            // this.cardElement.mount('#card-element');
            this.cardNumber = elements.create('cardNumber');
            this.cardNumber.mount('#cardNumber');
            this.cardExpiry = elements.create('cardExpiry');
            this.cardExpiry.mount('#cardExpiry');
            this.cardCvc = elements.create('cardCvc');
            this.cardCvc.mount('#cardCvc');
            this.setUpListeners()
        })

        this.$axios.get('/api/plans')
            .then((response)=>{
                this.plans = response.data
            })
    }

}
</script>

<style lang="scss" scoped>

.m-heading-text {
    margin-top: 88px;
    margin-bottom: 8px;

    @media screen and (max-width: 992px) {
        margin-top: 77px;
    }
}

.m-subheading-text {
    margin-bottom: 48px;
}

.m-search-text {
    margin-bottom: 28px;
}

.m-money-symbol {
    margin-bottom: 23px;
}

.m-line {
    margin-top: 0px;
    margin-bottom: 26px;
}

.m-img-text {
    margin-right: 8px;
}

.m-field {
    margin-top: 24px;
}

.m-pay-btn {
    margin-top: 48px;
    margin-bottom: 190px;

    @media screen and (max-width: 992px) {
        margin-bottom: 76px;
    }
}

p {
    margin-bottom: 8px;
}

.p2-new {
    color: #1f1f1f;
}

.month {
    font-family: CerebriSans;
    font-size: 16px;
    font-weight: normal;
    margin-left: 8px;
    font-style: normal;
    letter-spacing: normal;
    color: #3d3d3d;
}
.billing-wrapper{
    form{
        max-width: 616px;
    }
}
.billing{
    &-left-block{
        max-width: 200px;
        margin-right: 120px;
    }
    &-right-block{
        width: 616px;
        max-width: 100%;
    }
}

</style>
<style>
#cardNumber, #cardExpiry, #cardCvc {
    display: block;
    width: 100%;
    height: 48px;
    padding: 15px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #1f1f1f;
    border: 1px solid #b8b8b8;
}
#cardNumber.StripeElement--focus, #cardNumber.StripeElement--complete, #cardExpiry.StripeElement--focus, #cardExpiry.StripeElement--complete, #cardCvc.StripeElement--focus, #cardCvc.StripeElement--complete {
    border-color: #1f1f1f;
    border-width: 2px;
}
#cardNumber.StripeElement--invalid, #cardExpiry.StripeElement--invalid, #cardCvc.StripeElement--invalid{
    border-color: #d93934;
    border-width: 2px;
}
.ElementsApp input{
    font-size: 16px !important;
}
/* .StripeElement{
    width: 400px !important;
    display: block;
} */
</style>