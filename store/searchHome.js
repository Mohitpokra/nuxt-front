const dummyData = {
  "message": "success",
  "history": [{
      "id": 2,
      "agent_id": 3,
      "client_id": 3,
      "financial_input_id": 1,
      "search_date": "2020-03-07 21:35:17",
      "home_design_id": 1,
      "status": 1,
      "created_at": "2020-03-07 16:35:17",
      "updated_at": "2020-03-12 21:52:29",
      "user": {
        "id": 3,
        "uuid": "9ccf16d2-5e06-11ea-affb-2dcc75e7270e",
        "name": "khurram",
        "email": "khurram_shahzad2@icloud.com",
        "email_verified_at": null,
        "type": "agent",
        "created_at": "2020-03-04 07:41:26",
        "updated_at": "2020-03-11 15:27:05"
      },
      "client": {
        "id": 3,
        "uuid": null,
        "first_name": "client",
        "last_name": "doe",
        "email": "client@client.com",
        "phone": null,
        "notes": null,
        "created_by": null,
        "created_at": "2020-03-07 15:46:53",
        "updated_at": "2020-03-07 15:46:53"
      },
      "financial_input": {
        "id": 1,
        "uuid": null,
        "agent_id": 3,
        "client_id": 1,
        "title": "pre-approved",
        "purchase_price": "1",
        "loan_program": "1",
        "qualified_total_housing_payment": "1",
        "max_total_monthly_payment": "1",
        "funds_available": "1",
        "estimated_credit_score": "1",
        "is_first_time_homebuyer": 1,
        "is_veteran": 1,
        "disabled_veteran": 1,
        "created_at": "2020-03-07 18:29:24",
        "updated_at": "2020-03-07 18:29:24"
      },
      "home_design": {
        "id": 1,
        "uuid": null,
        "client_id": 1,
        "agent_id": 2,
        "property_type": "a:2:{i:0;s:13:\"Single Family\";i:1;s:6:\"duplex\";}",
        "property_condition": "a:2:{i:0;s:3:\"Any\";i:1;s:13:\"Average+ Only\";}",
        "min_beds": "1+ beds",
        "min_full_baths": "2+ Full Baths",
        "min_half_baths": "1+ Half Bath",
        "property_must_have": "a:1:{i:0;s:9:\"Roof Deck\";}",
        "other": "Some Other Info",
        "location": "Islamabad",
        "created_at": "2020-03-01 19:42:06",
        "updated_at": "2020-03-01 19:42:06"
      }
    },
    {
      "id": 4,
      "agent_id": 3,
      "client_id": 3,
      "financial_input_id": 2,
      "search_date": "2020-03-10 13:14:42",
      "home_design_id": 1,
      "status": 1,
      "created_at": "2020-03-10 08:14:42",
      "updated_at": "2020-03-12 21:52:29",
      "user": {
        "id": 3,
        "uuid": "9ccf16d2-5e06-11ea-affb-2dcc75e7270e",
        "name": "khurram",
        "email": "khurram_shahzad2@icloud.com",
        "email_verified_at": null,
        "type": "agent",
        "created_at": "2020-03-04 07:41:26",
        "updated_at": "2020-03-11 15:27:05"
      },
      "client": {
        "id": 3,
        "uuid": null,
        "first_name": "client",
        "last_name": "doe",
        "email": "client@client.com",
        "phone": null,
        "notes": null,
        "created_by": null,
        "created_at": "2020-03-07 15:46:53",
        "updated_at": "2020-03-07 15:46:53"
      },
      "financial_input": {
        "id": 2,
        "uuid": null,
        "agent_id": 3,
        "client_id": 1,
        "title": "pre-approved",
        "purchase_price": "1",
        "loan_program": "1",
        "qualified_total_housing_payment": "1",
        "max_total_monthly_payment": "1",
        "funds_available": "1",
        "estimated_credit_score": "1",
        "is_first_time_homebuyer": 1,
        "is_veteran": 1,
        "disabled_veteran": 1,
        "created_at": "2020-03-07 18:29:39",
        "updated_at": "2020-03-07 18:29:39"
      },
      "home_design": {
        "id": 1,
        "uuid": null,
        "client_id": 1,
        "agent_id": 2,
        "property_type": "a:2:{i:0;s:13:\"Single Family\";i:1;s:6:\"duplex\";}",
        "property_condition": "a:2:{i:0;s:3:\"Any\";i:1;s:13:\"Average+ Only\";}",
        "min_beds": "1+ beds",
        "min_full_baths": "2+ Full Baths",
        "min_half_baths": "1+ Half Bath",
        "property_must_have": "a:1:{i:0;s:9:\"Roof Deck\";}",
        "other": "Some Other Info",
        "location": "Islamabad",
        "created_at": "2020-03-01 19:42:06",
        "updated_at": "2020-03-01 19:42:06"
      }
    }
  ]
}

