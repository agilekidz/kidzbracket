import React from 'react';

import { gql, useQuery } from '@apollo/client';

import { GetAllUsersQuery, GetAllUsersQueryVariables } from './__generated__/GetAllUsersQuery';
import {
	JoinTournamentTournamentInfoQuery,
	JoinTournamentTournamentInfoQueryVariables,
} from './__generated__/JoinTournamentTournamentInfoQuery';
import JoinTournamentLogic from './join-tournament-logic';

const JOIN_TOURNAMENT_TOURNAMENT_INFO_QUERY = gql`
	query JoinTournamentTournamentInfoQuery($id: ID!) {
		tournament(id: $id) {
			id
			playersPerTeam
		}
	}
`;

const GET_ALL_USERS_QUERY = gql`
	query GetAllUsersQuery {
		users {
			id
			name
		}
	}
`;

interface Props {
	tournamentId: string;
}

function getAllUsers() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { loading, error, data } = useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
		GET_ALL_USERS_QUERY,
	);
	return {
		loading2: loading,
		error2: error,
		data2: data,
	};
}

const JoinTournamentData: React.FC<Props> = ({ tournamentId }) => {
	const { loading, error, data } = useQuery<
		JoinTournamentTournamentInfoQuery,
		JoinTournamentTournamentInfoQueryVariables
	>(JOIN_TOURNAMENT_TOURNAMENT_INFO_QUERY, {
		variables: {
			id: tournamentId,
		},
	});

	const allUsers = getAllUsers();

	if (loading || allUsers.loading2) {
		return <div>loading...</div>;
	}
	if (error || allUsers.error2) {
		return <div>error</div>;
	}
	if (data && allUsers.data2) {
		return <JoinTournamentLogic tournament={data.tournament} users={allUsers.data2.users} />;
	}
	return <div></div>;
};

export default JoinTournamentData;
