const { Client, GatewayIntentBits, Webhook } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

function getChannels() {
    // We list all the servers the bot is connected to
    console.log("Servers:");
    client.guilds.cache.forEach((guild) => {
        console.log(" - " + guild.name);
        // We list all the channels
        guild.channels.cache.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`);
        });
    });
}

function getUsers() {
    // We get all the users with intents
    client.users.cache.forEach((user) => {
        console.log(` -- ${user.tag}`);
    }
    );
 
}

// We export the modules
module.exports = { getChannels, getUsers };






