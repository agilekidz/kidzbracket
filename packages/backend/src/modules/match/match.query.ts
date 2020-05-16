import { Arg, Ctx, ID, Query, Resolver } from 'type-graphql';

import { Context } from '../../apollo';

import GQLMatch from './match';

@Resolver()
export default class MatchQueryResolver {
	@Query(() => GQLMatch)
	async match(
		@Arg('id', () => ID, { description: 'Identifier of the match' }) id: string,
		@Ctx() { repositories }: Context,
	): Promise<GQLMatch> {
		const match = await repositories.matchRepository.findOne({ where: { id } });
		if (!match) {
			throw new Error('Match does not exist');
		}

		return match;
	}
}
