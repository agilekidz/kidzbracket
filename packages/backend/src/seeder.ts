import { getRepository } from 'typeorm';

import Team from './entities/team';
import Tournament from './entities/tournament';
import User from './entities/user';
import { generateBracket } from './generate-bracket';

function createUser(name: string, email: string, password: string): Promise<User> {
	const userRepository = getRepository(User);

	const user = userRepository.create({
		name,
		email,
		password,
	});
	return userRepository.save(user);
}

export async function seedDatabase() {
	createUser('admin', 'admin', 'admin');
	createUser('user', 'user', 'user');

	for (let i = 0; i < 100; i++) {
		createUser('user' + i, 'user' + i, 'user');
	}
}

export async function randomTournament() {
	const tournamentRepository = getRepository(Tournament);
	const teamRepository = getRepository(Team);
	const userRepository = getRepository(User);

	const owner = await userRepository.findOne({ where: { email: 'admin' } });
	if (!owner) {
		throw new Error('owner not found, please seed the database');
	}

	let tournament = tournamentRepository.create({
		name: 'Cool Tournament',
		description: 'Very nice tournament with good description',
		game: 'League of Legends',
		owner,
	});
	tournament = await tournamentRepository.save(tournament);

	const teams: Team[] = [];
	for (let i = 0; i < 15; i++) {
		let team = teamRepository.create({
			name: 'team' + i,
			players: ['player 1', 'player 2'],
			tournament,
		});
		team = await teamRepository.save(team);
		teams.push(team);
	}

	await generateBracket(teams, tournament);

	return tournament;
}
