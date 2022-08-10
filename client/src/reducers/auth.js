import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      console.log(`action?.type consoled from AUTH reducers: ${action?.type}`)
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      // ^^^ This is saved in local storage as 'profile'. This is note to change name to token because as it that's all it's storing. Originally I thought I could get profile information and a token at same time. 
 
      return { ...state, authData: action?.data, loading: false, errors: null };
    case LOGOUT:
      localStorage.clear();
      console.log('localStorage cleared');
      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducer;