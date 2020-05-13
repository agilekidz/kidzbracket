import React from 'react';

import { gql, useQuery } from '@apollo/client';

import {
	GetContestedMatches,
	GetContestedMatchesVariables,
} from './__generated__/GetContestedMatches';
import ManageTournamentView from './manage-tournament-view';

const GET_CONTESTED_MATCHES = gql`
	query GetContestedMatches($id: ID!) {
		tournament(id: $id) {
			id
			contestedMatches {
				id
				firstTeam {
					id
					name
				}
				secondTeam {
					id
					name
				}
			}
		}
	}
`;

interface Props {
	tournamentId: string;
}

const ManageTournamentData: React.FC<Props> = ({ tournamentId }) => {
	const { data, error, loading } = useQuery<GetContestedMatches, GetContestedMatchesVariables>(
		GET_CONTESTED_MATCHES,
		{
			variables: {
				id: tournamentId || '',
			},
		},
	);

	if (loading) return <div>Loading...</div>;

	if (error) return <div>Error</div>;

	if (data)
		return (
			<ManageTournamentView
				tournament={data.tournament}
				matches={data.tournament.contestedMatches}
			/>
		);

	return null;
};

export default ManageTournamentData;
