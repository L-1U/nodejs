const express = require('express');
const { AppDataSource } = require('../database');
const { Post } = require('../entities/Post');

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
    try {
        const postRepository = AppDataSource.getRepository(Post);
        const posts = await postRepository.find({
            relations: ['user'],
            order: { created_at: 'DESC' }
        });
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// Get post by ID
router.get('/:id', async (req, res) => {
    try {
        const postRepository = AppDataSource.getRepository(Post);
        const post = await postRepository.findOne({
            where: { id: parseInt(req.params.id) },
            relations: ['user']
        });
        
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        
        res.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Failed to fetch post' });
    }
});

// Create new post
router.post('/', async (req, res) => {
    try {
        const { title, content, user_id } = req.body;
        
        if (!title || !user_id) {
            return res.status(400).json({ error: 'Title and user_id are required' });
        }
        
        const postRepository = AppDataSource.getRepository(Post);
        const newPost = postRepository.create({ title, content, user_id });
        const savedPost = await postRepository.save(newPost);
        
        // Fetch the post with user relation
        const postWithUser = await postRepository.findOne({
            where: { id: savedPost.id },
            relations: ['user']
        });
        
        res.status(201).json(postWithUser);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

// Update post
router.put('/:id', async (req, res) => {
    try {
        const { title, content } = req.body;
        const postRepository = AppDataSource.getRepository(Post);
        
        const post = await postRepository.findOne({
            where: { id: parseInt(req.params.id) }
        });
        
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        
        if (title) post.title = title;
        if (content !== undefined) post.content = content;
        
        const updatedPost = await postRepository.save(post);
        
        // Fetch the updated post with user relation
        const postWithUser = await postRepository.findOne({
            where: { id: updatedPost.id },
            relations: ['user']
        });
        
        res.json(postWithUser);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Failed to update post' });
    }
});

// Delete post
router.delete('/:id', async (req, res) => {
    try {
        const postRepository = AppDataSource.getRepository(Post);
        const result = await postRepository.delete(parseInt(req.params.id));
        
        if (result.affected === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

module.exports = router;
