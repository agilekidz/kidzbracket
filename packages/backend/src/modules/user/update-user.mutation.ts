import { Arg, Ctx, Field, ID, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';

import { Context } from '../../apollo';

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
		@Ctx() { repositories }: Context,
	): Promise<UpdateUserPayload> {
		let user = await repositories.userRepository.findOne(id);

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

		user = await repositories.userRepository.save(user);

		return {
			user,
		};
	}
}
