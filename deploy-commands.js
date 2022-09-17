// On importe les modules nécessaires
const { SlashCommandBuilder, Routes } = require('discord.js');
// Le module Rest permet de faire des requêtes HTTP
const { REST } = require('@discordjs/rest');
// On ajoute le ficher config.json qui contient les informations de connexion du bit (ID & Token)
const { clientId, guildId, token} = require('./config.json');


// On crée un objet qui contient les commandes
const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
// On envoi l'objet des commandes au serveur en le transformant en JSON
	.map(command => command.toJSON());

// On crée un objet REST qui va nous permettre de faire des requêtes HTTP
const rest = new REST({ version: '10' }).setToken(token);

// On envoi les commandes au serveur en utilisant l'objet REST.put qui permet de faire des requêtes HTTP et
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);
