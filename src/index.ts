import express from 'express';
import bodyParser from 'body-parser';
import { Db, MongoClient } from 'mongodb';
import 'dotenv/config';
import { AddressInfo } from 'net';
import path from 'path';
import router from './routes';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const app = express();

app.use(bodyParser.json());

const client = new MongoClient(process.env.MONGO as string);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND as string);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

client.connect();

const server = app.listen(process.env.PORT, () => {
    const port = (server.address() as AddressInfo).port;
    console.log(`The app is running on port ${port}`);
});

app.set('trust proxy', 1);

app.use(session({
    secret: process.env.EXPRESS_SECRET as string,
    cookie: {
        maxAge: 60000 * 60 * 24 * 365,
        httpOnly: false
    },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO as string
    })
}));

app.use(express.static(path.join(__dirname, '../Venk-Bot-Site/dist/venk-bot-site')));

app.use('/api', router);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../Venk-Bot-Site/dist/venk-bot-site/index.html'));
});

const database: Db = new Db(client, process.env.DBNAME as string);

const supabase = createClient<Database>(process.env.SUPABASE_URL as string, process.env.SUPABASE_KEY as string);

declare module 'express-session' {
    export interface SessionData {
        user: { [key: string]: any };
    }
}

export default supabase;