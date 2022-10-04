// We load the module fs
const fs = require('fs');
// Discord server connection
const Discord = require('discord.js');
const { poll } = require('discord.js-poll');
const { Client, GatewayIntentBits, Webhook, } = require('discord.js');
// On charge le module de configuration
const { clientId, guildId, token} = require('./private/config.js');
// We create a new client who will connect to Discord and listen to events and fetchAllMembers
const client = new Client({ intents: 
    [GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    fetchAllMembers: true
    });

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
// On indique nos fichiers json channels et users
// const users = JSON.parse('data/users.json');
const PREFIX = '!';
let allChannels = [];
let allUsers = [];
// Express part
const express = require('express');
const { get } = require('http');
const app = express();
const port = 8080;
 
// Test zone
const botId = '1026891333857710421';
// Fonctions bot

function getChannel() {
        // We get the channel ID of the server named "test"
}

client.on('ready', () => {
    // Get all channels from the servers
    client.guilds.cache.forEach((guild) => {
        guild.channels.cache.forEach((channel) => {
            allChannels.push({
                "id": allChannels.length,
                "channelName": channel.name,
                "channelType": channel.type,
                "channelId": channel.id
            });
        // We write the array in a json file
            fs.writeFile('data/channels.json', JSON.stringify(allChannels, null, '\t'), (err) => {
            if (err) throw err;
            });
        });
    });
    // Get all users from the servers
    client.guilds.cache.forEach((guild) => {
        guild.members.cache.forEach((member) => {
            allUsers.push({
                "id": allUsers.length,
                "userName": member.user.username,
                "userTag": member.user.tag,
                "userId": member.user.id
            });
        // We write the array in a json file
            fs.writeFile('data/users.json', JSON.stringify(allUsers, null, '\t'), (err) => {
            if (err) throw err;
            });
        });
    });
    // Set activty "Entrain d'enculer des mouches"
    client.user.setActivity('Entrain d\'enculer des mères', { type: 'PLAYING' });
    console.log(`Logged in as ${client.user.tag}!`);
    // Console log displayed activity
    console.log(client.user.presence.activities[0]);
});
// const channelTest = JSON.parse(fs.readFileSync('data/channels.json')).find(channel => channel.channelName === 'test').channelId;
// const channelInsultes = JSON.parse(fs.readFileSync('data/channels.json')).find(channel => channel.channelName === 'insultes').channelId;


// When someone send a message in the channel named "test" the bot will answer "Hello"
client.on('messageCreate', message => {
    // We get the channel ID of the server named "test" without json
    const channelTest = client.channels.cache.find(channel => channel.name === 'test').id;
    // If the message is sent in the channel named "test" and the message is "Hello"
    if (message.channel.id === channelTest && message.content === 'Hello') {
        // The bot will answer "Hello"
        message.channel.send('Hello');
        console.log([message.author.username] + ' a dit "Hello"');
    }
});


// Watch for new messages in channelTest but not from the bot
client.on('messageCreate', message => {
    // Si le message est envoyé dans le channel test et que le message n'est pas envoyé par le bot
    if (message.channel.id === channelTest && message.author.id !== botId) {
        // We get the user ID of the message author
        const userId = message.author.id;
        // We get the user tag of the message author
        const userTag = message.author.tag;
        // We get the user name of the message author
        const userName = message.author.username;
        // We get the message content
        const messageContent = message.content;
        // We send a message to the channel
        message.channel.send(`Ferme donc un peu ta gueule <@${userId}> !`);
    }
});

function createPoll() {
    const poll = new Poll({
        title: 'Do you like this poll?',
        options: ['Yes', 'No', 'Maybe'],
        maxVotes: 1,
        timeout: 10000
    });
    poll.on('end', (votes) => {
        console.log(votes);
    });
    poll.start();
}

client.login(token);

// Express part
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
