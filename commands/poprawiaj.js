const fs = require('fs');
const { jsonReader } = require('../helpers.js');

module.exports = {
	name: 'poprawiaj',
	aliases: ['koryguj', 'zamieniaj', 'popraw', 'zamień', 'zamien', 'zmien', 'zmień', 'zmieniaj'],
	description: 'Ucz lamusów poprawnej polszczyzny.',
	execute(message, args) {
		console.log(`args: ${args}`);

		const bledne = args[0];
		let poprawne;
		if(args[1] === 'na') {
			// poprawne = args[2];
			poprawne = args.slice(2, args.length).join(' ').split('LUB');
		}
		else {
			// poprawne = args[1];
			poprawne = args.slice(1, args.length).join(' ').split('LUB');
		}

		jsonReader('./dict.json', (err, dict) => {
			if (err) {
				console.log(err);
			}
			// console.log(dict);

			let dictionary = {};

			if(dict) {
				dictionary = dict;
			}

			// dictionary[`${bledne}`] = poprawne;
			dictionary[bledne] = poprawne;

			// console.log(dictionary);

			const jsonString = JSON.stringify(dictionary);

			// console.log(jsonString);

			fs.writeFile('./dict.json', jsonString, err => {
				if (err) {
					console.log('Error writing file', err);
				}
				else {
					console.log('Successfully wrote file');
					message.channel.send(`OK, będę poprawiać ${bledne} na ${poprawne}`);
				}
			});
		});
	},
};