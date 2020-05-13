import { Arg, Field, ID, Mutation, ObjectType, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBMatch from '../../entities/match';

import GQLMatch from './match';

@ObjectType()
class ReportMatchFinlaizedMutationPayload {
	@Field()
	match: GQLMatch;
}

@Resolver()
export default class ReportMatchFinlaizedMutationResolver {
	@Mutation(() => ReportMatchFinlaizedMutationPayload)
	async reportMatchFinalized(
		@Arg('matchId', () => ID) matchId: string,
	): Promise<ReportMatchFinlaizedMutationPayload> {
		const matchRepository = getRepository(DBMatch);
		const match = await matchRepository.findOne(matchId);

		if (!match) throw new Error('Match not found');
		match.contested = false;
		match.finalized = true;

		matchRepository.save(match);

		return { match };
	}
}
