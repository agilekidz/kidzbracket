import React from 'react';

import { gql, useQuery } from '@apollo/client';

import {
	GetContestedMatches,
	GetContestedMatchesVariables,
} from './__generated__/GetContestedMatches';
import ManageTournamentLogic from './manage-tournament-logic';

const GET_CONTESTED_MATCHES = gql`
	query GetContestedMatches($id: ID!) {
		tournament(id: $id) {
			id
			started
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

	if (data) return <ManageTournamentLogic tournament={data.tournament} />;

	return null;
};

export default ManageTournamentData;
