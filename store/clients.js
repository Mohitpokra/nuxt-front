import {toastDuration} from './../constants.js'

export const state = () => ({
    client_list:[]
});

export const mutations = {
    SET_CLIENTS(state, payload) {
      state.client_list = payload
    },
};

export const actions = {
    getClients({commit}) {
        this.$axios.post('/api/client/list')
            .then((data)=>{
                commit('SET_CLIENTS', data)
            })
            .catch(() =>{
                this.$toast.error('Error fetching client', toastDuration)
            })
    }
};