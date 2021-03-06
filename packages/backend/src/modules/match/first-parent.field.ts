import { Ctx, FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';

import { Context } from '../../apollo';

import GQLMatch from './match';

@Resolver(() => GQLMatch)
export default class FirstParentResolver implements ResolverInterface<GQLMatch> {
	@FieldResolver()
	async firstParent(@Root() { id }: GQLMatch, @Ctx() { repositories }: Context) {
		const match = await repositories.matchRepository.findOne({
			where: { id },
			relations: ['firstParent'],
		});

		if (!match) {
			return null;
		}

		return match.firstParent;
	}
}
