const fs = require('fs');
const Discord = require('discord.js');
const { token, main_prefix, prefixes, default_cooldown } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log('Ready!');
});

const getUsedPrefix = (message) => {
	let prefix;
	prefixes.forEach(p => {
		if(message.startsWith(p)) prefix = p;
	});
	return prefix;
};

client.on('message', message => {
	console.log(message.content);

	if (message.author.bot) return;

	const used_prefix = getUsedPrefix(message.content.toLowerCase());

	if(!used_prefix) return;

	const messageWithoutPrefix = message.content.slice(used_prefix.length);
	const args = messageWithoutPrefix.split(/ +/);
	console.log(`args: ${args}`);
	const commandName = args[0].toLowerCase();

	let command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) {
		command = client.commands.get('default');
	}
	else {
		args.shift();
	}

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('Nie w wiadomości prywatnej!');
	}

	if (command.args && !args.length) {
		let reply = message.channel.send(`Zabrakło argumentów, ${message.author}!`);
		if (command.usage) {
			reply += `\nPoprawne uzycie: \`${main_prefix}${command.name} ${command.usage}\``;
		}
		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || default_cooldown) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`Czeeej, ładuje mane! Jeszcze ${timeLeft.toFixed(1)}s aby jebnąć komendą \`${command.name}\`.`);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		console.log(`args: ${args}`);
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('Sory Ryju, podczas wykonywania komendy nastąpiło zesranie się!');
	}
});

client.login(token);