import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import { Context } from '../../apollo';
import DBUser from '../../entities/user';

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
		@Ctx() context: Context,
		@Arg('input') { name, email, password }: RegisterInput,
	): Promise<RegisterPayload> {
		if (context.user) {
			throw new Error('You are already logged in');
		}

		const userRepository = getRepository(DBUser);
		let user = await userRepository.findOne(undefined, {
			where: { email },
		});

		if (user) {
			throw new Error('A user with that email already exists');
		}

		user = userRepository.create({
			name,
			email,
			password,
		});

		user = await userRepository.save(user);

		if (context.request.session) {
			context.request.session.auth = {
				userId: user.id,
			};
		}

		return {
			success: true,
		};
	}
}
