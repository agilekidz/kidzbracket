import {
	Arg,
	Ctx,
	Field,
	ID,
	Mutation,
	ObjectType,
	PubSub,
	PubSubEngine,
	Resolver,
} from 'type-graphql';

import { Context } from '../../apollo';
import { generateBracket } from '../../generate-bracket';

import Tournament from './tournament';

@ObjectType()
class StartTournamentPayload {
	@Field()
	tournament: Tournament;
}

@Resolver()
export default class StartTournamentMutationResolver {
	@Mutation(() => StartTournamentPayload)
	async startTournament(
		@Arg('id', () => ID) id: string,
		@Ctx() { repositories, user }: Context,
		@PubSub() pubsub: PubSubEngine,
	) {
		if (!user) {
			throw new Error('You must be logged in to do that');
		}

		let tournament = await repositories.tournamentRepository.findOne(id, {
			relations: ['owner', 'teams'],
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

		if (!(tournament.teams.length >= 2)) {
			throw new Error('Not enough teams to start the tournament! >:(');
		}

		await generateBracket(tournament.teams, tournament);

		tournament.started = true;
		tournament = await repositories.tournamentRepository.save(tournament);

		pubsub.publish('TOURNAMENT_STARTED', tournament);

		return {
			tournament,
		};
	}
}
