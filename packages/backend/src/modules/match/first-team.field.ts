import { Ctx, FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';

import { Context } from '../../apollo';

import GQLMatch from './match';

@Resolver(() => GQLMatch)
export default class FirstTeamResolver implements ResolverInterface<GQLMatch> {
	@FieldResolver()
	async firstTeam(@Root() { id }: GQLMatch, @Ctx() { repositories }: Context) {
		const match = await repositories.matchRepository.findOne({
			where: { id },
			relations: ['firstTeam'],
		});

		if (!match) {
			return null;
		}

		return match.firstTeam;
	}
}
