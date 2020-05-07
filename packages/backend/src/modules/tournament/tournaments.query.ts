import { Arg, Field, InputType, Query, registerEnumType, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBTournament from '../../entities/tournament';

import GQLTournament from './tournament';

enum Direction {
	ASC = 'ASC',
	DESC = 'DESC',
}

registerEnumType(Direction, {
	name: 'Direction',
	description: 'Order to sort by',
});

@InputType()
class TournamentOrderByInput {
	@Field(() => Direction, { nullable: true })
	createdAt?: Direction;
}

@Resolver()
export default class TournamentsQueryResolver {
	@Query(() => [GQLTournament])
	async tournaments(
		@Arg('orderBy', () => TournamentOrderByInput, { nullable: true })
		orderBy: TournamentOrderByInput | undefined,
	): Promise<GQLTournament[]> {
		const tournamentRepository = getRepository(DBTournament);

		return tournamentRepository.find({
			order: orderBy,
		});
	}
}
