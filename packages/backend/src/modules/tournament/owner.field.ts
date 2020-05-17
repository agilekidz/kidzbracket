import { Ctx, FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';

import { Context } from '../../apollo';

import GQLTournament from './tournament';

@Resolver(() => GQLTournament)
export default class OwnerResolver implements ResolverInterface<GQLTournament> {
	@FieldResolver()
	async owner(@Root() { id }: GQLTournament, @Ctx() { repositories }: Context) {
		const tournament = await repositories.tournamentRepository.findOne({
			where: { id },
			relations: ['owner'],
		});

		if (!tournament) {
			throw new Error('Tournament not found');
		}

		return tournament.owner;
	}
}
