import { Field, ID, ObjectType } from 'type-graphql';

import Match from '../match/match';

@ObjectType()
export default class Tournament {
	@Field(() => ID, { description: 'Unique identifier for the match' })
	id: string;

	@Field({ description: 'The name of the tournament' })
	name: string;

	@Field(() => Match, {
		description: 'References all the matches that are connected to the tournament',
	})
	matches: Match[];
}
