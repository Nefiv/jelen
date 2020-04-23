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
			console.log(dict);

			if(!dict) {
				return;
			}

			console.log('Dictionary before deletion:', dict);
			console.log(dict);

			delete dict[toRemove];

			console.log('Dictionary after deletion:');
			console.log(dict);

			const jsonString = JSON.stringify(dict);

			console.log(jsonString);

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