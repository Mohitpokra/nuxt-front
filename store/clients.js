export const state = () => ({
    client_list:[]
});

export const mutations = {
    SET_CLIENTS(state, payload) {
      state.client_list = payload
    },
};

export const actions = {
    getClients({commit, $axios}) {
        let data =[]
        commit('SET_CLIENTS', data)
    }
};