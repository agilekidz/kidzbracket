import { Column, Entity } from 'typeorm';

import BaseEntity from './base-entity';

@Entity()
export default class Team extends BaseEntity {
	@Column()
	name: string;
}
