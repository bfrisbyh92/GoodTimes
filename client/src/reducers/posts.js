import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionsTypes";
// ^^^ Safeguard passing in variables instead of strings example type: "FETCH_ALL" || FETCH_ALL

// eslint-disable-next-line
export default (posts = [], action) => {
  switch (action.type) {
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    case UPDATE:
      // case LIKE :
      // ^^^ They return the same thing.
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    default:
      return posts;
  }
};
