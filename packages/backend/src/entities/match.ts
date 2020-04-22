import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

import BaseEntity from './base-entity';
import Team from './team';
import Tournament from './tournament';

@Entity()
export default class Match extends BaseEntity {
	@ManyToOne(() => Team, { nullable: true })
	firstTeam?: Team;

	@ManyToOne(() => Team, { nullable: true })
	secondTeam?: Team;

	@ManyToOne(() => Match, { nullable: true })
	firstParent?: Match;

	@ManyToOne(() => Match, { nullable: true })
	secondParent?: Match;

	@Column({ nullable: true })
	firstScore?: number;

	@Column({ nullable: true })
	secondScore?: number;

	@ManyToOne(() => Tournament, tournament => tournament.matches)
	tournament: Tournament;

	@OneToOne(() => Team, { nullable: true })
	winner?: Team;
}
