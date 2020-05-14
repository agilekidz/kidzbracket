import { Column, Entity, ManyToOne } from 'typeorm';

import BaseEntity from './base-entity';
import Team from './team';
import Tournament from './tournament';

//Entity for the match. References teams and hold the score of the match.
//It also references the tournament
@Entity()
export default class Match extends BaseEntity {
	//Team 1 in the match
	@ManyToOne(() => Team, { nullable: true })
	firstTeam: Team | null;

	//Team 2 in the match
	@ManyToOne(() => Team, { nullable: true })
	secondTeam: Team | null;

	//Team 1:s parent match
	@ManyToOne(() => Match, { nullable: true })
	firstParent: Match | null;

	//Team 2:s parent match
	@ManyToOne(() => Match, { nullable: true })
	secondParent: Match | null;

	//Team 1:s score
	@Column('int', { nullable: true })
	firstScore: number | null;

	//Team 2:s score
	@Column('int', { nullable: true })
	secondScore: number | null;

	//Reference to the tournament
	@ManyToOne(() => Tournament, tournament => tournament.matches)
	tournament: Tournament;

	//Winner of the match
	@ManyToOne(() => Team, { nullable: true })
	winner: Team | null;

	@Column()
	round: number;

	//If a team contests the result
	@Column({ default: false })
	contested: boolean;
}
