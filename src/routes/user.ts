import express from 'express';
import database from '..';
import { User } from '../interfaces';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import 'dotenv/config';

const router = express();

router.post('/register', async (req, res) => {
    const messages: any[] = [];
    const userEmail = await database.collection<User>('users').findOne({ email: req.body.email });
    const username = await database.collection<User>('users').findOne({ username: req.body.username });
    if (userEmail)
        messages.push({ message: 'Email is already taken!', field: 'email' });
    if (username)
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
        const users = await database.collection<User>('users').find().toArray();
        const tokens = users.map(u => u.token);
        do {
            for (let i = 0; i < 32; i++) {
                token += characters[Math.floor(Math.random() * characters.length)];
            }
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
        await database.collection<User>('users').insertOne({ email: req.body.email, username: req.body.username, password: encryptedPassword, avatar: '', role: 'User', token, validated: false });
        res.send({ success: true });
    }
});

router.get('/validate/:token', async (req, res) => {
    const user = await database.collection<User>('users').findOne({ token: req.params.token });
    if (!user)
        res.send(false);
    else {
        await database.collection<User>('users').updateOne({ token: req.params.token }, { $set: { validated: true } });
        res.send(true);
    }
});

export default router;