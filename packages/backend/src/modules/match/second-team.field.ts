import { FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBMatch from '../../entities/match';

import GQLMatch from './match';

@Resolver(() => GQLMatch)
export default class SecondTeamResolver implements ResolverInterface<GQLMatch> {
	@FieldResolver()
	async secondTeam(@Root() { id }: GQLMatch) {
		const matchRepository = getRepository(DBMatch);
		const match = await matchRepository.findOne({ where: { id }, relations: ['secondTeam'] });
		return match?.secondTeam;
	}
}
