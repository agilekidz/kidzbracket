import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useParams } from 'react-router-dom';

import { Spinner } from '../../../../shared/components/spinner';

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
			started
			teams {
				id
			}
			owner {
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
		return <Spinner />;
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
