const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const User = require('../../models/User');

// GET a single post by ID
router.get('/:id', async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate('poster', 'username');
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    return res.json(post);
  } catch (err) {
    next(err);
  }
});

// DELETE a post by ID
router.delete('/:id', async (req, res, next) => {
    try {
      const postId = req.params.id;
      const post = await Post.findByIdAndDelete(postId);
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      return res.json({ message: 'Post deleted successfully' });
    } catch (err) {
      next(err);
    }
  });
  
  // UPDATE a post by ID
  router.put('/:id', async (req, res, next) => {
    try {
      const postId = req.params.id;
      const updatedPost = req.body;
  
      const post = await Post.findByIdAndUpdate(postId, updatedPost, { new: true });
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      return res.json(post);
    } catch (err) {
      next(err);
    }
  });

  router.get('/', async (req, res, next) => {
    try {
      const posts = await Post.find().populate('poster', 'username');
      return res.json(posts);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
