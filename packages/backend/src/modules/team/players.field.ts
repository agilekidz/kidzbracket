import { Ctx, FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';

import { Context } from '../../apollo';

import GQLTeam from './team';

@Resolver(() => GQLTeam)
export default class PlayersResolver implements ResolverInterface<GQLTeam> {
	@FieldResolver()
	async players(@Root() { id }: GQLTeam, @Ctx() { repositories }: Context) {
		const team = await repositories.teamRepository.findOne({
			where: { id },
			relations: ['players'],
		});

		if (!team) {
			throw new Error('No tournament with that id');
		}

		return team.players;
	}
}
