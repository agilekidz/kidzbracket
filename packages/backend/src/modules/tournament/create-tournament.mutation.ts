import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';

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
		@Arg('data') { name, description, game, maxTeams }: CreateTournamentInput,
		@Ctx() { user, repositories }: Context,
	): Promise<CreateTournamentPayload> {
		if (!user) {
			throw new Error('You must be logged in to do that');
		}

		let tournament = repositories.tournamentRepository.create({
			name,
			description,
			game,
			maxTeams,
			owner: user,
		});

		tournament = await repositories.tournamentRepository.save(tournament);

		return {
			tournament: {
				...tournament,
				contestedMatches: [],
			},
		};
	}
}
