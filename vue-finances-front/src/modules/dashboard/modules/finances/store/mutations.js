import {
  SET_FILTERS,
  SET_MONTH
} from './mutation-type'

export default {
  [SET_FILTERS]: (state, { filters }) => {
    state.filters = filters
    state.isFiltering = !!filters
  },
  [SET_MONTH]: (state, { month }) => {
    state.month = month
  }
}
