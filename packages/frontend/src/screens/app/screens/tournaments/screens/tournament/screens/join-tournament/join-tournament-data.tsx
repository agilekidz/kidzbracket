import React from 'react';

import { gql, useQuery } from '@apollo/client';

import { GetAllUsersQuery } from './__generated__/GetAllUsersQuery';
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

const GET_ALL_REGISTERD_TEAMS = gql`
	query GetAllRegisterdTeams($id: ID!) {
		tournament(id: $id) {
			id
			teams {
				id
				players {
					id
				}
			}
		}
	}
`;

interface Props {
	tournamentId: string;
}

function getAllUsers() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { loading, error, data } = useQuery<GetAllUsersQuery>(GET_ALL_USERS_QUERY);
	return {
		loading2: loading,
		error2: error,
		data2: data,
	};
}

function getAllTeams() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { loading, error, data } = useQuery<GetAllUsersQuery>(GET_ALL_USERS_QUERY);
	return {
		loading3: loading,
		error3: error,
		data3: data,
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
	const allTeams = getAllTeams();

	if (loading || allUsers.loading2 || allTeams.loading3) {
		return <div>loading...</div>;
	}
	if (error || allUsers.error2 || allTeams.error3) {
		return <div>error</div>;
	}
	if (data && allUsers.data2 && allTeams.data3) {
		return <JoinTournamentLogic tournament={data.tournament} users={allUsers.data2.users} />;
	}
	return <div></div>;
};

export default JoinTournamentData;
