import { Ctx, FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';

import { Context } from '../../apollo';

import GQLTournament from './tournament';

@Resolver(() => GQLTournament)
export default class ContestedMatchesResolver implements ResolverInterface<GQLTournament> {
	@FieldResolver()
	async contestedMatches(@Root() { id }: GQLTournament, @Ctx() { repositories }: Context) {
		const tournament = await repositories.tournamentRepository.findOne({
			where: { id },
			relations: ['matches'],
		});

		if (!tournament) {
			throw new Error('No tournament with that id');
		}

		return tournament.matches.filter(match => match.contested && !match.finalized);
	}
}
