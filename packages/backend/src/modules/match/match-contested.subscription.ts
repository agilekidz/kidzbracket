import { Resolver, Root, Subscription } from 'type-graphql';

import GQLMatch from './match';

@Resolver()
export default class MatchContestedSubscriptionResolver {
	@Subscription(() => GQLMatch, {
		topics: 'MATCH_CONTESTED',
	})
	matchContested(@Root() match: GQLMatch): GQLMatch {
		return match;
	}
}
