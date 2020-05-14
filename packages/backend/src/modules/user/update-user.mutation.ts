import { Arg, Field, ID, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBUser from '../../entities/user';

import GQLUser from './user';

@InputType()
class UpdateUserInput {
	@Field(() => String, { nullable: true })
	alias?: string | null;

	@Field(() => String, { nullable: true })
	bio?: string | null;

	@Field(() => String)
	name?: string;
}

@ObjectType()
class UpdateUserPayload {
	@Field()
	user: GQLUser;
}

@Resolver()
export default class UpdateUserMutationResolver {
	@Mutation(() => UpdateUserPayload)
	async updateUser(
		@Arg('id', () => ID) id: string,
		@Arg('data') { alias, bio, name }: UpdateUserInput,
	): Promise<UpdateUserPayload> {
		const userRepository = getRepository(DBUser);
		let user = await userRepository.findOne(id);

		if (!user) {
			throw new Error('a user with that id does not exist');
		}

		if (alias !== undefined) {
			user.alias = alias;
		}

		if (bio !== undefined) {
			user.bio = bio;
		}

		if (name !== undefined) {
			user.name = name;
		}

		user = await userRepository.save(user);

		return {
			user,
		};
	}
}
