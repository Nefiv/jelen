const { getRndInteger } = require('../helpers.js');

module.exports = {
	name: 'k',
	aliases: ['d'],
	description: 'Rzut kością o podanej po spacji liczbie oczek.',
	execute(message, args) {
		console.log(`args: ${args}`);

		const dice = parseInt(args[0]);

		if (isNaN(dice) || dice < 2 || (dice > 100 && dice != 2137)) {
			return message.reply('Pogięło? Takiej kości nie mam...');
		}

		message.channel.send(getRndInteger(1, dice));
	},
};