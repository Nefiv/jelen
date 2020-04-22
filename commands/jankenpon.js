const { getRndInteger, pickLine } = require('../helpers.js');

module.exports = {
	name: 'gramy?',
	aliases: ['jankenpon', 'papier', 'zagrajmy', 'grasz?', 'zagramy?'],
	description: 'Gramy z Jeleniem w papier-kamień-nozyce.',
	execute(message) {

		setTimeout(() => {
			message.channel.send('Raz!');
		}, 500);

		setTimeout(() => {
			message.channel.send('Dwa!');
		}, 1500);

		setTimeout(() => {
			message.channel.send('Trzy!');
		}, 2500);

		setTimeout(() => {
			const result = getRndInteger(1, 3);

			if(result === 1) {
				message.channel.send(pickLine(['Papier!', 'Papier!', 'Papier!', 'Obijam Ci mordę, gwałcę, zabieram kapselki i idę z sarną na browara.']));
			}
			else if (result === 2) {
				message.channel.send(pickLine(['Kamjeń!', 'Kamień!']));
			}
			else {
				message.channel.send(pickLine(['Rogi!', 'Nozyce!']));
			}
		}, 3000);
	},
};