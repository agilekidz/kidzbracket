import bcrypt from 'bcrypt';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';

import { Context } from '../../apollo';

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
		@Arg('input') { email, password }: LoginPasswordInput,
		@Ctx() { user: loggedInUser, repositories, request }: Context,
	): Promise<LoginPasswordPayload> {
		if (loggedInUser) {
			throw new Error('You are already logged in');
		}

		const user = await repositories.userRepository.findOne(undefined, {
			where: { email },
		});

		if (!user) {
			throw new Error('A user with that email was not found');
		}

		if (!user.password) {
			throw new Error('This user does not use password login');
		}

		if (!(await bcrypt.compare(password, user.password))) {
			throw new Error('Incorrect password');
		}

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
