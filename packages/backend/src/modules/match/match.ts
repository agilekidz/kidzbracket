import { Field, ID, ObjectType } from 'type-graphql';

import Team from '../../entities/team';

@ObjectType()
export default class Match {
	@Field(() => ID)
	id: string;

	@Field(() => Team, { nullable: true })
	firstTeam?: Team;

	@Field(() => Team, { nullable: true })
	secondTeam?: Team;

	@Field(() => Match, { nullable: true })
	firstParent?: Match;

	@Field(() => Match, { nullable: true })
	secondParent?: Match;

	@Field({ nullable: true })
	firstScore?: number;

	@Field({ nullable: true })
	secondScore?: number;

	@Field(() => Tournament)
	tournament: Tournament;

	@Field(() => Team, { nullable: true })
	winner?: Team;
}
