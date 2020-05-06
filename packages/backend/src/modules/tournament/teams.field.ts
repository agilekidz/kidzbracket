import { FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBTournament from '../../entities/tournament';

import GQLTournament from './tournament';

@Resolver(() => GQLTournament)
export default class TeamsResolver implements ResolverInterface<GQLTournament> {
	@FieldResolver()
	async teams(@Root() { id }: GQLTournament) {
		const tournamentRepository = getRepository(DBTournament);
		const tournament = await tournamentRepository.findOne({
			where: { id },
			relations: ['teams'],
		});

		if (!tournament?.teams) {
			throw new Error('No tournament with that id');
		}

		return tournament.teams;
	}
}
