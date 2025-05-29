import { Router } from 'express';

declare module './routes/task.routes' {
    const router: Router;
    export default router;
}

declare module './routes/user.routes' {
    const router: Router;
    export default router;
}
