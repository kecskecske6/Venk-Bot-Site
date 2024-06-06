import express from 'express';
import user from './user';
import mod from './mod';
import game from './game';
import image from './image';

const router = express();

router.use('/user', user);
router.use('/mod', mod);
router.use('/game', game);
router.use('/image', image);

export default router;