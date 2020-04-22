module.exports = {
	env: {
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'simple-import-sort'],
	root: true,
	rules: {
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/naming-convention': 'error',
		'@typescript-eslint/member-ordering': 'error',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'import/first': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',
		'simple-import-sort/sort': [
			'error',
			{
				groups: [
					// Side effect imports
					['^\\u0000'],
					// React imports
					['^react$', '^react-dom$'],
					// Packages
					// Imports starting with aletter, digit, underscore, or an @ followed by a letter
					['^@?\\w'],
					// Absolute imports and other imports
					// Imports not starting with a dot
					['^[^.]'],
					// Relative parent imports
					['^\\.\\.'],
					// Relative sibling imports
					['^\\.'],
				],
			},
		],
	},
};
