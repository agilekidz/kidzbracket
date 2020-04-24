import { getRepository } from 'typeorm';

import Match from './entities/match';
import Team from './entities/team';

function shuffle<T>(arr: T[]): T[] {
	arr = [...arr];
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

const matchRepository = getRepository(Match);

export async function generateBracket(teams: Team[]): Promise<Match[]> {
	teams = shuffle(teams);

	const matches: Match[] = [];

	const numberOfRounds = Math.floor(Math.log2(teams.length));

	const restOfTeams: Team[] = teams.filter((_, index) => {
		return index >= Math.pow(2, numberOfRounds);
	});

	for (let i = 0; i < Math.pow(2, numberOfRounds); i += 2) {
		let match = matchRepository.create({
			firstTeam: teams[i],
			secondTeam: teams[i + 1],
			round: numberOfRounds,
		});
		match = await matchRepository.save(match);
		matches.push(match);
	}

	// Only create matches from the previous round
	let skip = 0;
	for (let currentRound = numberOfRounds - 1; currentRound > 0; currentRound--) {
		const matchesLength = matches.length;
		for (let i = skip; i < matchesLength; i += 2) {
			let match = matchRepository.create({
				firstParent: matches[i],
				secondParent: matches[i + 1],
				round: currentRound,
			});
			match = await matchRepository.save(match);
			matches.push(match);
		}
		skip += Math.pow(2, currentRound);
	}

	// Add the remaining teams
	// Loop 0..n twice, first time expanding first match, the second time, the second match
	let first = true;
	let current = 0;
	for (let i = 0; i < restOfTeams.length; i++) {
		if (i === Math.pow(2, numberOfRounds) / 2) {
			first = false;
			current = 0;
		}

		let team: Team | undefined;
		if (first) {
			team = matches[current].firstTeam;
			matches[current].firstTeam = undefined;
		} else {
			team = matches[current].secondTeam;
			matches[current].secondTeam = undefined;
		}

		let match = matchRepository.create({
			firstTeam: team,
			secondTeam: restOfTeams[i],
			round: numberOfRounds + 1,
		});
		match = await matchRepository.save(match);

		if (first) {
			matches[current].firstParent = match;
		} else {
			matches[current].secondParent = match;
		}

		matches[current] = await matchRepository.save(matches[current]);

		matches.push(match);
		current += 1;
	}

	return matches;
}
