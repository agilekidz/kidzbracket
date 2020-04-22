import axios from 'axios';
import { stringify } from 'query-string';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import { Context } from '../../apollo';
import DBUser from '../../entities/user';

@InputType()
class LoginFacebookInput {
	@Field()
	code: string;
}

@ObjectType()
class LoginFacebookPayload {
	@Field()
	success: boolean;
}

@Resolver()
export default class LoginFacebookMutationResolver {
	@Mutation(() => LoginFacebookPayload)
	async loginFacebook(
		@Ctx() context: Context,
		@Arg('input') { code }: LoginFacebookInput,
	): Promise<LoginFacebookPayload> {
		if (context.user) {
			throw new Error('You are already logged in');
		}

		const clientId = String(process.env.FACEBOOK_OAUTH2_CLIENT_ID);
		const clientSecret = String(process.env.FACEBOOK_OAUTH2_CLIENT_SECRET);
		const redirectUri = String(process.env.FACEBOOK_OAUTH2_REDIRECT_URI);

		/* eslint-disable @typescript-eslint/camelcase */
		const query = stringify({
			code,
			client_id: clientId,
			client_secret: clientSecret,
			redirect_uri: redirectUri,
		});
		/* eslint-enable @typescript-eslint/camelcase */
		let result = await axios.get(`https://graph.facebook.com/v6.0/oauth/access_token?${query}`);
		const accessToken: string = result.data['access_token'];

		result = await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}`);

		const facebookId = result.data['id'];
		const userName = result.data['name'];

		const userRepository = getRepository(DBUser);
		let user = await userRepository.findOne({
			where: {
				facebookId,
			},
		});

		if (!user) {
			user = userRepository.create({
				facebookId,
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
