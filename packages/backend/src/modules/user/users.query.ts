import { Ctx, Query, Resolver } from 'type-graphql';

import { Context } from '../../apollo';

import GQLUser from './user';

@Resolver()
export default class UsersQueryResolver {
	@Query(() => [GQLUser])
	async users(@Ctx() { repositories }: Context): Promise<GQLUser[]> {
		return repositories.userRepository.find();
	}
}
