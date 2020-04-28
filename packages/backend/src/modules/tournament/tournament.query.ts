import { Arg, ID, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBTournament from '../../entities/tournament';

import GQLTournament from './tournament';

@Resolver()
export default class TournamentQueryResolver {
	@Query(() => GQLTournament)
	async tournament(
		@Arg('id', () => ID, { description: 'Identifier of the tournament' }) id: string,
	): Promise<GQLTournament> {
		const tournamentRepository = getRepository(DBTournament);
		const tournament = await tournamentRepository.findOne({ where: { id } });
		if (!tournament) {
			throw new Error('Tournament does not exist');
		}

		return tournament;
	}
}
