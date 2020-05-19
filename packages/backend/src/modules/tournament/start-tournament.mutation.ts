import { Arg, Ctx, Field, ID, Mutation, ObjectType, Resolver } from 'type-graphql';

import { Context } from '../../apollo';

import Tournament from './tournament';

@ObjectType()
class StartTournamentPayload {
	@Field()
	tournament: Tournament;
}

@Resolver()
export default class StartTournamentMutationResolver {
	@Mutation(() => StartTournamentPayload)
	async startTournament(@Arg('id', () => ID) id: string, @Ctx() { repositories, user }: Context) {
		if (!user) {
			throw new Error('You must be logged in to do that');
		}

		let tournament = await repositories.tournamentRepository.findOne(id, {
			relations: ['owner'],
		});
		if (!tournament) {
			throw new Error('Tournament does not exist');
		}

		if (tournament.owner.id !== user.id) {
			throw new Error('You must be the host to start the tournament');
		}

		if (tournament.started) {
			throw new Error('Tournament is already started');
		}

		tournament.started = true;
		tournament = await repositories.tournamentRepository.save(tournament);

		return {
			tournament,
		};
	}
}
