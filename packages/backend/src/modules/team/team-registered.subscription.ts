import { Resolver, Root, Subscription } from 'type-graphql';

import GQLTeam from './team';

@Resolver()
export default class TeamRegisteredSubscriptionResolver {
	@Subscription(() => GQLTeam, {
		topics: 'TEAM_REGISTERED',
	})
	teamRegistered(@Root() team: GQLTeam): GQLTeam {
		return team;
	}
}
