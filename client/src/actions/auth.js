import { AUTH } from "../constants/actionTypes.js";
import * as API from "../API/index.js";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await API.signIn(formData);
    console.log(`actions/auth signIn function data: ${data}`);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await API.signUp(formData);
    console.log(`actions/auth signUp data: ${data}`);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

// This flow is going from inside the form component on submit. Then dispatching the signin/signup actions to redux. 
// On dispatch it gets sent here to actions. These actions make a call to my API, signs in, and grabs the user data.
//  Sending it to the reducers after that. Reducters will set the current users profile and data to localStorage.
