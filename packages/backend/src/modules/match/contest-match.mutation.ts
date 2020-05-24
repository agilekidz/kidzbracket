import {
	Arg,
	Ctx,
	Field,
	ID,
	Mutation,
	ObjectType,
	PubSub,
	PubSubEngine,
	Resolver,
} from 'type-graphql';

import { Context } from '../../apollo';

import GQLMatch from './match';

@ObjectType()
class ContestMatchMutationPayload {
	@Field()
	match: GQLMatch;
}

@Resolver()
export default class ContestMatchMutationResolver {
	@Mutation(() => ContestMatchMutationPayload)
	async contestMatch(
		@Arg('id', () => ID) id: string,
		@Ctx() { repositories }: Context,
		@PubSub() pubsub: PubSubEngine,
	): Promise<ContestMatchMutationPayload> {
		const match = await repositories.matchRepository.findOne(id);
		if (!match) {
			throw new Error('Match not found');
		}

		if (match.contested) {
			throw new Error('Match is already contested');
		}

		// TODO: check that contesting user is part of the losing team

		match.contested = true;
		await repositories.matchRepository.save(match);

		pubsub.publish('MATCH_CONTESTED', match);

		return { match };
	}
}
