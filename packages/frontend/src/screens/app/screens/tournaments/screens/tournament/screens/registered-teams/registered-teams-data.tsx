import React from 'react';

import { gql, useQuery } from '@apollo/client';

import {
	GetRegisteredTeamsQuery,
	GetRegisteredTeamsQueryVariables,
} from './__generated__/GetRegisteredTeamsQuery';
import RegisteredTeamsView from './registered-teams-view';

const GET_REGISTERED_TEAMS_QUERY = gql`
	query GetRegisteredTeamsQuery($tournamentId: ID!) {
		tournament(id: $tournamentId) {
			id
			teams {
				id
				name
			}
		}
	}
`;

interface Props {
	tournamentId: string;
}

const RegisteredTeamsData: React.FC<Props> = ({ tournamentId }) => {
	const { data, error, loading } = useQuery<
		GetRegisteredTeamsQuery,
		GetRegisteredTeamsQueryVariables
	>(GET_REGISTERED_TEAMS_QUERY, {
		variables: {
			tournamentId,
		},
	});

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error...</div>;
	}

	if (data) {
		return <RegisteredTeamsView teams={data.tournament.teams} />;
	}

	return null;
};

export default RegisteredTeamsData;
