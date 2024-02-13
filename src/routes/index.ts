import express from 'express';
import user from './user';
import mod from './mod';
import game from './game';

const router = express();

router.use('/user', user);
router.use('/mod', mod);
router.use('/game', game);

export default router;