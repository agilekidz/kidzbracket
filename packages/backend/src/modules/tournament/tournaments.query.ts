import { Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBTournament from '../../entities/tournament';

import GQLTournament from './tournament';

@Resolver()
export default class TournamentsQueryResolver {
	@Query(() => [GQLTournament])
	async tournaments(): Promise<GQLTournament[]> {
		const tournamentRepository = getRepository(DBTournament);
		return tournamentRepository.find();
	}
}
