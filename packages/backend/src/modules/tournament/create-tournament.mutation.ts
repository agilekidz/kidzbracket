import {
	Arg,
	Ctx,
	Field,
	InputType,
	Mutation,
	ObjectType,
	PubSub,
	PubSubEngine,
	Resolver,
} from 'type-graphql';

import { Context } from '../../apollo';

import GQLTournament from './tournament';

@InputType()
class CreateTournamentInput {
	@Field()
	name: string;

	@Field()
	description: string;

	@Field()
	game: string;

	@Field()
	maxTeams: number;

	@Field()
	playersPerTeam: number;
}

@ObjectType()
class CreateTournamentPayload {
	@Field(() => GQLTournament)
	tournament: GQLTournament;
}

@Resolver()
export default class CreateTournamentMutationResolver {
	@Mutation(() => CreateTournamentPayload)
	async createTournament(
		@Arg('data') { name, description, game, maxTeams, playersPerTeam }: CreateTournamentInput,
		@Ctx() { user, repositories }: Context,
		@PubSub() pubsub: PubSubEngine,
	): Promise<CreateTournamentPayload> {
		if (!user) {
			throw new Error('You must be logged in to do that');
		}

		if (maxTeams < 2) {
			throw new Error('maxTeams must be at least 2');
		}

		if (maxTeams > 128) {
			throw new Error('maxTeams can be no more than 128');
		}

		if (!(playersPerTeam > 0)) {
			throw new Error('A team cannot have fewer than one player each');
		}

		let tournament = repositories.tournamentRepository.create({
			name,
			description,
			game,
			maxTeams,
			playersPerTeam,
			owner: user,
		});

		tournament = await repositories.tournamentRepository.save(tournament);

		pubsub.publish('TOURNAMENT_CREATED', tournament);

		return {
			tournament: {
				...tournament,
				contestedMatches: [],
			},
		};
	}
}
