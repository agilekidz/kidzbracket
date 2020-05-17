import { Arg, Ctx, ID, Query, Resolver } from 'type-graphql';

import { Context } from '../../apollo';

import GQLTeam from './team';

@Resolver()
export default class TeamQueryResolver {
	@Query(() => GQLTeam)
	async team(
		@Arg('id', () => ID, { description: 'Identifier of the team' }) id: string,
		@Ctx() { repositories }: Context,
	): Promise<GQLTeam> {
		const team = await repositories.teamRepository.findOne({ where: { id } });
		if (!team) {
			throw new Error('Team does not exist');
		}

		return team;
	}
}
