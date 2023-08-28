import express from 'express';
import auth from './auth';
import discord from './discord';
import server from './server';

const router = express();

router.use('/auth', auth);
router.use('/discord', discord);
router.use('/server', server);

export default router;