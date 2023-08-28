import express from 'express';
import database from '..';
import { Server } from '../interfaces';

const router = express();

router.get('/:id', async (req, res) => {
    const data = await database.collection<Server>('servers').findOne({ serverId: req.params.id }, { projection: { _id: 0 } });
    res.status(200).json(data);
});

router.post('/:id', async (req, res) => {
    await database.collection<Server>('servers').replaceOne({ serverId: req.params.id }, req.body);
    res.status(200).send(true);
});

export default router;