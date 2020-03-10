import {toastDuration} from './../constants.js'
import {getValue, setValue} from './../utils/localstorageUtils.js'

export const state = () => {
    return {
            client_list:[],
            selectedClient:{}
        }
};

export const mutations = {
    SET_CLIENTS(state, payload) {
      state.client_list = payload
    },
    SET_SELECTED_CLIENT(state, payload) {
        state.selectedClient = payload
    }
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
    },
    selectedClient({commit}, payload){
        commit('SET_SELECTED_CLIENT',payload)
        setValue('selectedClient', JSON.stringify(payload))
    },
    removeSelectedClient({commit}, payload){
        commit('SET_SELECTED_CLIENT',{})
    }
};

export const getters = {
    getClientsList: (state) =>{
        return state.client_list
    },
    getSelectedClient: (state) => {
        let data = getValue('selectedClient')
        let selectedClientData = data ? JSON.parse(data) : {}
        data = state.selectedClient.id ? state.selectedClient : selectedClientData
        return  data
    }
};
