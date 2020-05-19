import { getRepository } from 'typeorm';

import Match from './entities/match';
import Team from './entities/team';

export async function finalizeMatch(match: Match, winningTeam: Team) {
	const matchRepository = getRepository(Match);

	match.finalized = true;
	match.winner = winningTeam;

	let childMatch = await matchRepository.findOne({
		where: [
			{
				firstParent: match,
			},
			{
				secondParent: match,
			},
		],
		relations: ['firstParent', 'secondParent'],
	});

	if (childMatch) {
		if (childMatch.firstParent?.id === match.id) {
			childMatch.firstTeam = match.winner;
		} else if (childMatch.secondParent?.id === match.id) {
			childMatch.secondTeam = match.winner;
		} else {
			throw new Error('Neither first, nor second parent was set, cannot finalize this match');
		}

		childMatch = await matchRepository.save(childMatch);
	}
}
