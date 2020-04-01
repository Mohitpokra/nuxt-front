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
                        <b-input :class="{form_fill: billing.name}" v-model.trim="billing.name" :state="error_state.name" size="lg" id="billing-name" placeholder="Charlie Exampleton"></b-input>
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
                        <div id='cardNumber' ></div>
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
                        <b-button block variant="primary" @click="test" size="lg">Pay $15/mo</b-button>
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

const  elementStyles = {
    base: {
      color: '#fff',
      fontWeight: 600,
      fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',

      ':focus': {
        color: '#424770',
      },

      '::placeholder': {
        color: '#9BACC8',
      },

      ':focus::placeholder': {
        color: '#CFD7DF',
      },
    },
    invalid: {
      color: '#fff',
      ':focus': {
        color: '#FA755A',
      },
      '::placeholder': {
        color: '#FFCCA5',
      },
    },
  };

  const elementClasses = {
    focus: 'focus',
    empty: 'empty',
    invalid: 'invalid',
  };

export default {

    data() {
        return {
            cardNumber: null,
            cardExpiry: null,
            cardCvc: null,
            stripe:null,
            stripeCustomer:null,
            cardElement: null,
            stripDetails: null,
            isStripeLoaded: false,
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
            if (this.billing.name && this.billing.cardNo && this.billing.expiryDate && this.billing.cvc) {
                return false;
            } else {
                return true;
            }
        }
    },
    methods:{
        test(){
            this.$axios.post('/api/subscription/create-stripe-customer')
                .then((data)=>{
                    this.stripeCustomer = data.data
                    this.$axios.get('/api/subscription/intent')
                        .then((response)=>{
                            this.stripeIntent = response.data
                            const clientSecret = response.data.client_secret
                            this.stripDetails.createToken(this.cardNumber)
                            .then((response)=>{
                                const token = response.data.id
                            })
                            .catch(e=>{
                                console.log(e)
                            })
                        })
                })
        }
    },
    mounted(){
        const stripe = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')
        this.stripe = stripe
        stripe.then((data)=>{
            this.isStripeLoaded = true
            this.stripDetails = data
            const elements = this.stripDetails.elements();
            this.cardNumber = elements.create('cardNumber');
            this.cardNumber.mount('#cardNumber');
            this.cardExpiry = elements.create('cardExpiry');
            this.cardExpiry.mount('#cardExpiry');
            this.cardCvc = elements.create('cardCvc');
            this.cardCvc.mount('#cardCvc');
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
