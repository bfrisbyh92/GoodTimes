import mongoose from "mongoose";
import express from "express";
import PostMessage from "../models/postMessage.js";
const router = express.Router();

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    // ^^ Get the starting index of every page
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    console.log(
      `posts being fetched inside controllers/posts.js by function getPostsBySearch using await. Data of posts: ${posts}, defined by JS RegExp the title: ${title}`
    );
    res.json({ data: posts });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  await PostMessage.findByIdAndDelete(id);
  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  // ^^ Grabbing the id from req.params
  if (!req.userId) return res.json({ message: "Not Authenticated" });
  // ^^ If there is no id in req.params, send message not authenticated
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with that id");
  }
  /// Using mongoose we are validating the id with their functions
  const post = await PostMessage.findById(id);
  // ^^ Finding the post that user clicked like on
  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
  // ^^ This is the logic that allows each user to only like each post one time.
  // It's saying if you have not yet liked the post and click like, add that like.
  // Otherwise remove it from the database. It updates the data it receives and sends it back in the response.
  console.log(
    `id: ${id}, post: ${post},
     index: ${index}, updated: ${updatedPost}`
  );
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  const post = await PostMessage.findById(id);
  post.comments?.push(value);
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  console.log(`comments... updatedPost: ${updatedPost}`);
  res.json(updatedPost);
};

export default router;
