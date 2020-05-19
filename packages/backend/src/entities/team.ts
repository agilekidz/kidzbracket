import { Column, Entity, ManyToOne } from 'typeorm';

import BaseEntity from './base-entity';
import Tournament from './tournament';
import User from './user';

//Entity for teams in the database
@Entity()
export default class Team extends BaseEntity {
	@Column()
	name: string;

	@Column('simple-array')
	players: User[];

	@ManyToOne(() => Tournament, tournament => tournament.matches)
	tournament: Tournament;
}
