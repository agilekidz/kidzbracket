import { Ctx, Field, Mutation, ObjectType, Resolver } from 'type-graphql';

import { Context } from '../../apollo';

@ObjectType()
class LogoutPayload {
	@Field()
	success: boolean;
}

@Resolver()
export default class LogoutMutationResolver {
	@Mutation(() => LogoutPayload)
	async logout(@Ctx() context: Context): Promise<LogoutPayload> {
		if (!context.user) {
			throw new Error('You must be logged in to do that');
		}

		await new Promise(resolve => {
			if (context.request.session) {
				context.request.session.destroy(() => {
					resolve();
				});
			} else {
				resolve();
			}
		});

		return {
			success: true,
		};
	}
}
