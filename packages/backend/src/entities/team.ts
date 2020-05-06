import { Column, Entity, ManyToOne } from 'typeorm';

import BaseEntity from './base-entity';
import Tournament from './tournament';

//Entity for teams in the database
@Entity()
export default class Team extends BaseEntity {
	@Column()
	name: string;

	@Column('simple-array')
	players: string[];

	@ManyToOne(() => Tournament, tournament => tournament.matches)
	tournament: Tournament;
}
