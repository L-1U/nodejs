const express = require('express');
const { AppDataSource } = require('../database');
const { User } = require('../entities/User');

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find({
            relations: ['posts'],
            order: { created_at: 'DESC' }
        });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: { id: parseInt(req.params.id) },
            relations: ['posts']
        });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// Create new user
router.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;
        
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }
        
        const userRepository = AppDataSource.getRepository(User);
        const newUser = userRepository.create({ name, email });
        const savedUser = await userRepository.save(newUser);
        
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === '23505') { // Unique constraint violation
            res.status(400).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: 'Failed to create user' });
        }
    }
});

// Update user
router.put('/:id', async (req, res) => {
    try {
        const { name, email } = req.body;
        const userRepository = AppDataSource.getRepository(User);
        
        const user = await userRepository.findOne({
            where: { id: parseInt(req.params.id) }
        });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        if (name) user.name = name;
        if (email) user.email = email;
        
        const updatedUser = await userRepository.save(user);
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        if (error.code === '23505') {
            res.status(400).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: 'Failed to update user' });
        }
    }
});

// Delete user
router.delete('/:id', async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const result = await userRepository.delete(parseInt(req.params.id));
        
        if (result.affected === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;
