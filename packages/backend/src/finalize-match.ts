import { getRepository } from 'typeorm';

import Match from './entities/match';
import Team from './entities/team';

export async function finalizeMatch(match: Match, winningTeam: Team) {
	const matchRepository = getRepository(Match);

	match.finalized = true;
	match.winner = winningTeam;

	if (match.round === 1) {
		return;
	}

	//Get child match, aka the next match in the progression. Theese square brackets represent or.
	const childMatch = await matchRepository.findOne({
		where: [{ firstParent: match }, { secondParent: match }],
	});

	if (!childMatch) {
		throw new Error('Child match not found!');
	}

	if (childMatch.firstParent?.id === match.id) {
		childMatch.firstTeam = winningTeam;
	} else if (childMatch.secondParent?.id === match.id) {
		childMatch.secondTeam = winningTeam;
	} else {
		throw new Error('Match could not be finalized!');
	}
}
