import axios from 'axios'
import { FETCH_USER, GET_DATA } from './types.js'

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const getData = (ticker) => async dispatch => {
  const res = await axios.get('/data/stocks', 
  {params: {
     ticker: ticker
  }})
  dispatch({ type: GET_DATA, payload: res.data })
}
