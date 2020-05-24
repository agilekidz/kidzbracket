import { getRepository } from 'typeorm';

import Match from './entities/match';
import Team from './entities/team';

export async function finalizeMatch(match: Match, winningTeam: Team) {
	const matchRepository = getRepository(Match);

	match.finalized = true;
	match.winner = winningTeam;

	if (match.round === 1) {
		match = await matchRepository.save(match);

		return match;
	}

	//Get child match, aka the next match in the progression. Theese square brackets represent or.
	const childMatch = await matchRepository.findOne({
		where: [{ firstParent: match }, { secondParent: match }],
		relations: ['firstParent', 'secondParent'],
	});

	if (!childMatch) {
		throw new Error('finalizedMatch: Child match not found!');
	}

	if (childMatch.firstParent?.id === match.id) {
		childMatch.firstTeam = winningTeam;
	} else if (childMatch.secondParent?.id === match.id) {
		childMatch.secondTeam = winningTeam;
	} else {
		throw new Error('finalizedMatch: Match could not be finalized!');
	}

	await matchRepository.save(childMatch);
	match = await matchRepository.save(match);
	return match;
}
