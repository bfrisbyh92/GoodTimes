import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  getPostsBySearch,
  commentPost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Routes start with localhost:3000/posts
router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get('/:id', getPost)
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.patch("/:id/likePost", auth, likePost);
router.delete("/:id", auth, deletePost);
router.post('/:id/commentPost', commentPost);
// ^^^ To post/patch/delete your JWT token has to be verified. Implementing Authorization.

export default router;
