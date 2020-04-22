import axios from 'axios';
import { stringify } from 'query-string';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import { Context } from '../../apollo';
import DBUser from '../../entities/user';

@InputType()
class LoginGitHubInput {
	@Field()
	code: string;
}

@ObjectType()
class LoginGitHubPayload {
	@Field()
	success: boolean;
}

@Resolver()
export default class LoginGitHubMutationResolver {
	@Mutation(() => LoginGitHubPayload)
	async loginGitHub(
		@Ctx() context: Context,
		@Arg('input') { code }: LoginGitHubInput,
	): Promise<LoginGitHubPayload> {
		if (context.user) {
			throw new Error('You are already logged in');
		}

		const clientId = String(process.env.GITHUB_OAUTH2_CLIENT_ID);
		const clientSecret = String(process.env.GITHUB_OAUTH2_CLIENT_SECRET);

		/* eslint-disable @typescript-eslint/camelcase */
		const query = stringify({
			code,
			client_id: clientId,
			client_secret: clientSecret,
		});
		/* eslint-enable @typescript-eslint/camelcase */
		let result = await axios.get(`https://github.com/login/oauth/access_token?${query}`, {
			headers: {
				Accept: 'application/json',
			},
		});
		const accessToken: string = result.data['access_token'];

		result = await axios.get('https://api.github.com/user', {
			headers: {
				Authorization: `Token ${accessToken}`,
			},
		});

		const githubId = result.data['id'];
		const userName = result.data['name'];

		const userRepository = getRepository(DBUser);
		let user = await userRepository.findOne({
			where: {
				githubId,
			},
		});

		if (!user) {
			user = userRepository.create({
				githubId,
				name: userName,
			});

			user = await userRepository.save(user);
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
