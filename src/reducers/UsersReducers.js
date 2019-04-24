import { Edit_User } from '../actions/types';

const getInitialState = {};

export default function(state = getInitialState, action) {
  switch (action.type) {
    case Edit_User:
      return {
        ...state,
        changedUser: action.payload
      }
      break;
    default:
     return state;
      break;
  }
}
