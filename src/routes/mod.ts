import express from 'express';
import supabase from '..';
import multer from 'multer';
import { Upload } from 'tus-js-client';

const upload = multer();

const router = express();

router.get('', async (req, res) => {
    const mods = await supabase.from('mods').select();
    res.send(mods.data);
});

router.post('', upload.single('file'),  async (req, res) => {
    const { data } = await supabase.storage.from('venk-site').upload(req.file.originalname, req.file.buffer, { contentType: req.file.mimetype });
    const { error } = await supabase.from('mods').insert({ authorId: Number(req.body.authorId), name: req.body.name, uploadDate: req.body.uploadDate, description: req.body.description, gameId: Number(req.body.gameId), fileUrl: data.path });
    res.send({ message: error });
});

export default router;