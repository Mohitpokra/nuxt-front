export const state = () => ({

})

export const mutations = {
    updateName(state, value){
       state.auth.user.name = value
    },
    updateEmail(state, value){
        state.auth.user.email = value
     }
}


export const getters = {
   getPlanType(state){
      return state.auth.user.agent_detail.subscription_plan_id
   }
}

export const actions = {

}