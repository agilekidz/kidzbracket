import { Arg, Field, ID, Mutation, ObjectType, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBMatch from '../../entities/match';
import DBTeam from '../../entities/team';

import GQLMatch from './match';

@ObjectType()
class ReportMatchWinMutationPayload {
	@Field()
	match: GQLMatch;
}

@Resolver()
export default class ReportMatchWinMutationResolver {
	@Mutation(() => ReportMatchWinMutationPayload)
	async reportMatchWin(
		@Arg('matchId', () => ID) matchId: string,
		@Arg('teamId', () => ID) teamId: string,
	): Promise<ReportMatchWinMutationPayload> {
		const matchRepository = getRepository(DBMatch);
		const match = await matchRepository.findOne(matchId);

		if (!match) {
			throw new Error('ReportMatchWin: Match does not exist');
		}

		if (match.finalized) throw new Error('Match already finalized ');

		const teamRepository = getRepository(DBTeam);
		const team = await teamRepository.findOne(teamId);

		if (!team) {
			throw new Error('ReportMatchWin: Team does not exist');
		}

		match.winner = team;

		await matchRepository.save(match);

		return { match };
	}
}
