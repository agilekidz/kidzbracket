import { Ctx, Query, Resolver } from 'type-graphql';

import { Context } from '../../apollo';

import GQLTeam from './team';

@Resolver()
export default class TeamsQueryResolver {
	@Query(() => [GQLTeam])
	async teams(@Ctx() { repositories }: Context): Promise<GQLTeam[]> {
		return repositories.teamRepository.find();
	}
}
