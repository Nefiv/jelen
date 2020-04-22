const fs = require('fs');
const Discord = require('discord.js');
const { token, prefix, default_cooldown } = require('./config.json');

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

const getRndInteger = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const pickLine = (args) => {
	return args[getRndInteger(0, args.length)];
};

client.on('message', message => {
	console.log(message.content);

	const lowerCaseMessage = message.content.toLowerCase();

	if(lowerCaseMessage.startsWith('jeleniu masz') || lowerCaseMessage.startsWith('jeleniu, masz')) {
		message.reply(pickLine([
			'chyba ty',
			'jeżem się podcieraj...',
			'wąchaj skarpety',
			'sram na Twoją polanę',
			'to sama prawda ;(',
			'sklej pizde',
			'sklej pizde lapsie pierdolony',
			'sklej pizde lapsie pierdolony Twoja stara to chuj',
			'sklej pizde lapsie pierdolony Twoja stara to chuj, nie umiesz jeść bananów a Mikołaj nie istnieje']));
	}
	else if(lowerCaseMessage.startsWith('jeleniu') || lowerCaseMessage.startsWith('jeleniu,')) {
		message.reply(pickLine([
			'Co est?',
			'Czego?',
			'Słucham?',
			'Uuuu! Uuu uuuu!',
			'Aha?',
			'No nie wieeeem...',
			'Dobra juz dobra',
			'Co znowu?',
			'Dajcie mi święty spokój, jem sianko',
			'Lubie sianko',
			'Sianko?',
			'POMOCY JESTEM TU UWIĘZIONY!',
		]));
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);

	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('Nie w wiadomości prywatnej!');
	}

	if (command.args && !args.length) {
		let reply = message.channel.send(`Zabrakło argumentów, ${message.author}!`);
		if (command.usage) {
			reply += `\nPoprawne uzycie: \`${prefix}${command.name} ${command.usage}\``;
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
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('Sory Ryju, podczas wykonywania komendy nastąpiło zesranie się!');
	}
});

client.login(token);