import { FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBTournament from '../../entities/tournament';

import GQLTournament from './tournament';

@Resolver(() => GQLTournament)
export default class MatchesResolver implements ResolverInterface<GQLTournament> {
	@FieldResolver()
	async matches(@Root() { id }: GQLTournament) {
		const tournamentRepository = getRepository(DBTournament);
		const tournament = await tournamentRepository.findOne({
			where: { id },
			relations: ['matches'],
		});

		if (!tournament?.matches) {
			throw new Error('No tournament with that id');
		}

		return tournament.matches;
	}
}
