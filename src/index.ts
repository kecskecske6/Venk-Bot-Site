import express from 'express';
import bodyParser from 'body-parser';
import { Db, MongoClient } from 'mongodb';
import 'dotenv/config';
import { AddressInfo } from 'net';
import path from 'path';
import router from './routes';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import './strategies/discord';

const app = express();

app.use(bodyParser.json());

const client = new MongoClient(process.env.MONGO == undefined ? '' : process.env.MONGO);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND == undefined ? '' : process.env.FRONTEND);
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
    secret: process.env.EXPRESS_SECRET == undefined ? '' : process.env.EXPRESS_SECRET,
    cookie: {
        maxAge: 60000 * 60 * 24 * 365,
        httpOnly: false
    },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO == undefined ? '' : process.env.MONGO
    })
}));

app.use(passport.initialize());

app.use(passport.session());

app.use(express.static(path.join(__dirname, '../venk-bot-site/dist/venk-bot-site')));

app.use('/api', router);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../Venk-Bot-Site/dist/venk-bot-site/index.html'));
});

const database: Db = new Db(client, process.env.DBNAME == undefined ? '' : process.env.DBNAME);

export default database;