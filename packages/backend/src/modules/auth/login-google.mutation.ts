import axios from 'axios';
import { stringify } from 'query-string';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import { Context } from '../../apollo';
import DBUser from '../../entities/user';

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
		@Ctx() context: Context,
		@Arg('input') { code }: LoginGoogleInput,
	): Promise<LoginGooglePayload> {
		if (context.user) {
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

		const userRepository = getRepository(DBUser);
		let user = await userRepository.findOne({
			where: {
				googleId,
			},
		});

		if (!user) {
			user = userRepository.create({
				googleId,
				name: profile['name'],
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
