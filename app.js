const Discord = require('discord.js');
const express = require('express');
const client = new Discord.Client();
const config = require('./config/config.js');
const token = config.token;
const clientId = config.clientId;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    });

client.login(token);
