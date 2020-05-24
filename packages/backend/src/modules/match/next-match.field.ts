import { Ctx, FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';

import { Context } from '../../apollo';

import GQLMatch from './match';

@Resolver(() => GQLMatch)
export default class NextMatchFieldResolver implements ResolverInterface<GQLMatch> {
	@FieldResolver()
	async nextMatch(@Root() { id }: GQLMatch, @Ctx() { repositories }: Context) {
		const match = await repositories.matchRepository.findOne(id);
		if (!match) {
			return null;
		}

		const childMatch = await repositories.matchRepository.findOne({
			where: [
				{
					firstParent: match,
				},
				{
					secondParent: match,
				},
			],
		});

		return childMatch || null;
	}
}
