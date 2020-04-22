const { pickLine } = require('../helpers.js');

module.exports = {
	name: 'masz',
	aliases: ['ssij', 'spierdalaj', 'śmierdzisz', 'smierdzisz', 'gnij', 'odejdź', 'twoja', 'ty'],
	description: 'Bluzgamy się z Jeleniem.',
	execute(message) {
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
	},
};