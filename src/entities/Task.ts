import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

export enum TaskStatus {
    READY = 'ready',
    IN_PROGRESS = 'in_progress',
    DONE = 'done',
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.READY,
    })
    status: TaskStatus;

    @ManyToOne(() => User, (user: User) => user.tasks)
    assignedTo: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
