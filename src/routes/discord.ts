import express from 'express';
import { getGuildChannels, getGuilds } from '../discord/discord';

const router = express();

router.get('/guilds', async (req, res) => {
    res.send(await getGuilds());
});

router.get('/guilds/:id/channels', async (req, res) => {
    res.send(await getGuildChannels(req.params.id));
});

export default router;