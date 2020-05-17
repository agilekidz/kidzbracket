import React from 'react';

import { gql, useQuery } from '@apollo/client';

import {
	BracketMatchesQuery,
	BracketMatchesQueryVariables,
} from './__generated__/BracketMatchesQuery';
import BracketView from './bracket-view';
import { buildTree } from './utils/bracket-treeifier';
import { Match } from './utils/types';

const BRACKET_MATCHES_QUERY = gql`
	query BracketMatchesQuery($id: ID!) {
		tournament(id: $id) {
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

interface Props {
	tournamentId: string;
}

const BracketData: React.FC<Props> = ({ tournamentId }) => {
	const { data, error, loading } = useQuery<BracketMatchesQuery, BracketMatchesQueryVariables>(
		BRACKET_MATCHES_QUERY,
		{
			variables: {
				id: tournamentId,
			},
		},
	);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error...</div>;
	}

	if (data) {
		let depth = 0;
		const matches = new Map<string, Match>();
		data.tournament.matches.forEach(match => {
			matches.set(match.id, match);
			if (match.round > depth) {
				depth = match.round;
			}
		});

		const root = data.tournament.matches.find(match => match.round === 1);
		if (!root) {
			throw new Error('Root not found, should not happen');
		}

		const bracket = buildTree(root, matches);

		console.log('data ', depth);

		return <BracketView match={bracket} level={depth - 2} />;
	}

	return null;
};

export default BracketData;
