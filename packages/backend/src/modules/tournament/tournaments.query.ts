import { Arg, Ctx, Field, InputType, Query, registerEnumType, Resolver } from 'type-graphql';

import { Context } from '../../apollo';

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
		@Ctx() { repositories }: Context,
	): Promise<GQLTournament[]> {
		return repositories.tournamentRepository.find({
			order: orderBy,
		});
	}
}
