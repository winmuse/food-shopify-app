import { combineReducers, createStore } from 'redux'
import Public from './public'

const reducers = combineReducers({
  Public
})
export const store = createStore(reducers);
export default reducers
