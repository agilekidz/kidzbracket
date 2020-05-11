import { Arg, Field, ID, Mutation, ObjectType, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBMatch from '../../entities/match';

import GQLMatch from './match';

@ObjectType()
class ReportMatchContestedMutationPayload {
	@Field() match: GQLMatch;
}

@Resolver()
export default class ReportMatchContestedMutationResolver {
	@Mutation(() => ReportMatchContestedMutationPayload)
	async reportMatchContested(
		@Arg('matchId', () => ID) matchId: string,
		@Arg('contested') contested: boolean,
	): Promise<ReportMatchContestedMutationPayload> {
		const matchRepository = getRepository(DBMatch);
		const match = await matchRepository.findOne(matchId);

		if (!match) {
			throw new Error('ReportMatchContested: No match found');
		}

		match.contested = contested;
		await matchRepository.save(match);
		return { match };
	}
}
