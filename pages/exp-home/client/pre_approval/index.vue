<template>
<b-container>
    <b-row align-h="start">
        <b-col offset-lg="1">
            <b-link>Home</b-link>
            <b-link>/Client</b-link>
            <b-link>/Pre-approval</b-link>
        </b-col>
    </b-row>
    <b-row>
        <b-col cols="12" lg="11" offset-lg="1">
            <h2>Pre-Approval Details</h2>
        </b-col>
    </b-row>
    <b-row align-h="start">
        <b-col cols="12" lg="5" offset-lg="1">
            <div class="box-shadow-container" @click="showPreApproved">
                <h4 class="container-text">Already Pre-approved</h4>
            </div>
        </b-col>
        <b-col cols="12" lg="5">
            <div class="box-shadow-container" @click="showAffordability">
                <h4 class="container-text">Estimated Affordability</h4>
            </div>
        </b-col>
    </b-row>
    <b-row v-if="preApproved || affordability">
        <b-col cols="12" lg="10" offset-lg="1">
            <hr>
        </b-col>
    </b-row>
    <b-row>
        <b-col v-if="preApproved" cols="10" lg="5" offset-lg="1">
            <div>
                <h3 class="text-primary">Search by Pre-approval</h3>
                <h4>What was the purchase pre-approval amount?</h4>
                <b-form>
                    <label class="" for="login-name">Name</label>
                    <b-input :class="{form_fill: user.name}" v-model.trim="user.name" :state="error_state.name" size="lg" id="login-name" placeholder="Charlie Exampleton"></b-input>
                    <b-form-invalid-feedback :state="error_state.name">
                        {{error.name}}
                    </b-form-invalid-feedback>
                </b-form>
                <h4>Which type of loan program?</h4>
                <b-form-group class="custom-radio">
                    <b-form-radio class="m-radio" size="lg" v-model="selected" name="some-radios" value="FHA">FHA</b-form-radio>
                    <b-form-radio class="m-radio" size="lg" v-model="selected" name="some-radios" value="VA">VA</b-form-radio>
                    <b-form-radio class="m-radio" size="lg" v-model="selected" name="some-radios" value="USDA">USDA</b-form-radio>
                    <b-form-radio class="m-radio" size="lg" v-model="selected" name="some-radios" value="Coventional">Coventional</b-form-radio>
                </b-form-group>
                <h4>What’s the qualified total housing payment?</h4>
                <b-form-group class="custom-radio">
                    <b-form-radio class="m-radio" size="lg" v-model="selected" name="some-radios" value="FHA">Minimum Down Payment</b-form-radio>
                    <div class="d-flex align-items-center">
                        <b-form-radio class="" size="lg" v-model="selected" name="some-radios" value="VA">
                        </b-form-radio>
                        <b-input :class="{form_fill: user.percentage}" v-model="user.percentage" :state="error_state.percentage" size="lg" type="text" placeholder="Percentage Down"></b-input>
                        <b-form-invalid-feedback :state="error_state.percentage">
                            {{error.percentage}}
                        </b-form-invalid-feedback>
                    </div>
                </b-form-group>
            </div>
        </b-col>
        <b-col v-if="affordability" cols="10" lg="5" offset-lg="1">
            <div>
                <h3 class="text-primary">Search by Estimated Affordability</h3>
                <h4>What is the maximum monthly payment your client can afford?</h4>
                <b-form>
                    <label class="" for="login-name">Max Total Monthly Payment</label>
                    <b-input :class="{form_fill: user.name}" v-model.trim="user.name" :state="error_state.name" size="lg" id="login-name" placeholder="Charlie Exampleton"></b-input>
                    <b-form-invalid-feedback :state="error_state.name">
                        {{error.name}}
                    </b-form-invalid-feedback>
                </b-form>
                <h4>What funds does you client have available to purchase?</h4>
                <div class="d-flex align-items-center">
                    <b-form-radio class="" size="lg" v-model="selected" name="some-radios" value="VA">
                    </b-form-radio>
                    <b-input :class="{form_fill: user.percentage}" v-model="user.percentage" :state="error_state.percentage" size="lg" type="text" placeholder="Percentage Down"></b-input>
                    <b-form-invalid-feedback :state="error_state.percentage">
                        {{error.percentage}}
                    </b-form-invalid-feedback>
                </div>
                <h4>What’s your client’s estimated credit score?</h4>
                <b-form-group class="custom-radio">
                    <b-form-radio class="m-radio" size="lg" v-model="selected" name="some-radios" value="FHA">Excellent (720+)</b-form-radio>
                    <b-form-radio class="m-radio" size="lg" v-model="selected" name="some-radios" value="VA">Average (680-719)</b-form-radio>
                    <b-form-radio class="m-radio" size="lg" v-model="selected" name="some-radios" value="USDA">Below Average (620-679)</b-form-radio>
                </b-form-group>
                <h4>Is your client a first time homebuyer?</h4>
                <b-form-radio class="m-radio" size="lg" v-model="selected" name="some-radios" value="FHA">Yes</b-form-radio>
                <b-form-radio class="m-radio" size="lg" v-model="selected" name="some-radios" value="VA">No</b-form-radio>
                <h4>Is your client a veteran?</h4>
                <div class="d-flex justify-content-between">
                    <b-form-radio class="m-radio" size="lg" v-model="selected" name="some-radios" value="FHA">Yes</b-form-radio>
                    <b-form-checkbox size="lg">Disabled veteran - no property tax</b-form-checkbox>
                </div>
                <b-form-radio class="m-radio" size="lg" v-model="selected" name="some-radios" value="VA">No</b-form-radio>
            </div>
        </b-col>
    </b-row>
    <b-row>
        <b-col cols="12" lg="10" offset-lg="1">
            <div class="bg-container">
                <h4 class="text-center">Would you like to obtain a competitive loan offer?</h4>
                <p class="p2 text-center">We give you the option to request a loan offer and it’s a simple as filing out some basic information for us to get in contact with your client.</p>
                <div class="text-center">
                    <b-btn class="btn-custom" size="sm">Request Pre-approval</b-btn>
                </div>
            </div>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
export default {

    data() {
        return {
            user: {
                name: null,
                percentage: null
            },
            error: {
                name: '',
                percentage: null
            },
            error_state: {
                name: null,
                percentage: null
            },
            selected: 0,
            preApproved: 0,
            affordability: 0
        }
    },
    methods: {
        showPreApproved() {
            this.preApproved = 1;
            this.affordability = 0;
        },
        showAffordability() {
            this.preApproved = 0;
            this.affordability = 1;
        }
    }

}
</script>

<style lang="scss" scoped>
.box-shadow-container {
    border-radius: 2px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
    padding-top: 24px;
    padding-bottom: 24px;
    padding-left: 48px;

    @media screen and (max-width: 992px) {
        padding-top: 12px;
        padding-bottom: 25px;
        padding-left: 24px;

    }

}

.btn-custom {
    width: 171px;
    border-radius: 2px;
    background-color: #ffffff;
}

.bg-container {
    border-radius: 2px;
    background-color: #dff7ff;
    padding: 44px 144px;

    @media screen and (max-width: 992px) {
        padding: 24px;
    }
}

.m-radio {
    margin-bottom: 16px;
}
</style>
