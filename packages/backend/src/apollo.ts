import { ApolloServer, PubSub } from 'apollo-server-express';
import path from 'path';
import { buildSchema } from 'type-graphql';
import { getRepository, Repository } from 'typeorm';

import Match from './entities/match';
import Team from './entities/team';
import Tournament from './entities/tournament';
import User from './entities/user';

export interface Context {
	request: Express.Request;
	response: Express.Response;
	user?: User;
	repositories: {
		matchRepository: Repository<Match>;
		teamRepository: Repository<Team>;
		tournamentRepository: Repository<Tournament>;
		userRepository: Repository<User>;
	};
}

async function createApolloServer() {
	const pubsub = new PubSub();
	const schema = await buildSchema({
		resolvers: [__dirname + '/modules/**/*.{mutation,query,field,subscription}.{js,ts}'],
		emitSchemaFile: path.resolve(__dirname, '__generated__/schema.gql'),
		pubSub: pubsub,
	});

	return new ApolloServer({
		schema,
		context: async ({ req, res }): Promise<Context> => {
			const userRepository = getRepository(User);

			let user: User | undefined;
			try {
				user = await userRepository.findOne({ where: { id: req.session?.auth.userId } });
			} catch (e) {
				// User isn't logged in
			}

			return {
				request: req,
				response: res,
				user,
				repositories: {
					matchRepository: getRepository(Match),
					teamRepository: getRepository(Team),
					tournamentRepository: getRepository(Tournament),
					userRepository,
				},
			};
		},
	});
}

export default createApolloServer;
