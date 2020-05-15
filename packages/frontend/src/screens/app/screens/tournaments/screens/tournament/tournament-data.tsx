import React from 'react';

import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import {
	GetTournamentQuery,
	GetTournamentQueryVariables,
} from './__generated__/GetTournamentQuery';
import TournamentView from './tournament-view';

const GET_TOURNAMENT_QUERY = gql`
	query GetTournamentQuery($id: ID!) {
		tournament(id: $id) {
			id
			name
			maxTeams
			teams {
				id
			}
		}
	}
`;

const TournamentData = () => {
	const { tournamentId } = useParams();
	const { data, error, loading } = useQuery<GetTournamentQuery, GetTournamentQueryVariables>(
		GET_TOURNAMENT_QUERY,
		{
			variables: {
				id: tournamentId || '',
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
		return (
			<TournamentView
				tournament={{
					...data.tournament,
					registeredTeamCount: data.tournament.teams.length,
				}}
			/>
		);
	}

	return null;
};

export default TournamentData;
