import { Router } from 'express';
import eventRoutes from './event';
import UserAuth from './middlewares/auth';

const router = Router();

router.use('/event', eventRoutes);

export default router;