export const state = () => ({
  propertyTypes: [],
  propertyConditions: [],
  mustHaves: [],
  searchHistory: [],
  setSearchFetched: false
});

export const mutations = {
  SET_PROPERTY_TYPES(state, payload) {
    state.propertyTypes = payload
  },
  SET_PROPERTY_CONDITIONS(state, payload) {
    state.propertyConditions = payload
  },
  SET_HISTORY(state, payload) {
    state.searchHistory = payload
  },
  SET_MUST_HAVES(state, payload) {
    state.mustHaves = payload
  },
  SET_SEARCH_FETCHED(state, payload) {
    state.setSearchFetched = payload
  }
};

export const actions = {
  fetchSearchHistory({
    commit,
    $axios
  }) {
    commit('SET_SEARCH_FETCHED', false)
    this.$axios.get('/api/search/history')
      .then((data) => {
        const temp = dummyData //data.data || 
        commit('SET_HISTORY', temp.history)
        commit('SET_SEARCH_FETCHED', true)
      })
  },
  financialInputs({
    commit,
    $axios
  }, payload) {
    this.$axios.post('/api/financial-inputs', payload)
      .then((data) => {
        console.log(data)
        // tbd : where to redirect on success
        // this.$toast.success('Added Financial Inputs', toastDuration)
      })
      .catch(() => {
        // this.$toast.error('Error Adding Financial Inputs', toastDuration)
      })
  },
  propertyTypes({
    commit
  }) {
    this.$axios.get('/api/util/property-types')
      .then((data) => {
        let response = (data.data || [])
        response = response.map((obj) => {
          return {
            ...obj,
            text: obj.title,
            value: obj.title,
          }
        })
        commit('SET_PROPERTY_TYPES', response)
      })
      .catch(() => {
        // this.$toast.error('Error fetching propertyTypes', toastDuration)
      })
  },
  propertyConditions({
    commit
  }) {
    this.$axios.get('/api/util/property-conditions')
      .then((data) => {
        let response = (data.data || [])
        response = response.map((obj) => {
          return {
            ...obj,
            text: obj.title,
            value: obj.title,
          }
        })
        commit('SET_PROPERTY_CONDITIONS', response)
      })
      .catch(() => {
        // this.$toast.error('Error fetching property conditions', toastDuration)
      })
  },
  mustHaves({
    commit
  }) {
    this.$axios.get('/api/util/must-haves')
      .then((data) => {
        let response = (data.data || [])
        response = response.map((obj) => {
          return {
            ...obj,
            text: obj.title,
            value: obj.title,
          }
        })
        commit('SET_MUST_HAVES', response)
      })
      .catch(() => {
        // this.$toast.error('Error fetching mustHaves', toastDuration)
      })
  },
  homeDesign({
    commit
  }, payload) {
    this.$axios.post('/api/home-design', payload)
      .then((data) => {
        console.log(data)
        this.$router.push('/exp-home/client/home_design/pre_approval/');
        // this.$toast.success('Added HomeDesign', toastDuration) 
      })
      .catch(() => {
        // this.$toast.error('Error Adding HomeDesign', toastDuration)
      })
  }
};

export const getters = {
  getSearchHistory(state) {
    return state.searchHistory
  },
  getPropertyTypes(state) {
    return state.propertyTypes
  },
  getPropertyConditions(state) {
    return state.propertyConditions
  },
  getMustHaves(state) {
    return state.mustHaves
  },
  getSearchFetched(state) {
    return state.setSearchFetched
  }
};
