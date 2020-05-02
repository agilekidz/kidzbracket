import { Arg, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

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
		@Arg('data') { name, description, game }: CreateTournamentInput,
	): Promise<CreateTournamentPayload> {
		const tournamentRepository = getRepository(DBTournament);

		let tournament = tournamentRepository.create({
			name,
			description,
			game,
		});

		tournament = await tournamentRepository.save(tournament);

		return { tournament };
	}
}
