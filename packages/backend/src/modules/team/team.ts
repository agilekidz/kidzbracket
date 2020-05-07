import { Field, ID, ObjectType } from 'type-graphql';

import Tournament from '../tournament/tournament';

@ObjectType()
export default class Team {
	@Field(() => ID, { description: 'Unique identifier for the team' })
	id: string;

	@Field()
	name: string;

	@Field(() => [String], { description: 'the players on the team' })
	players: string[];

	@Field(() => Tournament)
	tournament: Tournament;
}
