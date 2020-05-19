import { Field, ID, ObjectType } from 'type-graphql';

import GQLTeam from '../team/team';
import Tournament from '../tournament/tournament';

@ObjectType()
export default class Match {
	@Field(() => ID, {
		description: 'Unique identifier for the match',
	})
	id: string;

	@Field(() => GQLTeam, {
		nullable: true,
		description: 'References the first team of the match',
	})
	firstTeam: GQLTeam | null;

	@Field(() => GQLTeam, {
		nullable: true,
		description: 'Refrences the second team of the match',
	})
	secondTeam: GQLTeam | null;

	@Field(() => Match, {
		nullable: true,
		description: 'Refrences the parent match of the first match',
	})
	firstParent: Match | null;

	@Field(() => Match, {
		nullable: true,
		description: 'References the parent match of the second match',
	})
	secondParent: Match | null;

	@Field(() => Number, {
		nullable: true,
		description: 'The score of the first team',
	})
	firstScore: number | null;

	@Field(() => Number, {
		nullable: true,
		description: 'The score of the second team',
	})
	secondScore: number | null;

	@Field(() => Tournament, {
		description: 'References the tournament that the matches are played in',
	})
	tournament: Tournament;

	@Field(() => GQLTeam, {
		nullable: true,
		description: 'References the winning team',
	})
	winner: GQLTeam | null;

	@Field({
		description: 'The round',
	})
	round: number;

	@Field({
		description: 'If score is contested',
	})
	contested: boolean;

	@Field({
		description: 'If match needs admin help',
	})
	needAdminHelp: boolean;

	@Field({ description: 'References to if a match is finalized' })
	finalized: boolean;
}
