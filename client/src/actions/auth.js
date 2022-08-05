import { AUTH } from "../constants/actionsTypes.js";
import * as API from "../API/index.js";
// import { useNavigate } from 'react-router-dom';
// const navigate = useNavigate();

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await API.signIn(formData);
    console.log(data);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await API.signUp(formData);
    console.log(data);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

// This flow is going from inside the form component on submit. Then dispatching the signin/signup actions to redux. 
// On dispatch it gets sent here to actions. These actions make a call to my API, signs in, and grabs the user data.
//  Sending it to the reducers after that. Reducters will set the current users profile and data to localStorage.
