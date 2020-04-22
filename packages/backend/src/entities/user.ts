import bcrypt from 'bcrypt';
import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

import BaseEntity from './base-entity';

@Entity()
export default class User extends BaseEntity {
	@Column()
	name: string;

	@Column({ nullable: true })
	email: string;

	@Column({ nullable: true })
	password: string;

	@Column({ nullable: true })
	googleId?: string;

	@Column({ nullable: true })
	githubId?: string;

	@Column({ nullable: true })
	facebookId?: string;

	private tempPassword: string;

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
		if (this.tempPassword !== this.password) {
			this.password = await bcrypt.hash(this.password, 12);
		}
	}
}
