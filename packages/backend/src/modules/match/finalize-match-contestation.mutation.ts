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
class FinalizeMatchContestationInput {
	@Field()
	matchId: string;

	@Field()
	winningTeamId: string;
}

@ObjectType()
class FinalizeMatchContestationMutationPayload {
	@Field()
	match: GQLMatch;
}

@Resolver()
export default class FinalizeMatchContestationMutationResolver {
	@Mutation(() => FinalizeMatchContestationMutationPayload)
	async finalizeMatchContestation(
		@Arg('input') { matchId, winningTeamId }: FinalizeMatchContestationInput,
		@Ctx() { user, repositories }: Context,
		@PubSub() pubsub: PubSubEngine,
	): Promise<FinalizeMatchContestationMutationPayload> {
		if (!user) {
			throw new Error('You must be logged in to do that');
		}

		let match = await repositories.matchRepository.findOne(matchId, {
			relations: ['firstTeam', 'secondTeam', 'tournament'],
		});
		if (!match) {
			throw new Error('Match not found');
		}

		if (match.finalized) {
			throw new Error('Match contestation has already been finalized');
		}

		const tournament = await repositories.tournamentRepository.findOne(match.tournament.id, {
			relations: ['owner'],
		});

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		if (tournament!.owner.id !== user.id) {
			throw new Error('You must be the owner of the tournament to do that');
		}

		const winningTeam = await repositories.teamRepository.findOne(winningTeamId);
		if (!winningTeam) {
			throw new Error('Team not found');
		}

		if (!match.firstTeam || !match.secondTeam) {
			throw new Error('Match does not have both teams yet');
		}

		if (match.firstTeam.id !== winningTeamId && match.secondTeam.id !== winningTeamId) {
			throw new Error('Winner must be a team that played the match');
		}

		match = await finalizeMatch(match, winningTeam);

		if (!match) {
			throw new Error('Match could not be finalized!');
		}

		pubsub.publish('MATCH_FINALIZED', match);

		return { match };
	}
}
