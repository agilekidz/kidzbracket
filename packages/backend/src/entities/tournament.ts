import { Column, Entity, OneToMany } from 'typeorm';

import BaseEntity from './base-entity';
import Match from './match';
import Team from './team';

//Entity that represent a tournament in the database
@Entity()
export default class Tournament extends BaseEntity {
	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	game: string;

	//References all the matches connected to the tournament
	@OneToMany(() => Match, match => match.tournament)
	matches: Match[];

	@OneToMany(() => Team, team => team.tournament)
	teams: Team[];
}
