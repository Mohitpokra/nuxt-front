import {toastDuration} from './../constants'
export const state = () => ({
    propertyTypes:[],
    propertyConditions:[],
    mustHaves:[]
});

export const mutations = {
    SET_PROPERTY_TYPES(state, payload){
        state.propertyTypes = payload
    },
    SET_PROPERTY_CONDITIONS(state,payload){
        state.propertyConditions = payload
    },
    SET_MUST_HAVES(state,payload){
        state.mustHaves = payload
    }
};

export const actions = {
    preApproval({commit , $axios }) {
    },
    estimatedAffordability({commit , $axios }) {
    },
    propertyTypes({commit}){
        this.$axios.get('/api/util/property-types')
            .then((data)=>{
                let response = (data.data || [])
                response = response.map((obj)=>{
                    return {
                        ...obj,
                        text: obj.title,
                        value: obj.title,
                    }
                })
                commit('SET_PROPERTY_TYPES', response)
            })
            .catch(() =>{
                this.$toast.error('Error fetching propertyTypes', toastDuration)
            })
    },
    propertyConditions({commit}){
        this.$axios.get('/api/util/property-conditions')
            .then((data)=>{
                let response = (data.data || [])
                response = response.map((obj)=>{
                    return {
                        ...obj,
                        text: obj.title,
                        value: obj.title,
                    }
                })
                commit('SET_PROPERTY_CONDITIONS', response)
            })
            .catch(() =>{
                this.$toast.error('Error fetching property conditions', toastDuration)
            })
    },
    mustHaves({commit}){
        this.$axios.get('/api/util/must-haves')
            .then((data)=>{
                let response = (data.data || [])
                response = response.map((obj)=>{
                    return {
                        ...obj,
                        text: obj.title,
                        value: obj.title,
                    }
                })
                commit('SET_MUST_HAVES', response)
            })
            .catch(() =>{
                this.$toast.error('Error fetching mustHaves', toastDuration)
            })
    }
};

export const getters = {
    getPropertyTypes(state){
        return state.propertyTypes
    },
    getPropertyConditions(state){
        return state.propertyConditions
    },
    getMustHaves(state){
        return state.mustHaves
    }
};
