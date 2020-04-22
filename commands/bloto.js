module.exports = {
	name: 'błoto',
	description: 'błoto',
	execute(message, args) {
		if(args[0] === '?') {
			message.channel.send('O, znak zapytania, ale super!');
		}
		if(Math.random() > 0.5) {
			message.channel.send('Ryj!');
		}
		else {
			message.channel.send('Gnij!');
		}
	},
};