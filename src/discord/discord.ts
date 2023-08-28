import 'dotenv/config';
import fetch from 'node-fetch';

const baseUrl = 'https://discord.com/api/v10';

export async function getGuilds(): Promise<unknown> {
    const response = await fetch(`${baseUrl}/users/@me/guilds`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`
        }
    });
    return response.json();
}

export async function getGuildChannels(id: string): Promise<unknown> {
    const response = await fetch(`${baseUrl}/guilds/${id}/channels`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`
        }
    });
    return response.json();
}