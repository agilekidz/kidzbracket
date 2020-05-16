import axios from 'axios';
import { stringify } from 'query-string';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';

import { Context } from '../../apollo';

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
		@Arg('input') { code }: LoginGitHubInput,
		@Ctx() { user: loggedInUser, repositories, request }: Context,
	): Promise<LoginGitHubPayload> {
		if (loggedInUser) {
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

		let user = await repositories.userRepository.findOne({
			where: {
				githubId,
			},
		});

		if (!user) {
			user = repositories.userRepository.create({
				githubId,
				name: userName,
			});

			user = await repositories.userRepository.save(user);
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
