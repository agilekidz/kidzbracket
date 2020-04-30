import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default class User {
	@Field(() => ID)
	id: string;

	@Field()
	name: string;

	@Field()
	email: string;

	@Field({ nullable: true })
	alias?: string;

	@Field({ nullable: true })
	bio?: string;
}
