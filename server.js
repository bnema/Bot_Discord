// C'est le fichier server.js qui va nous permettre de faire fonctionner le bot
// On importe les modules nécessaires
const { Client, GatewayIntentBits, Webhook } = require('discord.js');
// On ajoute le ficher config.json qui contient les informations de connexion du bit (ID & Token)
const { clientId, guildId, token} = require('./config.json');
// On crée un objet client qui va nous permettre de faire fonctionner le bot
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// chanels.cache.map(channel => channel.name) permet de récupérer tous les salons du serveur

// On crée un tableau qui contiendra tous les salons du serveur
const channels = [];

// On crée un événement qui va nous permettre de savoir quand le bot est prêt
client.once('ready', () => {
	console.log('Ready!');
	// We list all the servers the bot is connected to
	console.log("Servers:");
	client.guilds.cache.forEach((guild) => {
		console.log(" - " + guild.name);
		// We list all the channels
		guild.channels.cache.forEach((channel) => {
			console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`);
		});
	});
	// Si le channel general est présent on affiche son id
	if (client.channels.cache.get('1020004657285845054')) {
		console.log('Le salon general est présent');
		// Et on envoi un message dedans
		client.channels.cache.get('1020004657285845054').send('Hello world!');
	}

});

// On connecte le bot
client.login(token);
