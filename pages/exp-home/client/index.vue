<template>
<b-container>
    <div class="inner-container">
        <b-row align-h="start" class="location" >
            <b-col>
                <b-breadcrumb :items="items"></b-breadcrumb>
            </b-col>
        </b-row>
        <b-row class="add-client">
            <b-col cols="7" lg="7">
                <h2>Select or add a new client</h2>
            </b-col>
            <b-col class="text-right" cols="5" lg="5">
                <b-btn variant="primary" size="sm" @click="$bvModal.show('req-apv')">New Client</b-btn>
            </b-col>
        </b-row>
        <div v-if="getIsClientsApiCalled">
            <b-row v-if="!getClientsList.length" align-h="center">
                <b-col class="text-center">
                    <div>
                        <img class="img-container" src="~/assets/images/illustration-empty-clients.svg" />
                    </div>
                    <div class="not-found">
                        <h4>None found.</h4>
                        <p class="p2">Click “New Client” button to create one.</p>
                    </div>
                </b-col>
            </b-row>
            <b-row v-else class="input-box">
                <b-col cols="12" v-for="client in getClientsList" :key="client.id" @click="setSelected(client)">
                    <div class="box-shadow-container list" :class="{'selected': client.id ==  (getSelectedClient && getSelectedClient.id)}">
                        <h4 class="container-text"><img class="check" src="~/assets/icons/icon-interface-check-white.svg" /> {{client.first_name +' ' + client.last_name}}</h4>
                    </div>
                </b-col>
            </b-row>
        </div>
    </div>
    <div class="flex justify-between buttons">
        <b-btn class="btn-custom btn-back" variant="secondary" size="lg" @click="goBack()">Back</b-btn>
        <b-btn class="btn-custom" variant="primary" size="lg" @click="moveToNext" :disabled="isNextDisable">Next</b-btn>
    </div>
    <div>
        <b-modal id="req-apv" class="req-approval" centered hide-footer hide-header>
            <div v-if="!addclients" class="modal-body-1">
                <div class="header">
                    <h3 class="text-primary">Request pre-appoval</h3>
                </div>
                <b-row align-h="between" class="modal-form-1">
                    <b-col lg="6">
                        <div class="inp-wrapper">
                            <div class="flex justify-content-between" >
                                <label for="login-firstName">Client First Name</label>
                                <span class="inp-error">{{error.firstName}}</span>
                            </div>
                            <b-input :class="{form_fill: user.firstName}" @focus="handleFocus('firstName')" @blur="handleFirstNameBlur" v-model.trim="user.firstName" :state="error_state.firstName" size="lg" id="login-firstName" placeholder="charlie"></b-input>
                            <b-form-invalid-feedback :state="error_state.firstName">
                                {{error.firstName}}
                            </b-form-invalid-feedback>
                        </div>
                    </b-col>
                    <b-col lg="6">
                        <div class="inp-wrapper">
                            <div class="flex justify-content-between" >
                                <label for="login-lastName">Client Last Name</label>
                                <span class="inp-error">{{error.lastName}}</span>
                            </div>
                            <b-input :class="{form_fill: user.lastName}" @focus="handleFocus('lastName')" @blur="handleLastNameBlur" v-model.trim="user.lastName" :state="error_state.lastName" size="lg" id="login-lastName" placeholder="puth"></b-input>
                            <b-form-invalid-feedback :state="error_state.lastName">
                                {{error.lastName}}
                            </b-form-invalid-feedback>
                        </div>
                    </b-col>
                </b-row>
                <b-row align-h="between">
                    <b-col lg="6">
                        <div class="inp-wrapper">
                            <div class="flex justify-content-between" >
                                <label for="login-email">Email</label>
                                <span class="inp-error">{{error.email}}</span>
                            </div>
                            <b-input :class="{form_fill: user.email}" @focus="handleFocus('email')" @blur="handleEmailBlur" v-model.trim="user.email" :state="error_state.email" size="lg" id="login-email" placeholder="charlie@email.com"></b-input>
                            <b-form-invalid-feedback :state="error_state.email">
                                {{error.email}}
                            </b-form-invalid-feedback>
                        </div>
                    </b-col>
                    <b-col lg="6">
                        <div class="inp-wrapper">
                            <div class="flex justify-content-between" >
                                <label for="login-mobile">Phone Number</label>
                                <span class="inp-error">{{error.mobile}}</span>
                            </div>
                            <b-input :class="{form_fill: user.mobile}" @focus="handleFocus('mobile')" @blur="handleMobileBlur" v-model.trim="user.mobile" :state="error_state.mobile" size="lg" id="login-mobile" placeholder="9876543219" maxLength="10"></b-input>
                            <b-form-invalid-feedback :state="error_state.mobile">
                                {{error.mobile}}
                            </b-form-invalid-feedback>
                        </div>
                    </b-col>
                </b-row>
                <!-- <b-row class="body-banner">
                    <b-col>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Enter any notes"></textarea>
                    </b-col>
                </b-row> -->
                <div class="divider req-apv-btns">
                    <b-button class="req" block variant="primary" :disabled="isDisable" size="lg" @click="createUser()">Create</b-button>
                    <b-button class="can" block variant="secondary btn-custom_1" @click="$bvModal.hide('req-apv')" size="lg">Cancel</b-button>
                </div>
            </div>
            <div v-else>
                <b-row class="h-100" align-v="center" align-h="center">
                    <b-col class="text-center" cols="auto">
                        <div>
                            <img src="~/assets/icons/icon-decorative-send-email.svg" />
                        </div>
                        <h3>Request sent!</h3>
                        <p class="p3">We’ll be in touch with you and your client to get a competitive rate.</p>
                        <b-btn variant="primary btn-custom_2" @click="goToNext">Continue Search</b-btn>
                    </b-col>
                </b-row>
            </div>
        </b-modal>
    </div>
