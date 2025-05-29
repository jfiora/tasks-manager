import { Router } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';

const router = Router();
const userRepository = AppDataSource.getRepository(User);

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await userRepository.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// Get user by id
router.get('/:id', async (req, res) => {
    try {
        const user = await userRepository.findOne({
            where: { id: req.params.id },
            relations: ['tasks'],
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
});

// Create user
router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = userRepository.create({
            name,
            email,
            password, // Note: In a real application, you should hash the password
        });
        await userRepository.save(user);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
});

// Update user
router.put('/:id', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userRepository.findOne({
            where: { id: req.params.id },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        if (password) {
            user.password = password; // Note: In a real application, you should hash the password
        }

        await userRepository.save(user);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
});

// Delete user
router.delete('/:id', async (req, res) => {
    try {
        const user = await userRepository.findOne({
            where: { id: req.params.id },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await userRepository.remove(user);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
});

export default router;
