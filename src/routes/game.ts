import express from 'express';
import supabase from '..';

const router = express();

router.get('', async (req, res) => {
    const games = await supabase.from('games').select();
    res.send(games.data);
});

export default router;