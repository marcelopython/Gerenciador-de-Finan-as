import * as types from './mutation-type'

export default {
  setFilters ({ commit }, payload) {
    commit(types.SET_FILTERS, payload)
  },
  setMonth ({ commit }, payload) {
    commit(types.SET_MONTH, payload)
  }
}
