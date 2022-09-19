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
const users = [];

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
		// on liste tous les utilisateurs du serveur
		client.users.cache.forEach((user) => {
			console.log(` -- ${user.username} - ${user.id}`);
		});
		
	});
	// Si le channel general est présent on envoie un message
	if (client.channels.cache.get('1020004657285845054')) {
		client.channels.cache.get('1020004657285845054').send('Salut à tous !');
		// On console log le message
		console.log('Message envoyé !');
	}
});

// On crée une fonction ping pong
function pingPong(message) {
	// Si le message est égal à ping
	if (message.content === 'ping') {
		// On envoie pong
		message.channel.send('pong');
	}
}

// On connecte le bot
client.login(token);

// La fonction ping pong ne fonctionne pas
// A faire :
// On veut récupérer tous les salons texte du serveur et les stocker dans un tableau
// On veut utiliser ce tableau pour faire une liste numéroté des salons
// On veut écrire dans un salon texte en fonction du numéro de la liste

// Ou on veut écrire dans le salon où un utilisateur a écrit un message

