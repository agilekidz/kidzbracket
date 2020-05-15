import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';

import { Context } from '../../apollo';

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

		return { match };
	}
}
