// C'est le fichier server.js qui va nous permettre de faire fonctionner le bot
// On importe les modules nécessaires
const { Client, GatewayIntentBits, Webhook } = require('discord.js');
// On ajoute le ficher config.json qui contient les informations de connexion du bit (ID & Token)
const { clientId, guildId, token} = require('./config.json');
// On crée un objet client qui va nous permettre de faire fonctionner le bot
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// On crée un tableau qui contiendra tous les salons du serveur
const channels = [];

// On crée un tableau qui contiendra tous les utilisateurs du serveur
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
			// On ajoute l'utilisateur au tableau users
			users.push(user);	
		});
		
	});
	// Si le channel general existe on recupere son ID
	if (client.channels.cache.find(channel => channel.name === 'general')) {
		const generalChannel = client.channels.cache.find(channel => channel.name === 'general');
		console.log("Le channel general existe en possède l'id", generalChannel.id);
	} else {
		console.log("Le channel general n'existe pas");
	};
	// Si le channel general est présent on envoie un message dedans
	if (client.channels.cache.find(channel => channel.name === 'general')) {
		// On envoie un message dans le channel général contenant les utilisateurs du serveur
		client.channels.cache.get('1020004657285845054').send(`Liste des utilisateurs du serveur : ${users}`);
		// On console log le message
		console.log('Message envoyé !');
	}
});

// Add event listener for messages
client.on('message', message => {
	// If the message is "ping"
	if (message.content === 'ping') {
		// Send "pong" to the same channel
		message.channel.send('pong');
	}
});

// On connecte le bot
client.login(token);

// La fonction ping pong ne fonctionne pas
// A faire :
// On veut récupérer tous les salons texte du serveur et les stocker dans un tableau
// On veut utiliser ce tableau pour faire une liste numéroté des salons
// On veut écrire dans un salon texte en fonction du numéro de la liste

// Ou on veut écrire dans le salon où un utilisateur a écrit un message

