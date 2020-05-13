import { FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBTournament from '../../entities/tournament';

import GQLTournament from './tournament';

@Resolver(() => GQLTournament)
export default class OwnerResolver implements ResolverInterface<GQLTournament> {
	@FieldResolver()
	async owner(@Root() { id }: GQLTournament) {
		const tournamentRepository = getRepository(DBTournament);
		const tournament = await tournamentRepository.findOne({
			where: { id },
			relations: ['owner'],
		});

		if (!tournament?.owner) {
			throw new Error('No tournament with that owner');
		}

		return tournament.owner;
	}
}
