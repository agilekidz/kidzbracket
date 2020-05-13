import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import { Context } from '../../apollo';
import DBTournament from '../../entities/tournament';

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
		@Ctx() { user }: Context,
	): Promise<CreateTournamentPayload> {
		if (!user) {
			throw new Error('You must be logged in to do that');
		}

		const tournamentRepository = getRepository(DBTournament);

		let tournament = tournamentRepository.create({
			name,
			description,
			game,
			maxTeams,
			owner: user,
		});

		tournament = await tournamentRepository.save(tournament);

		return {
			tournament: {
				...tournament,
				contestedMatches: [],
			},
		};
	}
}
