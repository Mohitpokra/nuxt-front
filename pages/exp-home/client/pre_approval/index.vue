<template>
<b-container>
    <b-row align-h="start">
        <b-col offset-lg="1">
            <b-breadcrumb>
                <b-breadcrumb-item>Home</b-breadcrumb-item>
                <b-breadcrumb-item>Client</b-breadcrumb-item>
                <b-breadcrumb-item active>Pre-approval</b-breadcrumb-item>
            </b-breadcrumb>
        </b-col>
    </b-row>
    <b-row class="top-title">
        <b-col cols="12" lg="11" offset-lg="1">
            <h2>Pre-Approval Details</h2>
        </b-col>
    </b-row>
    <b-row align-h="start" class="body-content">
        <b-col cols="12" lg="5" offset-lg="1">
            <div  class="box-shadow-container" :class="{'bg-heading': preApproved}" @click="showPreApproved">
                <div class="right-icon-container"><img class="icon-interface-check" src="~/assets/icons/icon-interface-check-white.svg" /></div>
                <h4 :class="{'text-white': preApproved}" class="container-text">Pre-approved</h4>
            </div>
        </b-col>
        <b-col  cols="12" lg="5">
            <div class="box-shadow-container" :class="{'bg-heading': affordability}" @click="showAffordability">
                <div class="right-icon-container"><img class="icon-interface-check" src="~/assets/icons/icon-interface-check-white.svg" /></div>
                <h4  :class="{'text-white': affordability}" class="container-text">Estimated Affordability</h4>
            </div>
        </b-col>
    </b-row>
    <b-row v-if="preApproved || affordability" class="divider">
        <b-col cols="12" lg="10" offset-lg="1">
            <hr>
        </b-col>
    </b-row>
    <b-row class="body-banner">
        <b-col v-if="preApproved" cols="10" lg="5" offset-lg="1" class="form-body-1 searchby-approval">
            <div>
                <h3 class="text-primary">Search by Pre-approval</h3>
                <h4 class="body-content title-head">What was the purchase pre-approval amount?</h4>
                <b-form class="form-1 name-text">
                    <label class="" for="login-name">Name</label>
                    <b-input :class="{form_fill: user.name}" v-model.trim="user.name" :state="error_state.name" size="lg" id="login-name" placeholder="Charlie Exampleton"></b-input>
                    <b-form-invalid-feedback :state="error_state.name">
                        {{error.name}}
                    </b-form-invalid-feedback>
                </b-form>
                <h4 class="form-1 title-head">Which type of loan program?</h4>
                <b-form-group class="custom-radio">
                    <b-form-radio class="m-radio" size="lg" v-model="selected" name="some-radios" value="FHA">FHA</b-form-radio>
                    <b-form-radio class="m-radio" size="lg" v-model="selected" name="some-radios" value="VA">VA</b-form-radio>
                    <b-form-radio class="m-radio" size="lg" v-model="selected" name="some-radios" value="USDA">USDA</b-form-radio>
                    <b-form-radio class="m-radio" size="lg" v-model="selected" name="some-radios" value="Coventional">Coventional</b-form-radio>
                </b-form-group>
                <h4 class=" title-head">What’s the qualified total housing payment?</h4>
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
        <b-col v-if="affordability" cols="10" lg="5" offset-lg="1" class="form-body-2 estimated-affordability">
            <div>
                <h3 class="text-primary title-head">Search by Estimated Affordability</h3>
                <h4 class="form-1">What is the maximum monthly payment your client can afford?</h4>
                <b-form class="divider name-text">
                    <label class="" for="login-name">Max Total Monthly Payment</label>
                    <b-input :class="{form_fill: user.name}" v-model.trim="user.name" :state="error_state.name" size="lg" id="login-name" placeholder="Charlie Exampleton"></b-input>
                    <b-form-invalid-feedback :state="error_state.name">
                        {{error.name}}
                    </b-form-invalid-feedback>
                </b-form>
                <h4 class="body-banner title-head">What funds does you client have available to purchase?</h4>
                <div class="d-flex align-items-center">
                    <b-form-radio class="" size="lg" v-model="selected" name="some-radios" value="VA">
                    </b-form-radio>
                    <b-input :class="{form_fill: user.percentage}" v-model="user.percentage" :state="error_state.percentage" size="lg" type="text" placeholder="Percentage Down"></b-input>
                    <b-form-invalid-feedback :state="error_state.percentage">
                        {{error.percentage}}
                    </b-form-invalid-feedback>
                </div>
                <h4 class="body-banner title-head">What’s your client’s estimated credit score?</h4>
                <b-form-group class="custom-radio">
                    <b-form-radio class="m-radio" size="lg" v-model="selected" name="some-radios" value="FHA">Excellent (720+)</b-form-radio>
                    <b-form-radio class="m-radio" size="lg" v-model="selected" name="some-radios" value="VA">Average (680-719)</b-form-radio>
                    <b-form-radio class="m-radio" size="lg" v-model="selected" name="some-radios" value="USDA">Below Average (620-679)</b-form-radio>
                </b-form-group>
                <h4 class=" title-head">Is your client a first time homebuyer?</h4>
                <b-form-radio class="m-radio" size="lg" v-model="selected" name="some-radios" value="FHA">Yes</b-form-radio>
                <b-form-radio class="m-radio" size="lg" v-model="selected" name="some-radios" value="VA">No</b-form-radio>
                <h4 class="divider title-head" >Is your client a veteran?</h4>
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
                    <b-btn class="btn-custom" size="sm" @click="$bvModal.show('bv-modal-example')">Request Pre-approval</b-btn>
                </div>
            </div>
        </b-col>
    </b-row>
    <div>
        <b-modal id="bv-modal-example" centered hide-footer hide-header>
            <div v-if="!request_sent" class="modal-body-1">
                <div class="header">
                    <h3 class="text-primary">Request pre-appoval</h3>
                </div>
                <b-row align-h="between" class="modal-form-1">
                    <b-col lg="6">
                        <label for="login-email">Email</label>
                        <b-input :class="{form_fill: user.email}" v-model.trim="user.email" :state="error_state.email" size="lg" id="login-email" placeholder="charlie@email.com"></b-input>
                        <b-form-invalid-feedback :state="error_state.email">
                            {{error.email}}
                        </b-form-invalid-feedback>
                    </b-col>
                    <b-col lg="6">
                        <label for="login-email">Email</label>
                        <b-input :class="{form_fill: user.email}" v-model.trim="user.email" :state="error_state.email" size="lg" id="login-email" placeholder="charlie@email.com"></b-input>
                        <b-form-invalid-feedback :state="error_state.email">
                            {{error.email}}
                        </b-form-invalid-feedback>
                    </b-col>
                </b-row>
                <b-row align-h="between">
                    <b-col lg="6" class="modal-input-field">
                        <label for="login-email">Email</label>
                        <b-input :class="{form_fill: user.email}" v-model.trim="user.email" :state="error_state.email" size="lg" id="login-email" placeholder="charlie@email.com"></b-input>
                        <b-form-invalid-feedback :state="error_state.email">
                            {{error.email}}
                        </b-form-invalid-feedback>
                    </b-col>
                    <b-col lg="6" class="modal-input-field">
                        <label for="login-email">Email</label>
                        <b-input :class="{form_fill: user.email}" v-model.trim="user.email" :state="error_state.email" size="lg" id="login-email" placeholder="charlie@email.com"></b-input>
                        <b-form-invalid-feedback :state="error_state.email">
                            {{error.email}}
                        </b-form-invalid-feedback>
                    </b-col>
                </b-row>
                <b-row class="body-banner">
                    <b-col>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </b-col>
                </b-row>
                <b-row align-h="between" class="divider">
                    <b-col cols="6">
                        <b-button class="mt-3" block variant="primary" :disabled="isDisable" size="lg">Create</b-button>
                    </b-col>
                    <b-col cols="3">
                        <b-button class="mt-3" block variant="secondary btn-custom_1" @click="$bvModal.hide('bv-modal-example')" size="lg">Cancel</b-button>
                    </b-col>
                </b-row>
            </div>
            <div v-else>
                <b-row class="h-100" align-v="center" align-h="center">
                    <b-col class="text-center" cols="auto">
                        <div>
                            <img src="~/assets/icons/icon-decorative-send-email.svg" />
                        </div>
                        <h3>Request sent!</h3>
                        <p class="p3">We’ll be in touch with you and your client to get a competitive rate.</p>
                        <b-btn variant="primary btn-custom_2">Continue Search</b-btn>
                    </b-col>
                </b-row>
            </div>
        </b-modal>
    </div>
