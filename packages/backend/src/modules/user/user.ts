import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default class User {
	@Field(() => ID)
	id: string;

	@Field()
	name: string;

	@Field(() => String, { nullable: true })
	email: string | null;

	@Field(() => String, { nullable: true })
	alias: string | null;

	@Field(() => String, { nullable: true })
	bio: string | null;
}
