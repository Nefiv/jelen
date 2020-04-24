const fs = require('fs');
const { jsonReader } = require('../helpers.js');

module.exports = {
	name: 'usun',
	aliases: ['usuń', 'wywal', 'skasuj'],
	description: 'Robimy pranie mózgu Jeleniowi by zapomniał o poprawniu danego słowa.',
	execute(message, args) {
		console.log(`Command args: ${args}`);

		const toRemove = args[0];

		jsonReader('./dict.json', (err, dict) => {
			if (err) {
				console.log('Error reading a file', err);
			}

			if(!dict) {
				return;
			}

			console.log('Dictionary before deletion:\n', dict);

			delete dict[toRemove];

			console.log('Dictionary after deletion:\n', dict);

			const jsonString = JSON.stringify(dict);

			console.log('String to save:\n', jsonString);

			fs.writeFile('./dict.json', jsonString, err => {
				if (err) {
					console.log('Error writing file', err);
				}
				else {
					console.log('Successfully wrote file');
					message.channel.send(`OK, NIE będę poprawiać ${toRemove}`);
				}
			});
		});
	},
};