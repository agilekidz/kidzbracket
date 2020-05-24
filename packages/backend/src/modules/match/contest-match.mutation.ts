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
		@Ctx() { repositories, user }: Context,
		@PubSub() pubsub: PubSubEngine,
	): Promise<ContestMatchMutationPayload> {
		if (!user) {
			throw new Error('You must be logged in to do that');
		}

		const match = await repositories.matchRepository.findOne(id, {
			relations: ['firstTeam', 'secondTeam', 'winner'],
		});

		if (!match) {
			throw new Error('Match not found');
		}

		if (!match.firstTeam || !match.secondTeam) {
			throw new Error('Match cannot be played yet');
		}

		if (!match.winner) {
			throw new Error('Cannot contest match before a score has been reported');
		}

		if (match.contested) {
			throw new Error('Match is already contested');
		}

		const losingTeam = await repositories.teamRepository.findOne(
			match.winner.id === match.firstTeam.id ? match.secondTeam.id : match.firstTeam.id,
			{
				relations: ['players'],
			},
		);

		if (!losingTeam) {
			throw new Error('Losing team could not be found');
		}

		if (!losingTeam.players.find(player => player.id === user.id)) {
			throw new Error('You must be on the losing team to do that');
		}

		match.contested = true;
		await repositories.matchRepository.save(match);

		pubsub.publish('MATCH_CONTESTED', match);

		return { match };
	}
}
