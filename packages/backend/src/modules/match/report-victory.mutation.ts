import {
	Arg,
	Ctx,
	Field,
	InputType,
	Mutation,
	ObjectType,
	PubSub,
	PubSubEngine,
	Resolver,
} from 'type-graphql';

import { Context } from '../../apollo';
import { finalizeMatch } from '../../finalize-match';

import GQLMatch from './match';

@InputType()
class ReportVictoryInput {
	@Field()
	matchId: string;

	// TODO: Remove this argument in favour of automatic resolving from currently logged user
	@Field()
	teamId: string;
}

@ObjectType()
class ReportVictoryMutationPayload {
	@Field()
	match: GQLMatch;
}

@Resolver()
export default class ReportVictoryMutationResolver {
	@Mutation(() => ReportVictoryMutationPayload)
	async reportVictory(
		@Arg('input') { matchId, teamId }: ReportVictoryInput,
		@Ctx() { user, repositories }: Context,
		@PubSub() pubsub: PubSubEngine,
	): Promise<ReportVictoryMutationPayload> {
		if (!user) {
			throw new Error('You must be logged in to do that');
		}

		const match = await repositories.matchRepository.findOne(matchId);
		if (!match) {
			throw new Error('Match does not exist');
		}

		if (match.winner) {
			throw new Error('A score has already been reported');
		}

		const team = await repositories.teamRepository.findOne(teamId);
		if (!team) {
			throw new Error('Team does not exist');
		}

		match.winner = team;
		await repositories.matchRepository.save(match);

		//TODO: Change timeout to 15 min
		setTimeout(async () => {
			try {
				const match = await repositories.matchRepository.findOne(matchId);
				if (!match) {
					return;
				}

				if (match.contested || match.finalized) {
					return;
				}

				const team = await repositories.teamRepository.findOne(teamId);
				if (!team) {
					return;
				}
				await finalizeMatch(match, team);

				pubsub.publish('MATCH_FINALIZED', match);

				console.log('Finalized match on timeout');
			} catch {
				//Something went wrong
				console.error('Something went wrong, match not finalized properly');
			}
		}, 10 * 1000);

		return { match };
	}
}
