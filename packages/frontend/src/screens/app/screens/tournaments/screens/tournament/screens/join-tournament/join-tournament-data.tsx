import React from 'react';

import { gql, useQuery } from '@apollo/client';

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

interface Props {
	tournamentId: string;
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
	if (loading) {
		return <div>loading...</div>;
	}
	if (error) {
		return <div>error</div>;
	}
	if (data) {
		return <JoinTournamentLogic tournament={data.tournament} />;
	}
	return <div></div>;
};

export default JoinTournamentData;
