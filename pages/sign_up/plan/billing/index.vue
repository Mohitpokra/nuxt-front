<template>
<b-container>
    <b-row class="" :no-gutters="true">
        <b-col offset-lg="1">
            <h3 class="m-heading-text">Enter billing information</h3>
            <p class="m-subheading-text">Review your plan and enter your payment details</p>
        </b-col>
    </b-row>
    <b-row class="" :no-gutters="true">
        <b-col class="d-none d-lg-block pr-4" lg="3" offset-lg="1">
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
        <b-col class="ml-lg-3" lg="7">
            <b-form>
                <label class="" for="billing-name">Name on Credit Card</label>
                <b-input :class="{form_fill: billing.name}" v-model.trim="billing.name" :state="error_state.name" size="lg" id="billing-name" placeholder="Charlie Exampleton"></b-input>
                <b-form-invalid-feedback :state="error_state.name">
                    {{error.name}}
                </b-form-invalid-feedback>
                <label class="m-field" for="billing-cardNo">Credit Card Number</label>
                <b-input :class="{form_fill: billing.cardNo}" v-model="billing.cardNo" :state="error_state.cardNo" size="lg" id="billing-cardNo" placeholder="1234 5678 9012 3456"></b-input>
                <b-form-invalid-feedback :state="error_state.cardNo">
                    {{error.cardNo}}
                </b-form-invalid-feedback>
                <b-row class="">
                    <b-col cols="12" lg="6">
                        <label class="m-field" for="billing-expiryDate">Expiration Date</label>
                        <b-input :class="{form_fill: billing.expiryDate}" v-model="billing.expiryDate" :state="error_state.expiryDate" size="lg" id="billing-expiryDate" placeholder="MM/YY"></b-input>
                        <b-form-invalid-feedback :state="error_state.expiryDate">
                            {{error.expiryDate}}
                        </b-form-invalid-feedback>
                    </b-col>
                    <b-col cols="12" lg="6">
                        <label class="m-field" for="billing-cvc">CVC</label>
                        <b-input :class="{form_fill: billing.cvc}" v-model="billing.cvc" :state="error_state.cvc" size="lg" id="billing-cvc" placeholder="CVC"></b-input>
                        <b-form-invalid-feedback :state="error_state.cvc">
                            {{error.cvc}}
                        </b-form-invalid-feedback>
                    </b-col>
                </b-row>
                <div class="m-pay-btn">
                    <b-button block variant="primary" :disabled="isDisable" size="lg">Pay $15/mo</b-button>
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
    margin-bottom: 27px;
}

.m-line {
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
    margin-bottom: 220px;

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
</style>
