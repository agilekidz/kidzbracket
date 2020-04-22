import { Column, Entity, OneToMany } from 'typeorm';

import BaseEntity from './base-entity';
import Match from './match';

@Entity()
export default class Tournament extends BaseEntity {
	@Column()
	name: string;

	@OneToMany(() => Match, match => match.tournament)
	matches: Match[];
}
