import { Ctx, FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';

import { Context } from '../../apollo';

import GQLMatch from './match';

@Resolver(() => GQLMatch)
export default class WinnerResolver implements ResolverInterface<GQLMatch> {
	@FieldResolver()
	async winner(@Root() { id }: GQLMatch, @Ctx() { repositories }: Context) {
		const match = await repositories.matchRepository.findOne({
			where: { id },
			relations: ['winner'],
		});

		if (!match) {
			return null;
		}

		return match.winner;
	}
}
