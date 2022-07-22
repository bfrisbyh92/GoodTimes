import PostMessage from '../models/postMessage.js';

export const getPosts = (req, res) => {
    res.send("working");
}

export const createPost = (req, res) => {
    res.send('Post created Route working');
}