import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default class Team {
	@Field(() => ID)
	id: string;

	@Field()
	name: string;
}