</b-container>
</template>

<script>
import {isRequired, isEmail, isMobileNumber} from './../../../utils/validations.js'
import { toastDuration } from '../../../constants'
import { mapGetters } from "vuex";


export default {
    middleware: 'auth',
    data() {
        return {
            addclients: false,
            show: 1,
            isSelected:null,
            selectedUser:{},
            user: {
                firstName: null,
                lastName: null,
                mobile: null,
                email: null
            },
            error: {
                firstName: '',
                lastName: '',
                mobile: '',
                email: ''
            },
            error_state: {
                firstName: null,
                lastName: null,
                mobile: null,
                email: null
            },
            apiCalled: false,
            items: [
                {
                    text: 'Home',
                    href: '/'
                },
                {
                    text: 'Client',
                    href: '#'
                },
            ]
        }
    },
    computed: {
         ...mapGetters("clients", [
                "getClientsList",
                "getSelectedClient",
                "getIsClientsApiCalled"
            ]),
            isNextDisable(){
               const  data = this.$store.getters && this.$store.getters['clients/getSelectedClient']
                return data.id ? false : true
            },
        isDisable(){
            const isValidFirstName = isRequired(this.user.firstName)
            const isValidLastName = isRequired(this.user.lastName)
            const ValidEmail = isRequired(this.user.email) && isEmail(this.user.email)
            const ValidMobile = isRequired(this.user.mobile) && isMobileNumber(this.user.mobile)
            if(isValidFirstName && isValidLastName && ValidEmail && ValidMobile){
                return false
            }else {
                return true
            }
        }
    },
    methods: {
        setSelected(user){
            // this.isSelected = true;
            this.selectedUser = user;
            this.$store.dispatch('clients/selectedClient', user)
        },
        errorHandling(responseObj){
            let {message, errors = {}} = responseObj.response && responseObj.response.data
            if(Object.keys(errors).length){
                Object.keys(errors).map((error)=>{
                    this.$toast.error(errors[error], toastDuration)
                });
            }else{
                    this.$toast.error(message, toastDuration)
            }
        },
        handleFocus(fieldName){
            this.error[fieldName] = ''
            this.error_state[fieldName] = null
        },
        handleFirstNameBlur(){
            const isValidFirstName = isRequired(this.user.firstName)
            if(!isValidFirstName){
                this.error.firstName = ' First Name is Required. '
                this.error_state.firstName = false
            }else{
                this.error.firstName = ''
                this.error_state.firstName = true
            }
        },
        handleLastNameBlur(){
            const isValidLastName = isRequired(this.user.lastName)
            if(!isValidLastName){
                this.error.lastName = ' Last Name is Required. '
                this.error_state.lastName = false
            }else{
                this.error.lastName = ''
                this.error_state.lastName = true
            }
        },
        handleMobileBlur(){
            const isValidMobile = isRequired(this.user.mobile) && isMobileNumber(this.user.mobile)
            if(!isValidMobile){
                this.error.mobile = (this.user.mobile == '') ? ' Mobile is Required. ' : 'Invalid Mobile Number'
                this.error_state.mobile = false
            }else{
                this.error.mobile = ''
                this.error_state.mobile = true
            }
        },
        createUser(){
            this.handleFirstNameBlur();
            this.handleLastNameBlur();
            this.handleEmailBlur();
            this.handleMobileBlur();
            const isValid = this.error_state.firstName || this.error_state.email || this.error_state.lastName || this.error_state.mobile
            if(isValid){
                try {
                    const obj = {
                        "firstName": this.user.firstName,
                        "lastName": this.user.lastName,
                        "email": this.user.email,
                        "mobile": this.user.mobile,
                    }
                 try{
                    this.$axios.post('api/client/create', obj)
                        .then((data)=>{
                            this.$toast.success('Client Created Successfully !', toastDuration)
                            this.$store.dispatch('clients/getClients')
                                .then(()=>{
                                    this.$bvModal.hide('req-apv')
                                })
                        })
                        .catch((responseObj)=>{
                            this.errorHandling(responseObj)
                            return false
                        });
                    } catch (e) {
                        this.$toast.error('Please try again later !', toastDuration)
                    }
                }
                catch(e){
                    this.$toast.error('Something went wrong, Try Again later', toastDuration)
                }
            }
        },
        handleEmailBlur(){
            const isValidEmail = isRequired(this.user.email) && isEmail(this.user.email)
            if(!isValidEmail){
                this.error.email = ' Email is Required. '
                this.error_state.email = false
            }else{
                this.error.email = ''
                this.error_state.email = true
            }

        },
        moveToNext(){
            this.$router.push('/exp-home/client/home_design')
        },
        goBack(){
            this.$router.back()
        },
        hide() {
            this.show = 0;
        }
    },
    mounted(){
        this.$store.dispatch('clients/getClients')
    }

}
</script>

