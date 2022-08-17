import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";
// ^^^ Safeguard passing in variables instead of strings example type: "FETCH_ALL" || FETCH_ALL
import * as api from "../API";

// Action Creators
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    console.log(data);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.error(err);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    console.log(
      `getPostsBySearch data consoled inside actions/post and being dispatched inside Home component::: ${data}`
    );
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.error(err);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.error(err);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.error(err);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (err) {
    console.error(err);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.error(err);
  }
};
