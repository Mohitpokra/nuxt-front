export const state = () => ({
    firstName: '',
    lastName: '',
    email: '',
    mobile: null,
    uuid: null,
    agentId:null
});

export const mutations = {
    SET_USER_DETAILS(state, payload) {
        Object.keys(payload).forEach(function(key) {
			state[key] = payload[key]
		})
    },
};

export const actions = {
    getUserDetails({commit, $axios}) {
        commit('SET_USER_DETAILS', data)
    }
};