<style lang="scss" scoped>
.btn-sm {
    width: 104px;
}

.modal-backdrop {
   background-color: red !important;
}
.modal-temp-body {
    max-width: 360px;
    margin: 0 auto;
    margin-top: 40px;
    @media screen and (max-width: 992px) {
        max-width: 315px;
        margin: 0 auto;
        margin-top: 40px;
    }
}
.body-banner{
    margin-top: 48px;
}
.modal-form{
    margin-top: 38px;
}

.btn-back {
    border-radius: 2px;
    background-color: #f5f5f5;
    color: #1f1f1f;
}

.box-shadow-container {
    transition: box-shadow 0.45s;
    border-radius: 2px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
    padding-top: 24px;
    padding-bottom: 24px;
    padding-left: 48px;
    margin-top:8px;
    max-height: 72px;
    @media screen and (max-width: 992px) {
        padding-top: 12px;
        padding-bottom: 25px;
        padding-left: 24px;
        margin-top: 16px;
        width: 327px;
        height: 48px;


    }

}
.req-apv-btns{
    display: flex;
    justify-content: space-between;
    margin-top: 48px;
    .req{
        width: 360px;
    }
    .can{
        width: 136px;
    }
    @media screen and (max-width: 992px) {
        flex-direction: column;
        button{
           &.req, &.can{
                width: 100%;
           }
        }
    }
}
.steps-btn{
    margin-top: 188px;
    margin-bottom: 30px;
    button{
        min-width: 154px;
        border: none;
        &:hover{
            border: none;
        }
    }
    .back{
        background-color: #f5f5f5;
        color: black;
    }
    @media screen and (max-width: 992px) {
        margin-left: -15px;
        margin-right: -15px;
        margin-top: 184px;
        button{
            min-width: 167px;
        }
     }
}
.box-shadow-container:hover {
  cursor: pointer;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
}
.btn-custom {
    width: 156px;

    @media screen and(max-width: 992px) {
        width: 175px;
    }
}

.img-container {
    max-width: 640px;
    max-height: 420px;
    object-fit: contain;

    @media screen and (max-width: 992px) {
        width: 327px;
        height: 216px;
        object-fit: contain;
    }
}

.btn-custom_1 {
    color: #1f1f1f;
}

.btn-1{
    margin-top: 48px !important;
     @media screen and (max-width: 992px) {
        margin-top: 220px;
    }
}

.btn-2{
    margin-top: 8px !important;
     @media screen and (max-width: 992px) {
        margin-top: 220px;
    }
}

.location {
    margin-top: 24px;
}

.add-client{
    margin-top: 38px;
    display: flex;
    align-items: center;
     @media screen and (max-width: 992px) {
        margin-top: 20px;
        align-items: flex-start;
        h2{
            line-height: 32px;
        }
    }
}
.input-box{
    margin-top: 28px;
}
.buttons{
    margin-top: 100px;
    margin-bottom: 40px;
}
.check{
  margin-right: 8px;
  width: 16px;
  height: 11px;
  object-fit: contain;
}

.text-center {
    margin-top: 35px;
}

.not-found{
    margin-top: 24px;
}

.header{
    margin-top: -12px;
}
.buttons{
     @media screen and (max-width: 992px) {
        margin-left: -15px;
        margin-right: -15px;
     }
}
.list{
    position: relative;
    img{
        position: absolute;
        left: 18px;
        top: 30px;
        transition: 0.25s;
        transform: scale(0);
    }
    &.selected{
        background-color: #1f1f1f;
        .container-text{
            color: #fff;
        }
        img{
            transform: scale(1);
        }
    }
}
</style>
