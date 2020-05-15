import { Ctx, FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';

import { Context } from '../../apollo';

import GQLMatch from './match';

@Resolver(() => GQLMatch)
export default class SecondParentResolver implements ResolverInterface<GQLMatch> {
	@FieldResolver()
	async secondParent(@Root() { id }: GQLMatch, @Ctx() { repositories }: Context) {
		const match = await repositories.matchRepository.findOne({
			where: { id },
			relations: ['secondParent'],
		});
		return match?.secondParent;
	}
}
