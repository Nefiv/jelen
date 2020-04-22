module.exports = {
	name: 'błoto?',
	aliases: ['bloto?'],
	description: 'Zapytanie o podjęcie decyzji.',
	execute(message) {
		if(Math.random() > 0.5) {
			message.channel.send('Ryj!');
		}
		else {
			message.channel.send('Gnij!');
		}
	},
};