import express from 'express';
import auth from './auth';

const router = express();

router.use('/auth', auth);

export default router;