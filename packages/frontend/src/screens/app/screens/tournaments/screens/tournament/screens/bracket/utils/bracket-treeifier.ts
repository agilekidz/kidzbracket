import { BracketMatch } from '../components/bracket/bracket-view';

import { Match } from './types';

export function buildTree(currentMatch: Match, matches: Map<string, Match>): BracketMatch {
	let secondParent: BracketMatch | null = null;
	if (currentMatch.secondParent) {
		const match = matches.get(currentMatch.secondParent.id);
		if (!match) {
			throw new Error('Could not find match');
		}

		secondParent = buildTree(match, matches);
	}

	let firstParent: BracketMatch | null = null;
	if (currentMatch.firstParent) {
		const match = matches.get(currentMatch.firstParent.id);
		if (!match) {
			throw new Error('Could not find match');
		}

		firstParent = buildTree(match, matches);
	}

	return {
		id: currentMatch.id,
		secondTeam: currentMatch.secondTeam,
		firstTeam: currentMatch.firstTeam,
		secondParent,
		firstParent,
		firstTeamScore: null,
		secondTeamScore: null,
		winner: currentMatch.winner,
	};
}
