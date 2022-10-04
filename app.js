// We load the module fs
const fs = require('fs');
// Discord server connection
const Discord = require('discord.js');
const { Client, GatewayIntentBits, Webhook } = require('discord.js');
// On charge le module de configuration
const { clientId, guildId, token} = require('./private/config.js');
// On charge le module de récupération des informations du serveur
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
// On indique nos fichiers json channels et users
// const users = JSON.parse('data/users.json');

let allChannels = [];

// Express part
const express = require('express');
const { get } = require('http');
const app = express();
const port = 8080;

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
      // Console log guilds and channels saved
     console.log('Guilds and channels saved');
});

client.once('ready', () => {
    // We get the channel ID of the server named "test"
    const channelId = client.channels.cache.find(channel => channel.name === 'insultes').id;  
    console.log(channelId);
    // And we send a message in this channel
    client.channels.cache.get(channelId).send('Surtout Aurélien, la pire des merdes');
});


// We want to store all the text channels in an array


// On crée un événement qui va nous permettre de savoir quand le bot est prêt

client.login(token);

// When the bot is disconnected we purge all the json in data/

// Express part
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
