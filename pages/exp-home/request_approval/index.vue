<template>
  <b-container>
    <div class="inner-container">
      <b-row align-h="start">
        <b-col>
          <b-breadcrumb :items="items"></b-breadcrumb>
        </b-col>
      </b-row>
      <b-row>
        <div v-if="!addclients" class="req-approval">
          <b-row align-h="start">
            <b-col>
              <h3 class="top-title">Request pre-appoval</h3>
            </b-col>
          </b-row>
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
                  placeholder="puth"
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
                  @focus="handleFocus('email')"
                  @blur="handleEmailBlur"
                  v-model.trim="user.email"
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
                <VuePhoneNumberInput :no-country-selector='true' v-model.trim="user.mobile" @phone-number-focused	="handleFocus('mobile')" @phone-number-blur ="handleMobileBlur" default-country-code="US"  @update='handleMobileVueInputBlur' />
                <!-- <b-input
                  :class="{ form_fill: user.mobile }"
                  @focus="handleFocus('mobile')"
                  @blur="handleMobileBlur"
                  v-model.trim="user.mobile"
                  :state="error_state.mobile"
                  size="lg"
                  id="login-mobile"
                  placeholder="(555) 555-5555"
                  maxLength="10"
                ></b-input> -->
              </div>
            </b-col>
          </b-row>
          <b-row class="body-banner inp-textarea">
            <b-col>
              <div class="inp-wrapper">
                <textarea
                  class="form-control"
                  v-model="desc"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Enter any notes..."
                ></textarea>
              </div>
            </b-col>
          </b-row>
          <b-row class="body-banner inp-textarea">
            <b-col>
              <div class="divider req-apv-btns text-right">
                <b-button
                  class="req"
                  block
                  variant="primary"
                  :disabled="isDisable"
                  size="lg"
                  @click="createUser()"
                  >Send Request</b-button
                >
              </div>
            </b-col>
          </b-row>
        </div>
        <div v-else class="sent-info">
          <b-row class="h-100" align-v="center" align-h="center">
            <b-col class="text-center" cols="auto">
              <div>
                <img src="~/assets/icons/icon-decorative-send-email.svg" />
              </div>
              <h3>Request sent!</h3>
              <p class="p3 para">
                We’ll be in touch with you and your client to get a competitive
                rate.
              </p>
              <b-btn variant="" @click="goToNext">Back to home</b-btn>
            </b-col>
          </b-row>
        </div>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import {
  isRequired,
  isEmail,
  isMobileNumber
} from "./../../../utils/validations.js";
import { toastDuration } from "../../../constants";
import { mapGetters } from "vuex";
import { getValue } from '../../../utils/localstorageUtils';

