import { Resolver, Root, Subscription } from 'type-graphql';

import GQLTournament from './tournament';

@Resolver()
export default class TournamentCreatedSubscriptionResolver {
	@Subscription(() => GQLTournament, {
		topics: 'TOURNAMENT_CREATED',
	})
	tournamentCreated(@Root() tournament: GQLTournament) {
		return tournament;
	}
}
