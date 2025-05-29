import { DataSource } from 'typeorm';
import { Task } from '../entities/Task';
import { User } from '../entities/User';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    synchronize: true,
    logging: true,
    entities: [Task, User],
    subscribers: [],
    migrations: [],
});
