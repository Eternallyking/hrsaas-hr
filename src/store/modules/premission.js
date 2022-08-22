import router, { constantRoutes, asyncRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    routes: [],
    points: []
  },
  mutations: {
    setRoures(state, routes) {
      state.routes = [...constantRoutes, ...routes]
    },
    setPoints(state, payload) {
      state.points = payload
    }
  },
  actions: {
    filterRoutes(context, roles) {
      const routes = asyncRoutes.filter((item) => {
        return roles.menus.includes(item.meta.id)
      })
      context.commit('setRoures', routes)
      router.addRoutes([
        ...routes,
        { path: '*', redirect: '/404', hidden: true }
      ])
    },
    staPoionAction(context,points){
      context.commit('setPoints',points)
    }
  }
}
