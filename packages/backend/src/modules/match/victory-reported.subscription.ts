import { Resolver, Root, Subscription } from 'type-graphql';

import GQLMatch from './match';

@Resolver()
export default class VictoryReportedSubscriptionResolver {
	@Subscription(() => GQLMatch, {
		topics: 'VICTORY_REPORTED',
	})
	victoryReported(@Root() match: GQLMatch): GQLMatch {
		return match;
	}
}