</b-container>
</template>

<script>
export default {
    auth: false,
    data() {
        return {
            isDisable: true,
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
            affordability: 0,
            request_sent: 0
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
    padding-top: 23px;
    padding-bottom: 23px;
    display: flex;

    .right-icon-container {
        text-align: center;
        width: 32px;
        height: 26px;
        margin-right: 8px;
        margin-left: 8px;

        .icon-interface-check {
            width: 16px;
            height: 11px;
            object-fit: contain;
        }
    }
    h4{
        margin: 0px;
        display: flex;
        align-items: center;
    }

    @media screen and (max-width: 992px) {
        padding-top: 11px;
        padding-bottom: 11px;
        padding-left: 5px;
        &:first-child{
            margin-bottom: 10px;
        }
        .container-text{
            font-size: 15px;
        }
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
        .text-center{
            width: 80%;
            margin: auto;
        }
        .p2.text-center{
            margin-top: 10px;
            margin-bottom: 24px;
        }
    }
}

.m-radio {
    margin-bottom: 16px;
}

.btn-custom_2 {
    width: 312px;
}


.top-title{
    margin-top: 38px;
}

.body-content{
    margin-top: 46px;
}

.body-banner{
    margin-top: 48px;
}
.divider{
    margin-top: 35px;
}

.form-body-2{
    margin-top: -20px;
    margin-bottom: 34px; 
}

.form-body-1{
    margin-bottom: 34px;
    margin-top: -20px;
}
.form-1{
    margin-top: 37px;
}

.modal-body-1{
    margin-top: 25px;
}

.modal-form-1{
    margin-top: 36px;
}

.modal-input-field{
    margin-top: 18px;
}
.searchby-approval, .estimated-affordability{
    .name-text{
        margin-top: 10px;
    }
    .title-head{
        margin-bottom: 12px;
    }
}
</style>
