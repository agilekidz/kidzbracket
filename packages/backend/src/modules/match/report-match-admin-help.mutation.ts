import { Arg, Field, ID, Mutation, ObjectType, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBMatch from '../../entities/match';

import GQLMatch from './match';

@ObjectType()
class ReportMatchAdminHelpMutationPayload {
	@Field() match: GQLMatch;
}

@Resolver()
export default class ReportMatchAdminHelpMutationResolver {
	@Mutation(() => ReportMatchAdminHelpMutationPayload)
	async reportMatchAdminHelp(
		@Arg('matchId', () => ID) matchId: string,
		@Arg('needAdminHelp') needAdminHelp: boolean,
	): Promise<ReportMatchAdminHelpMutationPayload> {
		const matchRepository = getRepository(DBMatch);
		const match = await matchRepository.findOne(matchId);

		if (!match) {
			throw new Error('ReportMatchAdminHelp: No match found');
		}

		match.needAdminHelp = needAdminHelp;
		await matchRepository.save(match);
		return { match };
	}
}
