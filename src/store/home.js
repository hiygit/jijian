import homeapi from '@/api/home.js'
export default {
  state: {
    homelist: []
  },
  getters: {},
  actions: {
    getHomeList (context) {
      homeapi.getHomeList((data) => {
        context.commit('changeCastslist', data)
      })
    }
  },
  mutations: {
    changeCastslist (state, data) {
      state.homelist = data
    }
  }
}
