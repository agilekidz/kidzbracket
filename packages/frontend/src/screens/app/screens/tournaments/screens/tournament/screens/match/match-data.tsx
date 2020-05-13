import React from 'react';

import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { MatchInfoQuery, MatchInfoQueryVariables } from './__generated__/MatchInfoQuery';
import MatchLogic from './match-logic';

const MATCH_INFO_QUERY = gql`
	query MatchInfoQuery($id: ID!) {
		match(id: $id) {
			id
			firstTeam {
				id
				name
				players
			}
			secondTeam {
				id
				name
				players
			}
			winner {
				id
				name
				players
			}
			contested
		}
	}
`;

interface Props {
	tournament: {
		id: string;
	};
}

const MatchData: React.FC<Props> = () => {
	const { matchId } = useParams();

	const { data, error, loading } = useQuery<MatchInfoQuery, MatchInfoQueryVariables>(
		MATCH_INFO_QUERY,
		{
			variables: { id: matchId || '' },
		},
	);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error...</div>;
	}

	if (data) {
		if (data.match.firstTeam && data.match.secondTeam) {
			// This assignment solves TypeScript not being able to infer firstTeam and
			// secondTeam being non-null, despite the check in the if clause above
			return (
				<MatchLogic
					match={{
						...data.match,
						firstTeam: data.match.firstTeam,
						secondTeam: data.match.secondTeam,
					}}
				/>
			);
		} else {
			return <div>Both firstTeam and secondTeam need to be set!</div>;
		}
	}

	return null;
};

export default MatchData;
