import { combineReducers } from 'redux';
import UsersReducers from './UsersReducers';

export default combineReducers({
  users: UsersReducers
})
