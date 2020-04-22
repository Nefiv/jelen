module.exports.getRndInteger = (min, max) => Math.floor(Math.random() * (max - min)) + min;

module.exports.pickLine = (args) => {
	return args[module.exports.getRndInteger (0, args.length)];
};