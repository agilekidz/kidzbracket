import { Field, ID, ObjectType } from 'type-graphql';

import Match from '../match/match';
import Team from '../team/team';
import User from '../user/user';

@ObjectType()
export default class Tournament {
	@Field(() => ID, { description: 'Unique identifier for the tournament' })
	id: string;

	@Field({ description: 'The name of the tournament' })
	name: string;

	@Field({ description: 'The description of the tournament' })
	description: string;

	@Field({ description: 'The selected game of the tournament' })
	game: string;

	@Field(() => User, { description: 'References the tournament owner' })
	owner: User;

	@Field(() => Match, {
		description: 'References all the matches that are connected to the tournament',
	})
	matches: Match[];

	@Field(() => [Match], {
		description: 'References all the matches that are connected to the tournament',
	})
	// TODO: needs to be | undefined else everything be bork
	contestedMatches?: Match[];

	@Field(() => Team)
	teams: Team[];
}
