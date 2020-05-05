import { Arg, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBTournament from '../../entities/tournament';

import GQLTournament from './tournament';

function dateSort(x: DBTournament, y: DBTournament): number {
	if (x.createdAt > y.createdAt) {
		return 1;
	} else {
		return 0;
	}
}

@Resolver()
export default class TournamentsQueryResolver {
	@Query(() => [GQLTournament])
	async tournaments(@Arg('sort', { nullable: true }) sort?: boolean): Promise<GQLTournament[]> {
		const tournamentRepository = getRepository(DBTournament);
		if (sort) {
			const result = await tournamentRepository.find();
			result.sort(dateSort);
			result.reverse();
			return result;
		}

		return tournamentRepository.find();
	}
}
