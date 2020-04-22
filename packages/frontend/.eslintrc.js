const baseConfig = require('../../.eslintrc');

module.exports = {
	...baseConfig,
	extends: [...baseConfig.extends, 'plugin:react/recommended'],
	parserOptions: {
		...baseConfig.parserOptions,
		ecmaFeatures: {
			...(baseConfig.parserOptions || {}).ecmaFeatures,
			jsx: true,
		},
	},
	plugins: [...baseConfig.plugins, 'react-hooks'],
	rules: {
		...baseConfig.rules,
		'react/prop-types': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
	},
	settings: {
		...baseConfig.settings,
		react: {
			...(baseConfig.react || {}),
			version: '16.12',
		},
	},
};
