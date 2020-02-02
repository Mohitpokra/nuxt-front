<template>
<b-container>
    <b-row class="mt-5">
        <b-col offset-lg="1">
            <h3>Enter billing information</h3>
            <p class="p2">Review your plan and enter your payment details</p>
        </b-col>
    </b-row>
    <b-row class="my-5">
        <b-col class="pr-5 d-none d-lg-block" lg="4" offset-lg="1">
            <p class="p1">Search by Mortgage <br> Payment Pro Plan</p>
            <h3 class="my-4">$15<span class="p2">/ month</span></h3>
            <hr class="mr-5">
            <p class="p2"><span><img  class="mr-2 text-primary" src="~/assets/icons/icon-interface-check.svg" /></span>Unlimited searches</p>
            <p class="p2"><span><img  class="mr-2" src="~/assets/icons/icon-interface-check.svg" /></span>Unlimited search history</p>
            <p class="p2"><span><img  class="mr-2" src="~/assets/icons/icon-interface-check.svg" /></span>Cancel anytime</p>
        </b-col>
        <b-col lg="7">
            <b-form>
                <label class="p3" for="billing-name">Name on Credit Card</label>
                <b-input :class="{form_fill: billing.name}" v-model.trim="billing.name" :state="error_state.name" size="lg" id="billing-name" placeholder="Charlie Exampleton"></b-input>
                <b-form-invalid-feedback :state="error_state.name">
                    {{error.name}}
                </b-form-invalid-feedback>
                <label class="mt-2 p3" for="billing-cardNo">Credit Card Number</label>
                <b-input :class="{form_fill: billing.cardNo}" v-model="billing.cardNo" :state="error_state.cardNo" size="lg" id="billing-cardNo" placeholder="1234 5678 9012 3456"></b-input>
                <b-form-invalid-feedback :state="error_state.cardNo">
                    {{error.cardNo}}
                </b-form-invalid-feedback>
                <b-row class="mt-2">
                    <b-col cols="12" lg="6">
                        <label class="p3" for="billing-expiryDate">Expiration Date</label>
                        <b-input :class="{form_fill: billing.expiryDate}" v-model="billing.expiryDate" :state="error_state.expiryDate" size="lg" id="billing-expiryDate" placeholder="MM/YY"></b-input>
                        <b-form-invalid-feedback :state="error_state.expiryDate">
                            {{error.expiryDate}}
                        </b-form-invalid-feedback>
                    </b-col>
                    <b-col cols="12" lg="6">
                        <label class="p3" for="billing-cvc">CVC</label>
                        <b-input :class="{form_fill: billing.cvc}" v-model="billing.cvc" :state="error_state.cvc" size="lg" id="billing-cvc" placeholder="CVC"></b-input>
                        <b-form-invalid-feedback :state="error_state.cvc">
                            {{error.cvc}}
                        </b-form-invalid-feedback>
                    </b-col>
                </b-row>
                <div class="mt-5">
                    <b-button block variant="primary" :disabled="isDisable" size="lg">Sign Up</b-button>
                </div>
            </b-form>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
export default {
    data() {
        return {
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
            if (this.billing.name && this.billing.cardNo  && this.billing.expiryDate && this.billing.cvc) {
                return false;
            } else {
                return true;
            }
        }
    }

}
</script>

<style>

</style>
