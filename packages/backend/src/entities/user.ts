import bcrypt from 'bcrypt';
import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';

import BaseEntity from './base-entity';
import Tournament from './tournament';

@Entity()
export default class User extends BaseEntity {
	@Column()
	name: string;

	@Column('varchar', { nullable: true })
	email: string | null;

	@Column('varchar', { nullable: true })
	password: string | null;

	@Column('varchar', { nullable: true })
	googleId: string | null;

	@Column('varchar', { nullable: true })
	githubId: string | null;

	@Column('varchar', { nullable: true })
	facebookId: string | null;

	@Column('varchar', { nullable: true })
	alias: string | null;

	@Column('varchar', { nullable: true })
	bio: string | null;

	@OneToMany(() => Tournament, tournament => tournament.owner)
	tournaments: Tournament[];

	private tempPassword: string | null;

	@AfterLoad()
	// eslint-disable-next-line
	// @ts-ignore
	private loadTempPassword() {
		this.tempPassword = this.password;
	}

	@BeforeInsert()
	@BeforeUpdate()
	// eslint-disable-next-line
	// @ts-ignore
	private async encryptPassword() {
		if (this.password && this.tempPassword !== this.password) {
			this.password = await bcrypt.hash(this.password, 12);
		}
	}
}
