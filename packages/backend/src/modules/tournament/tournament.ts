import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default class Match {
	@Field(() => ID)
	id: string;

	@Field()
	name: string;

	@Field(() => Match)
	matches: Match[];
}
