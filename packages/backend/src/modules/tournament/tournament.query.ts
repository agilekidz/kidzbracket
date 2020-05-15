import { Arg, Ctx, ID, Query, Resolver } from 'type-graphql';

import { Context } from '../../apollo';

import GQLTournament from './tournament';

@Resolver()
export default class TournamentQueryResolver {
	@Query(() => GQLTournament)
	async tournament(
		@Arg('id', () => ID, { description: 'Identifier of the tournament' }) id: string,
		@Ctx() { repositories }: Context,
	): Promise<GQLTournament> {
		const tournament = await repositories.tournamentRepository.findOne({ where: { id } });
		if (!tournament) {
			throw new Error('Tournament does not exist');
		}

		return tournament;
	}
}
