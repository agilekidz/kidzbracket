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
		@Ctx() { user }: Context,
	): Promise<CreateTournamentPayload> {
		if (!user) {
			throw new Error('You must be logged in to do that');
		}

		if (!(playersPerTeam > 0)) {
			throw new Error('A team cannot have fewer than one player each');
		}

		const tournamentRepository = getRepository(DBTournament);

		let tournament = tournamentRepository.create({
			name,
			description,
			game,
			maxTeams,
			playersPerTeam,
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
