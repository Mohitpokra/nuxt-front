<template>
  <b-container>
    <div class="inner-container">
      <b-row align-h="start">
        <b-col>
          <b-breadcrumb :items="items"></b-breadcrumb>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" lg="12">
          <h3 class="top-title">My Account</h3>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" lg="6">
          <div class="inp-wrapper">
            <div class="flex justify-content-between">
              <label for="login-email">Name</label>
              <span class="inp-error">{{ error.email }}</span>
            </div>
            <b-input
              :class="{ form_fill: name }"
              v-model.trim="name"
              @focus="handleFocus('name')"
              :state="error_state.name"
              size="lg"
              id="login-name"
              placeholder="Charlie Exampleton"
            ></b-input>
            <b-form-invalid-feedback :state="error_state.name">
              {{ error.name }}
            </b-form-invalid-feedback>
          </div>
        </b-col>
        <b-col cols="12" lg="6">
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
              :class="{ form_fill: email }"
              v-model.trim="email"
              @focus="handleFocus('email')"
              :state="error_state.email"
              size="lg"
              id="login-email"
              placeholder="charlie@email.com"
            ></b-input>
          </div>
        </b-col>
      </b-row>
      <b-row v-if="!isChangePass">
        <b-col cols="12" lg="6">
          <div
            :class="[
              'inp-wrapper',
              { 'has-error': error_state.password == false }
            ]"
          >
            <div class="flex justify-content-between">
              <label for="login-email">Password</label>
              <span class="inp-error">{{ error.password }}</span>
            </div>
            <b-input
              :class="{ form_fill: user.password }"
              @focus="handleFocus('password')"
              @blur="handlePasswordBlur"
              v-model="user.password"
              :state="error_state.password"
              size="lg"
              id="login-password"
              type="password"
              placeholder="••••••••"
            ></b-input>
          </div>
          <div class="sub-btn">
            <b-button class="mt-4" variant="" size="lg" @click="showNewPass"
              >Change Password</b-button
            >
          </div>
        </b-col>
      </b-row>
      <b-row v-if="isChangePass">
        <b-col cols="12" lg="6">
          <div
            :class="[
              'inp-wrapper',
              { 'has-error': error_state.password == false }
            ]"
          >
            <div class="flex justify-content-between">
              <label for="login-email">Password</label>
              <span class="inp-error" v-if="!showApiError && error.password">{{
                error.password
              }}</span>
              <span
                class="inp-error"
                v-if="
                  !!showApiError &&
                    !!showApiError['password'] &&
                    !error.password
                "
                >{{ showApiError["password"] }}</span
              >
            </div>
            <b-input
              :class="{ form_fill: user.password }"
              @focus="handleFocus('password')"
              v-model="user.password"
              @blur="handlePasswordBlur"
              :state="error_state.password"
              size="lg"
              id="login-password"
              type="password"
              placeholder="••••••••"
            ></b-input>
          </div>
          <div
            :class="[
              'inp-wrapper',
              { 'has-error': error_state.newPassword == false }
            ]"
          >
            <div class="flex justify-content-between">
              <label for="login-newPassword"></label>
              <span
                class="inp-error"
                v-if="!showApiError && error.newPassword"
                >{{ error.newPassword }}</span
              >
              <span
                class="inp-error"
                v-if="
                  !!showApiError &&
                    !!showApiError['newPassword'] &&
                    !error.newPassword
                "
                >{{ showApiError["newPassword"] }}</span
              >
            </div>
            <b-input
              :class="{ form_fill: user.newPassword }"
              v-model="user.newPassword"
              @focus="handleFocus('newPassword')"
              @blur="handleCPasswordBlur"
              :state="error_state.newPassword"
              size="lg"
              id="login-password"
              type="password"
              placeholder="New Password"
            ></b-input>
          </div>
        </b-col>
        <b-col cols="12" lg="12">
          <b-button
            class="btn-save-change mt-4 save-btn"
            variant="primary"
            size="lg"
            @click="savePassword"
            >Save Changes</b-button
          >
          <b-button
            class="cancel-btn mt-4"
            variant="secondary"
            size="lg"
            @click="showNewPass"
            >Cancel</b-button
          >
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" lg="12">
          <hr class="divider" />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" lg="12">
          <h3>Plan & Billing</h3>
        </b-col>
      </b-row>
      <b-row align-v="center">
        <b-col cols="12" lg="12">
          <b-row class="bg-custom plan-head">
            <div class="prop-plan">
              <p class="pr-title">
                Search by Mortgage Payment —
                <strong>{{
                  getPlanType == 1 ? "Free Plan" : "Pro Plan"
                }}</strong>
              </p>
              <b-button
                class="btn-chng-plan"
                variant="primary"
                size="lg"
                @click="$bvModal.show('choosePlan')"
                >Change Plan</b-button
              >
            </div>
          </b-row>
        </b-col>
      </b-row>
      <div class="info-list">
        <b-row class="il-list">
          <b-col cols="12" lg="3">
            <span><strong>$0</strong> per month</span>
          </b-col>
          <b-col cols="12" lg="4">
            <span>Renews <strong>January 23, 2020</strong></span>
          </b-col>
          <b-col cols="12" lg="12">
            <hr />
          </b-col>
        </b-row>
        <!-- <b-row class="il-list">
                <b-col cols="12" lg="3">
                    <span>Visa ending in <strong>1212</strong></span>
                </b-col>
                <b-col cols="12" lg="4">
                    <span>Expires <strong>01/2022</strong></span>
                </b-col>
                <b-col cols="12" lg="5" class="text-right">
                    <span class="pointer link">Update Card</span>
                </b-col>
                <b-col cols="12" lg="12">
                    <hr>
                </b-col>
            </b-row> -->
      </div>

      <div>
        <b-modal
          size="lg"
          id="choosePlan"
          class="modal-full-body"
          centered
          hide-footer
          hide-header
        >
          <div class="modal-temp-body">
            <img
              class="img-cross"
              src="~/assets/icons/icon-interface-x.svg"
              @click="$bvModal.hide('choosePlan')"
            />
            <div v-if="!isPropPlan" class="header">
              <div class="choose-plan-container">
                <h3 class="text-primary">Change your plan</h3>
                <div class="choose-plan-wrapper">
                  <div
                    :class="[
                      'box-shadow-low',
                      {
                        selected: getPlanType == 1
                      }
                    ]"
                  >
                    <h3>Free</h3>
                    <p class="p-box-subheading p2">
                      Limited to 5 searches per month
                    </p>
                    <div class="p-box-money d-flex align-items-center">
                      <h2 class="text-primary">
                        $0
                      </h2>
                      <h2 class="month">/ month</h2>
                    </div>
                    <div>
                      <b-button block variant="primary" size="lg">
                        {{
                          getPlanType == 1 ? "Current Plan" : "Choose Free Plan"
                        }}
                      </b-button>
                    </div>
                  </div>
                  <div
                    :class="[
                      'box-shadow-low',
                      {
                        selected: getPlanType == 2
                      }
                    ]"
                  >
                    <h3>Pro</h3>
                    <p class="p-box-subheading p2">Unlimited searches</p>
                    <div class="p-box-money d-flex align-items-center">
                      <h2 class="text-primary">
                        $15
                      </h2>
                      <h2 class="month">/ month</h2>
                    </div>
                    <div>
                      <b-button
                        block
                        variant="primary"
                        size="lg"
                        @click="chooseProPlan"
                      >
                        {{
                          getPlanType == 2 ? "Current Plan" : "Choose Pro Plan"
                        }}
                      </b-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <h3 class="mod-title text-primary">Enter billing information</h3>
              <b-form>
                <div class="inp-wrapper">
                  <div class="flex justify-content-between">
                    <label for="login-email">Name on Credit Card</label>
                    <span class="inp-error">{{ error.email }}</span>
                  </div>
                  <b-input
                    :class="{ form_fill: billing.name }"
                    v-model.trim="billing.name"
                    :state="error_state_1.name"
                    size="lg"
                    id="billing-name"
                    placeholder="Charlie Exampleton"
                  ></b-input>
                  <b-form-invalid-feedback :state="error_state_1.name">
                    {{ error_1.name }}
                  </b-form-invalid-feedback>
                </div>
                <div class="inp-wrapper">
                  <div class="flex justify-content-between">
                    <label for="login-email">Credit Card Number</label>
                    <span class="inp-error">{{ error.email }}</span>
                  </div>
                  <b-input
                    :class="{ form_fill: billing.cardNo }"
                    v-model="billing.cardNo"
                    :state="error_state_1.cardNo"
                    size="lg"
                    id="billing-cardNo"
                    placeholder="1234 5678 9012 3456"
                  ></b-input>
                  <b-form-invalid-feedback :state="error_state_1.cardNo">
                    {{ error_1.cardNo }}
                  </b-form-invalid-feedback>
                </div>
                <b-row class="">
                  <b-col class="prl-0" cols="12" lg="6">
                    <div class="inp-wrapper">
                      <div class="flex justify-content-between">
                        <label for="login-email">Expiration Date</label>
                        <span class="inp-error">{{ error.email }}</span>
                      </div>
                      <b-input
                        :class="{ form_fill: billing.expiryDate }"
                        v-model="billing.expiryDate"
                        :state="error_state_1.expiryDate"
                        size="lg"
                        id="billing-expiryDate"
                        placeholder="MM/YY"
                      ></b-input>
                      <b-form-invalid-feedback
                        :state="error_state_1.expiryDate"
                      >
                        {{ error_1.expiryDate }}
                      </b-form-invalid-feedback>
                    </div>
                  </b-col>
                  <b-col class="prl-0" cols="12" lg="6">
                    <div class="inp-wrapper">
                      <div class="flex justify-content-between">
                        <label for="login-email">CVC</label>
                        <span class="inp-error">{{ error.email }}</span>
                      </div>
                      <b-input
                        :class="{ form_fill: billing.cvc }"
                        v-model="billing.cvc"
                        :state="error_state_1.cvc"
                        size="lg"
                        id="billing-cvc"
                        placeholder="CVC"
                      ></b-input>
                      <b-form-invalid-feedback :state="error_state_1.cvc">
                        {{ error_1.cvc }}
                      </b-form-invalid-feedback>
                    </div>
                  </b-col>
                </b-row>
                <b-row align-h="between" class="btn-divider">
                  <b-col lg="6" cols="12" class="prl-0">
                    <b-button
                      class="mt-3"
                      block
                      variant="primary"
                      :disabled="isDisable"
                      size="lg"
                      >Pay $15/mo</b-button
                    >
                  </b-col>
                  <b-col lg="3" cols="12" class="prl-0">
                    <b-button
                      class="mt-3"
                      block
                      variant="secondary btn-custom_1"
                      @click="$bvModal.hide('choosePlan')"
                      size="lg"
                      >Cancel</b-button
                    >
                  </b-col>
                </b-row>
              </b-form>
            </div>
          </div>
        </b-modal>
      </div>
    </div>
  </b-container>
