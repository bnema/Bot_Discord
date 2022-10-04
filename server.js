// C'est le fichier server.js qui va nous permettre de faire fonctionner le bot
// On importe les modules nécessaires
const { Client, GatewayIntentBits, Webhook } = require('discord.js');
// On ajoute le ficher config.json qui contient les informations de connexion du bit (ID & Token)
const { clientId, guildId, token} = require('./private/config.json');
// On crée un objet client qui va nous permettre de faire fonctionner le bot
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

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
	// Si le channel general est présent on envoie un message dedans
	if (client.channels.cache.find(channel => channel.name === 'general')) {
		const generalChannel = client.channels.cache.find(channel => channel.name === 'general');
		generalChannel.send('Hello world!');
			// List all users of the channel
			generalChannel.members.forEach((member) => {
				console.log(` -- ${member.user.tag}`);
			}
		);
	};
	// Fonction ping pong
	// If a user in the channel general write "ping" the bot will answer "pong"
		client.on('message', message => {
			console.log(message.content);
			if (message.content === 'ping') {
				message.channel.send('pong');
			}});
});


// On connecte le bot
client.login(token);

// La fonction ping pong ne fonctionne pas
// A faire :
// On veut récupérer tous les salons texte du serveur et les stocker dans un tableau
// On veut utiliser ce tableau pour faire une liste numéroté des salons
// On veut écrire dans un salon texte en fonction du numéro de la liste

// Ou on veut écrire dans le salon où un utilisateur a écrit un message

