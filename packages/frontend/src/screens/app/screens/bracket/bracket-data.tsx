import React from 'react';

import { gql, useQuery } from '@apollo/client';

import {
	BracketMatchesQuery,
	// eslint-disable-next-line @typescript-eslint/camelcase
	BracketMatchesQuery_tournament_matches,
} from './__generated__/BracketMatchesQuery';
import BracketView from './bracket-view';

const BRACKET_MATCHES_QUERY = gql`
	query BracketMatchesQuery {
		tournament(id: "cc222aca-b71b-4fe7-8a8b-c07ffed00ae3") {
			id
			name
			matches {
				id
				firstParent {
					id
				}
				firstTeam {
					id
					name
				}
				secondParent {
					id
				}
				secondTeam {
					id
					name
				}
				round
			}
		}
	}
`;

interface Team {
	id: string;
	name: string;
}

interface BracketMatch {
	id: string;
	firstParent?: BracketMatch;
	secondParent?: BracketMatch;
	firstTeam?: Team;
	secondTeam?: Team;
	firstTeamScore?: number;
	secondTeamScore?: number;
	winner?: Team;
}

// eslint-disable-next-line @typescript-eslint/camelcase
type Match = BracketMatchesQuery_tournament_matches;

function buildTree(currentMatch: Match, matches: Map<string, Match>): BracketMatch {
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

const BracketData = () => {
	const { data, error, loading } = useQuery<BracketMatchesQuery>(BRACKET_MATCHES_QUERY);
	if (loading) {
		return null;
	}
	if (error) {
		return null;
	}
	if (data) {
		console.log(data);
		const matchesMap = new Map<string, Match>();

		data.tournament.matches.forEach(match => {
			matchesMap.set(match.id, match);
		});
		const root = data.tournament.matches.find(match => match.round === 1);
		if (!root) {
			throw new Error('fuck off');
		}
		return <BracketView match={buildTree(root, matchesMap)} />;
	}
	return null;
};

export default BracketData;
