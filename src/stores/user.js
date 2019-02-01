export default {
    namespaced: true,
        state: {
        username: ''
    },
    getters: {
        username: (state) => { return state.username },
	},
    mutations: {
        SET_USERNAME: (state, payload) => { state.username = payload }
    },
    actions: {
        defineUser: (context, user) => {
            context.commit('SET_USERNAME', user)
        }
    }
}