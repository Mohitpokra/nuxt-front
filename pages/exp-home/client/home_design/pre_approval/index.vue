<template>
  <b-container>
    <div class="inner-container">
      <b-row align-h="start">
        <b-col>
          <b-breadcrumb :items="items"></b-breadcrumb>
        </b-col>
      </b-row>
      <b-row class="top-title">
        <b-col cols="12" lg="11">
          <h2>Pre-approval Details</h2>
        </b-col>
      </b-row>
      <b-row align-h="start" class="body-content">
        <b-col cols="12" lg="6">
          <div
            class="box-shadow-container"
            :class="{ 'bg-heading': preApproved }"
            @click="showPreApproved"
          >
            <div class="right-icon-container">
              <img
                class="icon-interface-check"
                src="~/assets/icons/icon-interface-check-white.svg"
              />
            </div>
            <h4 :class="{ 'text-white': preApproved }" class="container-text">
              Already Pre-approved
            </h4>
          </div>
        </b-col>
        <b-col cols="12" lg="6">
          <div
            class="box-shadow-container"
            :class="{ 'bg-heading': affordability }"
            @click="showAffordability"
          >
            <div class="right-icon-container">
              <img
                class="icon-interface-check"
                src="~/assets/icons/icon-interface-check-white.svg"
              />
            </div>
            <h4 :class="{ 'text-white': affordability }" class="container-text">
              Estimated Affordability
            </h4>
          </div>
        </b-col>
      </b-row>
      <b-row v-if="preApproved || affordability" class="divider ishowtab">
        <b-col cols="12" lg="12">
          <hr class="padd-0" />
        </b-col>
      </b-row>
      <b-row class="body-banner">
        <b-col
          v-if="preApproved"
          cols="12"
          lg="12"
          class="form-body-1 searchby-approval"
        >
          <div>
            <h3 class="text-primary">Search by Pre-approval</h3>
            <h4 class="body-content title-head">
              What was the purchase pre-approval amount?
            </h4>
            <b-form class="form-1 name-text">
              <label class for="price">Purchase Price</label>
              <b-input
                :class="{ form_fill: user.name }"
                v-model.trim="user.name"
                :state="error_state.name"
                size="lg"
                id="price"
                placeholder="Enter Total Purchase Price"
              ></b-input>
              <b-form-invalid-feedback :state="error_state.name">{{
                error.name
              }}</b-form-invalid-feedback>
            </b-form>
            <h4 class="form-1 title-head">Which type of loan program?</h4>
            <b-form-group class="custom-radio">
              <b-form-radio
                class="m-radio"
                size="lg"
                v-model="loan"
                name="loan-radios"
                value="FHA"
                >FHA</b-form-radio
              >
              <b-form-radio
                class="m-radio"
                size="lg"
                v-model="loan"
                name="loan-radios"
                value="VA"
                >VA</b-form-radio
              >
              <b-form-radio
                class="m-radio"
                size="lg"
                v-model="loan"
                name="loan-radios"
                value="USDA"
                >USDA</b-form-radio
              >
              <b-form-radio
                class="m-radio"
                size="lg"
                v-model="loan"
                name="loan-radios"
                value="Coventional"
                >Coventional</b-form-radio
              >
            </b-form-group>
            <h4 class="title-head">
              What’s the qualified total housing payment?
            </h4>
            <b-form-group class="custom-radio">
              <b-form-radio
                class="m-radio"
                size="lg"
                v-model="downpayment"
                name="downpayment-radios"
                value="FHA"
                >Minimum Down Payment</b-form-radio
              >
              <div class="d-flex align-items-center house-payment">
                <b-form-radio
                  class
                  size="lg"
                  v-model="downpayment"
                  name="downpayment-radios"
                  value="VA"
                ></b-form-radio>
                <b-input
                  :class="{ form_fill: user.percentage }"
                  v-model="user.percentage"
                  :state="error_state.percentage"
                  size="lg"
                  type="text"
                  placeholder="Percentage Down"
                ></b-input>
                <b-form-invalid-feedback :state="error_state.percentage">{{
                  error.percentage
                }}</b-form-invalid-feedback>
              </div>
            </b-form-group>
          </div>
        </b-col>
        <b-col
          v-if="affordability"
          cols="12"
          lg="12"
          class="form-body-2 estimated-affordability"
        >
          <div>
            <h3 class="text-primary">Search by Estimated Affordability</h3>
            <h4 class="form-1 title-head">
              What is the maximum monthly payment your client can afford?
            </h4>
            <b-form class="divider name-text">
              <label class for="tmp-name">Max Total Monthly Payment</label>
              <b-input
                :class="{ form_fill: user.tmp }"
                v-model.trim="user.tmp"
                :state="error_state.tmp"
                size="lg"
                id="tmp-name"
                placeholder="Enter Amount per Month"
              ></b-input>
              <b-form-invalid-feedback :state="error_state.tmp">{{
                error.tmp
              }}</b-form-invalid-feedback>
              <label class for="tmp-text bottom-text"
                >Including loan payment, property taxes, insurance, etc.</label
              >
            </b-form>
            <h4 class="body-banner title-head">
              What funds does you client have available to purchase?
            </h4>
            <b-form-group class="custom-radio">
              <b-form-radio
                class="m-radio"
                size="lg"
                v-model="fundsAvailable"
                name="some-radios"
                value="FHA"
                >Minimum Down</b-form-radio
              >
              <div class="d-flex align-items-center purchase-text">
                <b-form-radio
                  class
                  size="lg"
                  v-model="fundsAvailable"
                  name="some-radios"
                  value="VA"
                ></b-form-radio>
                <b-input
                  :class="{ form_fill: user.fpercentage }"
                  v-model="user.fpercentage"
                  :state="error_state.fpercentage"
                  size="lg"
                  type="text"
                  placeholder="Percentage Down"
                ></b-input>
                <b-form-invalid-feedback :state="error_state.fpercentage">{{
                  error.fpercentage
                }}</b-form-invalid-feedback>
              </div>
            </b-form-group>
            <h4 class="body-banner title-head">
              What’s your client’s estimated credit score?
            </h4>
            <b-form-group class="custom-radio">
              <b-form-radio
                class="m-radio"
                size="lg"
                v-model="creditscore"
                name="credit-radios"
                value="Excellent"
                >Excellent (720+)</b-form-radio
              >
              <b-form-radio
                class="m-radio"
                size="lg"
                v-model="creditscore"
                name="credit-radios"
                value="Average"
                >Average (680-719)</b-form-radio
              >
              <b-form-radio
                class="m-radio"
                size="lg"
                v-model="creditscore"
                name="credit-radios"
                value="Below Average"
                >Below Average (620-679)</b-form-radio
              >
            </b-form-group>
            <h4 class="title-head">Is your client a first time homebuyer?</h4>
            <b-form-radio
              class="m-radio"
              size="lg"
              v-model="firstTimeBuyer"
              name="firsttime-radios"
              value="1"
              >Yes</b-form-radio
            >
            <b-form-radio
              class="m-radio"
              size="lg"
              v-model="firstTimeBuyer"
              name="firsttime-radios"
              value="0"
              >No</b-form-radio
            >
            <h4 class="divider title-head">Is your client a veteran?</h4>
            <div class="d-flex justify-content-between text-check">
              <b-form-radio
                class="m-radio"
                size="lg"
                v-model="Veteran"
                name="veteran-radios"
                value="1"
                >Yes</b-form-radio
              >
              <b-form-checkbox
                class="visible-lg"
                :disabled="Veteran == 0 || !Veteran"
                size="lg"
                v-model="isDisabledVeteran"
                >Disabled veteran - no property tax</b-form-checkbox
              >
            </div>
            <b-form-radio
              class="m-radio"
              size="lg"
              v-model="Veteran"
              name="veteran-radios"
              value="0"
              >No</b-form-radio
            >
            <b-form-checkbox
              class="visible-xs"
              :disabled="Veteran == 0 || !Veteran"
              size="lg"
              >Disabled veteran - no property tax</b-form-checkbox
            >
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" lg="12">
          <div class="bg-container">
            <h4 class="text-center">
              Would you like to obtain a competitive loan offer?
            </h4>
            <p class="p2 text-center">
              We give you the option to request a loan offer and it’s a simple
              as filing out some basic information for us to get in contact with
              your client.
            </p>
            <div class="text-center">
              <b-btn
                class="btn-custom preapproval-text"
                size="sm"
                @click="prepopulate()"
                >Request Pre-approval</b-btn
              >
            </div>
          </div>
        </b-col>
      </b-row>
      <div>
        <b-modal
          id="req-apv"
          class="req-approval"
          centered
          hide-footer
          hide-header
          :no-close-on-backdrop="false"
        >
          <div v-if="!request_sent" class="modal-body-1">
            <div class="header">
              <h3 class="text-primary">Request pre-appoval</h3>
            </div>
            <b-row align-h="between" class="modal-form-1">
              <b-col lg="6">
                <div
                  :class="[
                    'inp-wrapper',
                    { 'has-error': error_state.firstName == false }
                  ]"
                >
                  <div class="flex justify-content-between">
                    <label for="login-firstName">Client First Name</label>
                    <span class="inp-error">{{ error.firstName }}</span>
                  </div>
                  <b-input
                    :class="{ form_fill: user.firstName }"
                    @focus="handleFocus('firstName')"
                    @blur="handleFirstNameBlur"
                    v-model.trim="user.firstName"
                    :state="error_state.firstName"
                    size="lg"
                    id="login-firstName"
                    placeholder="charlie"
                  ></b-input>
                </div>
              </b-col>
              <b-col lg="6">
                <div
                  :class="[
                    'inp-wrapper',
                    { 'has-error': error_state.lastName == false }
                  ]"
                >
                  <div class="flex justify-content-between">
                    <label for="login-lastName">Client Last Name</label>
                    <span class="inp-error">{{ error.lastName }}</span>
                  </div>
                  <b-input
                    :class="{ form_fill: user.lastName }"
                    @focus="handleFocus('lastName')"
                    @blur="handleLastNameBlur"
                    v-model.trim="user.lastName"
                    :state="error_state.lastName"
                    size="lg"
                    id="login-lastName"
                    placeholder="charlie"
                  ></b-input>
                </div>
              </b-col>
            </b-row>
            <b-row align-h="between">
              <b-col lg="6">
                <div
                  :class="[
                    'inp-wrapper',
                    { 'has-error': error_state.email == false }
                  ]"
                >
                  <div class="flex justify-content-between">
                    <label for="login-email">Email</label>
                    <span class="inp-error">{{ error.email }}</span>
                  </div>
                  <b-input
                    :class="{ form_fill: user.email }"
                    v-model.trim="user.email"
                    @focus="handleFocus('email')"
                    @blur="handleEmailBlur"
                    :state="error_state.email"
                    size="lg"
                    id="login-email"
                    placeholder="charlie@email.com"
                  ></b-input>
                </div>
              </b-col>
              <b-col lg="6">
                <div
                  :class="[
                    'inp-wrapper',
                    { 'has-error': error_state.mobile == false }
                  ]"
                >
                  <div class="flex justify-content-between">
                    <label for="login-mobile">Phone Number</label>
                    <span class="inp-error">{{ error.mobile }}</span>
                  </div>
                  <b-input
                    :class="{ form_fill: user.mobile }"
                    v-model.trim="user.mobile"
                    @focus="handleFocus('mobile')"
                    @blur="handleMobileBlur"
                    :state="error_state.mobile"
                    size="lg"
                    id="login-mobile"
                    maxlength="10"
                    placeholder="(555) 555-5555"
                  ></b-input>
                </div>
              </b-col>
            </b-row>
            <b-row class="body-banner">
              <b-col>
                <textarea
                  class="form-control"
                  v-model="desc"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Enter any notes..."
                ></textarea>
              </b-col>
            </b-row>
            <div class="divider req-apv-btns">
              <b-button
                class="mt-3 req"
                block
                variant="primary"
                :disabled="isDisable"
                @click="createUser()"
                size="lg"
                >Send Request</b-button
              >
              <b-button
                class="mt-3 can"
                block
                variant="secondary btn-custom_1"
                @click="$bvModal.hide('req-apv')"
                size="lg"
                >Cancel</b-button
              >
            </div>
          </div>
          <div v-else>
            <b-row class="h-100" align-v="center" align-h="center">
              <b-col class="text-center" cols="auto sent-req">
                <div>
                  <img src="~/assets/icons/icon-decorative-send-email.svg" />
                </div>
                <h3>Request sent!</h3>
                <p class="p3 para">
                  We’ll be in touch with you and your client to get a
                  competitive rate.
                </p>
                <a variant="primary" class="continue-btn" href="/">Back to home</a>
              </b-col>
            </b-row>
          </div>
        </b-modal>
      </div>
    </div>
    <div class="flex justify-between steps-btn">
      <b-button class="mt-3 back" variant size="lg" @click="goBack()"
        >Back</b-button
      >
      <b-button class="mt-3 next" variant="primary" size="lg" @click="goToNext"
        >Get Results</b-button
      >
      <!-- @click="$bvModal.show('req-apv')" -->
    </div>
  </b-container>
