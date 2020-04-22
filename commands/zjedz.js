const { pickLine } = require('../helpers.js');

module.exports = {
	name: 'zjedz',
	aliases: ['jedz', 'zryj', 'żryj', 'pożryj', 'pozryj', 'pozeraj', 'szamaj', 'wszamaj'],
	description: 'Dokarmiamy Jelenia.',
	execute(message, args) {
		message.reply(pickLine([
			`Pyszny ${args[0]}!`,
			'Omnomnomnom!',
			'Mlask, chrup, zuj zuj.',
			'Mmmm, dobre',
			'Fuj, nigdy!',
			'Lepsze niz sianko!',
			'Pachnie jak gowno nosorozca, nie.',
			'Daj cos cieplejszego!',
			'Aaa, za gorące, parzyyyy!',
			'Ble, żylaste...',
			'Fu, za tłuste!',
			'O, takie lubie!',
			'Mmmm, dobrze wypieczone',
		]));
	},
};