module.exports = {
	hooks: {
		'pre-commit': 'yarn pre-commit',
		'post-checkout': 'yarnhook',
		'post-merge': 'yarnhook',
		'post-rewrite': 'yarnhook',
	},
};
