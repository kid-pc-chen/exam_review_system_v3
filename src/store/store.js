import { createStore } from 'redux'
import onUserChange from '../reducers/reducers.js'

let store = createStore(onUserChange)

export default store
