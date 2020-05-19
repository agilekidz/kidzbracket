import { Field, ID, ObjectType } from 'type-graphql';

import Tournament from '../tournament/tournament';
import User from '../user/user';

@ObjectType()
export default class Team {
	@Field(() => ID, { description: 'Unique identifier for the team' })
	id: string;

	@Field()
	name: string;

	@Field(() => [User], { description: 'the players on the team' })
	players: User[];

	@Field(() => Tournament)
	tournament: Tournament;
}
