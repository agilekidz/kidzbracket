import { Column, Entity, OneToMany } from 'typeorm';

import BaseEntity from './base-entity';
import Match from './match';

//Entity that represent a tournament in the database
@Entity()
export default class Tournament extends BaseEntity {
	@Column()
	name: string;

	//References all the matches connected to the tournament
	@OneToMany(() => Match, match => match.tournament)
	matches: Match[];
}
