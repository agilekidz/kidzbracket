import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useParams } from 'react-router-dom';

import { Spinner } from '../../shared/components/spinner';

import { MatchInfoQuery, MatchInfoQueryVariables } from './__generated__/MatchInfoQuery';
import MatchView from './match-view';

const MATCH_INFO_QUERY = gql`
	query MatchInfoQuery($id: ID!) {
		match(id: $id) {
			id
			firstTeam {
				id
				name
				players {
					id
					name
				}
			}
			secondTeam {
				id
				name
				players {
					id
					name
				}
			}
			winner {
				id
				name
				players {
					id
					name
				}
			}
			tournament {
				id
				owner {
					id
					name
				}
			}
			contested
			finalized
			needAdminHelp
		}
	}
`;

const MatchData = () => {
	const { matchId } = useParams();

	const { data, error, loading } = useQuery<MatchInfoQuery, MatchInfoQueryVariables>(
		MATCH_INFO_QUERY,
		{
			variables: { id: matchId || '' },
		},
	);

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		return <div>Error...</div>;
	}

	if (data) {
		const { match } = data;
		if (match.firstTeam && match.secondTeam) {
			// This assignment solves TypeScript not being able to infer firstTeam and
			// secondTeam being non-null, despite the check in the if clause above
			return (
				<MatchView
					match={{
						...match,
						firstTeam: match.firstTeam,
						secondTeam: match.secondTeam,
					}}
					tournament={data.match.tournament}
				/>
			);
		} else {
			return <div>Both firstTeam and secondTeam need to be set!</div>;
		}
	}

	return null;
};

export default MatchData;
