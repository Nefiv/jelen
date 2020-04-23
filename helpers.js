module.exports.getRndInteger = (min, max) => Math.floor(Math.random() * (max - min)) + min;

module.exports.pickLine = (args) => {
	if(typeof args === 'string') {
		return args;
	}
	return args[module.exports.getRndInteger (0, args.length)];
};

const fs = require('fs');

module.exports.jsonReader = (filePath, cb) => {
	fs.readFile(filePath, (err, fileData) => {
		if (err) {
			return cb && cb(err);
		}
		try {
			const object = JSON.parse(fileData);
			return cb && cb(null, object);
		}
		catch(err) {
			return cb && cb(err);
		}
	});
};

module.exports.fixSpelling = (message) => {
	this.jsonReader('./dict.json', (err, dict) => {
		if (err) {
			console.log(err);
			return;
		}

		// console.log(dict);

		for (const [key, value] of Object.entries(dict)) {
			// console.log(key, value);
			if(message.content.indexOf(key) > -1) {
				console.log(`Found usage of ${key} in message: ${message.content}`);
				message.reply(this.pickLine(value));
			}
		}
	});
};