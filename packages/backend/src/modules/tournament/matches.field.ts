import { Ctx, FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';

import { Context } from '../../apollo';

import GQLTournament from './tournament';

@Resolver(() => GQLTournament)
export default class MatchesResolver implements ResolverInterface<GQLTournament> {
	@FieldResolver()
	async matches(@Root() { id }: GQLTournament, @Ctx() { repositories }: Context) {
		const tournament = await repositories.tournamentRepository.findOne({
			where: { id },
			relations: ['matches'],
		});

		if (!tournament) {
			throw new Error('No tournament with that id');
		}

		return tournament.matches;
	}
}
