import { BracketMatch } from '../components/bracket/bracket-view';

import { Match } from './types';

export function buildTree(currentMatch: Match, matches: Map<string, Match>): BracketMatch {
	let secondParent: BracketMatch | undefined = undefined;
	if (currentMatch.secondParent) {
		const match = matches.get(currentMatch.secondParent.id);
		if (!match) {
			throw new Error('Could not find match');
		}

		secondParent = buildTree(match, matches);
	}

	let firstParent: BracketMatch | undefined = undefined;
	if (currentMatch.firstParent) {
		const match = matches.get(currentMatch.firstParent.id);
		if (!match) {
			throw new Error('Could not find match');
		}

		firstParent = buildTree(match, matches);
	}

	return {
		id: currentMatch.id,
		secondTeam: currentMatch.secondTeam || undefined,
		firstTeam: currentMatch.firstTeam || undefined,
		secondParent,
		firstParent,
		firstTeamScore: undefined,
		secondTeamScore: undefined,
		winner: undefined,
	};
}