</template>

<script>
import { toastDuration } from "../../../constants";
import { isRequired, isEmail } from "./../../../utils/validations.js";
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      showApiError: {},
      user: {
        name: null,
        email: null,
        password: null,
        newPassword: null
      },
      error: {
        name: "",
        email: "",
        password: "",
        newPassword: ""
      },
      error_state: {
        name: null,
        email: null,
        password: null,
        newPassword: null
      },
      isChangePass: 0,
      isPropPlan: 0,
      billing: {
        name: null,
        cardNo: null,
        expiryDate: null,
        cvc: null
      },
      error_1: {
        name: null,
        cardNo: null,
        expiryDate: null,
        cvc: null
      },
      error_state_1: {
        name: null,
        cardNo: null,
        expiryDate: null,
        cvc: null
      },
      items: [
        {
          text: "Home",
          href: "/"
        },
        {
          text: "My Account",
          href: "#"
        }
      ]
    };
  },
  methods: {
    handleFocus(fieldName) {
      this.error[fieldName] = "";
      this.error_state[fieldName] = null;
      this.showApiError[fieldName] = null;
    },
    showNewPass() {
      this.isChangePass = !this.isChangePass;
    },
    chooseProPlan() {
      this.isPropPlan = 1;
    },
    handleNameBlur() {
      const isValidName = isRequired(this.name);
      if (!isValidName) {
        this.error.name = " Name is Required. ";
        this.error_state.name = false;
      } else {
        this.error.name = "";
        this.error_state.name = true;
      }
    },
    handleEmailBlur() {
      const isValidEmail = isRequired(this.email) && isEmail(this.email);
      if (!isValidEmail) {
        this.error.email = " Email is Required. ";
        this.error_state.email = false;
      } else {
        this.error.email = "";
        this.error_state.email = true;
      }
    },
    handlePasswordBlur() {
      const isValidPassword = isRequired(this.user.password);
      if (!isValidPassword) {
        this.error.password = " Password is Required. ";
        this.error_state.password = false;
      } else {
        this.error.password = "";
        this.error_state.password = true;
      }
    },
    handleCPasswordBlur() {
      const emptyPassword = isRequired(this.user.newPassword);
      const confirmPassword = emptyPassword;
      if (!confirmPassword) {
        this.error.newPassword = "New Password is Required ";
        this.error_state.newPassword = false;
      } else {
        this.error.newPassword = "";
        this.error_state.newPassword = true;
      }
    },
    errorHandling(responseObj) {
      let { message, errors = {} } =
        responseObj.response && responseObj.response.data;
      if (Object.keys(errors).length) {
        Object.keys(errors).map(error => {
          this.showApiError[error] = errors[error] && errors[error][0];
          this.error_state[error] = false;
        });
      } else {
        this.showApiError = message;
        this.error_state.password = false;
      }
    },
    savePassword() {
      this.handleNameBlur();
      this.handleEmailBlur();
      this.handlePasswordBlur();
      this.handleCPasswordBlur();
      const isValid = this.error_state.password || this.error_state.newPassword;
      if (isValid) {
        this.$axios
          .$post("/api/account/update-password", {
            currentPassword: this.user.password,
            newPassword: this.user.newPassword
          })
          .then(response => {
            this.isChangePass = 0;
          })
          .catch(responseObj => {
            this.isChangePass = 1;
            this.errorHandling(responseObj);
          });
      }
    }
  },
  computed: {
    ...mapGetters(["getPlanType"]),
    isDisable() {
      if (
        this.billing.name &&
        this.billing.cardNo &&
        this.billing.expiryDate &&
        this.billing.cvc
      ) {
        return false;
      } else {
        return true;
      }
    },
    email: {
      get() {
        return this.$store.state.auth.user.email;
      },
      set(value) {
        this.$store.commit("updateEmail", value);
      }
    },
    name: {
      get() {
        return this.$store.state.auth.user.name;
      },
      set(value) {
        this.$store.commit("updateName", value);
      }
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
  height: 48px;
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
  font-family: 'cerebri-sans', Arial, Helvetica, sans-serif;
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
</style>
