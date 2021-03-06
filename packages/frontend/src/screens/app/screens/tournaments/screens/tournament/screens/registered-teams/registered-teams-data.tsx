import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Spinner } from '../../../../../../shared/components/spinner';

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
		return <Spinner />;
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
