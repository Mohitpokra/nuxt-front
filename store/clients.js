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
                const response = (data.data || []).reverse()
                commit('SET_CLIENTS', response)
            })
            .catch(() =>{
                this.$toast.error('Error fetching client', toastDuration)
            })
    }
};

export const getters = {
    getClientsList: (state) =>{
        return state.client_list
    }
};
