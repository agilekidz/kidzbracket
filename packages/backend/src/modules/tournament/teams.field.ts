import { Ctx, FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';

import { Context } from '../../apollo';

import GQLTournament from './tournament';

@Resolver(() => GQLTournament)
export default class TeamsResolver implements ResolverInterface<GQLTournament> {
	@FieldResolver()
	async teams(@Root() { id }: GQLTournament, @Ctx() { repositories }: Context) {
		const tournament = await repositories.tournamentRepository.findOne({
			where: { id },
			relations: ['teams'],
		});

		if (!tournament) {
			throw new Error('Tournament not found');
		}

		return tournament.teams;
	}
}
