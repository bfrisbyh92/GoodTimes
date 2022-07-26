import React from 'react'
import Post from './Post/Post';
import useStyles from './styles';
import { useSelector } from 'react-redux';

const Posts = () => {

    const posts = useSelector((state) => state.posts);
    // ^^^ posts coming from client/src/reducers/index.js
    const classes = useStyles();

    console.log(posts);
    // ^^ Should show empty array at this point

  return (
    <>
    Posts
    <Post />
    <Post />
    </>
  )
}

export default Posts