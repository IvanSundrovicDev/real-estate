import { createStore } from 'redux'
import {addFromApiToStore} from './reducers'

export const store = createStore(addFromApiToStore);
