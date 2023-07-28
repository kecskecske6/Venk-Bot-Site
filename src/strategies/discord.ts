import passport from "passport";
import database from "..";
import DiscordStrategy from 'passport-discord';
import { User } from "../interfaces";
import 'dotenv/config';

passport.serializeUser((user: any, done) => {
    done(null, user.userId);
});

passport.deserializeUser(async (userId: string, done) => {
    try {
        const user = await database.collection<User>('web-site-users').findOne({ userId });
        return user ? done(null, user) : done(null, null);
    } catch (err) {
        console.log(err);
        done(err, null);
    }
});

passport.use(new DiscordStrategy({
    clientID: process.env.ID == undefined ? '' : process.env.ID,
    clientSecret: process.env.SECRET == undefined ? '' : process.env.SECRET,
    callbackURL: '/api/auth/discord/redirect',
    scope: ['identify', 'guilds']
}, async (accessToken, refreshToken, profile, done) => {
    const { id, username, discriminator, avatar, guilds } = profile;
    let user = await database.collection<User>('web-site-users').findOne({ userId: id });
    if (!user) await database.collection<User>('web-site-users').insertOne({ avatar, guilds: guilds == undefined ? guilds : guilds?.filter(g => (g.permissions & 0x20) == 0x20), username: discriminator == '0' ? username : `${username}#${discriminator}`, userId: id });
    else await database.collection<User>('web-site-users').updateOne({ userId: id }, { $set: { avatar, guilds: guilds == undefined ? guilds : guilds?.filter(g => (g.permissions & 0x20) == 0x20), username: discriminator == '0' ? username : `${username}#${discriminator}` } });
    user = await database.collection<User>('web-site-users').findOne({ userId: id });
    return done(null, user ?? undefined);
}));