import axios from 'axios';
import { stringify } from 'query-string';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';

import { Context } from '../../apollo';

@InputType()
class LoginGoogleInput {
	@Field()
	code: string;
}

@ObjectType()
class LoginGooglePayload {
	@Field()
	success: boolean;
}

@Resolver()
export default class LoginGoogleMutationResolver {
	@Mutation(() => LoginGooglePayload)
	async loginGoogle(
		@Arg('input') { code }: LoginGoogleInput,
		@Ctx() { user: loggedInUser, repositories, request }: Context,
	): Promise<LoginGooglePayload> {
		if (loggedInUser) {
			throw new Error('You are already logged in');
		}

		const clientId = String(process.env.GOOGLE_OAUTH2_CLIENT_ID);
		const clientSecret = String(process.env.GOOGLE_OAUTH2_CLIENT_SECRET);
		const redirectUri = String(process.env.GOOGLE_OAUTH2_REDIRECT_URI);

		/* eslint-disable @typescript-eslint/camelcase */
		const query = stringify({
			grant_type: 'authorization_code',
			code,
			client_id: clientId,
			client_secret: clientSecret,
			redirect_uri: redirectUri,
		});
		/* eslint-enable @typescript-eslint/camelcase */
		const result = await axios.post(`https://oauth2.googleapis.com/token?${query}`);
		const profile = JSON.parse(
			Buffer.from(result.data['id_token'].split('.')[1], 'base64').toString('utf8'),
		);
		const googleId = profile['sub'];

		let user = await repositories.userRepository.findOne({
			where: {
				googleId,
			},
		});

		if (!user) {
			user = repositories.userRepository.create({
				googleId,
				name: profile['name'],
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
