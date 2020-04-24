import { Field, ID, ObjectType } from 'type-graphql';

import Team from '../../entities/team';
import Tournament from '../tournament/tournament';

@ObjectType()
export default class Match {
	@Field(() => ID, {
		description: 'Unique identifier for the match',
	})
	id: string;

	@Field(() => Team, {
		nullable: true,
		description: 'References the first team of the match',
	})
	firstTeam?: Team;

	@Field(() => Team, {
		nullable: true,
		description: 'Refrences the second team of the match',
	})
	secondTeam?: Team;

	@Field(() => Match, {
		nullable: true,
		description: 'Refrences the parent match of the first match',
	})
	firstParent?: Match;

	@Field(() => Match, {
		nullable: true,
		description: 'References the parent match of the second match',
	})
	secondParent?: Match;

	@Field({
		nullable: true,
		description: 'The score of the first team',
	})
	firstScore?: number;

	@Field({
		nullable: true,
		description: 'The score of the second team',
	})
	secondScore?: number;

	@Field(() => Tournament, {
		description: 'References the tournament that the matches are played in',
	})
	tournament: Tournament;

	@Field(() => Team, {
		nullable: true,
		description: 'References the winning team',
	})
	winner?: Team;
}
