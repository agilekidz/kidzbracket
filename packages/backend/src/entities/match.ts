import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

import BaseEntity from './base-entity';
import Team from './team';
import Tournament from './tournament';

//Entity for the match. References teams and hold the score of the match.
//It also references the tournament
@Entity()
export default class Match extends BaseEntity {
	//Team 1 in the match
	@ManyToOne(() => Team, { nullable: true })
	firstTeam?: Team;

	//Team 2 in the match
	@ManyToOne(() => Team, { nullable: true })
	secondTeam?: Team;

	//Team 1:s parent match
	@ManyToOne(() => Match, { nullable: true })
	firstParent?: Match;

	//Team 2:s parent match
	@ManyToOne(() => Match, { nullable: true })
	secondParent?: Match;

	//Team 1:s score
	@Column({ nullable: true })
	firstScore?: number;

	//Team 2:s score
	@Column({ nullable: true })
	secondScore?: number;

	//Reference to the tournament
	@ManyToOne(() => Tournament, tournament => tournament.matches)
	tournament: Tournament;

	//Winner of the match
	@ManyToOne(() => Team, { nullable: true })
	winner?: Team;

	@Column()
	round: number;
}
