module.exports = {
	client: {
		service: {
			name: 'template-project',
			localSchemaFile: './packages/backend/src/__generated__/schema.gql',
			excludes: ['**/__tests__/**/*'],
		},
	},
};
