import { FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBTournament from '../../entities/tournament';

import GQLTournament from './tournament';

@Resolver(() => GQLTournament)
export default class ContestedMatchesResolver implements ResolverInterface<GQLTournament> {
	@FieldResolver()
	async contestedMatches(@Root() { id }: GQLTournament) {
		const tournamentRepository = getRepository(DBTournament);
		const tournament = await tournamentRepository.findOne({
			where: { id },
			relations: ['matches'],
		});

		if (!tournament) {
			throw new Error('No tournament with that id');
		}

		return tournament.matches.filter(match => match.contested && !match.finalized);
	}
}
