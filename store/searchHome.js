import {
  getValue
} from './../utils/localstorageUtils.js';

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
        const temp = data.data
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
        this.$axios.post('/api/search/add-financial-input', {
            searchId: getValue('searchId'),
            financialInputId: data.data.financialInputId
          })
          .then((data) => {})
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
        this.$axios.post('/api/search/add-home-design', {
            searchId: getValue('searchId'),
            homeDesignId: data.data.id
          })
          .then((data) => {
            this.$router.push('/exp-home/client/home_design/pre_approval/');
          })
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
