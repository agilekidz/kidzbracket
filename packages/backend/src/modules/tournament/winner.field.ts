import { Ctx, FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';

import { Context } from '../../apollo';

import GQLTournament from './tournament';

@Resolver(() => GQLTournament)
export default class WinnerResolver implements ResolverInterface<GQLTournament> {
	@FieldResolver()
	async winner(@Root() { id }: GQLTournament, @Ctx() { repositories }: Context) {
		const tournament = await repositories.tournamentRepository.findOne({
			where: { id },
			relations: ['matches'],
		});

		if (!tournament) {
			throw new Error('Tournament not found');
		}

		let finalMatch = tournament.matches.find(match => match.round === 1);
		if (!finalMatch) {
			// There is not final match, shit is bork
			// Could also be because bracket has not been generated
			return null;
		}

		finalMatch = await repositories.matchRepository.findOne(finalMatch.id, {
			relations: ['winner'],
		});
		return finalMatch?.winner || null;
	}
}
