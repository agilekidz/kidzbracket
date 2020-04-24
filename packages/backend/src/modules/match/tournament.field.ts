import { FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBMatch from '../../entities/match';

import GQLMatch from './match';

@Resolver(() => GQLMatch)
export default class TournamentResolver implements ResolverInterface<GQLMatch> {
	@FieldResolver()
	async tournament(@Root() { id }: GQLMatch) {
		const matchRepository = getRepository(DBMatch);
		const match = await matchRepository.findOne({ where: { id }, relations: ['tournament'] });
		if (!match?.tournament) {
			throw new Error('The match does not exist');
		}
		return match.tournament;
	}
}
