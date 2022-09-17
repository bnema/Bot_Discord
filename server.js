// C'est le fichier server.js qui va nous permettre de faire fonctionner le bot
// On importe les modules nécessaires
const { Client, GatewayIntentBits } = require('discord.js');
// On ajoute le ficher config.json qui contient les informations de connexion du bit (ID & Token)
const { token } = require('./config.json');

// On crée un objet client qui va nous permettre de faire fonctionner le bot
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Quand le serveur est prêt, on affiche un message dans la console
client.once('ready', () => {
	console.log('Ready!');
});


// On crée un évènement qui va nous permettre de faire fonctionner les commandes
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
  // On crée un objet qui contient les commandes
	const { commandName } = interaction;
  // On crée un objet qui contient les réponses
	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});
// On connecte le bot au serveur
client.login(token);