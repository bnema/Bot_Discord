// C'est le fichier server.js qui va nous permettre de faire fonctionner le bot
// On importe les modules nécessaires
const { Client, GatewayIntentBits, Webhook } = require('discord.js');
// On ajoute le ficher config.json qui contient les informations de connexion du bit (ID & Token)
const { clientId, guildId, token} = require('./config.json');
// On crée un objet client qui va nous permettre de faire fonctionner le bot
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// On crée un événement qui va nous permettre de savoir quand le bot est prêt
client.once('ready', () => {
	console.log('Ready!');
});

// On crée un événement qui va nous permettre de savoir quand le bot reçoit un message
client.on('messageCreate', async message => {
	// On vérifie que le message n'est pas envoyé par le bot
	if (message.author.bot) return;
	// On vérifie que le message est envoyé dans le bon salon
	if (message.channelId !== '1020004657285845054') return;
	// Transforme le channelID en nom
	const channel = client.channels.cache.get('1020004657285845054');
	console.log(channel.name);
	// On vérifie que le message commence par le préfixe
	if (!message.content.startsWith('!')) return;
	// On récupère la commande et les arguments
	const args = message.content.slice(1).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	// On vérifie que la commande est bien la commande "ping"
	if (command !== 'ping') return;
	// On envoie un message dans le salon
	message.channel.send('Pong.');
});

// On connecte le bot
client.login(token);