export default {
  middleware: "auth",
  data() {
    return {
      inputMobileDetails:null,
      desc: "",
      addclients: false,
      show: 1,
      isSelected: false,
      selectedUser: {},
      user: {
        firstName: null,
        lastName: null,
        mobile: null,
        email: null
      },
      error: {
        firstName: "",
        lastName: "",
        mobile: "",
        email: ""
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
          text: "Home",
          href: "/"
        },
        {
          text: "Request Pre-approval",
          href: "#"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("clients", [
      "getClientsList",
      "getSelectedClient",
      "getIsClientsApiCalled"
    ]),
    isNextDisable() {
      const data =
        this.$store.getters && this.$store.getters["clients/getSelectedClient"];
      return data.id && this.isSelected ? false : true;
    },
    isDisable() {
      const isValidFirstName = isRequired(this.user.firstName);
      const isValidLastName = isRequired(this.user.lastName);
      const ValidEmail =
        isRequired(this.user.email) && isEmail(this.user.email);
      const ValidMobile =
        isRequired(this.user.mobile) && ( this.inputMobileDetails && this.inputMobileDetails.isValid);
      if (isValidFirstName && isValidLastName && ValidEmail && ValidMobile) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    handleMobileVueInputBlur(data){
      this.inputMobileDetails = data
    },
    setSelected(user) {
      this.isSelected = true;
      this.selectedUser = user;
      this.$store.dispatch("clients/selectedClient", user);
    },
    errorHandling(responseObj) {
      let { message, errors = {} } =
        responseObj.response && responseObj.response.data;
      if (Object.keys(errors).length) {
        Object.keys(errors).map(error => {
          // this.$toast.error(errors[error], toastDuration)
        });
      } else {
        // this.$toast.error(message, toastDuration)
      }
    },
    handleFocus(fieldName) {
      this.error[fieldName] = "";
      this.error_state[fieldName] = null;
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
        isRequired(this.user.mobile) && ( this.inputMobileDetails && this.inputMobileDetails.isValid);
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
                this.$store.dispatch("clients/getClients").then(() => {
                    this.$bvModal.hide("req-apv");
                    this.addclients = true
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
    },
    handleEmailBlur() {
      const isValidEmail =
        isRequired(this.user.email) && isEmail(this.user.email);
      if (!isValidEmail) {
        this.error.email = (this.user.email && this.user.email.trim()) == '' ? "Email is Required." : " Email is Invalid. ";;
        this.error_state.email = false;
      } else {
        this.error.email = "";
        this.error_state.email = true;
      }
    },
    moveToNext() {
      this.$router.push("/exp-home/client/home_design");
    },
    goBack() {
      this.$router.back();
    },
    hide() {
      this.show = 0;
    },
    goToNext(){
      localStorage.removeItem('searchId')
      this.$router.push('/')
    }
  },
  mounted() {
    this.$store.dispatch("clients/getClients");
    const query = this.$route.query;
    if(query && query['showSuccess'] == 1){
      this.addclients = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.top-title {
  margin-top: 48px;
  font-size: 42px;
  margin-bottom: 24px;
  @media screen and(max-width: 992px) {
    font-size: 26px;
    margin-bottom: 12px;
  }
}
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  width: 100%;
  .pr-title {
    margin: 0px;
    font-size: 20px;
    font-weight: 400;
  }
  @media screen and (max-width: 992px) {
    font-size: 16px;
    flex-direction: column;
    .pr-title {
      font-size: 16px;
      margin-bottom: 24px;
    }
  }
}

.btn-save-change {
  width: 152px;
  height: 48px;
  border-radius: 2px;
}

button {
  font-size: 16px !important;
}

.btn-cancel {
  width: 99px;
  height: 48px;
  border-radius: 2px;
  color: black;
  background-color: #f5f5f5;
}

.divider {
  margin: 48px 0px;
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
    padding: 24px;
  }
}

.p-box-subheading {
  margin-bottom: 48px;

  @media screen and (max-width: 992px) {
    margin-bottom: 24px;
  }
}

.p-box-money {
  margin-bottom: 72px;

  @media screen and (max-width: 992px) {
    margin-bottom: 24px;
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
.save-btn {
  width: 152px;
}
.cancel-btn {
  width: 99px;
  margin-left: 24px;
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
.plan-head {
  margin-top: 48px;
  @media screen and (max-width: 992px) {
    margin-top: 14px;
  }
}
.prl-0 {
  @media screen and (max-width: 992px) {
    padding-left: 0px;
    padding-right: 0px;
  }
}
.info-list {
  margin-top: 24px;
  @media screen and (max-width: 992px) {
    margin-top: 16px;
  }
}
.il-list {
  font-size: 14px;
  hr {
    margin: 24px 0px;
    @media screen and (max-width: 992px) {
      margin: 16px 0px;
    }
  }
  p {
    margin: 0px;
  }
  .link {
    color: #44a1bf;
  }
  @media screen and (max-width: 992px) {
    font-size: 12px;
    span {
      margin: 4px 0px;
      display: block;
    }
  }
}
.container {
  @media screen and (max-width: 992px) {
    padding: 0px 9px;
  }
}
.modal-temp-body {
  position: relative;
  .img-cross {
    position: absolute;
    top: 10px;
    cursor: pointer;
    right: 0px;
  }
}
.choose-plan-wrapper {
  margin-top: 48px;
  display: flex;
  justify-content: space-between;
  .box-shadow-low {
    width: 360px;
    padding: 48px;
    &.selected {
      background-color: #dff7ff;
      box-shadow: 0 0 0 1px #dff7ff;
      .btn {
        background-color: #fff !important;
        color: #44a1bf !important;
      }
    }
  }
  @media screen and (max-width: 992px) {
    flex-direction: column;
    .box-shadow-low {
      width: 100%;
      padding: 24px;
      margin-bottom: 8px;
    }
  }
}
.mod-title {
  margin-bottom: 24px;
}
.btn-divider {
  margin-top: 28px;
}
.inp-textarea .form-control {
  margin-top: 48px;
  resize: none;
  min-height: 120px !important;
}
.req-apv-btns {
  display: flex;
  justify-content: flex-end;
}
.req-apv-btns button {
  width: 149px;
  height: 48px;
}
.req-approval {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  @media screen and (max-width: 992px) {
    padding: 0px;
  }
}
.sent-info {
  margin: 144px auto;
  img {
    margin-bottom: 24px;
  }
  .para {
    font-size: 20px;
    max-width: 552px;
    line-height: 28px;
    margin-bottom: 96px;
  }
  button {
    width: 148px;
    height: 48px;
  }
  @media screen and (max-width: 992px) {
    .para {
      font-size: 16px;
      margin-bottom: 48px;
    }
  }
}
</style>
