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
          <h2 class="top-title">Home Design</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" lg="6" class="filter property-type-wrapper">
          <h3 class="text-primary filter-title">
            Property Type
            <span class="p3">(Select at least one)</span>
          </h3>
          <b-form-group>
            <b-form-checkbox-group
              size="lg"
              id="propertytypes-group"
              v-model="selectedPropertyTypes"
              :options="getPropertyTypesArray"
              name="propertytypes"
            ></b-form-checkbox-group>
          </b-form-group>
          <b-form-invalid-feedback :state="error_state.propertytypes"
            >Please select One</b-form-invalid-feedback
          >
        </b-col>
        <b-col class="filter property-condition-wrapper" cols="12" lg="6">
          <h3 class="text-primary filter-title">Property Condition</h3>
          <b-form-group>
            <b-form-checkbox-group
              size="lg"
              id="propertyconditions-group"
              v-model="selectedPropertyConditions"
              :options="getPropertyConditionsArray"
              name="propertyconditions"
            ></b-form-checkbox-group>
            <b-form-invalid-feedback :state="error_state.propertyconditions"
              >Please select One</b-form-invalid-feedback
            >
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" lg="12">
          <h3 class="text-primary filter">Home Design</h3>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" lg="12">
          <b-row class="hm-dropdown">
            <b-col cols="12" lg="4">
              <newDropDown
                labelKey="id"
                labelValue="name"
                :showHeaderText="false"
                label="Min. Beds"
                theme="plain"
                :options="getMinBeds"
                @input="handleMinBedSelection"
                v-model="selectedMinBed"
                :passLabelAsValue="true"
              />
            </b-col>
            <b-col cols="12" lg="4">
              <newDropDown
                labelKey="id"
                labelValue="name"
                :showHeaderText="false"
                label="Min. Full Baths"
                theme="plain"
                :options="getFullBaths"
                @input="handleFullBathSelection"
                v-model="selectedFullBath"
                :passLabelAsValue="true"
              />
            </b-col>
            <b-col cols="12" lg="4">
              <newDropDown
                labelKey="id"
                labelValue="name"
                :showHeaderText="false"
                label="Min. Half Bath"
                theme="plain"
                :options="getHalfBaths"
                @input="handleHalfBathSelection"
                v-model="selectedHalfBath"
                :passLabelAsValue="true"
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row class="filter">
        <b-col cols="12" lg="12">
          <h3 class="text-primary filter-title">
            Must Haves
            <span class="p3">(Select all that apply)</span>
          </h3>
        </b-col>
        <b-col cols="12" lg="12">
          <b-row>
            <b-col cols="12" lg="6" class="must-have">
              <b-form-group>
                <b-form-checkbox-group
                  size="lg"
                  id="mustHaves-group"
                  v-model="selectedMustHaves"
                  :options="getPropertyMustHavesArray"
                  name="musthaves"
                ></b-form-checkbox-group>
                <b-form-invalid-feedback :state="error_state.musthaves"
                  >Please select One</b-form-invalid-feedback
                >
              </b-form-group>
            </b-col>
            <b-col class="h-100" cols="12" lg="6">
              <b-form-checkbox
                :state="error_state.errortextrea"
                v-model="othercheckbox"
                size="lg"
                >Other</b-form-checkbox
              >
              <div class="extra-text">
                <b-form-textarea
                  id="textarea-state"
                  :class="[
                    {
                      selectedother: othercheckbox
                    }
                  ]"
                  :disabled="!othercheckbox"
                  v-model="text"
                  :state="error_state.errortextrea"
                  placeholder="Please Specify"
                  rows="3"
                ></b-form-textarea>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" lg="12">
          <hr class="divider" />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" lg="12">
          <h2>Location</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" lg="12">
          <p class="p3 filter">Search Area</p>
          <b-input
            :class="{ form_fill: search }"
            v-model.trim="search"
            :state="error_state.search"
            size="lg"
            id="search"
            placeholder="Subdivision, City, Zip, County, State..."
          ></b-input>
        </b-col>
      </b-row>
      <div class="poi-block" v-if="search">
        <b-row>
          <b-col cols="12" lg="12">
            <img
              src="~/assets/icons/icon-interface-trash.svg"
              class="poi-del pointer"
            />
            <h3 class="text-primary">Point Of Interest</h3>
            <span class="lable-title">Address</span>
            <b-input
              :class="{ form_fill: search }"
              v-model.trim="search"
              :state="error_state.search"
              size="lg"
              id="search"
              placeholder="Enter Address"
            ></b-input>
          </b-col>
          <b-col cols="12" lg="12">
            <span class="lable-title">Search Radius</span>
          </b-col>
          <b-col cols="12" lg="6">
            <b-form-select
              v-model="selected"
              :options="options"
              size="lg"
            ></b-form-select>
          </b-col>
          <b-col cols="12" lg="6">
            <b-form-select
              v-model="selected"
              :options="options"
              size="lg"
            ></b-form-select>
          </b-col>
        </b-row>
      </div>
      <b-row>
        <b-col cols="12">
          <div class="text-center filter">
            <span
              :class="[
                'pointer p3 text-primary',
                {
                  blur: !search
                }
              ]"
              >Add Point of Interest</span
            >
          </div>
        </b-col>
        <b-col cols="12" lg="10"></b-col>
      </b-row>
    </div>
    <div class="flex justify-between steps-btn">
      <b-button
        class="mt-3 back"
        variant="secondary"
        size="lg"
        @click="goBack()"
        >Back</b-button
      >
      <b-button
        class="mt-3 next"
        variant="primary"
        size="lg"
        @click="moveToNext()"
        :disabled="getEnabled"
        >Go To PreApproval</b-button
      >
    </div>
    <!-- Delete popup -->
    <b-modal
      id="sure-delete"
      class="modal-full-body"
      centered
      hide-footer
      hide-header
    >
      <div class="modal-temp-body">
        <div class="header">
          <h3 class="text-primary">New Client</h3>
        </div>
        <div>
          <p class="p2">
            It can be whatever you fits your needs — full name, first name, etc
            but enter a name you’ll recognize since you’ll need to find it in
            the search history.
          </p>
        </div>
        <b-form class="modal-form">
          <label class for="login-name">Client Name</label>
        </b-form>
        <b-button class="mt-3 btn-1" block variant="primary" size="lg"
          >Create</b-button
        >
        <b-button
          class="mt-3 btn-2 bottom-20"
          block
          variant="secondary btn-custom_1"
          size="lg"
          >Cancel</b-button
        >
      </div>
    </b-modal>
    <!-- Delete popup -->
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import newDropDown from "./../../../../components/common/newDropdown.vue";
export default {
  middleware: "auth",
  components: {
    newDropDown
  },
  data() {
    return {
      getEnabled: true,
      text: "",
      selected: null,
      selectedFullBath: "",
      selectedMinBed: "",
      selectedHalfBath: "",
      selectedPropertyTypes: [],
      selectedPropertyConditions: [],
      selectedMustHaves: [],
      othercheckbox: "",
      options: [
        {
          value: null,
          text: "Please select an option"
        },
        {
          value: "a",
          text: "This is First option"
        },
        {
          value: "b",
          text: "Selected Option"
        },
        {
          value: {
            C: "3PO"
          },
          text: "This is an option"
        }
      ],
      search: null,
      error_state: {
        search: null,
        errortextrea: null,
        propertytypes: null,
        propertyconditions: null,
        musthaves: null
      },
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
          text: "Home Design",
          href: "/exp-home/client/home_design"
        }
      ]
    };
  },
  methods: {
    moveToNext() {
      const obj = {
        clientId: this.$store.getters["clients/getSelectedClient"].id,
        agentId: this.$store.$auth.user.id,
        propertyType: JSON.stringify(this.selectedPropertyTypes),
        propertyCondition: JSON.stringify(this.selectedPropertyConditions),
        minBeds: this.selectedMinBed,
        minFullBath: this.selectedFullBath,
        minHalfBath: this.selectedHalfBath,
        mustHaves: JSON.stringify(this.selectedMustHaves),
        other: this.text,
        location: "Islamabad",
        pointOfInterests: [
          {
            address: "address 1",
            DistanceInMiles: "20",
            DriveTimeInMutes: "30"
          },
          {
            address: "address 2",
            DistanceInMiles: "20",
            DriveTimeInMutes: "50"
          }
        ]
      };
      this.$store.dispatch("searchHome/homeDesign", obj);
    },
    goBack() {
      this.$router.back();
    },
    handleMinBedSelection() {},
    handleFullBathSelection() {},
    handleHalfBathSelection() {}
  },
  computed: {
    ...mapGetters("searchHome", [
      "getPropertyTypes",
      "getPropertyConditions",
      "getMustHaves"
    ]),
    getPropertyTypesArray() {
      return this.$store.getters["searchHome/getPropertyTypes"] || [];
    },
    getPropertyConditionsArray() {
      return this.$store.getters["searchHome/getPropertyConditions"] || [];
    },
    getPropertyMustHavesArray() {
      return this.$store.getters["searchHome/getMustHaves"] || [];
    },
    getMinBeds() {
      return [
        {
          label: "Any",
          value: "any"
        },
        {
          label: "1+ Beds",
          value: "1"
        },
        {
          label: "2+ Beds",
          value: "2"
        },
        {
          label: "3+ Beds",
          value: "3"
        },
        {
          label: "4+ Beds",
          value: "4"
        }
      ];
    },
    getFullBaths() {
      return [
        {
          label: "1+ Full Baths",
          value: "1"
        },
        {
          label: "2+  Full Baths",
          value: "2"
        },
        {
          label: "3+  Full Baths",
          value: "3"
        },
        {
          label: "4+  Full Baths",
          value: "4"
        },
        {
          label: "Any Full Baths",
          value: "any"
        }
      ];
    },
    getHalfBaths() {
      return [
        {
          label: "1+ Half Baths",
          value: "1"
        },
        {
          label: "2+ Half Baths",
          value: "2"
        },
        {
          label: "3+ Half Baths",
          value: "3"
        },
        {
          label: "4+ Half Baths",
          value: "4"
        },
        {
          label: "Any Half Baths",
          value: "any"
        }
      ];
    }
  },
  mounted() {
    this.$store.dispatch("searchHome/propertyTypes");
    this.$store.dispatch("searchHome/propertyConditions");
    this.$store.dispatch("searchHome/mustHaves");
  },
  watch: {
    selectedPropertyTypes: function() {
      const value =
        this.selectedPropertyTypes.length > 0 &&
        this.selectedPropertyConditions.length > 0 &&
        this.selectedMustHaves.length > 0 &&
        (this.selectedMinBed && this.selectedMinBed.trim()) != "" &&
        (this.selectedHalfBath && this.selectedHalfBath.trim()) != "" &&
        (this.selectedFullBath && this.selectedFullBath.trim()) != "" &&
        (this.othercheckbox ? this.text.trim() != "" : true);
      this.getEnabled = !value;
    },
    selectedPropertyConditions: function() {
      const value =
        this.selectedPropertyTypes.length > 0 &&
        this.selectedPropertyConditions.length > 0 &&
        this.selectedMustHaves.length > 0 &&
        (this.selectedMinBed && this.selectedMinBed.trim()) != "" &&
        (this.selectedHalfBath && this.selectedHalfBath.trim()) != "" &&
        (this.selectedFullBath && this.selectedFullBath.trim()) != "" &&
        (this.othercheckbox ? this.text.trim() != "" : true);
      this.getEnabled = !value;
    },
    selectedMustHaves: function() {
      const value =
        this.selectedPropertyTypes.length > 0 &&
        this.selectedPropertyConditions.length > 0 &&
        this.selectedMustHaves.length > 0 &&
        (this.selectedMinBed && this.selectedMinBed.trim()) != "" &&
        (this.selectedHalfBath && this.selectedHalfBath.trim()) != "" &&
        (this.selectedFullBath && this.selectedFullBath.trim()) != "" &&
        (this.othercheckbox ? this.text.trim() != "" : true);
      this.getEnabled = !value;
    },
    selectedMinBed: function() {
      const value =
        this.selectedPropertyTypes.length > 0 &&
        this.selectedPropertyConditions.length > 0 &&
        this.selectedMustHaves.length > 0 &&
        (this.selectedMinBed && this.selectedMinBed.trim()) != "" &&
        (this.selectedHalfBath && this.selectedHalfBath.trim()) != "" &&
        (this.selectedFullBath && this.selectedFullBath.trim()) != "" &&
        (this.othercheckbox ? this.text.trim() != "" : true);
      this.getEnabled = !value;
    },
    selectedHalfBath: function() {
      const value =
        this.selectedPropertyTypes.length > 0 &&
        this.selectedPropertyConditions.length > 0 &&
        this.selectedMustHaves.length > 0 &&
        (this.selectedMinBed && this.selectedMinBed.trim()) != "" &&
        (this.selectedHalfBath && this.selectedHalfBath.trim()) != "" &&
        (this.selectedFullBath && this.selectedFullBath.trim()) != "" &&
        (this.othercheckbox ? this.text.trim() != "" : true);
      this.getEnabled = !value;
    },
    selectedFullBath: function() {
      const value =
        this.selectedPropertyTypes.length > 0 &&
        this.selectedPropertyConditions.length > 0 &&
        this.selectedMustHaves.length > 0 &&
        (this.selectedMinBed && this.selectedMinBed.trim()) != "" &&
        (this.selectedHalfBath && this.selectedHalfBath.trim()) != "" &&
        (this.selectedFullBath && this.selectedFullBath.trim()) != "" &&
        (this.othercheckbox ? this.text.trim() != "" : true);
      this.getEnabled = !value;
    },
    othercheckbox: function() {
      const value =
        this.selectedPropertyTypes.length > 0 &&
        this.selectedPropertyConditions.length > 0 &&
        this.selectedMustHaves.length > 0 &&
        (this.selectedMinBed && this.selectedMinBed.trim()) != "" &&
        (this.selectedHalfBath && this.selectedHalfBath.trim()) != "" &&
        (this.selectedFullBath && this.selectedFullBath.trim()) != "" &&
        (this.othercheckbox ? this.text.trim() != "" : true);
      this.getEnabled = !value;
    },
    text: function() {
      const value =
        this.selectedPropertyTypes.length > 0 &&
        this.selectedPropertyConditions.length > 0 &&
        this.selectedMustHaves.length > 0 &&
        (this.selectedMinBed && this.selectedMinBed.trim()) != "" &&
        (this.selectedHalfBath && this.selectedHalfBath.trim()) != "" &&
        (this.selectedFullBath && this.selectedFullBath.trim()) != "" &&
        (this.othercheckbox ? this.text.trim() != "" : true);
      this.getEnabled = !value;
    }
  }
};
</script>

