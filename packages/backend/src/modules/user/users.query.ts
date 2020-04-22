import { Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBUser from '../../entities/user';

import GQLUser from './user';

@Resolver()
export default class UsersQueryResolver {
	@Query(() => [GQLUser])
	async users(): Promise<GQLUser[]> {
		const userRepository = getRepository(DBUser);
		return userRepository.find();
	}
}
