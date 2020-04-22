import bcrypt from 'bcrypt';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import { Context } from '../../apollo';
import DBUser from '../../entities/user';

@InputType()
class LoginPasswordInput {
	@Field()
	email: string;

	@Field()
	password: string;
}

@ObjectType()
class LoginPasswordPayload {
	@Field()
	success: boolean;
}

@Resolver()
export default class LoginPasswordMutationResolver {
	@Mutation(() => LoginPasswordPayload)
	async loginPassword(
		@Ctx() context: Context,
		@Arg('input') { email, password }: LoginPasswordInput,
	): Promise<LoginPasswordPayload> {
		if (context.user) {
			throw new Error('You are already logged in');
		}

		const userRepository = getRepository(DBUser);
		const user = await userRepository.findOne(undefined, {
			where: { email },
		});

		if (!user) {
			throw new Error('A user with that email was not found');
		}

		if (!(await bcrypt.compare(password, user.password))) {
			throw new Error('Incorrect password');
		}

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
