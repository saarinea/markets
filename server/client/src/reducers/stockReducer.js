import { GET_DATA } from '../actions/types.js'

const initialState = {
  data: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      return Object.assign({}, state, {
        data: action.payload
      })
    default:
      return state
  }
}
