module.exports = {
	name: 'k',
	description: 'k',
	execute(message, args) {
		const dice = parseInt(args[0]);

		if (isNaN(dice) || dice < 1 || dice > 100) {
			return message.reply('Pogięło?');
		}

		const getRndInteger = (min, max) => Math.floor(Math.random() * (max - min)) + min;
		message.channel.send(getRndInteger(1, dice));
	},
};