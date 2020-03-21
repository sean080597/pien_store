import { combineReducers } from 'redux';
import GoogleAuthReducer from './GoogleAuthReducer'
import doCheckNotFoundPage from './doCheckNotFoundPage'

export default combineReducers({
    isNotFoundPage: doCheckNotFoundPage,
    auth: GoogleAuthReducer
});