import { Arg, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBTournament from '../../entities/tournament';

import GQLTournament from './tournament';

@Resolver()
export default class TournamentsQueryResolver {
	@Query(() => [GQLTournament])
	async tournaments(@Arg('sort', { nullable: true }) sort?: boolean): Promise<GQLTournament[]> {
		const tournamentRepository = getRepository(DBTournament);
		if (sort) {
			return tournamentRepository.find();
		}

		return tournamentRepository.find();
	}
}
