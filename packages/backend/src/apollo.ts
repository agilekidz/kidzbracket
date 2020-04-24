import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { buildSchema } from 'type-graphql';
import { getRepository } from 'typeorm';

import User from './entities/user';

export interface Context {
	request: Express.Request;
	response: Express.Response;
	user?: User;
}

async function createApolloServer() {
	const schema = await buildSchema({
		resolvers: [__dirname + '/modules/**/*.{mutation,query,field}.{js,ts}'],
		emitSchemaFile: path.resolve(__dirname, '__generated__/schema.gql'),
	});

	return new ApolloServer({
		schema,
		context: async ({ req, res }): Promise<Context> => {
			let user: User | undefined;
			try {
				const userRepository = getRepository(User);
				user = await userRepository.findOne({ where: { id: req.session?.auth.userId } });
			} catch (e) {
				// User isn't logged in
			}

			return {
				request: req,
				response: res,
				user,
			};
		},
	});
}

export default createApolloServer;
