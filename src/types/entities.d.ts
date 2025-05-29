declare module './User' {
    export class User {
        id: string;
        name: string;
        email: string;
        password: string;
        tasks: any[];
    }
}

declare module './Task' {
    export enum TaskStatus {
        READY = 'ready',
        IN_PROGRESS = 'in_progress',
        DONE = 'done',
    }

    export class Task {
        id: string;
        title: string;
        description: string;
        status: TaskStatus;
        assignedTo: any;
        createdAt: Date;
        updatedAt: Date;
    }
}
