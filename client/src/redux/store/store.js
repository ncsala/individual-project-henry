import {createStore, applyMiddleware} from "redux"
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from '../reducer/reducer.js'


//  se crea el store con el reducer y el middleware
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
