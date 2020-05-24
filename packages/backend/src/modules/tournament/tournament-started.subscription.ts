import { Resolver, Root, Subscription } from 'type-graphql';

import GQLTournament from './tournament';

@Resolver()
export default class TournamentStartedSubscriptionResolver {
	@Subscription(() => GQLTournament, {
		topics: 'TOURNAMENT_STARTED',
	})
	tournamentStarted(@Root() tournament: GQLTournament): GQLTournament {
		return tournament;
	}
}
