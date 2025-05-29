import { Router } from 'express';
import { AppDataSource } from '../config/database';
import { Task, TaskStatus } from '../entities/Task';
import { User } from '../entities/User';

const router = Router();
const taskRepository = AppDataSource.getRepository(Task);

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await taskRepository.find({
            relations: ['assignedTo'],
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});

// Get task by id
router.get('/:id', async (req, res) => {
    try {
        const task = await taskRepository.findOne({
            where: { id: req.params.id },
            relations: ['assignedTo'],
        });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task' });
    }
});

// Create task
router.post('/', async (req, res) => {
    try {
        const { title, description, assignedToId } = req.body;
        const task = taskRepository.create({
            title,
            description,
            status: TaskStatus.READY,
            assignedTo: { id: assignedToId },
        });
        await taskRepository.save(task);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task' });
    }
});

// Update task
router.put('/:id', async (req, res) => {
    try {
        const { title, description, status, assignedToId } = req.body;
        const task = await taskRepository.findOne({
            where: { id: req.params.id },
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        if (assignedToId) {
            task.assignedTo = { id: assignedToId } as User;
        }

        await taskRepository.save(task);
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task' });
    }
});

// Delete task
router.delete('/:id', async (req, res) => {
    try {
        const task = await taskRepository.findOne({
            where: { id: req.params.id },
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await taskRepository.remove(task);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task' });
    }
});

export default router;
