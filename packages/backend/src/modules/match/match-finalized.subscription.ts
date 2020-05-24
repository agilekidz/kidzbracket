import { Resolver, Root, Subscription } from 'type-graphql';

import GQLMatch from './match';

@Resolver()
export default class MatchFinalizedSubscriptionResolver {
	@Subscription(() => GQLMatch, {
		topics: 'MATCH_FINALIZED',
	})
	matchFinalized(@Root() match: GQLMatch): GQLMatch {
		return match;
	}
}
