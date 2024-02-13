import express from 'express';
import supabase from '..';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import 'dotenv/config';
import { sign, verify } from 'jsonwebtoken';

const router = express();

router.post('/register', async (req, res) => {
    const messages: any[] = [];
    const emails = await supabase.from('users').select('email');
    const usernames = await supabase.from('users').select('username');
    if (emails.count as number > 0)
        messages.push({ message: 'Email is already taken!', field: 'email' });
    if (usernames.count as number > 0)
        messages.push({ message: 'Username is already taken!', field: 'username' });
    if (req.body.password != req.body.passwordAgain)
        messages.push({ message: 'The password and password again fields do not match!', field: 'password-again' });
    if (req.body.username.length < 4 || req.body.username.length > 32)
        messages.push({ message: 'Username length has to be between 4 and 32 characters!', field: 'username' });
    if (!/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(req.body.email))
        messages.push({ message: 'Invalid email format!', field: 'email' });
    if (req.body.password.length < 8 || req.body.password.length > 32)
        messages.push({ message: 'The password length has to be between 8 and 32 characters!', field: 'password' });
    if (!/[A-Z]+[a-z]+[0-9]+/.test(req.body.password))
        messages.push({ message: 'Your password has to contain at least one lowercase letter, one uppercase letter and one number!', field: 'password' });
    if (messages.length > 0)
        res.send({ success: false, messages });
    else {
        let characters = '0123456789abcdef';
        let token = '';
        const users = await supabase.from('users').select('token');
        const tokens = users.data?.map(u => u.token) as string[];
        do {
            for (let i = 0; i < 32; i++)
                token += characters[Math.floor(Math.random() * characters.length)];
        } while (tokens.includes(token))
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'venksitemail@gmail.com',
                pass: process.env.MAIL_PASS
            }
        });
        let mailOptions = {
            from: 'venksitemail@gmail.com',
            to: req.body.email,
            subject: 'Confirm your registration at Venk-Site',
            html: `<h2>Welcome to Venk-Site!</h2><p>You are only one step away from uploading mods, just click <a href="${process.env.FRONTEND}/validate/${token}">here</a>!</p>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.send({ success: false });
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        const encryptedPassword = await bcrypt.hash(req.body.password, 10);
        const role = await supabase.from('roles').select('id').eq('name', 'User');
        const roleId = role.data?.map(r => r.id).shift() as number;
        await supabase.from('users').insert({ email: req.body.email, password: encryptedPassword, roleId, token, username: req.body.username, validated: false });
        res.send({ success: true });
    }
});

router.get('/validate/:token', async (req, res) => {
    const user = await supabase.from('users').select().eq('token', req.params.token);
    const userData = user.data;
    if (userData?.length as number < 1)
        res.send(false);
    else {
        await supabase.from('users').update({ validated: true }).eq('token', req.params.token);
        res.send(true);
    }
});

router.post('/login', async (req, res) => {
    const user = await supabase.from('users').select().eq('username', req.body.username);
    const userData = user.data;
    if (userData?.length as number < 1)
        res.send({ sucess: false });
    else {
        const firstUser = userData?.shift();
        const passwordMatch = await bcrypt.compare(req.body.password, firstUser?.password as string);
        if (!passwordMatch)
            res.send({ sucess: false });
        else {
            if (!firstUser?.validated as boolean)
                res.send({ success: false });
            else {
                const token = sign({ id: firstUser?.id }, process.env.JWT_SECRET as string, { algorithm: 'HS256', allowInsecureKeySizes: true, expiresIn: 86400 });
                req.session.user = { token };
                res.send({ success: true, id: firstUser?.id as number, username: firstUser?.username as string, email: firstUser?.email as string, avatar: firstUser?.avatar == null ? null : firstUser.avatar as string });
            }
        }
    }
});

router.get('', async (req, res) => {
    const value = req.session.user;
    if (!value)
        res.send(false);
    else {
        let userId = 0;
        verify(value?.token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
            if (err)
                res.send(false);
            userId = decoded.id;
        });
        const user = await supabase.from('users').select().eq('id', userId);
        if (user)
            res.send(true);
        else
            res.send(false);
    }
});

export default router;