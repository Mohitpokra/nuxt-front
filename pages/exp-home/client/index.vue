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
        <b-row v-if="show" align-h="center">
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
            <b-col cols="10" offset-lg="1">
                <div class="box-shadow-container">
                    <h4 class="container-text"><img class="check" src="~/assets/icons/icon-interface-check.svg" /> Stephen Shaw</h4>
                </div>
            </b-col>
            <b-col cols="10" offset-lg="1">
                <div class="box-shadow-container">
                    <h4 class="container-text"><img class="check" src="~/assets/icons/icon-interface-check.svg" /> Stephen Shaw</h4>
                </div>
            </b-col>
            <b-col cols="10" offset-lg="1">
                <div class="box-shadow-container">
                    <h4 class="container-text"><img class="check" src="~/assets/icons/icon-interface-check.svg" /> Stephen Shaw</h4>
                </div>
            </b-col>
            <b-col cols="10" offset-lg="1">
                <div class="box-shadow-container">
                    <h4 class="container-text"><img class="check" src="~/assets/icons/icon-interface-check.svg" /> Stephen Shaw</h4>
                </div>
            </b-col>
        </b-row>
    </div>
    <div class="flex justify-between buttons">
        <b-btn class="btn-custom btn-back" variant="secondary" size="lg" @click="goBack()">Back</b-btn>
        <b-btn class="btn-custom" variant="primary" size="lg" @click="moveToNext">Next</b-btn>
    </div>
    <div>
        <!-- <b-modal id="add-new-client"  class="modal-full-body" centered hide-footer hide-header>
            <div class="modal-temp-body ">
                <div class="header">
                    <h3 class="text-primary">New Client</h3>
                </div>
                <div>
                    <p class="p2">It can be whatever you fits your needs — full name, first name, etc but enter a name you’ll recognize since you’ll need to find it in the search history.</p>
                </div>
                <b-form class="modal-form">
                    <label class="" for="login-name">Client Name</label>
                    <b-input :class="{form_fill: user.name}" @blur="handleNameBlur"  @focus="handleFocus('name')"  v-model.trim="user.name" :state="error_state.name" size="lg" id="login-name" placeholder="Charlie Exampleton"></b-input>
                    <b-form-invalid-feedback :state="error_state.name">
                        {{error.name}}
                    </b-form-invalid-feedback>
                </b-form>
                <b-button class="mt-3 btn-1" block variant="primary" size="lg" @click="createUser()">Create</b-button>
                <b-button class="mt-3 btn-2 bottom-20" block variant="secondary btn-custom_1" @click="$bvModal.hide('add-new-client')" size="lg">Cancel</b-button>
            </div>
        </b-modal> -->
        <b-modal id="req-apv" class="req-approval" centered hide-footer hide-header>
            <div v-if="!addclients" class="modal-body-1">
                <div class="header">
                    <h3 class="text-primary">Request pre-appoval</h3>
                </div>
                <b-row align-h="between" class="modal-form-1">
                    <b-col lg="6">
                        <div class="inp-wrapper">
                            <div class="flex justify-content-between" >
                                <label for="login-email">Client First Name</label>
                                <span class="inp-error">{{error.email}}</span>
                            </div>
                            <b-input :class="{form_fill: user.email}" v-model.trim="user.email" :state="error_state.email" size="lg" id="login-email" placeholder="charlie@email.com"></b-input>
                            <b-form-invalid-feedback :state="error_state.email">
                                {{error.email}}
                            </b-form-invalid-feedback>
                        </div>
                    </b-col>
                    <b-col lg="6">
                        <div class="inp-wrapper">
                            <div class="flex justify-content-between" >
                                <label for="login-email">Client Last Name</label>
                                <span class="inp-error">{{error.email}}</span>
                            </div>
                            <b-input :class="{form_fill: user.email}" v-model.trim="user.email" :state="error_state.email" size="lg" id="login-email" placeholder="charlie@email.com"></b-input>
                            <b-form-invalid-feedback :state="error_state.email">
                                {{error.email}}
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
                            <b-input :class="{form_fill: user.email}" v-model.trim="user.email" :state="error_state.email" size="lg" id="login-email" placeholder="charlie@email.com"></b-input>
                            <b-form-invalid-feedback :state="error_state.email">
                                {{error.email}}
                            </b-form-invalid-feedback>
                        </div>
                    </b-col>
                    <b-col lg="6">
                        <div class="inp-wrapper">
                            <div class="flex justify-content-between" >
                                <label for="login-email">Phone Number</label>
                                <span class="inp-error">{{error.email}}</span>
                            </div>
                            <b-input :class="{form_fill: user.email}" v-model.trim="user.email" :state="error_state.email" size="lg" id="login-email" placeholder="charlie@email.com"></b-input>
                            <b-form-invalid-feedback :state="error_state.email">
                                {{error.email}}
                            </b-form-invalid-feedback>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="body-banner">
                    <b-col>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Enter any notes"></textarea>
                    </b-col>
                </b-row>
                <div class="divider req-apv-btns">
                    <b-button class="req" block variant="primary" :disabled="isDisable" size="lg">Create</b-button>
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
import {isRequired, isEmail} from './../../../utils/validations.js'
import { toastDuration } from '../../../constants'

export default {
    data() {
        return {
            show: 1,
            user: {
                name: null,
                email: null
            },
            error: {
                name: '',
                email: ''
            },
            error_state: {
                name: null,
                email: null
            },
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
    },
    methods: {
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
        handleNameBlur(){
            const isValidName = isRequired(this.user.name)
            if(!isValidName){
                this.error.name = ' Name is Required. '
                this.error_state.name = false
            }else{
                this.error.name = ''
                this.error_state.name = true
            }
        },
        createUser(){
            this.handleNameBlur();
            this.handleEmailBlur();
            const isValid = this.error_state.name || this.error_state.email
            if(isValid){
                const name = this.user.name.split(' ')
                const firstName = name[0]
                const lastName = name[1]
                try {
                    const obj = {
                        "firstName": firstName,
                        "lastName": lastName,
                        "email": this.user.email,
                    }
                 try{
                    this.$axios.post('api/client/create', obj)
                        .then((data)=>{
                            this.$toast.success('Client Created Successfully !', toastDuration)
                            this.$bvModal.hide('add-new-client')
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
        handleFocus(fieldName){
            this.error[fieldName] = ''
            this.error_state[fieldName] = null
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
            this.$router.push('/exp-home/client/pre_approval')
        },
        goBack(){
            this.$router.back()
        },
        hide() {
            this.show = 0;
        }
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
</style>
