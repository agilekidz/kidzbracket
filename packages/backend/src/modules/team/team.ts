import { Field, ID, ObjectType } from 'type-graphql';

import Tournament from '../tournament/tournament';
import GQLUser from '../user/user';

@ObjectType()
export default class Team {
	@Field(() => ID, { description: 'Unique identifier for the team' })
	id: string;

	@Field()
	name: string;

	@Field(() => [GQLUser], { description: 'the players on the team' })
	players: GQLUser[];

	@Field(() => Tournament)
	tournament: Tournament;
}
