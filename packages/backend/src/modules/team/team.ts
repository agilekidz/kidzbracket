import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default class Team {
	@Field(() => ID, { description: 'Unique identifier for the team' })
	id: string;

	@Field()
	name: string;
}
