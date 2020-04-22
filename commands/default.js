const { pickLine } = require('../helpers.js');

module.exports = {
	name: 'default',
	description: 'Pierdolimy jakieś kocopoły do Jelenia.',
	execute(message, args) {

		const question_triggers = ['pytanie', 'a', 'co', 'jak', 'dlaczego', 'po', 'kiedy',
			'którędy', 'ktoredy', 'któredy', 'ktorędy', 'dokad', 'dokąd'];

		const last_character = args[args.length - 1].slice(-1);

		if(question_triggers.includes(args[0]) || last_character === '?') {
			message.reply(pickLine([
				'Cięzko powiedzieć...',
				'A czy pytasz dzika czy sra w lesie?',
				'Mam kurwa rogi a nie encyklopedię',
				'Nie wiem',
				'Tobie nie powiem',
				'Wygoogluj sobie',
				'Daj mi chwilkę...',
				'Pytaj Orube...',
			]));
		}
		else {
			message.reply(pickLine([
				'Co est?',
				'Czego?',
				'Słucham?',
				'Uuuu! Uuu uuuu!',
				'Aha?',
				'No nie wieeeem...',
				'Dobra juz dobra',
				'Co znowu?',
				'Dajcie mi święty spokój, jem sianko',
				'Lubie sianko',
				'Sianko?',
				'POMOCY JESTEM TU UWIĘZIONY!',
			]));
		}
	},
};