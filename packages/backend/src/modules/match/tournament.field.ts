import { Ctx, FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';

import { Context } from '../../apollo';

import GQLMatch from './match';

@Resolver(() => GQLMatch)
export default class TournamentResolver implements ResolverInterface<GQLMatch> {
	@FieldResolver()
	async tournament(@Root() { id }: GQLMatch, @Ctx() { repositories }: Context) {
		const match = await repositories.matchRepository.findOne({
			where: { id },
			relations: ['tournament'],
		});
		if (!match?.tournament) {
			throw new Error('The match does not exist');
		}
		return match.tournament;
	}
}
