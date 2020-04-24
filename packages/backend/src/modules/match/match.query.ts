import { Arg, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBMatch from '../../entities/match';

import GQLMatch from './match';

@Resolver()
export default class MatchQueryResolver {
	@Query(() => GQLMatch)
	async match(
		@Arg('id', { description: 'Identifier of the match' }) id: string,
	): Promise<GQLMatch> {
		const matchRepository = getRepository(DBMatch);
		const match = await matchRepository.findOne({ where: { id } });
		if (match == undefined) {
			throw new Error('Match does not exist');
		}

		return match;
	}
}
