import { Edit_User }  from './types';

export const editUser = (user) => (dispatch) => {
  dispatch({
    type: Edit_User,
    payload: user,
  })
}
