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
    financialInputs({commit , $axios }, payload) {
        this.$axios.post('/api/financial-inputs', payload)
            .then((data)=>{
                console.log(data)
                // tbd : where to redirect on success
                this.$toast.success('Added Financial Inputs', toastDuration)
            })
            .catch(() =>{
                this.$toast.error('Error Adding Financial Inputs', toastDuration)
            })
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
    },
    homeDesign({commit}, payload){
        this.$axios.post('/api/home-design', payload)
            .then((data)=>{
                console.log(data)
                this.$router.push('/exp-home/client/home_design/pre_approval/');
                this.$toast.success('Added HomeDesign', toastDuration) 
            })
            .catch(() =>{
                this.$toast.error('Error Adding HomeDesign', toastDuration)
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
