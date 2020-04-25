import { FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBMatch from '../../entities/match';

import GQLMatch from './match';

@Resolver(() => GQLMatch)
export default class SecondParentResolver implements ResolverInterface<GQLMatch> {
	@FieldResolver()
	async secondParent(@Root() { id }: GQLMatch) {
		const matchRepository = getRepository(DBMatch);
		const match = await matchRepository.findOne({ where: { id }, relations: ['secondParent'] });
		return match?.secondParent;
	}
}