</template>

<script>
import {
  isRequired,
  isEmail,
  isMobileNumber
} from "./../../../../../utils/validations.js";
import { toastDuration } from "./../../../../../constants";
export default {
  middleware: "auth",
  components:{
  },
  data() {
    return {
      downpayment: null,
      fundsAvailable: null,
      firstTimeBuyer: null,
      isDisabledVeteran: null,
      creditscore: null,
      Veteran: null,
      loan: "",
      user: {
        name: null,
        percentage: null,
        tmp: null,
        fpercentage: null,
        firstName: null,
        lastName: null,
        mobile: null,
        email: null
      },
      error: {
        name: "",
        percentage: null,
        tmp: null,
        fpercentage: null,
        firstName: "",
        lastName: "",
        mobile: "",
        email: ""
      },
      error_state: {
        name: null,
        percentage: null,
        tmp: null,
        fpercentage: null,
        firstName: null,
        lastName: null,
        mobile: null,
        email: null
      },
      showApiError: null,
      selected: 0,
      preApproved: 0,
      affordability: 0,
      request_sent: 0,
      desc: null,
      items: [
        {
          text: "Home",
          href: "/"
        },
        {
          text: "Client",
          href: "/exp-home/client/"
        },
        {
          text: "home-design",
          href: "/exp-home/client/home_design"
        },
        {
          text: "pre-approval",
          href: "#"
        }
      ]
    };
  },
  methods: {
    prepopulate() {
      this.request_sent = 0;
      this.$bvModal.show("req-apv");
      this.user.firstName = this.$store.getters[
        "clients/getSelectedClient"
      ].first_name;
      this.user.lastName = this.$store.getters[
        "clients/getSelectedClient"
      ].last_name;
      this.user.mobile = this.$store.getters[
        "clients/getSelectedClient"
      ].phone;
      this.user.email = this.$store.getters["clients/getSelectedClient"].email;
    },
    errorHandling(responseObj) {
      let { message, errors = {} } =
        responseObj.response && responseObj.response.data;
      if (Object.keys(errors).length) {
        Object.keys(errors).map(error => {
          // this.$toast.error(errors[error], toastDuration)
        });
      } else {
        this.showApiError = message;
        // this.$toast.error(message, toastDuration)
      }
    },
    handleFocus(fieldName) {
      this.error[fieldName] = "";
      this.error_state[fieldName] = null;
      this.showApiError = null;
    },
    handleFirstNameBlur() {
      const isValidFirstName = isRequired(this.user.firstName);
      if (!isValidFirstName) {
        this.error.firstName = " First Name is Required. ";
        this.error_state.firstName = false;
      } else {
        this.error.firstName = "";
        this.error_state.firstName = true;
      }
    },
    handleLastNameBlur() {
      const isValidLastName = isRequired(this.user.lastName);
      if (!isValidLastName) {
        this.error.lastName = " Last Name is Required. ";
        this.error_state.lastName = false;
      } else {
        this.error.lastName = "";
        this.error_state.lastName = true;
      }
    },
    handleMobileBlur() {
      const isValidMobile =
        isRequired(this.user.mobile) && isMobileNumber(this.user.mobile);
      if (!isValidMobile) {
        this.error.mobile =
          this.user.mobile == ""
            ? " Mobile is Required. "
            : "Invalid Mobile Number";
        this.error_state.mobile = false;
      } else {
        this.error.mobile = "";
        this.error_state.mobile = true;
      }
    },
    handleEmailBlur() {
      const isValidEmail =
        isRequired(this.user.email) && isEmail(this.user.email);
      if (!isValidEmail) {
        this.error.email = (this.user.email && this.user.email.trim())== '' ? "Email is Required." : " Email is Invalid. ";;
        this.error_state.email = false;
      } else {
        this.error.email = "";
        this.error_state.email = true;
      }
    },
    goToNext() {
      let obj;
      if (this.preApproved) {
        obj = {
          clientId: this.$store.$auth.user.id,
          financialTitle: "pre-approved",
          purchasePrice: this.user.name,
          loanProgram: this.loan,
          qualifiedTotalHousingPayment:
            this.downpayment == "VA" ? this.user.percentage : this.downpayment
        };
      } else {
        obj = {
          clientId: this.$store.$auth.user.id,
          financialTitle: "estimated-affordability",
          maxTotalMonthlyPayment: this.user.tmp,
          fundsAvailable:
            this.fundsAvailable == "VA"
              ? this.user.fpercentage
              : this.fundsAvailable,
          estimatedCreditScore: this.creditscore,
          isFirstTimeHomebuyer: this.firstTimeBuyer,
          isVeteran: this.Veteran,
          disabledVeteran: this.isDisabledVeteran
        };
      }
      this.$store.dispatch("searchHome/financialInputs", obj);
    },
    goBack() {
      this.$router.back();
    },
    showPreApproved() {
      this.preApproved = 1;
      this.affordability = 0;
    },
    showAffordability() {
      this.preApproved = 0;
      this.affordability = 1;
    },
    createUser() {
      this.handleFirstNameBlur();
      this.handleLastNameBlur();
      this.handleEmailBlur();
      this.handleMobileBlur();
      const isValid =
        this.error_state.firstName ||
        this.error_state.email ||
        this.error_state.lastName ||
        this.error_state.mobile;
      if (isValid) {
        try {
          const obj = {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
            phone: this.user.mobile,
            notes: this.desc
          };
          try {
            this.$axios
              .post("api/client/create", obj)
              .then(data => {
                // this.$toast.success('Client Created Successfully !', toastDuration)
                this.$store.dispatch("clients/getClients").then(() => {
                  this.request_sent = 1;
                  // this.$bvModal.hide('req-apv')
                });
              })
              .catch(responseObj => {
                this.errorHandling(responseObj);
                return false;
              });
          } catch (e) {
            // this.$toast.error('Please try again later !', toastDuration)
          }
        } catch (e) {
          // this.$toast.error('Something went wrong, Try Again later', toastDuration)
        }
      }
    }
  },
  computed: {
    isDisable() {
      const isValidFirstName = isRequired(this.user.firstName);
      const isValidLastName = isRequired(this.user.lastName);
      const ValidEmail =
        isRequired(this.user.email) && isEmail(this.user.email);
      const ValidMobile =
        isRequired(this.user.mobile) && isMobileNumber(this.user.mobile);
      if (isValidFirstName && isValidLastName && ValidEmail && ValidMobile) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.box-shadow-container {
  border-radius: 2px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  padding-top: 23px;
  padding-bottom: 23px;
  display: flex;
  cursor: pointer;
  transition: box-shadow 0.45s;
  &:hover {
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
  }
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
  h4 {
    margin: 0px;
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 992px) {
    padding-top: 11px;
    padding-bottom: 11px;
    padding-left: 5px;
    &:first-child {
      margin-bottom: 15px;
    }
    .container-text {
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
    .text-center {
      width: 80%;
      margin: auto;
    }
    .p2.text-center {
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

.body-content {
  margin-top: 36px;
}

.body-banner {
  margin-top: 48px;
}
.divider {
  margin-top: 35px;
}

.form-body-2 {
  margin-top: -20px;
  margin-bottom: 34px;
}

.form-body-1 {
  margin-bottom: 34px;
  margin-top: -20px;
}
.form-1 {
  margin-top: 37px;
}

.modal-body-1 {
  margin-top: 25px;
}

.modal-form-1 {
  margin-top: 36px;
}

.searchby-approval,
.estimated-affordability {
  .name-text {
    margin-top: 10px;
    max-width: 456px;
  }
  .title-head {
    margin-bottom: 24px;
    line-height: 1.33;
  }
  .house-payment,
  .purchase-text {
    max-width: 200px;
  }
  .text-check {
    max-width: 580px;
  }
}
.req-apv-btns {
  display: flex;
  justify-content: space-between;
  .req {
    width: 360px;
    height: 48px;
  }
  .can {
    width: 136px;
    height: 48px;
  }
  @media screen and (max-width: 992px) {
    flex-direction: column;
    button {
      &.req,
      &.can {
        width: 100%;
      }
    }
  }
}
.steps-btn {
  margin-top: 48px;
  margin-bottom: 128px;
  button {
    min-width: 154px;
    border: none;
    &:hover {
      border: none;
    }
  }
  .back {
    background-color: #f5f5f5;
    color: black;
  }
  @media screen and (max-width: 992px) {
    margin-left: -15px;
    margin-right: -15px;
    margin-top: 184px;
    button {
      min-width: 167px;
    }
  }
}
.preapproval-text {
  color: #44a1bf;
}
.padd-0 {
  padding: 0px;
}
.ishowtab {
  margin: 35px -15px;
}
.bottom-text {
  margin-top: 8px;
}
.sent-req {
  max-height: 621px;
  img {
    margin-top: 144px;
    margin-bottom: 24px;
  }
  .para {
    max-width: 552px;
    font-size: 20px;
    margin-top: 24px;
    margin-bottom: 104px;
  }
  button {
    height: 48px;
  }
}
.continue-btn {
  width: 360px;
  height: 48px;
  border-radius: 2px;
  background-color: #44a1bf;
  color: #fff !important;
  display: inline-block;
  text-decoration: none;
  padding: 10px;
}
</style>