<style lang="scss">
.btn-custom {
  width: 156px;

  @media screen and(max-width: 992px) {
    width: 175px;
  }
}

.btn-back {
  border-radius: 2px;
  background-color: #f5f5f5;
  color: #1f1f1f;
}

.top-title {
  margin-top: 48px;
  font-size: 42px;
  margin-bottom: 0px;
  @media screen and(max-width: 992px) {
    font-size: 26px;
    margin-top: 24px;
  }
}
.filter {
  margin-top: 48px;
  &-title {
    margin-bottom: 20px;
    span {
      margin-left: 8px;
      @media screen and(max-width: 992px) {
        display: block;
        margin-left: 0px;
      }
    }
  }
  .extra-text {
    margin-top: 24px;
    textarea {
      background-color: #f5f5f5;
      border-radius: 2px;
      border: none;
      resize: none;
      padding: 12px;
      min-height: 145px;
    }

    .selectedother {
      background: white;
      border: 1px solid;
    }
  }
}
.divider {
  margin: 48px 0px;
}
.steps-btn {
  margin-top: 188px;
  margin-bottom: 72px;
  button {
    min-width: 156px;
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
    margin-bottom: 8px;
    button {
      min-width: 167px;
    }
  }
}
.blur {
  opacity: 0.5;
}
.poi-block {
  border: 2px solid #44a1bf;
  border-radius: 2px;
  margin-top: 48px;
  padding: 32px;
  position: relative;
  padding-bottom: 48px;
  .lable-title {
    margin-top: 24px;
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
  }
  .poi-del {
    position: absolute;
    right: 15px;
    top: 5px;
    opacity: 0.4;
  }
}
#propertytypes-group,
#propertyconditions-group,
#mustHaves-group {
  .custom-control {
    width: 100%;
  }
}
</style>
