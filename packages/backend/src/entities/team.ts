import { Column, Entity } from 'typeorm';

import BaseEntity from './base-entity';

//Entity for teams in the database
@Entity()
export default class Team extends BaseEntity {
	@Column()
	name: string;
}
