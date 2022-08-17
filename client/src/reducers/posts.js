import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  FETCH_BY_SEARCH,
} from "../constants/actionTypes";
// ^^^ Safeguard passing in variables instead of strings example type: "FETCH_ALL" || FETCH_ALL

// eslint-disable-next-line
export default (state = [], action) => {
  switch (action.type) {
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload,
      };
    case DELETE:
      return state.filter((post) => post._id !== action.payload);
    case UPDATE:
      // case LIKE :
      // ^^^ They return the same thing.
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case CREATE:
      return [...state, action.payload];
    default:
      return state;
  }
};
