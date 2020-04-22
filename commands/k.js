const { getRndInteger } = require('../helpers.js');

module.exports = {
	name: 'k',
	description: 'k',
	execute(message, args) {
		console.log(`args: ${args}`);

		const dice = parseInt(args[0]);

		if (isNaN(dice) || dice < 1 || dice > 100) {
			return message.reply('Pogięło?');
		}

		message.channel.send(getRndInteger(1, dice));
	},
};