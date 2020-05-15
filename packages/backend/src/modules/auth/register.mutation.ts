import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';

import { Context } from '../../apollo';

@InputType()
class RegisterInput {
	@Field()
	name: string;

	@Field()
	email: string;

	@Field()
	password: string;
}

@ObjectType()
class RegisterPayload {
	@Field()
	success: boolean;
}

@Resolver()
export default class RegisterMutationResolver {
	@Mutation(() => RegisterPayload)
	async register(
		@Arg('input') { name, email, password }: RegisterInput,
		@Ctx() { user: loggedInUser, repositories, request }: Context,
	): Promise<RegisterPayload> {
		if (loggedInUser) {
			throw new Error('You are already logged in');
		}

		let user = await repositories.userRepository.findOne(undefined, {
			where: { email },
		});

		if (user) {
			throw new Error('A user with that email already exists');
		}

		user = repositories.userRepository.create({
			name,
			email,
			password,
		});

		user = await repositories.userRepository.save(user);

		if (request.session) {
			request.session.auth = {
				userId: user.id,
			};
		}

		return {
			success: true,
		};
	}
}
